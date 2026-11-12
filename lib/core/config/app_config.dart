import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'env_config.dart';

/// Fallback trung tính khi không có `.env` hoặc `--dart-define` (ví dụ trong unit test).
const String kFallbackApiBaseUrl = 'http://localhost:4000/api/v1';
const String kFallbackWebViewerOrigin = 'https://viewer.localhost:5174';
const List<String> kDefaultKnownViewerHosts = [
  'viewer.bookaria.vn',
  'bookaria.vn',
  'viewer.localhost',
  'localhost',
  '127.0.0.1',
];

class AppConfig {
  const AppConfig({
    required this.apiBaseUrl,
    required this.webViewerOrigin,
    this.knownViewerHosts = kDefaultKnownViewerHosts,
    this.isTest = false,
  });

  final String apiBaseUrl;
  final String webViewerOrigin;
  final List<String> knownViewerHosts;
  final bool isTest;

  /// Đọc cấu hình theo thứ tự ưu tiên:
  /// 1. `--dart-define` / `--dart-define-from-file`
  /// 2. Giá trị đọc từ file `.env`
  /// 3. Fallback mặc định
  factory AppConfig.fromEnvironment({
    Map<String, String> env = const <String, String>{},
    bool isTest = false,
  }) {
    const hasDefinedApi = bool.hasEnvironment('API_BASE_URL');
    const definedApi = String.fromEnvironment('API_BASE_URL');
    const hasDefinedWeb = bool.hasEnvironment('WEB_VIEWER_ORIGIN');
    const definedWeb = String.fromEnvironment('WEB_VIEWER_ORIGIN');
    const hasDefinedHosts = bool.hasEnvironment('KNOWN_VIEWER_HOSTS');
    const definedHosts = String.fromEnvironment('KNOWN_VIEWER_HOSTS');

    final rawApi = (hasDefinedApi && definedApi.trim().isNotEmpty)
        ? definedApi.trim()
        : (env['API_BASE_URL']?.trim().isNotEmpty == true
            ? env['API_BASE_URL']!.trim()
            : kFallbackApiBaseUrl);

    final rawWeb = (hasDefinedWeb && definedWeb.trim().isNotEmpty)
        ? definedWeb.trim()
        : (env['WEB_VIEWER_ORIGIN']?.trim().isNotEmpty == true
            ? env['WEB_VIEWER_ORIGIN']!.trim()
            : kFallbackWebViewerOrigin);

    final rawHosts = (hasDefinedHosts && definedHosts.trim().isNotEmpty)
        ? definedHosts.trim()
        : (env['KNOWN_VIEWER_HOSTS']?.trim() ?? '');

    final hosts = rawHosts.isEmpty
        ? kDefaultKnownViewerHosts
        : rawHosts
            .split(',')
            .map((h) => h.trim().toLowerCase())
            .where((h) => h.isNotEmpty)
            .toList(growable: false);

    return AppConfig(
      apiBaseUrl: rawApi.replaceFirst(RegExp(r'/+$'), ''),
      webViewerOrigin: rawWeb.replaceFirst(RegExp(r'/+$'), ''),
      knownViewerHosts: hosts,
      isTest: isTest,
    );
  }

  static Future<AppConfig> load({
    AssetBundle? bundle,
    String assetPath = '.env',
    bool isTest = false,
  }) async {
    final env = await EnvConfig.loadFromAsset(
      bundle: bundle,
      assetPath: assetPath,
    );
    return AppConfig.fromEnvironment(env: env, isTest: isTest);
  }

  Uri get apiBaseUri => Uri.parse(apiBaseUrl);

  Uri get webViewerUri => Uri.parse(webViewerOrigin);

  Uri bookWebViewerUrl(
    String slug, {
    bool ar = false,
    int? page,
  }) {
    final encoded = Uri.encodeComponent(slug);
    final path = switch ((ar, page)) {
      (true, final int p) when p > 0 => '/b/$encoded/ar/p/$p',
      (true, _) => '/b/$encoded?mode=ar',
      (false, final int p) when p > 0 => '/b/$encoded/p/$p',
      _ => '/b/$encoded',
    };
    return Uri.parse('$webViewerOrigin$path');
  }

  Uri previewWebViewerUrl(
    String token, {
    bool ar = false,
    int? page,
  }) {
    final encoded = Uri.encodeComponent(token);
    final path = switch ((ar, page)) {
      (true, final int p) when p > 0 => '/preview/$encoded/ar/p/$p',
      (true, _) => '/preview/$encoded?mode=ar',
      (false, final int p) when p > 0 => '/preview/$encoded/p/$p',
      _ => '/preview/$encoded',
    };
    return Uri.parse('$webViewerOrigin$path');
  }

  bool isKnownViewerHost(String? host) {
    if (host == null || host.isEmpty) return false;
    final lower = host.toLowerCase();
    final configuredHost = webViewerUri.host.toLowerCase();
    if (configuredHost.isNotEmpty && lower == configuredHost) return true;
    return knownViewerHosts.any((h) => h.toLowerCase() == lower);
  }
}

final appConfigProvider = Provider<AppConfig>((ref) {
  return AppConfig.fromEnvironment();
});
