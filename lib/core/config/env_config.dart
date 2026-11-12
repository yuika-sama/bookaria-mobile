import 'package:flutter/services.dart';

/// Lightweight parser for `.env` URL/config files bundled or loaded locally.
class EnvConfig {
  const EnvConfig._();

  static Map<String, String> parse(String raw) {
    final result = <String, String>{};
    for (final rawLine in raw.split(RegExp(r'\r?\n'))) {
      var line = rawLine.trim();
      if (line.isEmpty || line.startsWith('#')) continue;
      if (line.startsWith('export ')) {
        line = line.substring(7).trim();
      }
      final eqIndex = line.indexOf('=');
      if (eqIndex <= 0) continue;

      final key = line.substring(0, eqIndex).trim();
      if (key.isEmpty) continue;

      var value = line.substring(eqIndex + 1).trim();
      if (value.length >= 2) {
        final first = value[0];
        final last = value[value.length - 1];
        if ((first == '"' && last == '"') || (first == "'" && last == "'")) {
          value = value.substring(1, value.length - 1);
        }
      }
      result[key] = value;
    }
    return Map<String, String>.unmodifiable(result);
  }

  static Future<Map<String, String>> loadFromAsset({
    AssetBundle? bundle,
    String assetPath = '.env',
  }) async {
    try {
      final raw = await (bundle ?? rootBundle).loadString(assetPath);
      return parse(raw);
    } catch (_) {
      return const <String, String>{};
    }
  }
}

