import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:bookaria_mobile/app/theme.dart';

void main() {
  testWidgets('ChoiceChip text with and without checkmark does not fade or clip', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildBookariaTheme(Brightness.light),
        home: Scaffold(
          body: SizedBox(
            height: 46,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                ChoiceChip(
                  label: const Text(
                    'Mới nhất',
                    overflow: TextOverflow.visible,
                    softWrap: false,
                  ),
                  selected: true,
                  onSelected: (_) {},
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  labelPadding: const EdgeInsets.symmetric(horizontal: 4),
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                ChoiceChip(
                  label: const Text(
                    'Phổ biến',
                    overflow: TextOverflow.visible,
                    softWrap: false,
                  ),
                  selected: false,
                  onSelected: (_) {},
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  labelPadding: const EdgeInsets.symmetric(horizontal: 4),
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                ChoiceChip(
                  label: const Text(
                    'Tất cả độ tuổi',
                    overflow: TextOverflow.visible,
                    softWrap: false,
                  ),
                  selected: true,
                  onSelected: (_) {},
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  labelPadding: const EdgeInsets.symmetric(horizontal: 4),
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                ChoiceChip(
                  label: const Text(
                    '4+ tuổi',
                    overflow: TextOverflow.visible,
                    softWrap: false,
                  ),
                  selected: false,
                  onSelected: (_) {},
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  labelPadding: const EdgeInsets.symmetric(horizontal: 4),
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    final textFinders = [
      find.text('Mới nhất'),
      find.text('Phổ biến'),
      find.text('Tất cả độ tuổi'),
      find.text('4+ tuổi'),
    ];

    for (final finder in textFinders) {
      expect(finder, findsOneWidget);
      final RenderParagraph rp = tester.renderObject(finder);
      debugPrint('Text "${rp.text.toPlainText()}": size=${rp.size}, overflow=${rp.overflow}');
      expect(rp.overflow, equals(TextOverflow.visible));
    }
  });
}
