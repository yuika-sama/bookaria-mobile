import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../preferences/app_preferences.dart';

class HapticsService {
  HapticsService(this._ref);

  final Ref _ref;

  bool get _enabled => _ref.read(appPreferencesProvider).hapticsEnabled;

  Future<void> light() async {
    if (!_enabled) return;
    await HapticFeedback.lightImpact();
  }

  Future<void> medium() async {
    if (!_enabled) return;
    await HapticFeedback.mediumImpact();
  }

  Future<void> selection() async {
    if (!_enabled) return;
    await HapticFeedback.selectionClick();
  }

  Future<void> heavy() async {
    if (!_enabled) return;
    await HapticFeedback.heavyImpact();
  }
}

final hapticsServiceProvider = Provider<HapticsService>((ref) {
  return HapticsService(ref);
});
