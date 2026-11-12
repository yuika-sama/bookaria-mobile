import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:wakelock_plus/wakelock_plus.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

import '../../app/book_access_guard.dart';
import '../../app/theme.dart';
import '../../core/audio/bookaria_audio_service.dart';
import '../../core/contracts/api_error.dart';
import '../../core/contracts/manifest.dart';
import '../../core/contracts/reading_events.dart';
import '../../core/contracts/scene.dart';
import '../../core/haptics/haptics_service.dart';
import '../../core/network/api_client.dart';
import '../../core/platform/bookaria_platform.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/storage/app_database.dart';
import '../../core/storage/offline_storage_paths.dart';
import '../../core/telemetry/reading_events_service.dart';
import '../offline_pack/local_asset_server.dart';
import '../offline_pack/offline_pack_manager.dart';
import '../shelf/shelf_providers.dart';
import 'ar_bridge/ar_engine_bridge.dart';
import 'widgets/quiz_prompt_sheet.dart';
import 'workflow_engine/workflow_state.dart';

class UnifiedReaderScreen extends ConsumerStatefulWidget {
  const UnifiedReaderScreen({
    super.key,
    this.slug,
    this.previewToken,
    this.initialPage,
    this.initialMode = ReaderViewMode.mode3d,
    this.parentPinVerified = false,
  }) : assert(slug != null || previewToken != null);

  final String? slug;
  final String? previewToken;
  final int? initialPage;
  final ReaderViewMode initialMode;
  final bool parentPinVerified;

  @override
  ConsumerState<UnifiedReaderScreen> createState() =>
      _UnifiedReaderScreenState();
}

class _UnifiedReaderScreenState extends ConsumerState<UnifiedReaderScreen> {
  final ArEngineBridge _arBridge = MethodChannelArEngineBridge();
  StreamSubscription<ArTrackingStatus>? _arSub;

  bool _loading = true;
  bool _kidLocked = false;
  String? _kidLockReason;
  bool _pinUnlockedLocally = false;
  String? _error;

  Manifest? _manifest;
  String? _bookVersionId;
  bool _isOffline = false;
  bool _isPreview = false;
  DateTime? _previewExpiresAt;
  OfflineStoragePaths? _paths;

  late final BookariaAudioService _audioService;
  late final ReadingEventsService _eventsService;

  late ReaderViewMode _mode;
  int _pageIndex = 0;
  bool _muted = false;
  bool _torchOn = false;
  ArTrackingStatus _arStatus = const ArTrackingStatus(isAvailable: false);
  WorkflowState? _workflow;
  late String _sessionId;
  String? _lastActionFeedback;

  WebViewController? _webController;
  String? _serverBaseUrl;
  int? _serverPort;
  Map<String, dynamic>? _pendingProgressSnapshot;
  bool _arCameraPermissionDenied = false;
  bool _webViewerReady = false;
  String? _reportDeviceId;
  String? _pendingTargetUrl;

  bool get _hasWebViewSupport => WebViewPlatform.instance != null;

  @override
  void initState() {
    super.initState();
    _audioService = ref.read(bookariaAudioServiceProvider);
    _eventsService = ref.read(readingEventsServiceProvider);
    _mode = widget.initialMode;
    _pinUnlockedLocally = widget.parentPinVerified;
    _sessionId = _eventsService.newSessionId();
    _arSub = _arBridge.statusStream.listen((status) {
      if (mounted) {
        setState(() => _arStatus = status);
      }
    });
    unawaited(_applyWakelock());
    unawaited(_loadBook());
  }

  @override
  void dispose() {
    unawaited(_disableWakelock());
    unawaited(_arSub?.cancel());
    unawaited(_arBridge.dispose());
    unawaited(_audioService.stopAll());
    unawaited(_eventsService.flushPending());
    super.dispose();
  }

  Future<void> _applyWakelock() async {
    if (!ref.read(appPreferencesProvider).keepScreenAwake) return;
    try {
      await WakelockPlus.enable();
    } catch (_) {
      // Ignore on unsupported / test platforms.
    }
  }

  Future<void> _disableWakelock() async {
    try {
      await WakelockPlus.disable();
    } catch (_) {
      // Ignore on unsupported / test platforms.
    }
  }

  Future<bool> _ensureKidModeAllowed({
    required String reason,
  }) async {
    final prefs = ref.read(appPreferencesProvider);
    if (!prefs.kidModeEnabled || _pinUnlockedLocally) {
      return true;
    }

    await Future<void>.delayed(Duration.zero);
    if (!mounted) return false;

    final verified = await BookAccessGuard.promptParentPin(
      context,
      expectedPin: prefs.kidPin,
      reason: reason,
    );
    if (verified) {
      _pinUnlockedLocally = true;
      return true;
    }

    if (mounted) {
      setState(() {
        _kidLocked = true;
        _kidLockReason = reason;
        _loading = false;
      });
    }
    return false;
  }

  Future<void> _loadBook() async {
    setState(() {
      _loading = true;
      _error = null;
      _kidLocked = false;
      _kidLockReason = null;
    });

    try {
      final db = ref.read(appDatabaseProvider);
      final api = ref.read(bookariaApiClientProvider);
      final packManager = ref.read(offlinePackManagerProvider.notifier);
      final prefs = ref.read(appPreferencesProvider);
      _paths = await ref.read(offlineStoragePathsProvider.future);

      Manifest loadedManifest;
      String? versionId;
      var offlineMode = false;
      var previewMode = false;
      DateTime? expiresAt;
      var savedStartPage = 0;

      if (widget.previewToken != null) {
        final allowed = await _ensureKidModeAllowed(
          reason:
              'Liên kết xem trước (Studio Preview) chưa kiểm duyệt độ tuổi khi bật Chế độ Trẻ em.',
        );
        if (!allowed || !mounted) return;

        final preview = await api.getPreviewManifest(widget.previewToken!);
        loadedManifest = preview.manifest;
        previewMode = true;
        expiresAt = preview.expiresAt;
      } else {
        final slug = widget.slug!;
        final offlineRecord = await db.findOfflineBookBySlug(slug);
        final localManifest = offlineRecord != null
            ? await packManager.loadLocalManifest(offlineRecord)
            : null;

        if (offlineRecord != null && localManifest != null) {
          if (!BookAccessGuard.isAgeAllowed(offlineRecord.ageMin, prefs)) {
            final allowed = await _ensureKidModeAllowed(
              reason:
                  'Sách "${offlineRecord.title}" phù hợp từ ${offlineRecord.ageMin} tuổi trở lên (giới hạn Kid Mode ≤ ${prefs.kidMaxAge} tuổi).',
            );
            if (!allowed || !mounted) return;
          }
          loadedManifest = localManifest;
          versionId = offlineRecord.versionId;
          offlineMode = true;
          savedStartPage = offlineRecord.lastPageIndex;
        } else {
          final publicBook = await api.getPublicBookBySlug(slug);
          if (!BookAccessGuard.isAgeAllowed(publicBook.ageMin, prefs)) {
            final allowed = await _ensureKidModeAllowed(
              reason:
                  'Sách "${publicBook.title}" phù hợp từ ${publicBook.ageMin} tuổi trở lên (giới hạn Kid Mode ≤ ${prefs.kidMaxAge} tuổi).',
            );
            if (!allowed || !mounted) return;
          }
          loadedManifest =
              await api.fetchManifestFromUrl(publicBook.manifestUrl);
          versionId = publicBook.version.id;
        }
      }

      final savedSnapshot = previewMode
          ? null
          : await db.loadWorkflowProgress(
              loadedManifest.bookId,
              loadedManifest.version,
            );

      final workflow = WorkflowState(
        definitions: loadedManifest.workflowVariables,
        savedSnapshot: savedSnapshot,
      );

      final pageCount = loadedManifest.pages.length;
      final requestedIndex = widget.initialPage != null
          ? (widget.initialPage! - 1).clamp(0, pageCount > 0 ? pageCount - 1 : 0)
          : savedStartPage.clamp(0, pageCount > 0 ? pageCount - 1 : 0);

      var effectiveMode = _mode;
      var cameraDenied = false;
      if (effectiveMode == ReaderViewMode.modeAr) {
        if (!loadedManifest.hasAnyArPage) {
          effectiveMode = ReaderViewMode.mode3d;
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                  'Sách này chưa có trang AR — chuyển sang chế độ 3D.',
                ),
              ),
            );
          }
        } else if (_hasWebViewSupport) {
          final granted =
              await ref.read(bookariaPlatformProvider).ensureCameraPermission();
          cameraDenied = !granted;
        }
      }

      if (!mounted) return;

      if (_hasWebViewSupport) {
        final server = await ref.read(localAssetServerProvider.future);
        String? reportId;
        try {
          reportId = await ref
              .read(readingEventsServiceProvider)
              .getOrCreateReportDeviceId();
        } catch (_) {
          // Safe fallback if secure storage is unavailable.
        }

        if (!mounted) return;
        setState(() {
          _manifest = loadedManifest;
          _bookVersionId = versionId;
          _isOffline = offlineMode;
          _isPreview = previewMode;
          _previewExpiresAt = expiresAt;
          _workflow = workflow;
          _pendingProgressSnapshot = savedSnapshot;
          _reportDeviceId = reportId;
          _pageIndex = requestedIndex;
          _mode = effectiveMode;
          _arCameraPermissionDenied = cameraDenied;
          _serverBaseUrl = server.baseUrl;
          _serverPort = server.port;
          _loading = false;
        });

        await _loadIntoWebViewer();
      } else {
        setState(() {
          _manifest = loadedManifest;
          _bookVersionId = versionId;
          _isOffline = offlineMode;
          _isPreview = previewMode;
          _previewExpiresAt = expiresAt;
          _workflow = workflow;
          _pendingProgressSnapshot = savedSnapshot;
          _pageIndex = requestedIndex;
          _mode = effectiveMode;
          _loading = false;
        });

        if (versionId != null) {
          unawaited(
            ref.read(readingEventsServiceProvider).record(
                  sessionId: _sessionId,
                  bookVersionId: versionId,
                  event: ViewerEvent.open(),
                ),
          );
        }
        await _activateCurrentPageFallback();
      }
    } on AppApiException catch (err) {
      if (!mounted) return;
      setState(() {
        _error = err.message;
        _loading = false;
      });
    } catch (err) {
      if (!mounted) return;
      setState(() {
        _error = err.toString();
        _loading = false;
      });
    }
  }

  WebViewController _ensureWebController() {
    if (_webController != null) return _webController!;

    var params = const PlatformWebViewControllerCreationParams();
    if (WebViewPlatform.instance is WebKitWebViewPlatform) {
      params = WebKitWebViewControllerCreationParams
          .fromPlatformWebViewControllerCreationParams(
        params,
        allowsInlineMediaPlayback: true,
        mediaTypesRequiringUserAction: const <PlaybackMediaTypes>{},
      );
    } else if (WebViewPlatform.instance is AndroidWebViewPlatform) {
      params = AndroidWebViewControllerCreationParams
          .fromPlatformWebViewControllerCreationParams(params);
    }

    final controller = WebViewController.fromPlatformCreationParams(
      params,
      onPermissionRequest: (request) async {
        if (request.types.contains(WebViewPermissionResourceType.camera)) {
          final granted =
              await ref.read(bookariaPlatformProvider).ensureCameraPermission();
          if (granted) {
            await request.grant();
          } else {
            await request.deny();
          }
          return;
        }
        await request.deny();
      },
    );

    if (controller.platform is AndroidWebViewController) {
      final android = controller.platform as AndroidWebViewController;
      unawaited(android.setMediaPlaybackRequiresUserGesture(false));
      unawaited(android.setMixedContentMode(MixedContentMode.alwaysAllow));
    }

    unawaited(controller.setJavaScriptMode(JavaScriptMode.unrestricted));
    unawaited(
      controller.addJavaScriptChannel(
        'BookariaMobile',
        onMessageReceived: _handleWebChannelMessage,
      ),
    );
    unawaited(
      controller.setNavigationDelegate(
        NavigationDelegate(
          onUrlChange: (change) {
            final url = change.url;
            if (url != null) {
              _syncStateFromWebUrl(url);
            }
          },
          onPageFinished: (url) {
            unawaited(_handlePageFinished(url));
          },
          onNavigationRequest: (request) => _handleNavigationRequest(request),
          onWebResourceError: (error) {
            if (error.isForMainFrame == true && mounted) {
              setState(() {
                _error = error.description;
              });
            }
          },
        ),
      ),
    );

    _webController = controller;
    return controller;
  }

  String _targetViewerUrl() {
    final baseUrl = _serverBaseUrl!;
    final manifest = _manifest!;
    final encodedTarget = widget.previewToken != null
        ? 'preview/${Uri.encodeComponent(widget.previewToken!)}'
        : 'b/${Uri.encodeComponent(widget.slug!)}';

    if (_mode == ReaderViewMode.modeAr && manifest.hasAnyArPage) {
      if (_arCameraPermissionDenied) {
        return '$baseUrl/$encodedTarget/camera';
      }
      final currentPage = _currentPage;
      if (currentPage != null && currentPage.hasAr) {
        return '$baseUrl/$encodedTarget/ar/p/${_pageIndex + 1}';
      }
      return '$baseUrl/$encodedTarget/ar';
    }

    final pageNumber =
        manifest.pages.isEmpty ? 1 : (_pageIndex + 1).clamp(1, manifest.pages.length);
    return '$baseUrl/$encodedTarget/p/$pageNumber';
  }

  Future<void> _loadIntoWebViewer() async {
    final baseUrl = _serverBaseUrl;
    if (baseUrl == null) return;

    final controller = _ensureWebController();
    _pendingTargetUrl = _targetViewerUrl();
    setState(() => _webViewerReady = false);
    await controller.loadRequest(Uri.parse('$baseUrl/__mobile_bootstrap__'));
  }

  Future<void> _handlePageFinished(String url) async {
    final uri = Uri.tryParse(url);
    final controller = _webController;
    if (uri == null || controller == null || !mounted) return;

    if (uri.path == '/__mobile_bootstrap__') {
      await _runBootstrapScript(controller);
      return;
    }

    _syncStateFromWebUrl(url);
    await _injectBridgeAndPreferences(controller);
    if (mounted && !_webViewerReady) {
      setState(() => _webViewerReady = true);
    }
  }

  Future<void> _runBootstrapScript(WebViewController controller) async {
    final prefs = ref.read(appPreferencesProvider);
    final themeValue = switch (prefs.themeMode) {
      ThemeMode.dark => 'dark',
      ThemeMode.light => 'light',
      ThemeMode.system => null,
    };

    final manifest = _manifest;
    final snapshot = _pendingProgressSnapshot;
    String? progressKey;
    String? progressValueJson;
    if (manifest != null && !_isPreview) {
      progressKey = 'bookaria:progress:v1:${manifest.bookId}:${manifest.version}';
      if (snapshot != null) {
        progressValueJson = jsonEncode({
          'version': 1,
          'values': snapshot['values'] ?? const <String, dynamic>{},
          'answers': snapshot['answers'] ?? const <String, dynamic>{},
          'counts': snapshot['counts'] ?? const <String, dynamic>{},
        });
      }
    }

    final targetUrl = _pendingTargetUrl ?? _targetViewerUrl();

    final js = '''
(function() {
  try {
    var theme = ${jsonEncode(themeValue)};
    if (theme) {
      localStorage.setItem('bookaria.theme', theme);
    } else {
      localStorage.removeItem('bookaria.theme');
    }
    var deviceId = ${jsonEncode(_reportDeviceId)};
    if (deviceId) {
      localStorage.setItem('bookaria.report-device', deviceId);
    }
    var pKey = ${jsonEncode(progressKey)};
    var pVal = ${jsonEncode(progressValueJson)};
    if (pKey) {
      if (pVal) {
        localStorage.setItem(pKey, pVal);
      } else {
        localStorage.removeItem(pKey);
      }
    }
  } catch (_) {}
  window.location.replace(${jsonEncode(targetUrl)});
})();
''';
    await controller.runJavaScript(js);
  }

  Future<void> _injectBridgeAndPreferences(WebViewController controller) async {
    final prefs = ref.read(appPreferencesProvider);
    final js = '''
(function() {
  if (!document.getElementById('bookaria-mobile-style')) {
    var style = document.createElement('style');
    style.id = 'bookaria-mobile-style';
    style.textContent =
      'html.bookaria-kid-mode #report-menu,' +
      'html.bookaria-kid-mode #published-pdf,' +
      'html.bookaria-kid-mode #external-link,' +
      'html.bookaria-kid-mode #credits a { display: none !important; }';
    (document.head || document.documentElement).appendChild(style);
  }
  document.documentElement.classList.toggle('bookaria-kid-mode', ${jsonEncode(prefs.kidModeEnabled)});

  if (!window.__bookariaMobileBridgeInstalled) {
    window.__bookariaMobileBridgeInstalled = true;

    var origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(k, v) {
      origSetItem.call(this, k, v);
      if (this === window.localStorage && typeof k === 'string' && k.indexOf('bookaria:progress:v1:') === 0) {
        try {
          window.BookariaMobile && window.BookariaMobile.postMessage(JSON.stringify({
            type: 'progressSave',
            key: k,
            value: String(v)
          }));
        } catch (_) {}
      }
    };

    var origRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function(k) {
      origRemoveItem.call(this, k);
      if (this === window.localStorage && typeof k === 'string' && k.indexOf('bookaria:progress:v1:') === 0) {
        try {
          window.BookariaMobile && window.BookariaMobile.postMessage(JSON.stringify({
            type: 'progressClear',
            key: k
          }));
        } catch (_) {}
      }
    };

    var notifyRoute = function() {
      try {
        var mainEl = document.getElementById('main');
        window.BookariaMobile && window.BookariaMobile.postMessage(JSON.stringify({
          type: 'routeChange',
          pathname: location.pathname,
          view: (mainEl && mainEl.dataset && mainEl.dataset.view) || '',
          pageIndex: (mainEl && mainEl.dataset && mainEl.dataset.pageIndex) || ''
        }));
      } catch (_) {}
    };

    var origPush = history.pushState;
    history.pushState = function() {
      var res = origPush.apply(this, arguments);
      setTimeout(notifyRoute, 0);
      return res;
    };

    var origReplace = history.replaceState;
    history.replaceState = function() {
      var res = origReplace.apply(this, arguments);
      setTimeout(notifyRoute, 0);
      return res;
    };

    window.addEventListener('popstate', notifyRoute);

    document.addEventListener('click', function(ev) {
      var target = ev.target;
      var anchor = target && target.closest ? target.closest('a[href]') : null;
      if (!anchor) return;
      var href = anchor.href || '';
      if (href.indexOf(location.origin) !== 0 && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
        ev.preventDefault();
        try {
          window.BookariaMobile && window.BookariaMobile.postMessage(JSON.stringify({
            type: 'externalUrl',
            url: href
          }));
        } catch (_) {}
      }
    }, true);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && !window.__bookariaCameraWrapped) {
      window.__bookariaCameraWrapped = true;
      var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = async function(constraints) {
        var stream = await origGetUserMedia(constraints);
        var mainEl = document.getElementById('main');
        if (mainEl && mainEl.dataset.view === 'camera-access') {
          setTimeout(function() {
            var currentMain = document.getElementById('main');
            if (currentMain && currentMain.dataset.view === 'camera-access' && currentMain.dataset.cameraPermission === 'requesting') {
              try {
                stream.getTracks().forEach(function(track) { track.stop(); });
              } catch (_) {}
              try {
                window.BookariaMobile && window.BookariaMobile.postMessage(JSON.stringify({
                  type: 'cameraAllowedNavigateAr'
                }));
              } catch (_) {}
            }
          }, 250);
        }
        return stream;
      };
    }
  }
})();
''';
    try {
      await controller.runJavaScript(js);
    } catch (_) {
      // Ignore transient navigation race on dispose/reload.
    }
  }

  Future<void> _applyPreferencesLiveToWebView(AppPreferencesState prefs) async {
    final controller = _webController;
    if (controller == null || !_hasWebViewSupport) return;

    final themeValue = switch (prefs.themeMode) {
      ThemeMode.dark => 'dark',
      ThemeMode.light => 'light',
      ThemeMode.system => null,
    };

    final js = '''
(function() {
  try {
    var theme = ${jsonEncode(themeValue)};
    if (theme) {
      localStorage.setItem('bookaria.theme', theme);
    } else {
      localStorage.removeItem('bookaria.theme');
    }
    window.dispatchEvent(new Event('storage'));
    document.documentElement.classList.toggle('bookaria-kid-mode', ${jsonEncode(prefs.kidModeEnabled)});
  } catch (_) {}
})();
''';
    try {
      await controller.runJavaScript(js);
    } catch (_) {
      // Ignore if page is currently navigating.
    }
  }

  void _handleWebChannelMessage(JavaScriptMessage message) {
    Map<String, dynamic> payload;
    try {
      final decoded = jsonDecode(message.message);
      if (decoded is! Map<String, dynamic>) return;
      payload = decoded;
    } catch (_) {
      return;
    }

    final type = payload['type'];
    if (type == 'progressSave') {
      final rawJson = payload['value'];
      final manifest = _manifest;
      if (rawJson is String && manifest != null && !_isPreview) {
        try {
          final snapshot = jsonDecode(rawJson);
          if (snapshot is Map<String, dynamic>) {
            _pendingProgressSnapshot = snapshot;
            unawaited(
              ref.read(appDatabaseProvider).saveWorkflowProgress(
                    bookId: manifest.bookId,
                    versionNo: manifest.version,
                    snapshot: snapshot,
                  ),
            );
          }
        } catch (_) {
          // Ignore malformed storage snapshot.
        }
      }
    } else if (type == 'progressClear') {
      final manifest = _manifest;
      if (manifest != null && !_isPreview) {
        final emptySnapshot =
            WorkflowState(definitions: manifest.workflowVariables).snapshot();
        _pendingProgressSnapshot = emptySnapshot;
        unawaited(
          ref.read(appDatabaseProvider).saveWorkflowProgress(
                bookId: manifest.bookId,
                versionNo: manifest.version,
                snapshot: emptySnapshot,
              ),
        );
      }
    } else if (type == 'routeChange') {
      final path = payload['pathname'];
      if (path is String) {
        _syncStateFromWebPath(path);
      }
    } else if (type == 'cameraAllowedNavigateAr') {
      unawaited(_handleCameraAllowedFromWeb());
    } else if (type == 'externalUrl') {
      final url = payload['url'];
      if (url is String) {
        unawaited(_openExternalUrlGuarded(url));
      }
    }
  }

  Future<void> _handleCameraAllowedFromWeb() async {
    final manifest = _manifest;
    final baseUrl = _serverBaseUrl;
    final controller = _webController;
    if (manifest == null || baseUrl == null || controller == null) return;

    final granted =
        await ref.read(bookariaPlatformProvider).ensureCameraPermission();
    if (!mounted) return;
    if (!granted) {
      setState(() => _arCameraPermissionDenied = true);
      return;
    }
    setState(() {
      _mode = ReaderViewMode.modeAr;
      _arCameraPermissionDenied = false;
    });
    await controller.loadRequest(Uri.parse(_targetViewerUrl()));
  }

  Future<void> _openExternalUrlGuarded(String rawUrl) async {
    final uri = Uri.tryParse(rawUrl);
    if (uri == null || (uri.scheme != 'http' && uri.scheme != 'https')) return;

    if (ref.read(appPreferencesProvider).kidModeEnabled) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Chế độ Trẻ em không cho phép mở liên kết ngoài.'),
          ),
        );
      }
      return;
    }

    try {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } catch (_) {
      // Ignore launch failures on devices without browser.
    }
  }

  FutureOr<NavigationDecision> _handleNavigationRequest(
    NavigationRequest request,
  ) async {
    final uri = Uri.tryParse(request.url);
    if (uri == null) return NavigationDecision.prevent;

    if (uri.scheme == 'about' ||
        uri.scheme == 'blob' ||
        uri.scheme == 'data') {
      return NavigationDecision.navigate;
    }

    final isLoopbackOrigin =
        (uri.host == '127.0.0.1' || uri.host == 'localhost') &&
            uri.port == _serverPort;
    if (isLoopbackOrigin) {
      return NavigationDecision.navigate;
    }

    if (!request.isMainFrame) {
      return NavigationDecision.navigate;
    }

    if (uri.scheme == 'http' || uri.scheme == 'https') {
      await _openExternalUrlGuarded(request.url);
      return NavigationDecision.prevent;
    }

    return NavigationDecision.prevent;
  }

  void _syncStateFromWebUrl(String rawUrl) {
    final uri = Uri.tryParse(rawUrl);
    if (uri == null) return;
    _syncStateFromWebPath(uri.path);
  }

  void _syncStateFromWebPath(String path) {
    if (!mounted || path == '/__mobile_bootstrap__') return;
    final segments = Uri(path: path).pathSegments.where((s) => s.isNotEmpty).toList();
    if (segments.length < 2) return;
    if (segments[0] != 'b' && segments[0] != 'preview') return;

    final tail = segments.sublist(2);
    var nextMode = _mode;
    int? nextPageIndex;

    if (tail.isEmpty || (tail.length == 1 && tail[0] == 'read')) {
      nextMode = ReaderViewMode.mode3d;
    } else if (tail.length == 2 && tail[0] == 'p') {
      nextMode = ReaderViewMode.mode3d;
      final pageNum = int.tryParse(tail[1]);
      if (pageNum != null && pageNum > 0) {
        nextPageIndex = pageNum - 1;
      }
    } else if (tail.length == 1 && (tail[0] == 'ar' || tail[0] == 'camera')) {
      nextMode = ReaderViewMode.modeAr;
    } else if (tail.length == 3 && tail[0] == 'ar' && tail[1] == 'p') {
      nextMode = ReaderViewMode.modeAr;
      final pageNum = int.tryParse(tail[2]);
      if (pageNum != null && pageNum > 0) {
        nextPageIndex = pageNum - 1;
      }
    }

    final pageCount = _manifest?.pages.length ?? 0;
    final clampedPage = nextPageIndex != null && pageCount > 0
        ? nextPageIndex.clamp(0, pageCount - 1)
        : null;

    if (nextMode != _mode || (clampedPage != null && clampedPage != _pageIndex)) {
      setState(() {
        _mode = nextMode;
        if (clampedPage != null) {
          _pageIndex = clampedPage;
        }
      });
    }

    if (clampedPage != null && widget.slug != null && !_isPreview) {
      unawaited(
        ref.read(appDatabaseProvider).updateLastPage(widget.slug!, clampedPage),
      );
      ref.invalidate(shelfBooksProvider);
    }
  }

  ManifestPage? get _currentPage {
    final manifest = _manifest;
    if (manifest == null || manifest.pages.isEmpty) return null;
    if (_pageIndex < 0 || _pageIndex >= manifest.pages.length) return null;
    return manifest.pages[_pageIndex];
  }

  Future<void> _activateCurrentPageFallback() async {
    final manifest = _manifest;
    final page = _currentPage;
    if (manifest == null || page == null) return;

    if (widget.slug != null && !_isPreview) {
      unawaited(
        ref.read(appDatabaseProvider).updateLastPage(widget.slug!, _pageIndex),
      );
      ref.invalidate(shelfBooksProvider);
    }

    if (_bookVersionId != null) {
      unawaited(
        ref.read(readingEventsServiceProvider).record(
              sessionId: _sessionId,
              bookVersionId: _bookVersionId!,
              event: ViewerEvent.pageFound(pageId: page.pageId),
            ),
      );
    }

    unawaited(
      _arBridge.loadPage(
        manifest: manifest,
        page: page,
        localAssetsRootDir: _paths?.sharedAssetsDir.path ?? '',
        mode: _mode,
      ),
    );

    await _syncPageAudio(manifest, page);
  }

  Future<void> _syncPageAudio(Manifest manifest, ManifestPage page) async {
    final audio = ref.read(bookariaAudioServiceProvider);
    await audio.stopAll();
    if (_muted || !ref.read(appPreferencesProvider).autoplayAudio) return;

    final bgmId = page.settings.backgroundAudioAssetId;
    if (bgmId != null && manifest.assets.containsKey(bgmId)) {
      final resolved = _resolveAssetSource(manifest, bgmId);
      if (resolved != null) {
        try {
          await audio.playBackground(
            source: resolved.source,
            isLocalFile: resolved.isLocalFile,
            loop: page.settings.backgroundLoop,
          );
        } catch (_) {
          // Ignore audio decode/network failure in preview/headless envs.
        }
      }
    }

    final voiceId = page.settings.narrationAssetId;
    if (voiceId != null && manifest.assets.containsKey(voiceId)) {
      final resolved = _resolveAssetSource(manifest, voiceId);
      if (resolved != null) {
        try {
          await audio.playNarration(
            source: resolved.source,
            isLocalFile: resolved.isLocalFile,
          );
        } catch (_) {
          // Ignore narration playback failure.
        }
      }
    }
  }

  ({String source, bool isLocalFile})? _resolveAssetSource(
    Manifest manifest,
    String assetId,
  ) {
    final asset = manifest.assets[assetId];
    if (asset == null) return null;
    if (_paths != null) {
      final localFile = _paths!.sharedAssetFile(assetId, asset.url);
      if (localFile.existsSync()) {
        return (source: localFile.path, isLocalFile: true);
      }
    }
    return (source: asset.url, isLocalFile: false);
  }

  Future<void> _goToPage(int nextIndex) async {
    final manifest = _manifest;
    if (manifest == null) return;
    if (nextIndex < 0 || nextIndex >= manifest.pages.length) return;
    setState(() {
      _pageIndex = nextIndex;
      _lastActionFeedback = null;
    });
    unawaited(ref.read(hapticsServiceProvider).selection());
    await _activateCurrentPageFallback();
  }

  Future<void> _switchMode(ReaderViewMode nextMode) async {
    if (_mode == nextMode) return;
    final manifest = _manifest;
    if (manifest == null) return;

    if (nextMode == ReaderViewMode.modeAr && !manifest.hasAnyArPage) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Sách này chưa có marker AR cho máy ảnh.'),
          ),
        );
      }
      return;
    }

    if (_hasWebViewSupport && _webController != null && _serverBaseUrl != null) {
      var cameraDenied = false;
      if (nextMode == ReaderViewMode.modeAr) {
        final granted =
            await ref.read(bookariaPlatformProvider).ensureCameraPermission();
        cameraDenied = !granted;
      }
      if (!mounted) return;
      setState(() {
        _mode = nextMode;
        _arCameraPermissionDenied = cameraDenied;
      });
      unawaited(ref.read(hapticsServiceProvider).selection());
      await _webController!.loadRequest(Uri.parse(_targetViewerUrl()));
      return;
    }

    setState(() => _mode = nextMode);
    unawaited(ref.read(hapticsServiceProvider).selection());
    await _activateCurrentPageFallback();
  }

  Future<void> _toggleMute() async {
    final nextMuted = !_muted;
    setState(() => _muted = nextMuted);
    await ref.read(bookariaAudioServiceProvider).setMuted(nextMuted);
    if (!nextMuted && _manifest != null && _currentPage != null) {
      await _syncPageAudio(_manifest!, _currentPage!);
    }
  }

  Future<void> _resetWorkflowProgress() async {
    final manifest = _manifest;
    if (manifest == null) return;

    _workflow?.reset();
    final resetSnapshot =
        _workflow?.snapshot() ??
        WorkflowState(definitions: manifest.workflowVariables).snapshot();
    _pendingProgressSnapshot = null;

    if (!_isPreview) {
      await ref.read(appDatabaseProvider).saveWorkflowProgress(
            bookId: manifest.bookId,
            versionNo: manifest.version,
            snapshot: resetSnapshot,
          );
    }

    if (_hasWebViewSupport && _webController != null && _serverBaseUrl != null) {
      await _loadIntoWebViewer();
      return;
    }

    if (mounted) {
      setState(() => _lastActionFeedback = 'Đã đặt lại tiến trình đọc.');
    }
  }

  Future<void> _onTapSceneObject(SceneObject obj) async {
    final manifest = _manifest;
    final page = _currentPage;
    final workflow = _workflow;
    if (manifest == null || page == null || workflow == null) return;

    unawaited(ref.read(hapticsServiceProvider).light());
    unawaited(_arBridge.tapObject(obj.id));
    workflow.tap(page.pageId, obj.id);

    if (_bookVersionId != null) {
      unawaited(
        ref.read(readingEventsServiceProvider).record(
              sessionId: _sessionId,
              bookVersionId: _bookVersionId!,
              event: ViewerEvent.tap(pageId: page.pageId, objectId: obj.id),
            ),
      );
    }

    final matchingRules = page.scene.interactions.where(
      (r) =>
          r.enabled &&
          r.triggerType == 'onTap' &&
          r.triggerObjectId == obj.id,
    );

    String feedback = 'Đã chạm: ${obj.name ?? obj.id}';
    for (final rule in matchingRules) {
      for (final action in rule.actions) {
        final type = action['type'] as String? ?? '';
        if (type == 'askQuestion' &&
            action['question'] is Map<String, dynamic>) {
          final question = WorkflowQuestion.fromJson(
            action['question'] as Map<String, dynamic>,
          );
          if (!mounted) return;
          final chosenId = await QuizPromptSheet.show(context, question);
          if (chosenId != null) {
            final isCorrect = chosenId == question.correctChoiceId;
            workflow.answer(
              question.questionId,
              WorkflowAnswer(choiceId: chosenId, correct: isCorrect),
            );
            feedback = isCorrect
                ? 'Chính xác! Đã ghi nhận câu trả lời.'
                : 'Chưa đúng rồi, thử lại nhé!';
          }
        } else if (type == 'setState' || type == 'setVariable') {
          final key = action['key'] as String?;
          final op = action['operation'] as String? ?? 'set';
          final value = action['value'] as Object?;
          if (key != null && value != null) {
            workflow.set(key: key, operation: op, value: value);
            feedback = 'Cập nhật "$key" = ${workflow.values[key]}';
          }
        } else if (type == 'showMessage' && action['text'] is String) {
          feedback = action['text'] as String;
        }
      }
    }

    if (!_isPreview) {
      await ref.read(appDatabaseProvider).saveWorkflowProgress(
            bookId: manifest.bookId,
            versionNo: manifest.version,
            snapshot: workflow.snapshot(),
          );
    }

    if (mounted) {
      setState(() => _lastActionFeedback = feedback);
    }
  }

  Future<void> _openReportDialog() async {
    final slug = widget.slug;
    if (slug == null) return;
    ReportReason selected = ReportReason.inappropriate;
    final noteController = TextEditingController();

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        return StatefulBuilder(
          builder: (context, setDialogState) => AlertDialog(
            title: const Text('Báo cáo nội dung'),
            content: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  RadioGroup<ReportReason>(
                    groupValue: selected,
                    onChanged: (val) {
                      if (val != null) {
                        setDialogState(() => selected = val);
                      }
                    },
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        for (final reason in ReportReason.values)
                          RadioListTile<ReportReason>(
                            contentPadding: EdgeInsets.zero,
                            value: reason,
                            title: Text(reason.labelVi),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: noteController,
                    maxLines: 3,
                    maxLength: 500,
                    decoration: const InputDecoration(
                      labelText: 'Ghi chú thêm (không bắt buộc)',
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(false),
                child: const Text('Hủy'),
              ),
              FilledButton(
                onPressed: () => Navigator.of(dialogContext).pop(true),
                child: const Text('Gửi báo cáo'),
              ),
            ],
          ),
        );
      },
    );

    final note = noteController.text;
    noteController.dispose();

    if (confirmed != true) return;
    try {
      final eventsService = ref.read(readingEventsServiceProvider);
      final deviceId = await eventsService.getOrCreateReportDeviceId();
      await ref.read(bookariaApiClientProvider).reportBook(
            slug,
            ReportBookBody(
              reason: selected,
              note: note,
              pageId: _currentPage?.pageId,
              deviceId: deviceId,
            ),
          );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Cảm ơn bạn! Báo cáo đã được gửi.')),
        );
      }
    } catch (err) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Không gửi được báo cáo: $err')),
        );
      }
    }
  }

  Widget _buildStatusBadge(BookariaTokens tokens) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: _isOffline
            ? tokens.statusSuccessBg
            : _isPreview
                ? tokens.statusWarningBg
                : tokens.bgSurfaceSubtle,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        _isOffline
            ? 'Offline'
            : _isPreview
                ? 'Preview'
                : 'Online',
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: _isOffline
              ? tokens.statusSuccessText
              : _isPreview
                  ? tokens.statusWarningText
                  : tokens.textMuted,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<AppPreferencesState>(appPreferencesProvider, (previous, next) {
      if (previous?.themeMode != next.themeMode ||
          previous?.kidModeEnabled != next.kidModeEnabled) {
        unawaited(_applyPreferencesLiveToWebView(next));
      }
    });

    final prefs = ref.watch(appPreferencesProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final page = _currentPage;
    final manifest = _manifest;
    final usingWebView = _hasWebViewSupport && _webController != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(manifest?.title ?? 'Bookaria Reader'),
        actions: [
          if (!usingWebView)
            IconButton(
              tooltip: _muted ? 'Bật âm thanh' : 'Tắt âm thanh',
              onPressed: () => unawaited(_toggleMute()),
              icon: Icon(
                _muted ? Icons.volume_off_rounded : Icons.volume_up_rounded,
              ),
            ),
          if (!usingWebView && _mode == ReaderViewMode.modeAr)
            IconButton(
              tooltip: _torchOn ? 'Tắt đèn pin' : 'Bật đèn pin',
              onPressed: () async {
                final next = !_torchOn;
                setState(() => _torchOn = next);
                await _arBridge.setTorchEnabled(next);
              },
              icon: Icon(
                _torchOn ? Icons.flash_on_rounded : Icons.flash_off_rounded,
              ),
            ),
          if (manifest != null)
            PopupMenuButton<String>(
              onSelected: (value) async {
                if (value == 'reload') {
                  await _loadIntoWebViewer();
                } else if (value == 'reset') {
                  await _resetWorkflowProgress();
                } else if (value == 'report') {
                  await _openReportDialog();
                }
              },
              itemBuilder: (_) => [
                if (usingWebView)
                  const PopupMenuItem(
                    value: 'reload',
                    child: Text('Tải lại trình đọc'),
                  ),
                const PopupMenuItem(
                  value: 'reset',
                  child: Text('Đặt lại tiến trình câu hỏi'),
                ),
                if (!prefs.kidModeEnabled && widget.slug != null && !_isPreview)
                  const PopupMenuItem(
                    value: 'report',
                    child: Text('Báo cáo nội dung'),
                  ),
              ],
            ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _kidLocked
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.child_care_rounded,
                          size: 56,
                          color: tokens.statusWarningText,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Đã khóa bởi Chế độ Trẻ em',
                          style: Theme.of(context).textTheme.titleMedium,
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _kidLockReason ??
                              'Cần xác nhận mã PIN phụ huynh để mở sách này.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: tokens.textMuted),
                        ),
                        const SizedBox(height: 20),
                        FilledButton.icon(
                          onPressed: () => unawaited(_loadBook()),
                          icon: const Icon(Icons.lock_open_rounded),
                          label: const Text('Mở bằng mã PIN phụ huynh'),
                        ),
                        const SizedBox(height: 8),
                        TextButton(
                          onPressed: () {
                            if (context.canPop()) {
                              context.pop();
                            } else {
                              context.go('/explore');
                            }
                          },
                          child: const Text('Quay lại'),
                        ),
                      ],
                    ),
                  ),
                )
              : _error != null
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(_error!, textAlign: TextAlign.center),
                            const SizedBox(height: 16),
                            FilledButton(
                              onPressed: () => unawaited(_loadBook()),
                              child: const Text('Thử lại'),
                            ),
                          ],
                        ),
                      ),
                    )
                  : manifest == null || page == null
                      ? const Center(child: Text('Sách chưa có trang nào.'))
                      : usingWebView
                          ? Column(
                              children: [
                                Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(16, 8, 16, 8),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: SegmentedButton<ReaderViewMode>(
                                          segments: [
                                            const ButtonSegment(
                                              value: ReaderViewMode.mode3d,
                                              label: Text('3D'),
                                            ),
                                            if (manifest.hasAnyArPage)
                                              const ButtonSegment(
                                                value: ReaderViewMode.modeAr,
                                                label: Text('AR'),
                                              ),
                                          ],
                                          selected: {
                                            _mode == ReaderViewMode.modeAr &&
                                                    manifest.hasAnyArPage
                                                ? ReaderViewMode.modeAr
                                                : ReaderViewMode.mode3d,
                                          },
                                          onSelectionChanged: (sel) =>
                                              unawaited(_switchMode(sel.first)),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      _buildStatusBadge(tokens),
                                    ],
                                  ),
                                ),
                                if (_previewExpiresAt != null)
                                  Padding(
                                    padding: const EdgeInsets.fromLTRB(
                                      16,
                                      0,
                                      16,
                                      6,
                                    ),
                                    child: Text(
                                      'Liên kết Preview hết hạn lúc: ${_previewExpiresAt!.toLocal()}',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodySmall
                                          ?.copyWith(
                                            color: tokens.statusWarningText,
                                          ),
                                    ),
                                  ),
                                Expanded(
                                  child: SafeArea(
                                    top: false,
                                    child: Stack(
                                      fit: StackFit.expand,
                                      children: [
                                        WebViewWidget(
                                          controller: _webController!,
                                        ),
                                        if (!_webViewerReady)
                                          ColoredBox(
                                            color: Theme.of(context)
                                                .scaffoldBackgroundColor,
                                            child: const Center(
                                              child:
                                                  CircularProgressIndicator(),
                                            ),
                                          ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            )
                          : Column(
                              children: [
                                Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(16, 8, 16, 8),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: SegmentedButton<ReaderViewMode>(
                                          segments: [
                                            for (final mode
                                                in ReaderViewMode.values)
                                              ButtonSegment(
                                                value: mode,
                                                label: Text(mode.label),
                                              ),
                                          ],
                                          selected: {_mode},
                                          onSelectionChanged: (sel) =>
                                              unawaited(_switchMode(sel.first)),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      _buildStatusBadge(tokens),
                                    ],
                                  ),
                                ),
                                if (_previewExpiresAt != null)
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 16,
                                    ),
                                    child: Text(
                                      'Liên kết Preview hết hạn lúc: ${_previewExpiresAt!.toLocal()}',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodySmall
                                          ?.copyWith(
                                            color: tokens.statusWarningText,
                                          ),
                                    ),
                                  ),
                                Expanded(
                                  child: SingleChildScrollView(
                                    padding:
                                        const EdgeInsets.fromLTRB(16, 4, 16, 16),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.stretch,
                                      children: [
                                        _ReaderStageCard(
                                          manifest: manifest,
                                          page: page,
                                          mode: _mode,
                                          paths: _paths,
                                          arStatus: _arStatus,
                                        ),
                                        if (_lastActionFeedback != null) ...[
                                          const SizedBox(height: 10),
                                          Container(
                                            padding: const EdgeInsets.all(12),
                                            decoration: BoxDecoration(
                                              color: tokens.statusSuccessBg,
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                            ),
                                            child: Text(
                                              _lastActionFeedback!,
                                              style: TextStyle(
                                                color: tokens.statusSuccessText,
                                                fontWeight: FontWeight.w500,
                                              ),
                                            ),
                                          ),
                                        ],
                                        if (_workflow != null &&
                                            _workflow!.values.isNotEmpty) ...[
                                          const SizedBox(height: 12),
                                          Wrap(
                                            spacing: 8,
                                            runSpacing: 6,
                                            children: _workflow!.values.entries
                                                .map(
                                                  (e) => Chip(
                                                    label: Text(
                                                      '${e.key}: ${e.value}',
                                                    ),
                                                  ),
                                                )
                                                .toList(),
                                          ),
                                        ],
                                        const SizedBox(height: 12),
                                        Text(
                                          'Vật thể tương tác trên trang (${page.scene.objects.length})',
                                          style: Theme.of(context)
                                              .textTheme
                                              .titleSmall,
                                        ),
                                        const SizedBox(height: 8),
                                        if (page.scene.objects.isEmpty)
                                          Text(
                                            'Trang này chưa có vật thể 3D/tương tác.',
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodySmall
                                                ?.copyWith(
                                                  color: tokens.textMuted,
                                                ),
                                          )
                                        else
                                          Wrap(
                                            spacing: 8,
                                            runSpacing: 8,
                                            children:
                                                page.scene.objects.map((obj) {
                                              return ActionChip(
                                                avatar: Icon(
                                                  obj.type.toLowerCase() ==
                                                          'model'
                                                      ? Icons.view_in_ar_rounded
                                                      : Icons.touch_app_outlined,
                                                  size: 16,
                                                ),
                                                label: Text(obj.name ?? obj.id),
                                                onPressed: () => unawaited(
                                                  _onTapSceneObject(obj),
                                                ),
                                              );
                                            }).toList(),
                                          ),
                                      ],
                                    ),
                                  ),
                                ),
                                SafeArea(
                                  top: false,
                                  child: Container(
                                    padding: const EdgeInsets.fromLTRB(
                                      12,
                                      8,
                                      12,
                                      12,
                                    ),
                                    decoration: BoxDecoration(
                                      color: tokens.bgSurface,
                                      border: Border(
                                        top: BorderSide(
                                          color: tokens.borderDefault,
                                        ),
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        IconButton.outlined(
                                          tooltip: 'Trang trước',
                                          onPressed: _pageIndex > 0
                                              ? () => unawaited(
                                                    _goToPage(_pageIndex - 1),
                                                  )
                                              : null,
                                          icon: const Icon(
                                            Icons.chevron_left_rounded,
                                          ),
                                        ),
                                        Expanded(
                                          child: Text(
                                            'Trang ${_pageIndex + 1} / ${manifest.pages.length}'
                                            '${page.title != null ? ' • ${page.title}' : ''}',
                                            textAlign: TextAlign.center,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleSmall,
                                          ),
                                        ),
                                        IconButton.outlined(
                                          tooltip: 'Trang sau',
                                          onPressed: _pageIndex <
                                                  manifest.pages.length - 1
                                              ? () => unawaited(
                                                    _goToPage(_pageIndex + 1),
                                                  )
                                              : null,
                                          icon: const Icon(
                                            Icons.chevron_right_rounded,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
    );
  }
}

class _ReaderStageCard extends StatelessWidget {
  const _ReaderStageCard({
    required this.manifest,
    required this.page,
    required this.mode,
    required this.paths,
    required this.arStatus,
  });

  final Manifest manifest;
  final ManifestPage page;
  final ReaderViewMode mode;
  final OfflineStoragePaths? paths;
  final ArTrackingStatus arStatus;

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final localPageFile = paths?.pageImageFile(
      manifest.bookId,
      manifest.version,
      page.pageId,
    );
    final hasLocalImage =
        localPageFile != null && localPageFile.existsSync();

    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          AspectRatio(
            aspectRatio: page.aspect.clamp(0.5, 2.0),
            child: Stack(
              fit: StackFit.expand,
              children: [
                hasLocalImage
                    ? Image.file(localPageFile, fit: BoxFit.contain)
                    : Image.network(
                        page.imageUrl,
                        fit: BoxFit.contain,
                        errorBuilder: (_, _, _) => Center(
                          child: Icon(
                            Icons.menu_book_outlined,
                            size: 48,
                            color: tokens.textMuted,
                          ),
                        ),
                      ),
                Positioned(
                  top: 10,
                  left: 10,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '${mode.label} • ${manifest.pageWidthMm.toStringAsFixed(0)}mm • '
                      '${page.marker.mode.wireName}'
                      '${page.marker.number != null ? ' #${page.marker.number}' : ''}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          if (arStatus.statusMessage != null || mode != ReaderViewMode.mode3d)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: tokens.bgSurfaceSubtle,
              child: Text(
                arStatus.statusMessage ??
                    (mode == ReaderViewMode.modeAr
                        ? 'Đưa camera hướng về trang sách thật để bám AR.'
                        : 'Chạm vào mặt phẳng bàn để đặt mô hình 3D tỷ lệ thật (Tabletop).'),
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: tokens.textMuted,
                    ),
              ),
            ),
        ],
      ),
    );
  }
}
