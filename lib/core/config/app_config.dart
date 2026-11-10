import 'package:flutter_riverpod/flutter_riverpod.dart';

/// URL backend mặc định được fix cứng khi khởi chạy app (không cần truyền qua terminal).
/// Chỉ cần sửa trực tiếp hằng số này khi IP LAN hoặc domain máy chủ thay đổi.
const String kDefaultApiBaseUrl = 'http://10.54.220.5:4000/api/v1';

/// Origin mặc định của Bookaria Web Viewer.
const String kDefaultWebViewerOrigin = 'https://viewer.bookaria.vn';

class AppConfig {
  const AppConfig({
    required this.apiBaseUrl,
    required this.webViewerOrigin,
    this.isTest = false,
  });

  final String apiBaseUrl;
  final String webViewerOrigin;
  final bool isTest;

  factory AppConfig.fromEnvironment() {
    const rawApi = String.fromEnvironment(
      'API_BASE_URL',
      defaultValue: kDefaultApiBaseUrl,
    );
    const rawWeb = String.fromEnvironment(
      'WEB_VIEWER_ORIGIN',
      defaultValue: kDefaultWebViewerOrigin,
    );
    final effectiveApi =
        rawApi.trim().isEmpty ? kDefaultApiBaseUrl : rawApi.trim();
    final effectiveWeb =
        rawWeb.trim().isEmpty ? kDefaultWebViewerOrigin : rawWeb.trim();
    return AppConfig(
      apiBaseUrl: effectiveApi.replaceFirst(RegExp(r'/+$'), ''),
      webViewerOrigin: effectiveWeb.replaceFirst(RegExp(r'/+$'), ''),
    );
  }
}

final appConfigProvider = Provider<AppConfig>((ref) {
  return AppConfig.fromEnvironment();
});
