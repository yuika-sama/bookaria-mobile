import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import '../../app/theme.dart';
import '../../core/audio/bookaria_audio_service.dart';
import '../../core/contracts/manifest.dart';
import '../../core/contracts/reading_events.dart';
import '../../core/contracts/scene.dart';
import '../../core/haptics/haptics_service.dart';
import '../../core/network/api_client.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/storage/app_database.dart';
import '../../core/storage/offline_storage_paths.dart';
import '../../core/telemetry/reading_events_service.dart';
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
  }) : assert(slug != null || previewToken != null);

  final String? slug;
  final String? previewToken;
  final int? initialPage;
  final ReaderViewMode initialMode;

  @override
  ConsumerState<UnifiedReaderScreen> createState() =>
      _UnifiedReaderScreenState();
}

class _UnifiedReaderScreenState extends ConsumerState<UnifiedReaderScreen> {
  final ArEngineBridge _arBridge = MethodChannelArEngineBridge();
  StreamSubscription<ArTrackingStatus>? _arSub;

  bool _loading = true;
  String? _error;
  Manifest? _manifest;
  String? _bookVersionId;
  bool _isOffline = false;
  bool _isPreview = false;
  DateTime? _previewExpiresAt;
  OfflineStoragePaths? _paths;

  late ReaderViewMode _mode;
  int _pageIndex = 0;
  bool _muted = false;
  bool _torchOn = false;
  ArTrackingStatus _arStatus = const ArTrackingStatus(isAvailable: false);
  WorkflowState? _workflow;
  late String _sessionId;
  String? _lastActionFeedback;

  @override
  void initState() {
    super.initState();
    _mode = widget.initialMode;
    _sessionId = ref.read(readingEventsServiceProvider).newSessionId();
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
    unawaited(ref.read(bookariaAudioServiceProvider).stopAll());
    unawaited(ref.read(readingEventsServiceProvider).flushPending());
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

  Future<void> _loadBook() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final db = ref.read(appDatabaseProvider);
      final api = ref.read(bookariaApiClientProvider);
      final packManager = ref.read(offlinePackManagerProvider.notifier);
      _paths = await ref.read(offlineStoragePathsProvider.future);

      Manifest loadedManifest;
      String? versionId;
      var offlineMode = false;
      var previewMode = false;
      DateTime? expiresAt;
      var savedStartPage = 0;

      if (widget.previewToken != null) {
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
          loadedManifest = localManifest;
          versionId = offlineRecord.versionId;
          offlineMode = true;
          savedStartPage = offlineRecord.lastPageIndex;
        } else {
          final publicBook = await api.getPublicBookBySlug(slug);
          loadedManifest = await api.fetchManifestFromUrl(publicBook.manifestUrl);
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

      if (!mounted) return;
      setState(() {
        _manifest = loadedManifest;
        _bookVersionId = versionId;
        _isOffline = offlineMode;
        _isPreview = previewMode;
        _previewExpiresAt = expiresAt;
        _workflow = workflow;
        _pageIndex = requestedIndex;
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

      await _activateCurrentPage();
    } catch (err) {
      if (!mounted) return;
      setState(() {
        _error = err.toString();
        _loading = false;
      });
    }
  }

  ManifestPage? get _currentPage {
    final manifest = _manifest;
    if (manifest == null || manifest.pages.isEmpty) return null;
    if (_pageIndex < 0 || _pageIndex >= manifest.pages.length) return null;
    return manifest.pages[_pageIndex];
  }

  Future<void> _activateCurrentPage() async {
    final manifest = _manifest;
    final page = _currentPage;
    if (manifest == null || page == null) return;

    if (widget.slug != null && !_isPreview) {
      unawaited(ref.read(appDatabaseProvider).updateLastPage(widget.slug!, _pageIndex));
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

    await _arBridge.loadPage(
      manifest: manifest,
      page: page,
      localAssetsRootDir: _paths?.sharedAssetsDir.path ?? '',
      mode: _mode,
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
    await ref.read(hapticsServiceProvider).selection();
    await _activateCurrentPage();
  }

  Future<void> _switchMode(ReaderViewMode nextMode) async {
    if (_mode == nextMode) return;
    setState(() => _mode = nextMode);
    await ref.read(hapticsServiceProvider).selection();
    await _activateCurrentPage();
  }

  Future<void> _toggleMute() async {
    final nextMuted = !_muted;
    setState(() => _muted = nextMuted);
    await ref.read(bookariaAudioServiceProvider).setMuted(nextMuted);
    if (!nextMuted && _manifest != null && _currentPage != null) {
      await _syncPageAudio(_manifest!, _currentPage!);
    }
  }

  Future<void> _onTapSceneObject(SceneObject obj) async {
    final manifest = _manifest;
    final page = _currentPage;
    final workflow = _workflow;
    if (manifest == null || page == null || workflow == null) return;

    await ref.read(hapticsServiceProvider).light();
    await _arBridge.tapObject(obj.id);
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
        if (type == 'askQuestion' && action['question'] is Map<String, dynamic>) {
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
        } else if (type == 'setVariable') {
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

  @override
  Widget build(BuildContext context) {
    final prefs = ref.watch(appPreferencesProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final page = _currentPage;
    final manifest = _manifest;

    return Scaffold(
      appBar: AppBar(
        title: Text(manifest?.title ?? 'Bookaria Reader'),
        actions: [
          IconButton(
            tooltip: _muted ? 'Bật âm thanh' : 'Tắt âm thanh',
            onPressed: () => unawaited(_toggleMute()),
            icon: Icon(
              _muted ? Icons.volume_off_rounded : Icons.volume_up_rounded,
            ),
          ),
          if (_mode == ReaderViewMode.modeAr)
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
          PopupMenuButton<String>(
            onSelected: (value) async {
              if (value == 'reset') {
                _workflow?.reset();
                if (manifest != null && !_isPreview) {
                  await ref.read(appDatabaseProvider).saveWorkflowProgress(
                        bookId: manifest.bookId,
                        versionNo: manifest.version,
                        snapshot: _workflow!.snapshot(),
                      );
                }
                if (mounted) {
                  setState(() => _lastActionFeedback = 'Đã đặt lại tiến trình đọc.');
                }
              } else if (value == 'report') {
                await _openReportDialog();
              }
            },
            itemBuilder: (_) => [
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
                  : Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                          child: Row(
                            children: [
                              Expanded(
                                child: SegmentedButton<ReaderViewMode>(
                                  segments: [
                                    for (final mode in ReaderViewMode.values)
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
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 10,
                                  vertical: 6,
                                ),
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
                              ),
                            ],
                          ),
                        ),
                        if (_previewExpiresAt != null)
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: Text(
                              'Liên kết Preview hết hạn lúc: ${_previewExpiresAt!.toLocal()}',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(color: tokens.statusWarningText),
                            ),
                          ),
                        Expanded(
                          child: SingleChildScrollView(
                            padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
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
                                      borderRadius: BorderRadius.circular(10),
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
                                            label: Text('${e.key}: ${e.value}'),
                                          ),
                                        )
                                        .toList(),
                                  ),
                                ],
                                const SizedBox(height: 12),
                                Text(
                                  'Vật thể tương tác trên trang (${page.scene.objects.length})',
                                  style: Theme.of(context).textTheme.titleSmall,
                                ),
                                const SizedBox(height: 8),
                                if (page.scene.objects.isEmpty)
                                  Text(
                                    'Trang này chưa có vật thể 3D/tương tác.',
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodySmall
                                        ?.copyWith(color: tokens.textMuted),
                                  )
                                else
                                  Wrap(
                                    spacing: 8,
                                    runSpacing: 8,
                                    children: page.scene.objects.map((obj) {
                                      return ActionChip(
                                        avatar: Icon(
                                          obj.type == 'MODEL'
                                              ? Icons.view_in_ar_rounded
                                              : Icons.touch_app_outlined,
                                          size: 16,
                                        ),
                                        label: Text(obj.name ?? obj.id),
                                        onPressed: () =>
                                            unawaited(_onTapSceneObject(obj)),
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
                            padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
                            decoration: BoxDecoration(
                              color: tokens.bgSurface,
                              border: Border(
                                top: BorderSide(color: tokens.borderDefault),
                              ),
                            ),
                            child: Row(
                              children: [
                                IconButton.outlined(
                                  tooltip: 'Trang trước',
                                  onPressed: _pageIndex > 0
                                      ? () => unawaited(_goToPage(_pageIndex - 1))
                                      : null,
                                  icon: const Icon(Icons.chevron_left_rounded),
                                ),
                                Expanded(
                                  child: Text(
                                    'Trang ${_pageIndex + 1} / ${manifest.pages.length}'
                                    '${page.title != null ? ' • ${page.title}' : ''}',
                                    textAlign: TextAlign.center,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: Theme.of(context).textTheme.titleSmall,
                                  ),
                                ),
                                IconButton.outlined(
                                  tooltip: 'Trang sau',
                                  onPressed:
                                      _pageIndex < manifest.pages.length - 1
                                          ? () => unawaited(_goToPage(_pageIndex + 1))
                                          : null,
                                  icon: const Icon(Icons.chevron_right_rounded),
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
