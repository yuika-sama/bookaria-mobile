import 'dart:convert';
import 'dart:io';

import 'package:bookaria_mobile/core/config/app_config.dart';
import 'package:bookaria_mobile/core/contracts/manifest.dart';
import 'package:bookaria_mobile/core/storage/app_database.dart';
import 'package:bookaria_mobile/core/storage/offline_storage_paths.dart';
import 'package:bookaria_mobile/features/offline_pack/local_asset_server.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

class _FakeViewerAssetBundle extends CachingAssetBundle {
  _FakeViewerAssetBundle(this.entries);

  final Map<String, List<int>> entries;

  @override
  Future<ByteData> load(String key) async {
    final bytes = entries[key];
    if (bytes == null) {
      throw FlutterError('Asset not found: $key');
    }
    return ByteData.sublistView(Uint8List.fromList(bytes));
  }
}

class _HttpResp {
  const _HttpResp({
    required this.statusCode,
    required this.headers,
    required this.bodyBytes,
  });

  final int statusCode;
  final HttpHeaders headers;
  final List<int> bodyBytes;

  String get body => utf8.decode(bodyBytes);
}

Future<_HttpResp> _sendHttp(
  String method,
  String url, {
  Map<String, String>? headers,
  String? body,
}) async {
  final client = HttpClient();
  try {
    final req = await client.openUrl(method, Uri.parse(url));
    headers?.forEach(req.headers.set);
    if (body != null) {
      req.write(body);
    }
    final resp = await req.close();
    final bytes = <int>[];
    await for (final chunk in resp) {
      bytes.addAll(chunk);
    }
    return _HttpResp(
      statusCode: resp.statusCode,
      headers: resp.headers,
      bodyBytes: bytes,
    );
  } finally {
    client.close(force: true);
  }
}

Manifest _sampleManifest() {
  return Manifest.fromJson({
    'schemaVersion': 1,
    'bookId': 'book-uuid-1',
    'workflowVariables': const <dynamic>[],
    'version': 2,
    'title': 'Hành Tinh Xanh',
    'trackerEngine': 'mindar',
    'generatedAt': '2026-10-10T00:00:00.000Z',
    'targetGroups': [
      {
        'group': 0,
        'mindUrl': 'https://cdn.example.com/group0.mind',
        'pageIds': ['p1'],
      },
    ],
    'pages': [
      {
        'pageId': 'p1',
        'title': 'Trang 1',
        'aspect': 0.75,
        'imageUrl': 'https://cdn.example.com/p1.jpg',
        'thumbnailUrl': 'https://cdn.example.com/p1_thumb.jpg',
        'marker': {'mode': 'NONE'},
        'settings': {'backgroundLoop': true},
        'scene': {
          'schemaVersion': 1,
          'objects': const <dynamic>[],
          'interactions': const <dynamic>[],
        },
      },
      {
        'pageId': 'p2',
        'title': 'Trang AR',
        'aspect': 0.75,
        'imageUrl': 'https://cdn.example.com/p2.jpg',
        'thumbnailUrl': 'https://cdn.example.com/p2_thumb.jpg',
        'marker': {
          'mode': 'BOOKARIA_MARKER',
          'number': 7,
          'transform': {'x': 0.5, 'y': 0.5, 'size': 0.2},
        },
        'group': 0,
        'targetIndex': 0,
        'settings': {'backgroundLoop': true},
        'scene': {
          'schemaVersion': 1,
          'objects': [
            {
              'id': 'earth',
              'type': 'model',
              'name': 'Trái Đất',
              'assetId': 'glb1',
              'transform': {
                'position': [0, 0, 0],
                'rotation': [0, 0, 0],
                'scale': [1, 1, 1],
              },
            },
          ],
          'interactions': const <dynamic>[],
        },
      },
    ],
    'assets': {
      'glb1': {
        'type': 'MODEL',
        'url': 'https://cdn.example.com/earth.glb',
        'size': 8,
      },
    },
    'credits': const <dynamic>[],
  });
}

void main() {
  test(
    'LocalAssetServer serves SPA routes, bootstrap page, offline book + manifest, and byte-range assets',
    () async {
      final tempDir = await Directory.systemTemp.createTemp('bookaria_srv_');
      addTearDown(() async {
        if (tempDir.existsSync()) {
          await tempDir.delete(recursive: true);
        }
      });

      final paths = OfflineStoragePaths(tempDir);
      await paths.ensureBaseDirectories();

      final manifest = _sampleManifest();
      final p1Img = paths.pageImageFile(manifest.bookId, manifest.version, 'p1');
      await p1Img.parent.create(recursive: true);
      await p1Img.writeAsBytes([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10]);

      final mindFile = paths.targetGroupFile(manifest.bookId, manifest.version, 0);
      await mindFile.parent.create(recursive: true);
      await mindFile.writeAsBytes([1, 2, 3, 4]);

      final glbFile = paths.sharedAssetFile(
        'glb1',
        'https://cdn.example.com/earth.glb',
      );
      await glbFile.writeAsBytes([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00]);

      final offlineRecord = OfflineBookRecord(
        bookId: manifest.bookId,
        slug: 'hanh-tinh-xanh',
        title: manifest.title,
        authorName: 'Bookaria Team',
        versionId: 'not-a-uuid-v1',
        versionNo: manifest.version,
        localDir: paths.bookVersionDir(manifest.bookId, manifest.version).path,
        totalBytes: 1024,
        pageCount: manifest.pages.length,
        arPageCount: 1,
        ageMin: 6,
        ageMax: 10,
        language: 'vi',
        downloadedAt: DateTime.utc(2026, 10, 10),
      );

      final fakeBundle = _FakeViewerAssetBundle({
        'assets/viewer/index.html': utf8.encode('<html>viewer-index</html>'),
        'assets/viewer/assets/app.js': utf8.encode('console.log("viewer");'),
      });

      final server = LocalAssetServer(
        paths,
        assetBundle: fakeBundle,
        findOfflineBookBySlug: (slug) async =>
            slug == offlineRecord.slug ? offlineRecord : null,
        loadOfflineManifest: (_) async => manifest,
      );
      final baseUrl = await server.start();
      addTearDown(server.stop);

      // 1. Bootstrap HTML page
      final bootResp = await _sendHttp('GET', '$baseUrl/__mobile_bootstrap__');
      expect(bootResp.statusCode, 200);
      expect(bootResp.headers.value('content-type'), contains('text/html'));

      // 2. Bundled JS + SPA fallback for /b/:slug and /preview/:token
      final jsResp = await _sendHttp('GET', '$baseUrl/assets/app.js');
      expect(jsResp.statusCode, 200);
      expect(jsResp.headers.value('content-type'), contains('javascript'));

      final spaBookResp = await _sendHttp(
        'GET',
        '$baseUrl/b/hanh-tinh-xanh/ar/p/2',
      );
      expect(spaBookResp.statusCode, 200);
      expect(spaBookResp.body, '<html>viewer-index</html>');

      final spaPreviewResp = await _sendHttp(
        'GET',
        '$baseUrl/preview/AbCdEfGhIjKlMnOpQrStUvWxYz012345',
      );
      expect(spaPreviewResp.statusCode, 200);
      expect(spaPreviewResp.body, '<html>viewer-index</html>');

      // 3. Offline /api/v1/public/books/:slug matches PublicBookSchema
      final bookResp = await _sendHttp(
        'GET',
        '$baseUrl/api/v1/public/books/hanh-tinh-xanh',
      );
      expect(bookResp.statusCode, 200);
      final bookData =
          (jsonDecode(bookResp.body) as Map<String, dynamic>)['data']
              as Map<String, dynamic>;
      expect(bookData['slug'], 'hanh-tinh-xanh');
      expect(bookData['pageCount'], 2);
      expect(bookData['arPageCount'], 1);
      expect(
        bookData['version']['id'],
        matches(r'^[0-9a-f-]{36}$'),
      );
      final offlineManifestUrl = bookData['manifestUrl'] as String;
      expect(
        offlineManifestUrl,
        '$baseUrl/offline-api/books/hanh-tinh-xanh/manifest.json',
      );

      // 4. Offline manifest rewrites local URLs & Byte-Range 206 streaming works
      final manifestResp = await _sendHttp('GET', offlineManifestUrl);
      expect(manifestResp.statusCode, 200);
      final manifestJson = jsonDecode(manifestResp.body) as Map<String, dynamic>;
      final glbUrl = manifestJson['assets']['glb1']['url'] as String;
      expect(glbUrl, startsWith('$baseUrl/bookaria_storage/'));

      final rangeResp = await _sendHttp(
        'GET',
        glbUrl,
        headers: {'Range': 'bytes=0-3'},
      );
      expect(rangeResp.statusCode, 206);
      expect(rangeResp.bodyBytes, [0x67, 0x6C, 0x54, 0x46]);
      expect(rangeResp.headers.value('content-type'), 'model/gltf-binary');
      expect(rangeResp.headers.value('content-range'), 'bytes 0-3/8');

      // 5. Rejects path traversal attempts (normalized and backslash-encoded)
      final secretOutside = File('${tempDir.path}/secret.txt');
      await secretOutside.writeAsString('TOP_SECRET');

      final traversalDotResp = await _sendHttp(
        'GET',
        '$baseUrl/bookaria_storage/%2e%2e/secret.txt',
      );
      expect(traversalDotResp.statusCode, isIn([403, 404]));
      expect(traversalDotResp.body, isNot(contains('TOP_SECRET')));

      final socket = await Socket.connect('127.0.0.1', server.port!);
      addTearDown(socket.destroy);
      socket.write(
        'GET /bookaria_storage/..%5csecret.txt HTTP/1.1\r\n'
        'Host: 127.0.0.1\r\n'
        'Connection: close\r\n\r\n',
      );
      await socket.flush();
      final rawBytes = await socket.fold<List<int>>(
        <int>[],
        (prev, chunk) => prev..addAll(chunk),
      );
      final rawResponse = utf8.decode(rawBytes);
      expect(rawResponse.split('\r\n').first, contains('403'));
      expect(rawResponse, isNot(contains('TOP_SECRET')));
    },
  );

  test(
    'LocalAssetServer proxies /api/v1 without Origin header and queues events offline',
    () async {
      final tempDir = await Directory.systemTemp.createTemp('bookaria_proxy_');
      addTearDown(() async {
        if (tempDir.existsSync()) {
          await tempDir.delete(recursive: true);
        }
      });

      final paths = OfflineStoragePaths(tempDir);
      await paths.ensureBaseDirectories();

      String? capturedOriginHeader;
      final mockBackend = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      addTearDown(() => mockBackend.close(force: true));
      mockBackend.listen((HttpRequest req) async {
        capturedOriginHeader = req.headers.value('origin');
        if (req.uri.path == '/api/v1/public/previews/tok123') {
          req.response.statusCode = 200;
          req.response.headers.set('content-type', 'application/json');
          req.response.headers.set('expires', 'Wed, 01 Jan 2031 00:00:00 GMT');
          req.response.write(jsonEncode({'data': {'ok': true}}));
        } else {
          req.response.statusCode = 503;
        }
        await req.response.close();
      });

      final queuedEvents = <Map<String, dynamic>>[];
      final server = LocalAssetServer(
        paths,
        config: AppConfig(
          apiBaseUrl: 'http://127.0.0.1:${mockBackend.port}/api/v1',
          webViewerOrigin: 'https://127.0.0.1:5174',
          isTest: true,
        ),
        assetBundle: _FakeViewerAssetBundle(const {}),
        onEnqueueOfflineEvent: ({
          required sessionId,
          required bookVersionId,
          required deviceJson,
          required eventJson,
        }) async {
          queuedEvents.add({
            'sessionId': sessionId,
            'bookVersionId': bookVersionId,
            'event': eventJson,
          });
        },
      );
      final baseUrl = await server.start();
      addTearDown(server.stop);

      final previewResp = await _sendHttp(
        'GET',
        '$baseUrl/api/v1/public/previews/tok123',
        headers: {'Origin': baseUrl},
      );
      expect(previewResp.statusCode, 200);
      expect(capturedOriginHeader, isNull);
      expect(
        previewResp.headers.value('expires'),
        'Wed, 01 Jan 2031 00:00:00 GMT',
      );

      // Events fallback returns 204 and queues event when backend returns 503
      final eventResp = await _sendHttp(
        'POST',
        '$baseUrl/api/v1/public/events',
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'sessionId': 's-1',
          'bookVersionId': 'v-1',
          'device': {'type': 'mobile', 'os': 'Android', 'browser': 'WebView'},
          'events': [
            {'type': 'OPEN', 'at': '2026-10-10T00:00:00.000Z'},
          ],
        }),
      );
      expect(eventResp.statusCode, 204);
      expect(queuedEvents.length, 1);
      expect(queuedEvents.first['sessionId'], 's-1');
    },
  );
}
