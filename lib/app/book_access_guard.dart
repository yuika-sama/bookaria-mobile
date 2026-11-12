import 'package:flutter/material.dart';

import '../core/contracts/api_error.dart';
import '../core/network/api_client.dart';
import '../core/preferences/app_preferences.dart';
import '../core/qr/bookaria_link_parser.dart';
import '../core/storage/app_database.dart';

class ReaderRouteExtra {
  const ReaderRouteExtra({this.parentPinVerified = false});

  final bool parentPinVerified;
}

class BookAccessDecision {
  const BookAccessDecision._({
    required this.allowed,
    this.verifiedByParentPin = false,
  });

  const BookAccessDecision.allowed({bool verifiedByParentPin = false})
      : this._(allowed: true, verifiedByParentPin: verifiedByParentPin);

  const BookAccessDecision.denied() : this._(allowed: false);

  final bool allowed;
  final bool verifiedByParentPin;
}

class BookAccessGuard {
  static bool isAgeAllowed(int? ageMin, AppPreferencesState prefs) {
    if (!prefs.kidModeEnabled) return true;
    if (ageMin == null) return true;
    return ageMin <= prefs.kidMaxAge;
  }

  static Future<BookAccessDecision> authorizeKnownBook(
    BuildContext context, {
    required AppPreferencesState prefs,
    required int? ageMin,
    required String title,
  }) async {
    if (isAgeAllowed(ageMin, prefs)) {
      return const BookAccessDecision.allowed();
    }

    final ok = await promptParentPin(
      context,
      expectedPin: prefs.kidPin,
      reason:
          'Sách "$title" phù hợp từ $ageMin tuổi trở lên (Chế độ Trẻ em đang giới hạn ≤ ${prefs.kidMaxAge} tuổi).',
    );
    return ok
        ? const BookAccessDecision.allowed(verifiedByParentPin: true)
        : const BookAccessDecision.denied();
  }

  static Future<BookAccessDecision> authorizeTarget(
    BuildContext context, {
    required AppPreferencesState prefs,
    required AppDatabase db,
    required BookariaApiClient api,
    required BookariaLinkTarget target,
  }) async {
    if (!prefs.kidModeEnabled) {
      return const BookAccessDecision.allowed();
    }

    switch (target) {
      case InvalidBookariaLink():
        return const BookAccessDecision.denied();

      case PreviewBookTarget():
        final ok = await promptParentPin(
          context,
          expectedPin: prefs.kidPin,
          reason:
              'Liên kết xem trước (Studio Preview) chưa kiểm duyệt độ tuổi khi bật Chế độ Trẻ em.',
        );
        return ok
            ? const BookAccessDecision.allowed(verifiedByParentPin: true)
            : const BookAccessDecision.denied();

      case PublishedBookTarget(:final slug):
        final offline = await db.findOfflineBookBySlug(slug);
        if (offline != null) {
          if (isAgeAllowed(offline.ageMin, prefs)) {
            return const BookAccessDecision.allowed();
          }
          if (!context.mounted) return const BookAccessDecision.denied();
          final ok = await promptParentPin(
            context,
            expectedPin: prefs.kidPin,
            reason:
                'Sách "${offline.title}" phù hợp từ ${offline.ageMin} tuổi trở lên (giới hạn Kid Mode ≤ ${prefs.kidMaxAge} tuổi).',
          );
          return ok
              ? const BookAccessDecision.allowed(verifiedByParentPin: true)
              : const BookAccessDecision.denied();
        }

        try {
          final publicBook = await api.getPublicBookBySlug(slug);
          if (isAgeAllowed(publicBook.ageMin, prefs)) {
            return const BookAccessDecision.allowed();
          }
          if (!context.mounted) return const BookAccessDecision.denied();
          final ok = await promptParentPin(
            context,
            expectedPin: prefs.kidPin,
            reason:
                'Sách "${publicBook.title}" phù hợp từ ${publicBook.ageMin} tuổi trở lên (giới hạn Kid Mode ≤ ${prefs.kidMaxAge} tuổi).',
          );
          return ok
              ? const BookAccessDecision.allowed(verifiedByParentPin: true)
              : const BookAccessDecision.denied();
        } on AppApiException catch (e) {
          // Let 404/410 open normally so the reader/detail view displays its clean unavailable notice.
          if (e.statusCode == 404 || e.statusCode == 410) {
            return const BookAccessDecision.allowed();
          }
          if (!context.mounted) return const BookAccessDecision.denied();
          final ok = await promptParentPin(
            context,
            expectedPin: prefs.kidPin,
            reason:
                'Không kiểm tra được độ tuổi sách khi ngoại tuyến. Cần mã PIN phụ huynh để mở.',
          );
          return ok
              ? const BookAccessDecision.allowed(verifiedByParentPin: true)
              : const BookAccessDecision.denied();
        } catch (_) {
          if (!context.mounted) return const BookAccessDecision.denied();
          final ok = await promptParentPin(
            context,
            expectedPin: prefs.kidPin,
            reason:
                'Không kiểm tra được độ tuổi sách. Cần mã PIN phụ huynh để mở.',
          );
          return ok
              ? const BookAccessDecision.allowed(verifiedByParentPin: true)
              : const BookAccessDecision.denied();
        }
    }
  }

  static Future<bool> promptParentPin(
    BuildContext context, {
    required String expectedPin,
    required String reason,
  }) async {
    final submitted = await showDialog<String>(
      context: context,
      barrierDismissible: false,
      builder: (_) => _ParentPinPromptDialog(reason: reason),
    );

    if (submitted == null) return false;
    final matched = submitted.trim() == expectedPin;
    if (!matched && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Mã PIN phụ huynh không chính xác.')),
      );
    }
    return matched;
  }
}

class _ParentPinPromptDialog extends StatefulWidget {
  const _ParentPinPromptDialog({required this.reason});

  final String reason;

  @override
  State<_ParentPinPromptDialog> createState() => _ParentPinPromptDialogState();
}

class _ParentPinPromptDialogState extends State<_ParentPinPromptDialog> {
  final TextEditingController _pinController = TextEditingController();

  @override
  void dispose() {
    _pinController.dispose();
    super.dispose();
  }

  void _submit([String? rawValue]) {
    Navigator.of(context).pop(rawValue ?? _pinController.text);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Xác nhận phụ huynh'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(widget.reason),
          const SizedBox(height: 12),
          TextField(
            controller: _pinController,
            autofocus: true,
            keyboardType: TextInputType.number,
            obscureText: true,
            maxLength: 6,
            decoration: const InputDecoration(
              labelText: 'Nhập mã PIN phụ huynh',
            ),
            onSubmitted: _submit,
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Đóng'),
        ),
        FilledButton(
          onPressed: () => _submit(),
          child: const Text('Mở khóa'),
        ),
      ],
    );
  }
}

