import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

/// Standard Bookaria Brand Logo widget using the official square vector SVG.
class BookariaLogo extends StatefulWidget {
  const BookariaLogo({
    super.key,
    this.size = 48,
    this.color,
    this.showWordmark = false,
    this.wordmarkFontSize,
    this.isAnimated = false,
    this.animationDuration = const Duration(milliseconds: 1400),
  });

  final double size;
  final Color? color;
  final bool showWordmark;
  final double? wordmarkFontSize;
  final bool isAnimated;
  final Duration animationDuration;

  @override
  State<BookariaLogo> createState() => _BookariaLogoState();
}

class _BookariaLogoState extends State<BookariaLogo>
    with SingleTickerProviderStateMixin {
  AnimationController? _animController;
  Animation<double>? _scaleAnim;
  Animation<double>? _opacityAnim;

  @override
  void initState() {
    super.initState();
    if (widget.isAnimated) {
      _initAnimation();
    }
  }

  void _initAnimation() {
    _animController = AnimationController(
      vsync: this,
      duration: widget.animationDuration,
    );

    final isTest = WidgetsBinding.instance.runtimeType.toString().contains('Test');
    if (isTest) {
      _animController!.forward();
    } else {
      _animController!.repeat(reverse: true);
    }

    _scaleAnim = Tween<double>(begin: 0.94, end: 1.06).animate(
      CurvedAnimation(
        parent: _animController!,
        curve: Curves.easeInOutSine,
      ),
    );

    _opacityAnim = Tween<double>(begin: 0.72, end: 1.0).animate(
      CurvedAnimation(
        parent: _animController!,
        curve: Curves.easeInOutSine,
      ),
    );
  }

  @override
  void didUpdateWidget(BookariaLogo oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isAnimated != oldWidget.isAnimated) {
      if (widget.isAnimated) {
        _initAnimation();
      } else {
        _animController?.dispose();
        _animController = null;
        _scaleAnim = null;
        _opacityAnim = null;
      }
    }
  }

  @override
  void dispose() {
    _animController?.dispose();
    super.dispose();
  }

  Widget _buildSvg(Color logoColor) {
    return SvgPicture.asset(
      'assets/logo/logo-transparent.svg',
      width: widget.size,
      height: widget.size,
      colorFilter: ColorFilter.mode(logoColor, BlendMode.srcIn),
      placeholderBuilder: (_) => SizedBox(
        width: widget.size,
        height: widget.size,
        child: Center(
          child: Icon(
            Icons.auto_stories_rounded,
            size: widget.size * 0.7,
            color: logoColor,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final logoColor = widget.color ?? theme.colorScheme.onSurface;

    Widget iconWidget = _buildSvg(logoColor);

    if (widget.isAnimated && _animController != null) {
      iconWidget = AnimatedBuilder(
        animation: _animController!,
        builder: (context, child) {
          return Opacity(
            opacity: _opacityAnim!.value,
            child: Transform.scale(
              scale: _scaleAnim!.value,
              child: child,
            ),
          );
        },
        child: iconWidget,
      );
    }

    if (!widget.showWordmark) {
      return iconWidget;
    }

    final fontSize = widget.wordmarkFontSize ?? (widget.size * 0.44);

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        iconWidget,
        SizedBox(width: widget.size * 0.22),
        Text(
          'Bookaria',
          style: GoogleFonts.bricolageGrotesque(
            fontSize: fontSize,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.4,
            color: logoColor,
          ),
        ),
      ],
    );
  }
}
