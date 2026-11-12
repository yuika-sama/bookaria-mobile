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

  String toAppLocation() {
    final params = <String, String>{};
    if (page != null) params['page'] = '$page';
    if (startInAr) params['mode'] = 'ar';
    final query =
        params.isEmpty ? '' : '?${Uri(queryParameters: params).query}';
    return '/reader/book/${Uri.encodeComponent(slug)}$query';
  }
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

  String toAppLocation() {
    final params = <String, String>{};
    if (page != null) params['page'] = '$page';
    if (startInAr) params['mode'] = 'ar';
    final query =
        params.isEmpty ? '' : '?${Uri(queryParameters: params).query}';
    return '/reader/preview/${Uri.encodeComponent(token)}$query';
  }
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
    if (uri == null) {
      return const InvalidBookariaLink(
        'Mã QR hoặc liên kết không phải định dạng của Bookaria.',
      );
    }

    if (uri.hasScheme) {
      final scheme = uri.scheme.toLowerCase();
      if (scheme != 'http' && scheme != 'https' && scheme != 'bookaria') {
        return const InvalidBookariaLink(
          'Giao thức liên kết không được Bookaria hỗ trợ.',
        );
      }
    }

    final rawSegments = <String>[
      if (uri.scheme.toLowerCase() == 'bookaria' &&
          (uri.host == 'b' || uri.host == 'preview'))
        uri.host,
      ...uri.pathSegments.where((s) => s.isNotEmpty),
    ];

    if (rawSegments.isEmpty) {
      return const InvalidBookariaLink(
        'Mã QR hoặc liên kết không phải định dạng của Bookaria.',
      );
    }

    final queryModeAr =
        uri.queryParameters['mode']?.trim().toLowerCase() == 'ar';
    final queryPage = _positiveInt(uri.queryParameters['page'] ?? '');

    if (rawSegments.length >= 2 && rawSegments[0] == 'b') {
      final slug = rawSegments[1];
      if (!isValidSlug(slug)) {
        return const InvalidBookariaLink('Slug sách không hợp lệ.');
      }
      final parsed = _parseSubSegments(
        rawSegments.sublist(2),
        queryPage: queryPage,
        queryModeAr: queryModeAr,
      );
      if (parsed == null) {
        return const InvalidBookariaLink('Đường dẫn trang sách không hợp lệ.');
      }
      return PublishedBookTarget(
        slug: slug,
        page: parsed.page,
        startInAr: parsed.startInAr,
      );
    }

    if (rawSegments.length >= 2 && rawSegments[0] == 'preview') {
      final token = rawSegments[1];
      if (!isValidPreviewToken(token)) {
        return const InvalidBookariaLink('Mã xem trước không hợp lệ.');
      }
      final parsed = _parseSubSegments(
        rawSegments.sublist(2),
        queryPage: queryPage,
        queryModeAr: queryModeAr,
      );
      if (parsed == null) {
        return const InvalidBookariaLink(
          'Đường dẫn xem trước không hợp lệ.',
        );
      }
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

  static ({int? page, bool startInAr})? _parseSubSegments(
    List<String> tail, {
    int? queryPage,
    bool queryModeAr = false,
  }) {
    if (tail.isEmpty) {
      return (page: queryPage, startInAr: queryModeAr);
    }
    if (tail.length == 1 && tail[0] == 'read') {
      return (page: queryPage ?? 1, startInAr: false);
    }
    if (tail.length == 2 && tail[0] == 'p') {
      final page = _positiveInt(tail[1]);
      if (page == null) return null;
      return (page: page, startInAr: queryModeAr);
    }
    if (tail.length == 1 && (tail[0] == 'ar' || tail[0] == 'camera')) {
      return (page: queryPage, startInAr: true);
    }
    if (tail.length == 3 && tail[0] == 'ar' && tail[1] == 'p') {
      final page = _positiveInt(tail[2]);
      if (page == null) return null;
      return (page: page, startInAr: true);
    }
    return null;
  }

  static int? _positiveInt(String raw) {
    final n = int.tryParse(raw.trim());
    return (n != null && n > 0) ? n : null;
  }
}
