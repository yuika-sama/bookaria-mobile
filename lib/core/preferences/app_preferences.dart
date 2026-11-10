import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppPreferencesState {
  const AppPreferencesState({
    this.themeMode = ThemeMode.light,
    this.hapticsEnabled = true,
    this.autoplayAudio = true,
    this.keepScreenAwake = true,
    this.kidModeEnabled = false,
    this.kidPin = '0000',
    this.kidMaxAge = 10,
  });

  final ThemeMode themeMode;
  final bool hapticsEnabled;
  final bool autoplayAudio;
  final bool keepScreenAwake;
  final bool kidModeEnabled;
  final String kidPin;
  final int kidMaxAge;

  AppPreferencesState copyWith({
    ThemeMode? themeMode,
    bool? hapticsEnabled,
    bool? autoplayAudio,
    bool? keepScreenAwake,
    bool? kidModeEnabled,
    String? kidPin,
    int? kidMaxAge,
  }) {
    return AppPreferencesState(
      themeMode: themeMode ?? this.themeMode,
      hapticsEnabled: hapticsEnabled ?? this.hapticsEnabled,
      autoplayAudio: autoplayAudio ?? this.autoplayAudio,
      keepScreenAwake: keepScreenAwake ?? this.keepScreenAwake,
      kidModeEnabled: kidModeEnabled ?? this.kidModeEnabled,
      kidPin: kidPin ?? this.kidPin,
      kidMaxAge: kidMaxAge ?? this.kidMaxAge,
    );
  }
}

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError(
    'sharedPreferencesProvider must be overridden in ProviderScope.',
  );
});

class AppPreferencesNotifier extends Notifier<AppPreferencesState> {
  static const _kThemeMode = 'bookaria.pref.themeMode';
  static const _kHaptics = 'bookaria.pref.haptics';
  static const _kAutoplay = 'bookaria.pref.autoplayAudio';
  static const _kWakeLock = 'bookaria.pref.keepAwake';
  static const _kKidMode = 'bookaria.pref.kidMode';
  static const _kKidPin = 'bookaria.pref.kidPin';
  static const _kKidMaxAge = 'bookaria.pref.kidMaxAge';

  @override
  AppPreferencesState build() {
    final prefs = ref.watch(sharedPreferencesProvider);
    final themeIndex = prefs.getInt(_kThemeMode);
    final themeMode = themeIndex != null &&
            themeIndex >= 0 &&
            themeIndex < ThemeMode.values.length
        ? ThemeMode.values[themeIndex]
        : ThemeMode.light;

    return AppPreferencesState(
      themeMode: themeMode,
      hapticsEnabled: prefs.getBool(_kHaptics) ?? true,
      autoplayAudio: prefs.getBool(_kAutoplay) ?? true,
      keepScreenAwake: prefs.getBool(_kWakeLock) ?? true,
      kidModeEnabled: prefs.getBool(_kKidMode) ?? false,
      kidPin: prefs.getString(_kKidPin) ?? '0000',
      kidMaxAge: prefs.getInt(_kKidMaxAge) ?? 10,
    );
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    state = state.copyWith(themeMode: mode);
    await ref.read(sharedPreferencesProvider).setInt(_kThemeMode, mode.index);
  }

  Future<void> setHapticsEnabled(bool enabled) async {
    state = state.copyWith(hapticsEnabled: enabled);
    await ref.read(sharedPreferencesProvider).setBool(_kHaptics, enabled);
  }

  Future<void> setAutoplayAudio(bool enabled) async {
    state = state.copyWith(autoplayAudio: enabled);
    await ref.read(sharedPreferencesProvider).setBool(_kAutoplay, enabled);
  }

  Future<void> setKeepScreenAwake(bool enabled) async {
    state = state.copyWith(keepScreenAwake: enabled);
    await ref.read(sharedPreferencesProvider).setBool(_kWakeLock, enabled);
  }

  Future<void> setKidMode({
    required bool enabled,
    String? newPin,
    int? maxAge,
  }) async {
    state = state.copyWith(
      kidModeEnabled: enabled,
      kidPin: newPin ?? state.kidPin,
      kidMaxAge: maxAge ?? state.kidMaxAge,
    );
    final prefs = ref.read(sharedPreferencesProvider);
    await prefs.setBool(_kKidMode, enabled);
    if (newPin != null) await prefs.setString(_kKidPin, newPin);
    if (maxAge != null) await prefs.setInt(_kKidMaxAge, maxAge);
  }
}

final appPreferencesProvider =
    NotifierProvider<AppPreferencesNotifier, AppPreferencesState>(
  AppPreferencesNotifier.new,
);
