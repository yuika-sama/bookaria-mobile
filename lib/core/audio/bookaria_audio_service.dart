import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio/just_audio.dart';

/// Multi-channel audio controller matching Bookaria's `BGM`, `VOICE` (narration), and `SFX` slots.
class BookariaAudioService {
  AudioPlayer? _bgmPlayer;
  AudioPlayer? _narrationPlayer;
  AudioPlayer? _sfxPlayer;
  bool _muted = false;

  bool get isMuted => _muted;

  Future<void> setMuted(bool muted) async {
    _muted = muted;
    final volume = muted ? 0.0 : 1.0;
    await _bgmPlayer?.setVolume(volume);
    await _narrationPlayer?.setVolume(volume);
    await _sfxPlayer?.setVolume(volume);
  }

  Future<void> playBackground({
    required String source,
    bool isLocalFile = false,
    bool loop = true,
    double volume = 0.7,
  }) async {
    _bgmPlayer ??= AudioPlayer();
    await _bgmPlayer!.setLoopMode(loop ? LoopMode.one : LoopMode.off);
    await _bgmPlayer!.setVolume(_muted ? 0.0 : volume.clamp(0.0, 1.0));
    if (isLocalFile && File(source).existsSync()) {
      await _bgmPlayer!.setFilePath(source);
    } else {
      await _bgmPlayer!.setUrl(source);
    }
    await _bgmPlayer!.play();
  }

  Future<void> playNarration({
    required String source,
    bool isLocalFile = false,
    double volume = 1.0,
  }) async {
    _narrationPlayer ??= AudioPlayer();
    await _narrationPlayer!.setVolume(_muted ? 0.0 : volume.clamp(0.0, 1.0));
    if (isLocalFile && File(source).existsSync()) {
      await _narrationPlayer!.setFilePath(source);
    } else {
      await _narrationPlayer!.setUrl(source);
    }
    await _narrationPlayer!.play();
  }

  Future<void> playSfx({
    required String source,
    bool isLocalFile = false,
    double volume = 1.0,
  }) async {
    _sfxPlayer ??= AudioPlayer();
    await _sfxPlayer!.setVolume(_muted ? 0.0 : volume.clamp(0.0, 1.0));
    if (isLocalFile && File(source).existsSync()) {
      await _sfxPlayer!.setFilePath(source);
    } else {
      await _sfxPlayer!.setUrl(source);
    }
    await _sfxPlayer!.play();
  }

  Future<void> stopAll() async {
    await _bgmPlayer?.stop();
    await _narrationPlayer?.stop();
    await _sfxPlayer?.stop();
  }

  Future<void> dispose() async {
    await _bgmPlayer?.dispose();
    await _narrationPlayer?.dispose();
    await _sfxPlayer?.dispose();
    _bgmPlayer = null;
    _narrationPlayer = null;
    _sfxPlayer = null;
  }
}

final bookariaAudioServiceProvider = Provider<BookariaAudioService>((ref) {
  final service = BookariaAudioService();
  ref.onDispose(() {
    service.dispose();
  });
  return service;
});
