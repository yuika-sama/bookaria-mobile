import 'package:bookaria_mobile/core/config/app_config.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('AppConfig uses hardcoded backend URL by default', () {
    final config = AppConfig.fromEnvironment();

    expect(kDefaultApiBaseUrl, 'http://10.54.220.5:4000/api/v1');
    expect(config.apiBaseUrl, 'http://10.54.220.5:4000/api/v1');
    expect(config.webViewerOrigin, 'https://viewer.bookaria.vn');
  });
}
