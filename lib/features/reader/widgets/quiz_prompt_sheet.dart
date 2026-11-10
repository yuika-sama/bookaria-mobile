import 'package:flutter/material.dart';

import '../../../core/contracts/scene.dart';

class QuizPromptSheet extends StatefulWidget {
  const QuizPromptSheet({
    super.key,
    required this.question,
  });

  final WorkflowQuestion question;

  static Future<String?> show(
    BuildContext context,
    WorkflowQuestion question,
  ) {
    return showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (_) => QuizPromptSheet(question: question),
    );
  }

  @override
  State<QuizPromptSheet> createState() => _QuizPromptSheetState();
}

class _QuizPromptSheetState extends State<QuizPromptSheet> {
  String? _selectedId;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Container(
              width: 36,
              height: 4,
              decoration: BoxDecoration(
                color: theme.colorScheme.outlineVariant,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Câu hỏi tương tác',
            style: theme.textTheme.labelMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            widget.question.title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          for (final choice in widget.question.choices) ...[
            InkWell(
              borderRadius: BorderRadius.circular(10),
              onTap: () => setState(() => _selectedId = choice.id),
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                    color: _selectedId == choice.id
                        ? theme.colorScheme.primary
                        : theme.colorScheme.outlineVariant,
                    width: _selectedId == choice.id ? 2 : 1,
                  ),
                  color: _selectedId == choice.id
                      ? theme.colorScheme.primary.withValues(alpha: 0.08)
                      : null,
                ),
                child: Row(
                  children: [
                    Icon(
                      _selectedId == choice.id
                          ? Icons.radio_button_checked
                          : Icons.radio_button_unchecked,
                      size: 20,
                      color: _selectedId == choice.id
                          ? theme.colorScheme.primary
                          : theme.colorScheme.onSurfaceVariant,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        choice.text,
                        style: theme.textTheme.bodyMedium,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
          ],
          const SizedBox(height: 8),
          FilledButton(
            onPressed: _selectedId == null
                ? null
                : () => Navigator.of(context).pop(_selectedId),
            child: const Text('Xác nhận đáp án'),
          ),
        ],
      ),
    );
  }
}
