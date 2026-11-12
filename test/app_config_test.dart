import 'dart:convert';

import 'package:bookaria_mobile/core/config/app_config.dart';
import 'package:bookaria_mobile/core/config/env_config.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

class _MemoryEnvBundle extends CachingAssetBundle {
  _MemoryEnvBundle(this.files);

  final Map<String, String> files;

  @override
  Future<ByteData> load(String key) async {
    final content = files[key];
    if (content == null) {
      throw FlutterError('Asset not found: $key');
    }
    return ByteData.sublistView(Uint8List.fromList(utf8.encode(content)));
  }
}

void main() {
  test('EnvConfig parses .env lines, comments, quotes and export syntax', () {
    final parsed = EnvConfig.parse('''
# Comment line

API_BASE_URL="http://192.0.2.10:4000/api/v1"
export WEB_VIEWER_ORIGIN='https://192.0.2.10:5174'
KNOWN_VIEWER_HOSTS=viewer.example.com, example.org
''');

    expect(parsed['API_BASE_URL'], 'http://192.0.2.10:4000/api/v1');
    expect(parsed['WEB_VIEWER_ORIGIN'], 'https://192.0.2.10:5174');
    expect(parsed['KNOWN_VIEWER_HOSTS'], 'viewer.example.com, example.org');
  });

  test('AppConfig uses neutral fallback defaults when no .env is loaded', () {
    final config = AppConfig.fromEnvironment();

    expect(config.apiBaseUrl, kFallbackApiBaseUrl);
    expect(config.webViewerOrigin, kFallbackWebViewerOrigin);
    expect(config.isKnownViewerHost('viewer.bookaria.vn'), isTrue);
    expect(config.isKnownViewerHost('viewer.localhost'), isTrue);
    expect(config.isKnownViewerHost('evil.example.com'), isFalse);
  });

  test('AppConfig.load falls back cleanly when .env asset is missing', () async {
    final config = await AppConfig.load(bundle: _MemoryEnvBundle(const {}));
    expect(config.apiBaseUrl, kFallbackApiBaseUrl);
    expect(config.webViewerOrigin, kFallbackWebViewerOrigin);
  });

  test('AppConfig.load reads URLs from bundled .env asset', () async {
    final bundle = _MemoryEnvBundle({
      '.env': '''
API_BASE_URL=http://192.0.2.55:4000/api/v1/
WEB_VIEWER_ORIGIN=https://192.0.2.55:5174/
KNOWN_VIEWER_HOSTS=viewer.bookaria.vn,custom.viewer.local
''',
    });

    final config = await AppConfig.load(bundle: bundle);

    expect(config.apiBaseUrl, 'http://192.0.2.55:4000/api/v1');
    expect(config.webViewerOrigin, 'https://192.0.2.55:5174');
    expect(
      config.bookWebViewerUrl('vuon-co-tich').toString(),
      'https://192.0.2.55:5174/b/vuon-co-tich',
    );
    expect(
      config.bookWebViewerUrl('vuon-co-tich', ar: true, page: 3).toString(),
      'https://192.0.2.55:5174/b/vuon-co-tich/ar/p/3',
    );
    expect(
      config.bookWebViewerUrl('vuon-co-tich', ar: true).toString(),
      'https://192.0.2.55:5174/b/vuon-co-tich?mode=ar',
    );
    expect(
      config.previewWebViewerUrl('abc123', page: 2).toString(),
      'https://192.0.2.55:5174/preview/abc123/p/2',
    );

    expect(config.isKnownViewerHost('192.0.2.55'), isTrue);
    expect(config.isKnownViewerHost('custom.viewer.local'), isTrue);
    expect(config.isKnownViewerHost('viewer.bookaria.vn'), isTrue);
    expect(config.isKnownViewerHost('evil.example.com'), isFalse);
  });
}
