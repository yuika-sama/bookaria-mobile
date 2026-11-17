import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../app/theme.dart';
import '../tokens/app_spacing.dart';

/// Unified Toast, SnackBar and In-App Feedback notification system.
class BookariaFeedback {
  BookariaFeedback._();

  static void showSuccess(
    BuildContext context, {
    required String message,
    Duration duration = const Duration(seconds: 3),
  }) {
    HapticFeedback.lightImpact();
    _showSnackBar(
      context,
      message: message,
      icon: Icons.check_circle_rounded,
      duration: duration,
      type: _FeedbackType.success,
    );
  }

  static void showError(
    BuildContext context, {
    required String message,
    String? actionLabel,
    VoidCallback? onAction,
    Duration duration = const Duration(seconds: 4),
  }) {
    HapticFeedback.heavyImpact();
    _showSnackBar(
      context,
      message: message,
      icon: Icons.error_outline_rounded,
      duration: duration,
      type: _FeedbackType.danger,
      actionLabel: actionLabel,
      onAction: onAction,
    );
  }

  static void showWarning(
    BuildContext context, {
    required String message,
    Duration duration = const Duration(seconds: 3),
  }) {
    HapticFeedback.mediumImpact();
    _showSnackBar(
      context,
      message: message,
      icon: Icons.warning_amber_rounded,
      duration: duration,
      type: _FeedbackType.warning,
    );
  }

  static void showInfo(
    BuildContext context, {
    required String message,
    Duration duration = const Duration(seconds: 3),
  }) {
    HapticFeedback.selectionClick();
    _showSnackBar(
      context,
      message: message,
      icon: Icons.info_outline_rounded,
      duration: duration,
      type: _FeedbackType.info,
    );
  }

  static void _showSnackBar(
    BuildContext context, {
    required String message,
    required IconData icon,
    required Duration duration,
    required _FeedbackType type,
    String? actionLabel,
    VoidCallback? onAction,
  }) {
    final messenger = ScaffoldMessenger.maybeOf(context);
    if (messenger == null) return;

    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final (bg, text, border) = switch (type) {
      _FeedbackType.success => (
          tokens.statusSuccessBg,
          tokens.statusSuccessText,
          tokens.statusSuccessText.withValues(alpha: 0.3),
        ),
      _FeedbackType.warning => (
          tokens.statusWarningBg,
          tokens.statusWarningText,
          tokens.statusWarningText.withValues(alpha: 0.3),
        ),
      _FeedbackType.danger => (
          tokens.statusDangerBg,
          tokens.statusDangerText,
          tokens.statusDangerText.withValues(alpha: 0.3),
        ),
      _FeedbackType.info => (
          tokens.bgSurface,
          Theme.of(context).colorScheme.onSurface,
          tokens.borderDefault,
        ),
    };

    messenger.clearSnackBars();
    messenger.showSnackBar(
      SnackBar(
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 24),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        backgroundColor: bg,
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: AppRadius.roundedMd,
          side: BorderSide(color: border, width: 1.2),
        ),
        duration: duration,
        content: Row(
          children: [
            Icon(icon, color: text, size: 20),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Text(
                message,
                style: TextStyle(
                  color: text,
                  fontSize: 13.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
        action: actionLabel != null && onAction != null
            ? SnackBarAction(
                label: actionLabel,
                textColor: text,
                onPressed: onAction,
              )
            : null,
      ),
    );
  }
}

enum _FeedbackType { success, warning, danger, info }
