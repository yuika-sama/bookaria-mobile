import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../app/theme.dart';
import '../tokens/app_spacing.dart';
import '../widgets/interactive_scale.dart';

enum PinPanelMode {
  verify,
  setup,
  change,
}

/// Unified, interactive PIN Input Panel component for verification, creation, and modification.
class PinInputPanel extends StatefulWidget {
  const PinInputPanel({
    super.key,
    required this.mode,
    this.expectedPin,
    this.reason,
    this.onVerified,
    this.onPinChanged,
    this.onCancel,
    this.pinLength = 4,
  });

  final PinPanelMode mode;
  final String? expectedPin;
  final String? reason;
  final ValueChanged<bool>? onVerified;
  final ValueChanged<String>? onPinChanged;
  final VoidCallback? onCancel;
  final int pinLength;

  @override
  State<PinInputPanel> createState() => _PinInputPanelState();
}

class _PinInputPanelState extends State<PinInputPanel>
    with SingleTickerProviderStateMixin {
  late final AnimationController _shakeController;
  late final Animation<double> _shakeAnimation;

  String _currentInput = '';
  String? _newPinDraft;
  int _changeStep = 1; // 1: Old PIN, 2: New PIN, 3: Confirm New PIN
  String? _errorMessage;
  bool _isSuccess = false;

  @override
  void initState() {
    super.initState();
    _shakeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 450),
    );

    _shakeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _shakeController,
        curve: Curves.easeInOut,
      ),
    );
  }

  @override
  void dispose() {
    _shakeController.dispose();
    super.dispose();
  }

  void _triggerShake({required String errorMsg}) {
    HapticFeedback.heavyImpact();
    setState(() {
      _errorMessage = errorMsg;
      _currentInput = '';
    });
    _shakeController.forward(from: 0.0);
  }

  void _onKeypadTap(String digit) {
    if (_isSuccess) return;
    if (_currentInput.length >= widget.pinLength) return;

    HapticFeedback.lightImpact();
    setState(() {
      _errorMessage = null;
      _currentInput += digit;
    });

    if (_currentInput.length == widget.pinLength) {
      _handleCompletedInput(_currentInput);
    }
  }

  void _onBackspace() {
    if (_currentInput.isEmpty || _isSuccess) return;
    HapticFeedback.selectionClick();
    setState(() {
      _errorMessage = null;
      _currentInput = _currentInput.substring(0, _currentInput.length - 1);
    });
  }

  void _onClear() {
    if (_currentInput.isEmpty || _isSuccess) return;
    HapticFeedback.mediumImpact();
    setState(() {
      _errorMessage = null;
      _currentInput = '';
    });
  }

  Future<void> _handleCompletedInput(String pin) async {
    switch (widget.mode) {
      case PinPanelMode.verify:
        final expected = widget.expectedPin ?? '0000';
        if (pin == expected) {
          _handleSuccess(true);
        } else {
          _triggerShake(errorMsg: 'Mã PIN không chính xác. Vui lòng thử lại!');
        }
        break;

      case PinPanelMode.setup:
        if (_changeStep == 1) {
          setState(() {
            _newPinDraft = pin;
            _currentInput = '';
            _changeStep = 2;
          });
        } else {
          if (pin == _newPinDraft) {
            _handleSuccess(pin);
          } else {
            _triggerShake(errorMsg: 'Mã PIN xác nhận không khớp. Hãy nhập lại!');
            setState(() {
              _changeStep = 1;
              _newPinDraft = null;
            });
          }
        }
        break;

      case PinPanelMode.change:
        final expectedOld = widget.expectedPin ?? '0000';
        if (_changeStep == 1) {
          if (pin == expectedOld) {
            unawaited(HapticFeedback.mediumImpact());
            setState(() {
              _currentInput = '';
              _changeStep = 2;
            });
          } else {
            _triggerShake(errorMsg: 'Mã PIN hiện tại không đúng!');
          }
        } else if (_changeStep == 2) {
          unawaited(HapticFeedback.mediumImpact());
          setState(() {
            _newPinDraft = pin;
            _currentInput = '';
            _changeStep = 3;
          });
        } else {
          if (pin == _newPinDraft) {
            _handleSuccess(pin);
          } else {
            _triggerShake(errorMsg: 'PIN mới xác nhận không khớp. Hãy thử lại!');
            setState(() {
              _changeStep = 2;
              _newPinDraft = null;
            });
          }
        }
        break;
    }
  }

  void _handleSuccess(dynamic result) {
    HapticFeedback.lightImpact();
    setState(() {
      _isSuccess = true;
      _errorMessage = null;
    });

    Future.delayed(const Duration(milliseconds: 250), () {
      if (!mounted) return;
      if (widget.mode == PinPanelMode.verify) {
        widget.onVerified?.call(result as bool);
      } else {
        widget.onPinChanged?.call(result as String);
      }
    });
  }

  String _getTitle() {
    return switch (widget.mode) {
      PinPanelMode.verify => 'Xác nhận mã PIN',
      PinPanelMode.setup => _changeStep == 1 ? 'Tạo mã PIN mới' : 'Xác nhận mã PIN mới',
      PinPanelMode.change => switch (_changeStep) {
          1 => 'Nhập PIN hiện tại',
          2 => 'Tạo PIN mới',
          _ => 'Xác nhận PIN mới',
        },
    };
  }

  String _getSubtitle() {
    if (widget.mode == PinPanelMode.verify) {
      return widget.reason ?? 'Nhập mã PIN phụ huynh để tiếp tục.';
    }
    if (widget.mode == PinPanelMode.setup) {
      return _changeStep == 1
          ? 'Đặt 4 chữ số bảo vệ Chế độ Trẻ em'
          : 'Nhập lại mã PIN vừa chọn để xác nhận';
    }
    return switch (_changeStep) {
      1 => 'Bước 1/3: Xác thực mã PIN phụ huynh đang dùng',
      2 => 'Bước 2/3: Nhập mã PIN 4 số mới',
      _ => 'Bước 3/3: Nhập lại mã PIN mới lần nữa',
    };
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Header with Drag handle and Close button
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const SizedBox(width: 40),
              Container(
                width: 36,
                height: 4,
                decoration: BoxDecoration(
                  color: tokens.borderDefault,
                  borderRadius: AppRadius.roundedPill,
                ),
              ),
              if (widget.onCancel != null)
                IconButton(
                  tooltip: 'Đóng',
                  icon: const Icon(Icons.close_rounded, size: 20),
                  onPressed: widget.onCancel,
                )
              else
                const SizedBox(width: 40),
            ],
          ),
          const SizedBox(height: AppSpacing.md),

          // Icon badge
          AnimatedContainer(
            duration: const Duration(milliseconds: 240),
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: _isSuccess
                  ? tokens.statusSuccessBg
                  : _errorMessage != null
                      ? tokens.statusDangerBg
                      : tokens.bgSurfaceSubtle,
              shape: BoxShape.circle,
              border: Border.all(
                color: _isSuccess
                    ? tokens.statusSuccessText.withValues(alpha: 0.3)
                    : _errorMessage != null
                        ? tokens.statusDangerText.withValues(alpha: 0.3)
                        : tokens.borderDefault,
              ),
            ),
            child: Icon(
              _isSuccess
                  ? Icons.check_circle_outline_rounded
                  : _errorMessage != null
                      ? Icons.error_outline_rounded
                      : Icons.lock_outline_rounded,
              size: 32,
              color: _isSuccess
                  ? tokens.statusSuccessText
                  : _errorMessage != null
                      ? tokens.statusDangerText
                      : theme.colorScheme.primary,
            ),
          ),
          const SizedBox(height: AppSpacing.md),

          // Title
          Text(
            _getTitle(),
            textAlign: TextAlign.center,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w700,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),

          // Subtitle / Reason
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              _getSubtitle(),
              textAlign: TextAlign.center,
              style: theme.textTheme.bodySmall?.copyWith(
                color: tokens.textMuted,
                height: 1.4,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),

          // PIN Cells with Shake Animation
          AnimatedBuilder(
            animation: _shakeAnimation,
            builder: (context, child) {
              final sine = math.sin(_shakeAnimation.value * math.pi * 5);
              final dx = sine * 12.0 * (1.0 - _shakeAnimation.value);
              return Transform.translate(
                offset: Offset(dx, 0),
                child: child,
              );
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(widget.pinLength, (index) {
                final isFilled = index < _currentInput.length;
                final isFocused = index == _currentInput.length && !_isSuccess;

                return AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  margin: const EdgeInsets.symmetric(horizontal: 8),
                  width: 48,
                  height: 52,
                  decoration: BoxDecoration(
                    color: isFilled
                        ? (_isSuccess
                            ? tokens.statusSuccessBg
                            : _errorMessage != null
                                ? tokens.statusDangerBg
                                : tokens.bgSurface)
                        : tokens.bgSurfaceSubtle,
                    borderRadius: AppRadius.roundedMd,
                    border: Border.all(
                      color: _isSuccess
                          ? tokens.statusSuccessText
                          : _errorMessage != null
                              ? tokens.statusDangerText
                              : isFocused
                                  ? theme.colorScheme.primary
                                  : tokens.borderDefault,
                      width: isFocused ? 2.0 : 1.2,
                    ),
                  ),
                  child: Center(
                    child: isFilled
                        ? Container(
                            width: 14,
                            height: 14,
                            decoration: BoxDecoration(
                              color: _isSuccess
                                  ? tokens.statusSuccessText
                                  : _errorMessage != null
                                      ? tokens.statusDangerText
                                      : theme.colorScheme.onSurface,
                              shape: BoxShape.circle,
                            ),
                          )
                        : isFocused
                            ? Container(
                                width: 2,
                                height: 18,
                                color: theme.colorScheme.primary.withValues(
                                  alpha: 0.6,
                                ),
                              )
                            : null,
                  ),
                );
              }),
            ),
          ),

          // Inline Error text
          SizedBox(
            height: 28,
            child: Center(
              child: _errorMessage != null
                  ? Text(
                      _errorMessage!,
                      style: TextStyle(
                        color: tokens.statusDangerText,
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600,
                      ),
                    )
                  : null,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),

          // Numpad Keypad
          _buildKeypad(theme, tokens),

          const SizedBox(height: AppSpacing.md),
          if (widget.onCancel != null)
            TextButton(
              onPressed: widget.onCancel,
              child: const Text('Hủy bỏ'),
            ),
        ],
      ),
    );
  }

  Widget _buildKeypad(ThemeData theme, BookariaTokens tokens) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 290),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: ['1', '2', '3'].map((d) => _buildKeypadButton(d, theme, tokens)).toList(),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: ['4', '5', '6'].map((d) => _buildKeypadButton(d, theme, tokens)).toList(),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: ['7', '8', '9'].map((d) => _buildKeypadButton(d, theme, tokens)).toList(),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Clear All or Cancel
              _buildActionButton(
                icon: Icons.refresh_rounded,
                tooltip: 'Xóa toàn bộ',
                onTap: _onClear,
                tokens: tokens,
              ),
              _buildKeypadButton('0', theme, tokens),
              // Backspace
              _buildActionButton(
                icon: Icons.backspace_outlined,
                tooltip: 'Xóa',
                onTap: _onBackspace,
                onLongPress: _onClear,
                tokens: tokens,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildKeypadButton(String digit, ThemeData theme, BookariaTokens tokens) {
    return InteractiveScale(
      onTap: () => _onKeypadTap(digit),
      borderRadius: AppRadius.roundedPill,
      child: Container(
        width: 72,
        height: 56,
        decoration: BoxDecoration(
          color: tokens.bgSurface,
          borderRadius: AppRadius.roundedLg,
          border: Border.all(color: tokens.borderDefault, width: 1.0),
          boxShadow: AppShadows.soft(theme.colorScheme.shadow),
        ),
        child: Center(
          child: Text(
            digit,
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
              fontSize: 22,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String tooltip,
    required VoidCallback onTap,
    VoidCallback? onLongPress,
    required BookariaTokens tokens,
  }) {
    return InteractiveScale(
      onTap: onTap,
      onLongPress: onLongPress,
      borderRadius: AppRadius.roundedLg,
      child: Container(
        width: 72,
        height: 56,
        decoration: BoxDecoration(
          color: tokens.bgSurfaceSubtle,
          borderRadius: AppRadius.roundedLg,
        ),
        child: Center(
          child: Icon(icon, size: 22, color: tokens.textMuted),
        ),
      ),
    );
  }
}

/// Helper modal sheet launcher for PIN authentication.
class PinAuthSheet {
  PinAuthSheet._();

  static Future<bool> showVerify(
    BuildContext context, {
    required String expectedPin,
    String? reason,
  }) async {
    final result = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetContext) => SafeArea(
        child: PinInputPanel(
          mode: PinPanelMode.verify,
          expectedPin: expectedPin,
          reason: reason,
          onVerified: (verified) => Navigator.of(sheetContext).pop(verified),
          onCancel: () => Navigator.of(sheetContext).pop(false),
        ),
      ),
    );
    return result ?? false;
  }

  static Future<String?> showChange(
    BuildContext context, {
    required String currentPin,
  }) async {
    final result = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetContext) => SafeArea(
        child: PinInputPanel(
          mode: PinPanelMode.change,
          expectedPin: currentPin,
          onPinChanged: (newPin) => Navigator.of(sheetContext).pop(newPin),
          onCancel: () => Navigator.of(sheetContext).pop(null),
        ),
      ),
    );
    return result;
  }

  static Future<String?> showSetup(BuildContext context) async {
    final result = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetContext) => SafeArea(
        child: PinInputPanel(
          mode: PinPanelMode.setup,
          onPinChanged: (newPin) => Navigator.of(sheetContext).pop(newPin),
          onCancel: () => Navigator.of(sheetContext).pop(null),
        ),
      ),
    );
    return result;
  }
}
