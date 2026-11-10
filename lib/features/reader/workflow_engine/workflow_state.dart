import '../../../core/contracts/scene.dart';

class WorkflowAnswer {
  const WorkflowAnswer({
    required this.choiceId,
    required this.correct,
  });

  final String choiceId;
  final bool correct;

  Map<String, dynamic> toJson() => {
        'choiceId': choiceId,
        'correct': correct,
      };

  factory WorkflowAnswer.fromJson(Map<String, dynamic> json) {
    return WorkflowAnswer(
      choiceId: json['choiceId'] as String,
      correct: json['correct'] as bool,
    );
  }
}

/// Dart port of `bookaria-viewer/src/scene-core/WorkflowState.ts`.
/// Holds reader variables, quiz answers, and object tap counts across pages.
class WorkflowState {
  WorkflowState({
    List<WorkflowVariable> definitions = const [],
    Map<String, dynamic>? savedSnapshot,
  }) : _defaults = List.unmodifiable(definitions) {
    _initializeDefaults();
    if (savedSnapshot != null) {
      restore(savedSnapshot);
    }
  }

  static final RegExp _keyRegex = RegExp(r'^[a-zA-Z][a-zA-Z0-9_.:-]{0,63}$');

  final List<WorkflowVariable> _defaults;
  final Map<String, Object> _values = {};
  final Map<String, WorkflowAnswer> _answers = {};
  final Map<String, int> _counts = {};

  Map<String, Object> get values => Map.unmodifiable(_values);
  Map<String, WorkflowAnswer> get answers => Map.unmodifiable(_answers);
  Map<String, int> get counts => Map.unmodifiable(_counts);

  void _initializeDefaults() {
    for (final def in _defaults) {
      _values[def.key] = def.initialValue;
    }
  }

  void restore(Map<String, dynamic> saved) {
    if (saved['version'] != 1) return;
    final rawValues = saved['values'];
    if (rawValues is Map) {
      for (final entry in rawValues.entries.take(200)) {
        final name = entry.key.toString();
        final value = entry.value;
        if (!_keyRegex.hasMatch(name)) continue;
        final validType = value is bool ||
            (value is String && value.length <= 500) ||
            (value is num && value.isFinite && value.abs() <= 1e9);
        if (!validType) continue;
        final matchesDef = _defaults.every((d) {
          if (d.key != name) return true;
          return switch (d.type) {
            'boolean' => value is bool,
            'number' => value is num,
            'string' => value is String,
            _ => false,
          };
        });
        if (matchesDef) _values[name] = value as Object;
      }
    }

    final rawAnswers = saved['answers'];
    if (rawAnswers is Map) {
      for (final entry in rawAnswers.entries.take(200)) {
        final name = entry.key.toString();
        final val = entry.value;
        if (name.length <= 64 &&
            val is Map &&
            val['choiceId'] is String &&
            val['correct'] is bool) {
          _answers[name] = WorkflowAnswer(
            choiceId: val['choiceId'] as String,
            correct: val['correct'] as bool,
          );
        }
      }
    }

    final rawCounts = saved['counts'];
    if (rawCounts is Map) {
      for (final entry in rawCounts.entries.take(1000)) {
        final name = entry.key.toString();
        final count = entry.value;
        if (name.length <= 140 && count is int && count >= 0) {
          _counts[name] = count.clamp(0, 1000000);
        }
      }
    }
  }

  Map<String, dynamic> snapshot() => {
        'version': 1,
        'values': Map<String, Object>.from(_values),
        'answers': _answers.map((k, v) => MapEntry(k, v.toJson())),
        'counts': Map<String, int>.from(_counts),
      };

  void reset() {
    _values.clear();
    _answers.clear();
    _counts.clear();
    _initializeDefaults();
  }

  void set({
    required String key,
    required String operation, // 'set' | 'increment' | 'toggle'
    required Object value,
  }) {
    if (!_values.containsKey(key) && _values.length >= 200) {
      throw StateError('Sách đã đạt giới hạn thông tin ghi nhớ.');
    }

    final previous = _values[key];
    Object next = value;

    if (operation == 'increment') {
      if (previous != null && previous is! num) {
        throw StateError('Thông tin ghi nhớ này không phải điểm số.');
      }
      final prevNum = previous is num ? previous.toDouble() : 0.0;
      final delta = (value as num).toDouble();
      final sum = (prevNum + delta).clamp(-1e9, 1e9);
      next = sum % 1 == 0 ? sum.toInt() : sum;
    } else if (operation == 'toggle') {
      if (previous != null && previous is! bool) {
        throw StateError('Thông tin ghi nhớ này không phải trạng thái Đúng / Sai.');
      }
      next = !(previous as bool? ?? false);
    }

    _values[key] = next;
  }

  void answer(String questionId, WorkflowAnswer answer) {
    if (!_answers.containsKey(questionId) && _answers.length >= 200) {
      _answers.remove(_answers.keys.first);
    }
    _answers[questionId] = answer;
  }

  void tap(String pageId, String objectId) {
    final key = '$pageId:$objectId';
    if (!_counts.containsKey(key) && _counts.length >= 1000) return;
    final current = _counts[key] ?? 0;
    _counts[key] = (current + 1).clamp(0, 1000000);
  }

  bool test(
    Map<String, dynamic> condition,
    String pageId, {
    bool Function(String objectId)? isVisible,
  }) {
    final type = condition['type'] as String?;
    if (type == 'answer') {
      final qId = condition['questionId'] as String;
      final result = condition['result'] as String;
      final ans = _answers[qId];
      return ans != null && ans.correct == (result == 'correct');
    }
    if (type == 'interactionCount') {
      final objectId = condition['objectId'] as String;
      final min = (condition['min'] as num).toInt();
      return (_counts['$pageId:$objectId'] ?? 0) >= min;
    }
    if (type == 'visible') {
      final objectId = condition['objectId'] as String;
      final expected = condition['value'] as bool;
      return (isVisible?.call(objectId) ?? false) == expected;
    }

    // variable condition
    final key = condition['key'] as String;
    final op = condition['operator'] as String;
    final target = condition['value'];
    final current = _values[key] ??
        (target is num ? 0 : target is bool ? false : '');

    if (op == 'eq') return current == target;
    if (op == 'ne') return current != target;
    if (current is! num || target is! num) return false;
    return switch (op) {
      'gt' => current > target,
      'gte' => current >= target,
      'lt' => current < target,
      'lte' => current <= target,
      _ => false,
    };
  }
}
