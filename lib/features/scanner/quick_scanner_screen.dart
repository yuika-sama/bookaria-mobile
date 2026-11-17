import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import '../../app/book_access_guard.dart';
import '../../app/theme.dart';
import '../../core/haptics/haptics_service.dart';
import '../../core/network/api_client.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/qr/bookaria_link_parser.dart';
import '../../core/storage/app_database.dart';
import '../../core/ui/tokens/app_spacing.dart';
import '../../core/ui/widgets/bookaria_feedback.dart';
import '../../core/ui/widgets/interactive_scale.dart';

class QuickScannerScreen extends ConsumerStatefulWidget {
  const QuickScannerScreen({super.key});

  @override
  ConsumerState<QuickScannerScreen> createState() => _QuickScannerScreenState();
}

class _QuickScannerScreenState extends ConsumerState<QuickScannerScreen>
    with SingleTickerProviderStateMixin {
  late final MobileScannerController _controller;
  late final AnimationController _scanLineController;
  bool _navigated = false;
  DateTime? _lastErrorSnackAt;

  @override
  void initState() {
    super.initState();
    _controller = MobileScannerController(
      detectionSpeed: DetectionSpeed.normal,
    );
    _scanLineController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _scanLineController.dispose();
    unawaited(_controller.dispose());
    super.dispose();
  }

  Future<void> _handleRawCode(String rawValue) async {
    if (_navigated || !mounted) return;
    final target = BookariaLinkParser.parse(rawValue);

    switch (target) {
      case PublishedBookTarget():
      case PreviewBookTarget():
        _navigated = true;
        await ref.read(hapticsServiceProvider).medium();
        if (!mounted) {
          _navigated = false;
          return;
        }
        final decision = await BookAccessGuard.authorizeTarget(
          context,
          prefs: ref.read(appPreferencesProvider),
          db: ref.read(appDatabaseProvider),
          api: ref.read(bookariaApiClientProvider),
          target: target,
        );
        if (!decision.allowed || !mounted) {
          _navigated = false;
          return;
        }
        final location = target is PublishedBookTarget
            ? target.toAppLocation()
            : (target as PreviewBookTarget).toAppLocation();
        context.pushReplacement(
          location,
          extra: decision.verifiedByParentPin
              ? const ReaderRouteExtra(parentPinVerified: true)
              : null,
        );
      case InvalidBookariaLink(:final reason):
        final now = DateTime.now();
        if (_lastErrorSnackAt == null ||
            now.difference(_lastErrorSnackAt!) > const Duration(seconds: 3)) {
          _lastErrorSnackAt = now;
          if (mounted) {
            BookariaFeedback.showError(context, message: reason);
          }
        }
    }
  }

  Future<void> _openManualInputSheet() async {
    final submitted = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => const _ManualBookInputSheet(),
    );
    if (submitted != null && submitted.trim().isNotEmpty) {
      await _handleRawCode(submitted);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: const Text('Quét mã QR Bookaria'),
        actions: [
          ValueListenableBuilder<MobileScannerState>(
            valueListenable: _controller,
            builder: (context, scannerState, _) {
              final torchOn = scannerState.torchState == TorchState.on;
              return IconButton(
                tooltip: torchOn ? 'Tắt đèn pin' : 'Bật đèn pin',
                onPressed: () => unawaited(_controller.toggleTorch()),
                icon: Icon(
                  torchOn ? Icons.flash_on_rounded : Icons.flash_off_rounded,
                ),
              );
            },
          ),
        ],
      ),
      body: Stack(
        fit: StackFit.expand,
        children: [
          MobileScanner(
            controller: _controller,
            onDetect: (capture) {
              for (final barcode in capture.barcodes) {
                final raw = barcode.rawValue;
                if (raw != null && raw.isNotEmpty) {
                  unawaited(_handleRawCode(raw));
                  break;
                }
              }
            },
            errorBuilder: (context, error) {
              return Center(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(
                        Icons.no_photography_outlined,
                        color: Colors.white70,
                        size: 56,
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'Không thể truy cập camera trên thiết bị.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        error.errorDetails?.message ?? error.errorCode.name,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white70, fontSize: 13),
                      ),
                      const SizedBox(height: 24),
                      InteractiveScale(
                        child: FilledButton.icon(
                          onPressed: _openManualInputSheet,
                          icon: const Icon(Icons.keyboard_outlined),
                          label: const Text('Nhập mã / liên kết thủ công'),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),

          // Central QR Target frame with scanning line
          Center(
            child: SizedBox(
              width: 250,
              height: 250,
              child: Stack(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.white.withValues(alpha: 0.85),
                        width: 2.5,
                      ),
                      borderRadius: AppRadius.roundedLg,
                    ),
                  ),
                  // Animated laser scanning line
                  AnimatedBuilder(
                    animation: _scanLineController,
                    builder: (context, _) {
                      return Positioned(
                        top: _scanLineController.value * 235,
                        left: 10,
                        right: 10,
                        child: Container(
                          height: 2.5,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                Colors.transparent,
                                Theme.of(context).colorScheme.primary,
                                Colors.white,
                                Theme.of(context).colorScheme.primary,
                                Colors.transparent,
                              ],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Theme.of(context)
                                    .colorScheme
                                    .primary
                                    .withValues(alpha: 0.6),
                                blurRadius: 8,
                                spreadRadius: 1,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),

          // Bottom instruction & manual input CTA
          Positioned(
            left: 20,
            right: 20,
            bottom: 32,
            child: SafeArea(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 10,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.72),
                      borderRadius: AppRadius.roundedMd,
                      border: Border.all(color: Colors.white24),
                    ),
                    child: const Text(
                      'Đưa mã QR trên sách in hoặc Studio Preview vào giữa khung hình.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.white, fontSize: 13),
                    ),
                  ),
                  const SizedBox(height: 12),
                  InteractiveScale(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: Colors.white54),
                        backgroundColor: Colors.black.withValues(alpha: 0.55),
                      ),
                      onPressed: _openManualInputSheet,
                      icon: const Icon(Icons.edit_note_rounded),
                      label: const Text('Nhập slug / link thủ công'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ManualBookInputSheet extends StatefulWidget {
  const _ManualBookInputSheet();

  @override
  State<_ManualBookInputSheet> createState() => _ManualBookInputSheetState();
}

class _ManualBookInputSheetState extends State<_ManualBookInputSheet> {
  final TextEditingController _textController = TextEditingController();
  String? _inputError;

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _submit() {
    final text = _textController.text.trim();
    if (text.isEmpty) {
      setState(() => _inputError = 'Vui lòng nhập mã sách hoặc liên kết!');
      return;
    }
    Navigator.of(context).pop(text);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;

    return Padding(
      padding: EdgeInsets.fromLTRB(
        20,
        16,
        20,
        MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Container(
              width: 36,
              height: 4,
              decoration: BoxDecoration(
                color: tokens.borderDefault,
                borderRadius: AppRadius.roundedPill,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            'Nhập liên kết hoặc mã sách',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Hỗ trợ URL (/b/:slug, /preview/:token), mã preview 32 ký tự hoặc slug sách.',
            style: theme.textTheme.bodySmall?.copyWith(color: tokens.textMuted),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: _textController,
            autofocus: true,
            onChanged: (_) {
              if (_inputError != null) {
                setState(() => _inputError = null);
              }
            },
            decoration: InputDecoration(
              hintText: 'Ví dụ: vuon-co-tich hoặc https://.../b/vuon-co-tich',
              errorText: _inputError,
            ),
            onSubmitted: (_) => _submit(),
          ),
          const SizedBox(height: AppSpacing.lg),
          InteractiveScale(
            child: FilledButton(
              onPressed: _submit,
              child: const Text('Mở sách ngay'),
            ),
          ),
        ],
      ),
    );
  }
}
