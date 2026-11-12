import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class BookariaPlatform {
  BookariaPlatform() {
    _channel.setMethodCallHandler(_handleMethodCall);
  }

  static const MethodChannel _channel =
      MethodChannel('vn.bookaria.mobile/platform');

  final StreamController<String> _deepLinkController =
      StreamController<String>.broadcast();

  Stream<String> get deepLinkStream => _deepLinkController.stream;

  Future<dynamic> _handleMethodCall(MethodCall call) async {
    if (call.method == 'onDeepLink' && call.arguments is String) {
      final raw = (call.arguments as String).trim();
      if (raw.isNotEmpty) {
        _deepLinkController.add(raw);
      }
    }
  }

  Future<String?> getInitialLink() async {
    try {
      final raw = await _channel.invokeMethod<String>('getInitialLink');
      final trimmed = raw?.trim();
      return (trimmed != null && trimmed.isNotEmpty) ? trimmed : null;
    } on MissingPluginException {
      return null;
    } on PlatformException {
      return null;
    }
  }

  Future<bool> ensureCameraPermission() async {
    try {
      final granted =
          await _channel.invokeMethod<bool>('ensureCameraPermission');
      return granted ?? true;
    } on MissingPluginException {
      // iOS WKWebView & desktop test runners handle/mock permissions natively.
      return true;
    } on PlatformException {
      return false;
    }
  }

  void dispose() {
    _channel.setMethodCallHandler(null);
    unawaited(_deepLinkController.close());
  }
}

final bookariaPlatformProvider = Provider<BookariaPlatform>((ref) {
  final platform = BookariaPlatform();
  ref.onDispose(platform.dispose);
  return platform;
});

