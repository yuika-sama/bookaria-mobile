import 'package:flutter/material.dart';
import '../../../app/theme.dart';
import '../../contracts/api_error.dart';
import '../tokens/app_spacing.dart';

/// Semantic, responsive Error state widget with smart error categorization & debounce retry.
class BookariaErrorView extends StatefulWidget {
  const BookariaErrorView({
    super.key,
    required this.error,
    this.onRetry,
    this.onSecondaryAction,
    this.secondaryActionLabel,
    this.secondaryActionIcon,
  });

  final Object error;
  final Future<void> Function()? onRetry;
  final VoidCallback? onSecondaryAction;
  final String? secondaryActionLabel;
  final IconData? secondaryActionIcon;

  @override
  State<BookariaErrorView> createState() => _BookariaErrorViewState();
}

class _BookariaErrorViewState extends State<BookariaErrorView> {
  bool _isRetrying = false;

  Future<void> _handleRetry() async {
    if (_isRetrying || widget.onRetry == null) return;
    setState(() => _isRetrying = true);
    try {
      await widget.onRetry!();
    } finally {
      if (mounted) {
        setState(() => _isRetrying = false);
      }
    }
  }

  (IconData, String, String) _resolveErrorInfo() {
    final err = widget.error;
    if (err is AppApiException) {
      return switch (err.code) {
        BookariaErrorCode.networkError => (
            Icons.wifi_off_rounded,
            'Không có kết nối mạng',
            'Vui lòng kiểm tra lại Wi-Fi hoặc dữ liệu di động của bạn rồi thử lại.',
          ),
        BookariaErrorCode.notFound => (
            Icons.search_off_rounded,
            'Không tìm thấy nội dung',
            err.message.isNotEmpty
                ? err.message
                : 'Sách hoặc tài nguyên bạn tìm kiếm hiện không tồn tại.',
          ),
        BookariaErrorCode.bookUnavailable || BookariaErrorCode.bookTakenDown => (
            Icons.block_rounded,
            'Sách tạm thời ngừng phát hành',
            'Nội dung này hiện đã được gỡ xuống hoặc đang được cập nhật.',
          ),
        BookariaErrorCode.tokenExpired || BookariaErrorCode.tokenInvalid => (
            Icons.history_toggle_off_rounded,
            'Liên kết đã hết hạn',
            'Mã xem trước hoặc token đã quá hạn. Hãy tạo liên kết mới từ Studio.',
          ),
        BookariaErrorCode.forbidden || BookariaErrorCode.unauthenticated => (
            Icons.lock_person_outlined,
            'Không có quyền truy cập',
            'Bạn cần quyền truy cập hợp lệ để mở nội dung này.',
          ),
        _ => (
            Icons.cloud_off_rounded,
            'Chưa kết nối được máy chủ',
            err.message.isNotEmpty
                ? err.message
                : 'Đã xảy ra sự cố trong quá trình giao tiếp với hệ thống.',
          ),
      };
    }

    final errString = widget.error.toString().toLowerCase();
    if (errString.contains('socket') ||
        errString.contains('network') ||
        errString.contains('connection') ||
        errString.contains('mạng')) {
      return (
        Icons.wifi_off_rounded,
        'Mất kết nối Internet',
        'Vui lòng kiểm tra lại mạng Wi-Fi hoặc 4G/5G của bạn.',
      );
    }

    return (
      Icons.sentiment_dissatisfied_rounded,
      'Đã xảy ra sự cố',
      widget.error.toString(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;
    final (icon, title, desc) = _resolveErrorInfo();

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.xxl,
          vertical: AppSpacing.xxxl,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: tokens.statusDangerBg,
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                size: 48,
                color: tokens.statusDangerText,
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            Text(
              title,
              textAlign: TextAlign.center,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              desc,
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: tokens.textMuted,
                height: 1.45,
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            if (widget.onRetry != null) ...[
              FilledButton.icon(
                onPressed: _isRetrying ? null : _handleRetry,
                icon: _isRetrying
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.refresh_rounded),
                label: Text(_isRetrying ? 'Đang thử lại...' : 'Thử lại'),
              ),
            ],
            if (widget.onSecondaryAction != null &&
                widget.secondaryActionLabel != null) ...[
              const SizedBox(height: AppSpacing.md),
              OutlinedButton.icon(
                onPressed: widget.onSecondaryAction,
                icon: Icon(
                  widget.secondaryActionIcon ?? Icons.arrow_back_rounded,
                ),
                label: Text(widget.secondaryActionLabel!),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
