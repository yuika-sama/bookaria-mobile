import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mime/mime.dart';
import 'package:path/path.dart' as p;
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

import '../../core/config/app_config.dart';
import '../../core/contracts/manifest.dart';
import '../../core/storage/app_database.dart';
import '../../core/storage/offline_storage_paths.dart';
import 'offline_pack_manager.dart';

typedef EnqueueOfflineEventCallback = Future<void> Function({
  required String sessionId,
  required String bookVersionId,
  required Map<String, dynamic> deviceJson,
  required Map<String, dynamic> eventJson,
});

/// Ephemeral loopback HTTP server (`http://127.0.0.1:<port>`) hosting:
/// 1. The bundled `bookaria-viewer` SPA (`assets/viewer/**`) in a WebView Secure Context.
/// 2. Offline-first `/api/v1/public/books/:slug` + rewritten local `/offline-api/books/:slug/manifest.json`.
/// 3. Byte-range `/bookaria_storage/*` streaming for `.glb`, `.mind`, images, audio, and video.
/// 4. Same-origin reverse proxy for online/preview `/api/v1/*` requests + offline event queueing.
class LocalAssetServer {
  LocalAssetServer(
    OfflineStoragePaths paths, {
    AppConfig? config,
    AssetBundle? assetBundle,
    Future<OfflineBookRecord?> Function(String slug)? findOfflineBookBySlug,
    Future<Manifest?> Function(OfflineBookRecord record)? loadOfflineManifest,
    EnqueueOfflineEventCallback? onEnqueueOfflineEvent,
    HttpClient? httpClient,
  })  : _paths = paths,
        _config = config ?? AppConfig.fromEnvironment(),
        _assetBundle = assetBundle ?? rootBundle,
        _findOfflineBookBySlug = findOfflineBookBySlug,
        _loadOfflineManifest = loadOfflineManifest,
        _onEnqueueOfflineEvent = onEnqueueOfflineEvent,
        _httpClient = httpClient ?? HttpClient(),
        _ownsHttpClient = httpClient == null;

  final OfflineStoragePaths _paths;
  final AppConfig _config;
  final AssetBundle _assetBundle;
  final Future<OfflineBookRecord?> Function(String slug)? _findOfflineBookBySlug;
  final Future<Manifest?> Function(OfflineBookRecord record)?
      _loadOfflineManifest;
  final EnqueueOfflineEventCallback? _onEnqueueOfflineEvent;
  final HttpClient _httpClient;
  final bool _ownsHttpClient;

  HttpServer? _server;
  Directory? _storageRoot;
  String? _canonicalStorageRoot;

  static final RegExp _uuidRegex = RegExp(
    r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
  );
  static final RegExp _languageRegex = RegExp(r'^[a-z]{2}(?:-[A-Z]{2})?$');
  static const String _fallbackUuid = '00000000-0000-4000-8000-000000000001';

  int? get port => _server?.port;
  String? get baseUrl => port != null ? 'http://127.0.0.1:$port' : null;

  Future<String> start() async {
    if (_server != null) return baseUrl!;

    final storageRoot = Directory(
      p.join(_paths.rootDir.path, 'bookaria_storage'),
    );
    await storageRoot.create(recursive: true);
    _storageRoot = storageRoot;
    _canonicalStorageRoot = p.canonicalize(storageRoot.path);

    _server = await shelf_io.serve(
      _handleRequest,
      InternetAddress.loopbackIPv4,
      0,
    );
    return baseUrl!;
  }

  Future<void> stop() async {
    await _server?.close(force: true);
    _server = null;
    if (_ownsHttpClient) {
      _httpClient.close(force: true);
    }
  }

  Map<String, String> _corsHeaders([Map<String, String>? extra]) => {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Range, Cache-Control',
        if (extra != null) ...extra,
      };

  Future<Response> _handleRequest(Request request) async {
    if (request.method == 'OPTIONS') {
      return Response(204, headers: _corsHeaders());
    }

    final segments =
        request.url.pathSegments.where((s) => s.isNotEmpty).toList();

    for (final segment in segments) {
      if (segment == '.' ||
          segment == '..' ||
          segment.contains('/') ||
          segment.contains('\\') ||
          segment.contains('\u0000')) {
        return Response.forbidden('Invalid path', headers: _corsHeaders());
      }
    }

    // 0. Lightweight same-origin HTML page for pre-seeding WebView localStorage
    if ((request.method == 'GET' || request.method == 'HEAD') &&
        segments.length == 1 &&
        segments[0] == '__mobile_bootstrap__') {
      const html =
          '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';
      return Response.ok(
        request.method == 'HEAD' ? null : html,
        headers: _corsHeaders({
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        }),
      );
    }

    // 1. Offline book metadata (`GET /api/v1/public/books/:slug`) when saved locally
    if (request.method == 'GET' &&
        segments.length == 5 &&
        segments[0] == 'api' &&
        segments[1] == 'v1' &&
        segments[2] == 'public' &&
        segments[3] == 'books') {
      final slug = segments[4];
      final offline = await _loadOfflineBundle(slug);
      if (offline != null) {
        return _serveOfflinePublicBook(slug, offline.record, offline.manifest);
      }
    }

    // 2. Offline rewritten manifest (`GET /offline-api/books/:slug/manifest.json`)
    if (request.method == 'GET' &&
        segments.length == 4 &&
        segments[0] == 'offline-api' &&
        segments[1] == 'books' &&
        segments[3] == 'manifest.json') {
      final slug = segments[2];
      final offline = await _loadOfflineBundle(slug);
      if (offline == null) {
        return Response.notFound('Offline manifest not found');
      }
      return _serveOfflineManifest(offline.manifest);
    }

    // 3. Reading events (`POST /api/v1/public/events`) with offline SQLite fallback
    if (request.method == 'POST' &&
        segments.length == 4 &&
        segments[0] == 'api' &&
        segments[1] == 'v1' &&
        segments[2] == 'public' &&
        segments[3] == 'events') {
      return _handlePublicEvents(request);
    }

    // 4. Online / Preview API reverse proxy (`/api/v1/*`)
    if (segments.length >= 2 &&
        segments[0] == 'api' &&
        segments[1] == 'v1') {
      return _proxyApiRequest(request, segments.sublist(2));
    }

    // 5. Downloaded local book resources (`/bookaria_storage/*`)
    if (segments.isNotEmpty && segments[0] == 'bookaria_storage') {
      return _serveStorageFile(request, segments.sublist(1));
    }

    // 6. Bundled `bookaria-viewer` static files (`assets/viewer/...`)
    if (segments.isNotEmpty) {
      final bundledResponse = await _tryServeBundledAsset(request, segments);
      if (bundledResponse != null) return bundledResponse;
    }

    // 7. SPA fallback for viewer routes (`/`, `/embed`, `/b/:slug...`, `/preview/:token...`)
    if (_isSpaRoute(segments)) {
      final indexResponse =
          await _tryServeBundledAsset(request, const ['index.html']);
      if (indexResponse != null) return indexResponse;
    }

    return Response.notFound('Not found', headers: _corsHeaders());
  }

  Future<({OfflineBookRecord record, Manifest manifest})?> _loadOfflineBundle(
    String slug,
  ) async {
    final record = await _findOfflineBookBySlug?.call(slug);
    if (record == null) return null;
    final manifest = await _loadOfflineManifest?.call(record);
    if (manifest == null) return null;
    return (record: record, manifest: manifest);
  }

  Response _serveOfflinePublicBook(
    String slug,
    OfflineBookRecord record,
    Manifest manifest,
  ) {
    final origin = baseUrl!;
    String? coverUrl;
    if (record.coverLocalPath != null) {
      coverUrl = _storageUrlForFile(File(record.coverLocalPath!));
    }
    coverUrl ??= _storageUrlForFile(
      _paths.coverFile(manifest.bookId, manifest.version),
    );

    final arPageCount = manifest.pages.where((p) => p.hasAr).length;
    final versionId =
        _uuidRegex.hasMatch(record.versionId) ? record.versionId : _fallbackUuid;
    final versionNo = manifest.version > 0 ? manifest.version : 1;
    final language =
        _languageRegex.hasMatch(record.language) ? record.language : 'vi';

    final payload = {
      'data': {
        'slug': record.slug,
        'title': record.title,
        'description': record.description,
        'author': {
          'id': 'offline-author',
          'displayName': record.authorName,
        },
        'coverUrl': coverUrl,
        'language': language,
        'ageMin': record.ageMin?.clamp(0, 18),
        'ageMax': record.ageMax?.clamp(0, 18),
        'version': {
          'id': versionId,
          'versionNo': versionNo,
          'publishedAt': record.downloadedAt.toUtc().toIso8601String(),
        },
        'manifestUrl':
            '$origin/offline-api/books/${Uri.encodeComponent(slug)}/manifest.json',
        'pageCount': manifest.pages.length,
        'arPageCount': arPageCount,
        'downloadBytes': math.max(0, record.totalBytes),
        'printPdfUrl': null,
      },
    };

    return Response.ok(
      jsonEncode(payload),
      headers: _corsHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      }),
    );
  }

  Response _serveOfflineManifest(Manifest manifest) {
    final raw = jsonDecode(jsonEncode(manifest.toJson())) as Map<String, dynamic>;

    final pages = raw['pages'];
    if (pages is List) {
      for (final item in pages) {
        if (item is! Map<String, dynamic>) continue;
        final pageId = item['pageId'];
        if (pageId is! String) continue;

        final imgUrl = _storageUrlForFile(
          _paths.pageImageFile(manifest.bookId, manifest.version, pageId),
        );
        if (imgUrl != null) {
          item['imageUrl'] = imgUrl;
        }

        final thumbUrl = _storageUrlForFile(
          _paths.pageThumbFile(manifest.bookId, manifest.version, pageId),
        );
        if (thumbUrl != null) {
          item['thumbnailUrl'] = thumbUrl;
        }
      }
    }

    final targetGroups = raw['targetGroups'];
    if (targetGroups is List) {
      for (final item in targetGroups) {
        if (item is! Map<String, dynamic>) continue;
        final groupNum = item['group'];
        if (groupNum is! num) continue;

        final mindUrl = _storageUrlForFile(
          _paths.targetGroupFile(
            manifest.bookId,
            manifest.version,
            groupNum.toInt(),
          ),
        );
        if (mindUrl != null) {
          item['mindUrl'] = mindUrl;
        }
      }
    }

    final assets = raw['assets'];
    if (assets is Map<String, dynamic>) {
      for (final entry in assets.entries) {
        final assetMap = entry.value;
        if (assetMap is! Map<String, dynamic>) continue;
        final origUrl = assetMap['url'];
        if (origUrl is! String) continue;

        final localUrl = _storageUrlForFile(
          _paths.sharedAssetFile(entry.key, origUrl),
        );
        if (localUrl != null) {
          assetMap['url'] = localUrl;
        }
      }
    }

    return Response.ok(
      jsonEncode(raw),
      headers: _corsHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      }),
    );
  }

  String? _storageUrlForFile(File file) {
    final origin = baseUrl;
    final root = _storageRoot;
    final canonicalRoot = _canonicalStorageRoot;
    if (origin == null || root == null || canonicalRoot == null) return null;
    if (!file.existsSync()) return null;

    final canonicalFile = p.canonicalize(file.path);
    if (!p.isWithin(canonicalRoot, canonicalFile)) return null;

    final rel = p.relative(canonicalFile, from: canonicalRoot);
    final segments = p.split(rel).where((s) => s.isNotEmpty);
    final encodedPath = segments.map(Uri.encodeComponent).join('/');
    return '$origin/bookaria_storage/$encodedPath';
  }

  Uri _buildUpstreamUri(List<String> tailSegments, String rawQuery) {
    final base = _config.apiBaseUri;
    return base.replace(
      pathSegments: [
        ...base.pathSegments.where((s) => s.isNotEmpty),
        ...tailSegments,
      ],
      query: rawQuery.isNotEmpty ? rawQuery : null,
    );
  }

  Future<Response> _handlePublicEvents(Request request) async {
    final bodyBytes = await _readBodyBytes(request);
    final upstreamUri = _buildUpstreamUri(
      const ['public', 'events'],
      request.url.query,
    );

    try {
      final upstream = await _forwardHttp(
        method: 'POST',
        uri: upstreamUri,
        headers: request.headers,
        bodyBytes: bodyBytes,
        timeout: const Duration(seconds: 5),
      );
      if (upstream.statusCode < 500) {
        return upstream.toResponse(_corsHeaders());
      }
    } catch (_) {
      // Fall through to local SQLite queue when offline / unreachable.
    }

    if (_onEnqueueOfflineEvent != null) {
      try {
        final decoded =
            jsonDecode(utf8.decode(bodyBytes)) as Map<String, dynamic>;
        final sessionId = decoded['sessionId'];
        final bookVersionId = decoded['bookVersionId'];
        final device = decoded['device'];
        final events = decoded['events'];
        if (sessionId is String &&
            bookVersionId is String &&
            device is Map &&
            events is List) {
          final deviceMap = Map<String, dynamic>.from(device);
          for (final item in events) {
            if (item is Map) {
              await _onEnqueueOfflineEvent(
                sessionId: sessionId,
                bookVersionId: bookVersionId,
                deviceJson: deviceMap,
                eventJson: Map<String, dynamic>.from(item),
              );
            }
          }
          return Response(204, headers: _corsHeaders());
        }
      } catch (_) {
        return Response(400, headers: _corsHeaders());
      }
    }

    return Response(
      503,
      body: jsonEncode({
        'error': {
          'code': 'NETWORK_ERROR',
          'message': 'Chưa gửi được thống kê đọc khi ngoại tuyến.',
        },
      }),
      headers: _corsHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    );
  }

  Future<Response> _proxyApiRequest(
    Request request,
    List<String> tailSegments,
  ) async {
    final upstreamUri = _buildUpstreamUri(tailSegments, request.url.query);
    final bodyBytes = (request.method == 'POST' ||
            request.method == 'PUT' ||
            request.method == 'PATCH' ||
            request.method == 'DELETE')
        ? await _readBodyBytes(request)
        : const <int>[];

    try {
      final upstream = await _forwardHttp(
        method: request.method,
        uri: upstreamUri,
        headers: request.headers,
        bodyBytes: bodyBytes,
        timeout: const Duration(seconds: 25),
      );
      return upstream.toResponse(_corsHeaders());
    } catch (_) {
      return Response(
        502,
        body: jsonEncode({
          'error': {
            'code': 'NETWORK_ERROR',
            'message': 'Không thể kết nối tới máy chủ Bookaria.',
          },
        }),
        headers: _corsHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      );
    }
  }

  Future<_UpstreamResponse> _forwardHttp({
    required String method,
    required Uri uri,
    required Map<String, String> headers,
    required List<int> bodyBytes,
    required Duration timeout,
  }) async {
    final req = await _httpClient.openUrl(method, uri).timeout(timeout);
    req.followRedirects = true;

    final accept = headers['accept'];
    if (accept != null && accept.isNotEmpty) {
      req.headers.set(HttpHeaders.acceptHeader, accept);
    }
    final contentType = headers['content-type'];
    if (contentType != null && contentType.isNotEmpty) {
      req.headers.set(HttpHeaders.contentTypeHeader, contentType);
    }
    if (bodyBytes.isNotEmpty) {
      req.add(bodyBytes);
    }

    final resp = await req.close().timeout(timeout);
    final chunks = <int>[];
    await for (final chunk in resp) {
      chunks.addAll(chunk);
    }

    final outHeaders = <String, String>{};
    for (final headerName in const [
      'content-type',
      'expires',
      'cache-control',
      'retry-after',
      'etag',
      'last-modified',
    ]) {
      final value = resp.headers.value(headerName);
      if (value != null && value.isNotEmpty) {
        outHeaders[headerName] = value;
      }
    }

    return _UpstreamResponse(
      statusCode: resp.statusCode,
      headers: outHeaders,
      bytes: chunks,
    );
  }

  Future<Response> _serveStorageFile(
    Request request,
    List<String> subSegments,
  ) async {
    final root = _storageRoot;
    final canonicalRoot = _canonicalStorageRoot;
    if (root == null || canonicalRoot == null || subSegments.isEmpty) {
      return Response.notFound('Asset not found', headers: _corsHeaders());
    }

    final file = File(p.joinAll([root.path, ...subSegments]));
    final canonicalFile = p.canonicalize(file.path);
    if (!p.isWithin(canonicalRoot, canonicalFile)) {
      return Response.forbidden('Invalid path', headers: _corsHeaders());
    }
    if (!file.existsSync()) {
      return Response.notFound('Asset not found', headers: _corsHeaders());
    }

    return _serveFileWithRange(
      request,
      file,
      cacheControl: 'public, max-age=31536000',
    );
  }

  Future<Response> _serveFileWithRange(
    Request request,
    File file, {
    required String cacheControl,
  }) async {
    final totalLength = await file.length();
    final headerBytes = await _readHeaderBytes(file);
    final contentType = _resolveContentType(
      file.path,
      headerBytes: headerBytes,
    );

    final baseHeaders = _corsHeaders({
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': cacheControl,
    });

    if (request.method == 'HEAD') {
      return Response.ok(
        null,
        headers: {
          ...baseHeaders,
          'Content-Length': '$totalLength',
        },
      );
    }

    final rangeHeader = request.headers['range'];
    if (rangeHeader != null && totalLength > 0) {
      final match =
          RegExp(r'^bytes=(\d*)-(\d*)$').firstMatch(rangeHeader.trim());
      if (match != null) {
        final startStr = match.group(1) ?? '';
        final endStr = match.group(2) ?? '';
        int? start;
        int? end;

        if (startStr.isNotEmpty && endStr.isNotEmpty) {
          start = int.tryParse(startStr);
          end = int.tryParse(endStr);
        } else if (startStr.isNotEmpty) {
          start = int.tryParse(startStr);
          end = totalLength - 1;
        } else if (endStr.isNotEmpty) {
          final suffix = int.tryParse(endStr);
          if (suffix != null && suffix > 0) {
            start = math.max(0, totalLength - suffix);
            end = totalLength - 1;
          }
        }

        if (start == null ||
            end == null ||
            start < 0 ||
            end < start ||
            start >= totalLength) {
          return Response(
            416,
            headers: _corsHeaders({'Content-Range': 'bytes */$totalLength'}),
          );
        }

        final clampedEnd = math.min(end, totalLength - 1);
        final length = clampedEnd - start + 1;
        return Response(
          206,
          body: file.openRead(start, clampedEnd + 1),
          headers: {
            ...baseHeaders,
            'Content-Length': '$length',
            'Content-Range': 'bytes $start-$clampedEnd/$totalLength',
          },
        );
      }
    }

    return Response.ok(
      file.openRead(),
      headers: {
        ...baseHeaders,
        'Content-Length': '$totalLength',
      },
    );
  }

  Future<Response?> _tryServeBundledAsset(
    Request request,
    List<String> segments,
  ) async {
    final assetKey = 'assets/viewer/${segments.join('/')}';
    ByteData data;
    try {
      data = await _assetBundle.load(assetKey);
    } catch (_) {
      return null;
    }

    final bytes = data.buffer.asUint8List(
      data.offsetInBytes,
      data.lengthInBytes,
    );
    final fileName = segments.last;
    final contentType = _resolveContentType(
      fileName,
      headerBytes: bytes.length > 16 ? bytes.sublist(0, 16) : bytes,
    );
    final isHtml = fileName.toLowerCase().endsWith('.html');

    return Response.ok(
      request.method == 'HEAD' ? null : bytes,
      headers: _corsHeaders({
        'Content-Type': contentType,
        'Content-Length': '${bytes.length}',
        'Cache-Control': isHtml ? 'no-store' : 'public, max-age=3600',
      }),
    );
  }

  bool _isSpaRoute(List<String> segments) {
    if (segments.isEmpty) return true;
    if (segments[0] == 'embed' && segments.length == 1) return true;
    if ((segments[0] == 'b' || segments[0] == 'preview') &&
        segments.length >= 2) {
      return true;
    }
    return false;
  }

  static Future<List<int>> _readBodyBytes(Request request) async {
    final chunks = <int>[];
    await for (final chunk in request.read()) {
      chunks.addAll(chunk);
    }
    return chunks;
  }

  static Future<List<int>> _readHeaderBytes(File file) async {
    final raf = await file.open();
    try {
      return await raf.read(16);
    } finally {
      await raf.close();
    }
  }

  static String _resolveContentType(
    String path, {
    List<int>? headerBytes,
  }) {
    if (headerBytes != null && headerBytes.length >= 4) {
      if (headerBytes[0] == 0x89 &&
          headerBytes[1] == 0x50 &&
          headerBytes[2] == 0x4E &&
          headerBytes[3] == 0x47) {
        return 'image/png';
      }
      if (headerBytes[0] == 0xFF &&
          headerBytes[1] == 0xD8 &&
          headerBytes[2] == 0xFF) {
        return 'image/jpeg';
      }
      if (headerBytes.length >= 12 &&
          headerBytes[0] == 0x52 &&
          headerBytes[1] == 0x49 &&
          headerBytes[2] == 0x46 &&
          headerBytes[3] == 0x46 &&
          headerBytes[8] == 0x57 &&
          headerBytes[9] == 0x45 &&
          headerBytes[10] == 0x42 &&
          headerBytes[11] == 0x50) {
        return 'image/webp';
      }
      if (headerBytes[0] == 0x67 &&
          headerBytes[1] == 0x6C &&
          headerBytes[2] == 0x54 &&
          headerBytes[3] == 0x46) {
        return 'model/gltf-binary';
      }
    }

    final ext = p.extension(path).toLowerCase();
    return switch (ext) {
      '.html' || '.htm' => 'text/html; charset=utf-8',
      '.js' || '.mjs' => 'application/javascript; charset=utf-8',
      '.css' => 'text/css; charset=utf-8',
      '.json' => 'application/json; charset=utf-8',
      '.svg' => 'image/svg+xml',
      '.wasm' => 'application/wasm',
      '.woff' => 'font/woff',
      '.woff2' => 'font/woff2',
      '.glb' => 'model/gltf-binary',
      '.gltf' => 'model/gltf+json',
      '.mind' => 'application/octet-stream',
      '.mp3' => 'audio/mpeg',
      '.m4a' => 'audio/mp4',
      '.wav' => 'audio/wav',
      '.ogg' => 'audio/ogg',
      '.mp4' => 'video/mp4',
      '.webm' => 'video/webm',
      '.png' => 'image/png',
      '.jpg' || '.jpeg' => 'image/jpeg',
      '.webp' => 'image/webp',
      '.ico' => 'image/x-icon',
      _ => lookupMimeType(path, headerBytes: headerBytes) ??
          'application/octet-stream',
    };
  }
}

class _UpstreamResponse {
  const _UpstreamResponse({
    required this.statusCode,
    required this.headers,
    required this.bytes,
  });

  final int statusCode;
  final Map<String, String> headers;
  final List<int> bytes;

  Response toResponse(Map<String, String> corsHeaders) {
    final finalHeaders = <String, String>{
      ...headers,
      ...corsHeaders,
    };
    return Response(
      statusCode,
      body: statusCode == 204 || statusCode == 304 ? null : bytes,
      headers: finalHeaders,
    );
  }
}

final localAssetServerProvider = FutureProvider<LocalAssetServer>((ref) async {
  final paths = await ref.watch(offlineStoragePathsProvider.future);
  final config = ref.watch(appConfigProvider);
  final db = ref.watch(appDatabaseProvider);
  final packManager = ref.read(offlinePackManagerProvider.notifier);

  final server = LocalAssetServer(
    paths,
    config: config,
    findOfflineBookBySlug: db.findOfflineBookBySlug,
    loadOfflineManifest: packManager.loadLocalManifest,
    onEnqueueOfflineEvent: db.enqueueEvent,
  );
  await server.start();
  ref.onDispose(() {
    unawaited(server.stop());
  });
  return server;
});
