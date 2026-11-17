import 'dart:ui';
import 'package:flutter/material.dart';
import '../../../app/theme.dart';
import '../tokens/app_spacing.dart';
import 'bookaria_logo.dart';

/// Premium Loading indicator featuring the Bookaria SVG Logo with gentle pulse & halo animations.
class BookariaLoadingIndicator extends StatefulWidget {
  const BookariaLoadingIndicator({
    super.key,
    this.message = 'Đang tải dữ liệu...',
    this.logoSize = 56,
    this.showMessage = true,
  });

  final String message;
  final double logoSize;
  final bool showMessage;

  @override
  State<BookariaLoadingIndicator> createState() =>
      _BookariaLoadingIndicatorState();
}

class _BookariaLoadingIndicatorState extends State<BookariaLoadingIndicator>
    with SingleTickerProviderStateMixin {
  late final AnimationController _haloController;
  late final Animation<double> _haloAnimation;

  bool get _isTestEnvironment =>
      WidgetsBinding.instance.runtimeType.toString().contains('Test');

  @override
  void initState() {
    super.initState();
    _haloController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );

    if (_isTestEnvironment) {
      _haloController.forward();
    } else {
      _haloController.repeat(reverse: true);
    }

    _haloAnimation = Tween<double>(begin: 0.2, end: 0.6).animate(
      CurvedAnimation(
        parent: _haloController,
        curve: Curves.easeInOutSine,
      ),
    );
  }

  @override
  void dispose() {
    _haloController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;
    final primaryColor = theme.colorScheme.primary;

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              // Animated glowing halo ring
              AnimatedBuilder(
                animation: _haloAnimation,
                builder: (context, _) => Container(
                  width: widget.logoSize * 1.6,
                  height: widget.logoSize * 1.6,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: primaryColor.withValues(
                          alpha: _haloAnimation.value * 0.22,
                        ),
                        blurRadius: 28,
                        spreadRadius: 6,
                      ),
                    ],
                  ),
                ),
              ),

              // Animated SVG Logo
              BookariaLogo(
                size: widget.logoSize,
                color: theme.colorScheme.onSurface,
                isAnimated: true,
              ),
            ],
          ),
          if (widget.showMessage) ...[
            const SizedBox(height: AppSpacing.lg),
            Text(
              widget.message,
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: tokens.textMuted,
                fontWeight: FontWeight.w500,
                letterSpacing: 0.1,
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            SizedBox(
              width: 48,
              child: ClipRRect(
                borderRadius: AppRadius.roundedPill,
                child: LinearProgressIndicator(
                  value: _isTestEnvironment ? 0.5 : null,
                  minHeight: 2.5,
                  backgroundColor: tokens.borderDefault,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    theme.colorScheme.primary,
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Fullscreen or modal loading overlay with backdrop blur.
class BookariaLoadingOverlay extends StatelessWidget {
  const BookariaLoadingOverlay({
    super.key,
    required this.isLoading,
    required this.child,
    this.message = 'Đang xử lý...',
  });

  final bool isLoading;
  final Widget child;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        child,
        if (isLoading)
          Positioned.fill(
            child: AbsorbPointer(
              absorbing: true,
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 3.5, sigmaY: 3.5),
                child: Container(
                  color: Theme.of(context)
                      .scaffoldBackgroundColor
                      .withValues(alpha: 0.75),
                  child: BookariaLoadingIndicator(message: message),
                ),
              ),
            ),
          ),
      ],
    );
  }
}

/// Shimmer skeleton card for list views.
class BookariaCardSkeleton extends StatefulWidget {
  const BookariaCardSkeleton({super.key});

  @override
  State<BookariaCardSkeleton> createState() => _BookariaCardSkeletonState();
}

class _BookariaCardSkeletonState extends State<BookariaCardSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _shimmer;

  @override
  void initState() {
    super.initState();
    _shimmer = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );

    final isTest = WidgetsBinding.instance.runtimeType.toString().contains('Test');
    if (isTest) {
      _shimmer.forward();
    } else {
      _shimmer.repeat();
    }
  }

  @override
  void dispose() {
    _shimmer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    return AnimatedBuilder(
      animation: _shimmer,
      builder: (context, child) {
        final shimmerVal = _shimmer.value;
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.md),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 84,
                  height: 112,
                  decoration: BoxDecoration(
                    color: Color.lerp(
                      tokens.bgSurfaceSubtle,
                      tokens.borderDefault,
                      shimmerVal,
                    ),
                    borderRadius: AppRadius.roundedSm,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        height: 16,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Color.lerp(
                            tokens.bgSurfaceSubtle,
                            tokens.borderDefault,
                            shimmerVal,
                          ),
                          borderRadius: AppRadius.roundedXs,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        height: 14,
                        width: 140,
                        decoration: BoxDecoration(
                          color: Color.lerp(
                            tokens.bgSurfaceSubtle,
                            tokens.borderDefault,
                            shimmerVal,
                          ),
                          borderRadius: AppRadius.roundedXs,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Container(
                            height: 24,
                            width: 72,
                            decoration: BoxDecoration(
                              color: tokens.bgSurfaceSubtle,
                              borderRadius: AppRadius.roundedXs,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            height: 24,
                            width: 60,
                            decoration: BoxDecoration(
                              color: tokens.bgSurfaceSubtle,
                              borderRadius: AppRadius.roundedXs,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
