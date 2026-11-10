import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Semantic tokens aligned with `bookaria-viewer/src/shared/theme/tokens.css`.
@immutable
class BookariaTokens extends ThemeExtension<BookariaTokens> {
  const BookariaTokens({
    required this.bgCanvas,
    required this.bgSurface,
    required this.bgSurfaceSubtle,
    required this.borderDefault,
    required this.textMuted,
    required this.statusSuccessBg,
    required this.statusSuccessText,
    required this.statusWarningBg,
    required this.statusWarningText,
    required this.statusDangerBg,
    required this.statusDangerText,
  });

  final Color bgCanvas;
  final Color bgSurface;
  final Color bgSurfaceSubtle;
  final Color borderDefault;
  final Color textMuted;
  final Color statusSuccessBg;
  final Color statusSuccessText;
  final Color statusWarningBg;
  final Color statusWarningText;
  final Color statusDangerBg;
  final Color statusDangerText;

  static const light = BookariaTokens(
    bgCanvas: Color(0xFFF7F7F7),
    bgSurface: Color(0xFFFFFFFF),
    bgSurfaceSubtle: Color(0xFFFAFAFA),
    borderDefault: Color(0xFFDEDEDE),
    textMuted: Color(0xFF626262),
    statusSuccessBg: Color(0xFFEAF7EF),
    statusSuccessText: Color(0xFF235C3B),
    statusWarningBg: Color(0xFFFFF0D9),
    statusWarningText: Color(0xFF82531B),
    statusDangerBg: Color(0xFFFFF0EF),
    statusDangerText: Color(0xFF9A251C),
  );

  static const dark = BookariaTokens(
    bgCanvas: Color(0xFF111111),
    bgSurface: Color(0xFF1D1D1D),
    bgSurfaceSubtle: Color(0xFF252525),
    borderDefault: Color(0xFF333333),
    textMuted: Color(0xFFA3A3A3),
    statusSuccessBg: Color(0xFF163524),
    statusSuccessText: Color(0xFF8CE0AE),
    statusWarningBg: Color(0xFF3B2810),
    statusWarningText: Color(0xFFF7C77D),
    statusDangerBg: Color(0xFF3D1714),
    statusDangerText: Color(0xFFFFA8A1),
  );

  @override
  BookariaTokens copyWith({
    Color? bgCanvas,
    Color? bgSurface,
    Color? bgSurfaceSubtle,
    Color? borderDefault,
    Color? textMuted,
    Color? statusSuccessBg,
    Color? statusSuccessText,
    Color? statusWarningBg,
    Color? statusWarningText,
    Color? statusDangerBg,
    Color? statusDangerText,
  }) {
    return BookariaTokens(
      bgCanvas: bgCanvas ?? this.bgCanvas,
      bgSurface: bgSurface ?? this.bgSurface,
      bgSurfaceSubtle: bgSurfaceSubtle ?? this.bgSurfaceSubtle,
      borderDefault: borderDefault ?? this.borderDefault,
      textMuted: textMuted ?? this.textMuted,
      statusSuccessBg: statusSuccessBg ?? this.statusSuccessBg,
      statusSuccessText: statusSuccessText ?? this.statusSuccessText,
      statusWarningBg: statusWarningBg ?? this.statusWarningBg,
      statusWarningText: statusWarningText ?? this.statusWarningText,
      statusDangerBg: statusDangerBg ?? this.statusDangerBg,
      statusDangerText: statusDangerText ?? this.statusDangerText,
    );
  }

  @override
  BookariaTokens lerp(ThemeExtension<BookariaTokens>? other, double t) {
    if (other is! BookariaTokens) return this;
    return BookariaTokens(
      bgCanvas: Color.lerp(bgCanvas, other.bgCanvas, t)!,
      bgSurface: Color.lerp(bgSurface, other.bgSurface, t)!,
      bgSurfaceSubtle: Color.lerp(bgSurfaceSubtle, other.bgSurfaceSubtle, t)!,
      borderDefault: Color.lerp(borderDefault, other.borderDefault, t)!,
      textMuted: Color.lerp(textMuted, other.textMuted, t)!,
      statusSuccessBg: Color.lerp(statusSuccessBg, other.statusSuccessBg, t)!,
      statusSuccessText:
          Color.lerp(statusSuccessText, other.statusSuccessText, t)!,
      statusWarningBg: Color.lerp(statusWarningBg, other.statusWarningBg, t)!,
      statusWarningText:
          Color.lerp(statusWarningText, other.statusWarningText, t)!,
      statusDangerBg: Color.lerp(statusDangerBg, other.statusDangerBg, t)!,
      statusDangerText: Color.lerp(statusDangerText, other.statusDangerText, t)!,
    );
  }
}

ThemeData buildBookariaTheme(Brightness brightness) {
  final isDark = brightness == Brightness.dark;
  final tokens = isDark ? BookariaTokens.dark : BookariaTokens.light;

  final colorScheme = ColorScheme(
    brightness: brightness,
    primary: isDark ? const Color(0xFFF7F7F7) : const Color(0xFF252525),
    onPrimary: isDark ? const Color(0xFF111111) : const Color(0xFFFFFFFF),
    secondary: isDark ? const Color(0xFF333333) : const Color(0xFFF0F0F0),
    onSecondary: isDark ? const Color(0xFFF7F7F7) : const Color(0xFF252525),
    error: const Color(0xFFA42B22),
    onError: const Color(0xFFFFFFFF),
    surface: tokens.bgSurface,
    onSurface: isDark ? const Color(0xFFF7F7F7) : const Color(0xFF252525),
    onSurfaceVariant: tokens.textMuted,
    outline: tokens.borderDefault,
    outlineVariant: tokens.borderDefault,
  );

  final baseTheme = ThemeData(
    useMaterial3: true,
    brightness: brightness,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: tokens.bgCanvas,
    extensions: [tokens],
  );

  final bodyTextTheme = _buildBeVietnamProTextTheme(baseTheme.textTheme);
  final headingStyle = GoogleFonts.bricolageGrotesque(
    fontWeight: FontWeight.w600,
    color: colorScheme.onSurface,
  );

  return baseTheme.copyWith(
    textTheme: bodyTextTheme.copyWith(
      headlineSmall: headingStyle.copyWith(fontSize: 22),
      titleLarge: headingStyle.copyWith(fontSize: 20),
      titleMedium: bodyTextTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
    ),
    cardTheme: CardThemeData(
      color: tokens.bgSurface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: tokens.borderDefault),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: tokens.bgSurface,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.borderDefault),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.borderDefault),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(0, 48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(0, 48),
        side: BorderSide(color: tokens.borderDefault),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    ),
  );
}

TextTheme _buildBeVietnamProTextTheme(TextTheme base) {
  return TextTheme(
    displayLarge: GoogleFonts.beVietnamPro(textStyle: base.displayLarge),
    displayMedium: GoogleFonts.beVietnamPro(textStyle: base.displayMedium),
    displaySmall: GoogleFonts.beVietnamPro(textStyle: base.displaySmall),
    headlineLarge: GoogleFonts.beVietnamPro(textStyle: base.headlineLarge),
    headlineMedium: GoogleFonts.beVietnamPro(textStyle: base.headlineMedium),
    headlineSmall: GoogleFonts.beVietnamPro(textStyle: base.headlineSmall),
    titleLarge: GoogleFonts.beVietnamPro(textStyle: base.titleLarge),
    titleMedium: GoogleFonts.beVietnamPro(textStyle: base.titleMedium),
    titleSmall: GoogleFonts.beVietnamPro(textStyle: base.titleSmall),
    bodyLarge: GoogleFonts.beVietnamPro(textStyle: base.bodyLarge),
    bodyMedium: GoogleFonts.beVietnamPro(textStyle: base.bodyMedium),
    bodySmall: GoogleFonts.beVietnamPro(textStyle: base.bodySmall),
    labelLarge: GoogleFonts.beVietnamPro(textStyle: base.labelLarge),
    labelMedium: GoogleFonts.beVietnamPro(textStyle: base.labelMedium),
    labelSmall: GoogleFonts.beVietnamPro(textStyle: base.labelSmall),
  );
}
