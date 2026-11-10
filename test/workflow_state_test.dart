import 'package:bookaria_mobile/core/contracts/scene.dart';
import 'package:bookaria_mobile/features/reader/workflow_engine/workflow_state.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('WorkflowState', () {
    test('initializes defaults, sets, increments, toggles, answers, taps', () {
      final state = WorkflowState(
        definitions: const [
          WorkflowVariable(
            key: 'score',
            name: 'Score',
            type: 'number',
            initialValue: 10,
          ),
          WorkflowVariable(
            key: 'unlocked',
            name: 'Unlocked',
            type: 'boolean',
            initialValue: false,
          ),
        ],
      );

      expect(state.values['score'], 10);
      expect(state.values['unlocked'], false);

      state.set(key: 'score', operation: 'increment', value: 5);
      expect(state.values['score'], 15);

      state.set(key: 'unlocked', operation: 'toggle', value: true);
      expect(state.values['unlocked'], true);

      state.tap('p1', 'sun');
      state.tap('p1', 'sun');
      expect(
        state.test(
          {'type': 'interactionCount', 'objectId': 'sun', 'min': 2},
          'p1',
        ),
        isTrue,
      );

      state.answer(
        'q1',
        const WorkflowAnswer(choiceId: 'c1', correct: true),
      );
      expect(
        state.test({'type': 'answer', 'questionId': 'q1', 'result': 'correct'}, 'p1'),
        isTrue,
      );

      final snap = state.snapshot();
      final restored = WorkflowState(
        definitions: const [
          WorkflowVariable(
            key: 'score',
            name: 'Score',
            type: 'number',
            initialValue: 0,
          ),
        ],
        savedSnapshot: snap,
      );
      expect(restored.values['score'], 15);
      expect(restored.counts['p1:sun'], 2);

      restored.reset();
      expect(restored.values['score'], 0);
      expect(restored.answers, isEmpty);
      expect(restored.counts, isEmpty);
    });
  });
}
