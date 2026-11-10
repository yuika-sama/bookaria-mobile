sealed class BookariaLinkTarget {
  const BookariaLinkTarget();
}

class PublishedBookTarget extends BookariaLinkTarget {
  const PublishedBookTarget({
    required this.slug,
    this.page,
    this.startInAr = false,
  });

  final String slug;
  final int? page;
  final bool startInAr;
}

class PreviewBookTarget extends BookariaLinkTarget {
  const PreviewBookTarget({
    required this.token,
    this.page,
    this.startInAr = false,
  });

  final String token;
  final int? page;
  final bool startInAr;
}

class InvalidBookariaLink extends BookariaLinkTarget {
  const InvalidBookariaLink(this.reason);
  final String reason;
}

/// Parses QR codes, deep links, or manual slugs matching `bookaria-viewer` routes.
class BookariaLinkParser {
  static final RegExp slugRegex = RegExp(r'^[a-z0-9]+(?:-[a-z0-9]+)*$');
  static final RegExp previewTokenRegex = RegExp(r'^[A-Za-z0-9_-]{32}$');

  static bool isValidSlug(String value) =>
      value.length >= 3 && value.length <= 80 && slugRegex.hasMatch(value);

  static bool isValidPreviewToken(String value) =>
      previewTokenRegex.hasMatch(value);

  static BookariaLinkTarget parse(String rawInput) {
    final trimmed = rawInput.trim();
    if (trimmed.isEmpty) {
      return const InvalidBookariaLink('Vui lòng nhập liên kết hoặc mã sách.');
    }

    if (isValidSlug(trimmed)) {
      return PublishedBookTarget(slug: trimmed);
    }

    if (isValidPreviewToken(trimmed)) {
      return PreviewBookTarget(token: trimmed);
    }

    final uri = Uri.tryParse(trimmed);
    if (uri == null || uri.pathSegments.isEmpty) {
      return const InvalidBookariaLink(
        'Mã QR hoặc liên kết không phải định dạng của Bookaria.',
      );
    }

    final segments = uri.pathSegments.where((s) => s.isNotEmpty).toList();
    if (segments.length >= 2 && segments[0] == 'b') {
      final slug = segments[1];
      if (!isValidSlug(slug)) {
        return const InvalidBookariaLink('Slug sách không hợp lệ.');
      }
      final parsed = _parseSubSegments(segments.sublist(2));
      return PublishedBookTarget(
        slug: slug,
        page: parsed.page,
        startInAr: parsed.startInAr,
      );
    }

    if (segments.length >= 2 && segments[0] == 'preview') {
      final token = segments[1];
      if (!isValidPreviewToken(token)) {
        return const InvalidBookariaLink('Mã xem trước không hợp lệ.');
      }
      final parsed = _parseSubSegments(segments.sublist(2));
      return PreviewBookTarget(
        token: token,
        page: parsed.page,
        startInAr: parsed.startInAr,
      );
    }

    return const InvalidBookariaLink(
      'Không tìm thấy đường dẫn sách (/b/:slug hoặc /preview/:token).',
    );
  }

  static ({int? page, bool startInAr}) _parseSubSegments(List<String> tail) {
    if (tail.isEmpty) return (page: null, startInAr: false);
    if (tail[0] == 'p' && tail.length >= 2) {
      return (page: _positiveInt(tail[1]), startInAr: false);
    }
    if (tail[0] == 'ar' || tail[0] == 'camera') {
      final page =
          (tail.length >= 3 && tail[1] == 'p') ? _positiveInt(tail[2]) : null;
      return (page: page, startInAr: true);
    }
    return (page: null, startInAr: false);
  }

  static int? _positiveInt(String raw) {
    final n = int.tryParse(raw);
    return (n != null && n > 0) ? n : null;
  }
}
