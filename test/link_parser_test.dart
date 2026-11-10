import 'package:bookaria_mobile/core/qr/bookaria_link_parser.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('BookariaLinkParser', () {
    test('parses bare slug and preview token', () {
      final slugTarget = BookariaLinkParser.parse('vuon-co-tich-ar');
      expect(slugTarget, isA<PublishedBookTarget>());
      expect((slugTarget as PublishedBookTarget).slug, 'vuon-co-tich-ar');
      expect(slugTarget.page, isNull);
      expect(slugTarget.startInAr, isFalse);

      const token = 'AbCdEfGhIjKlMnOpQrStUvWxYz012345';
      final previewTarget = BookariaLinkParser.parse(token);
      expect(previewTarget, isA<PreviewBookTarget>());
      expect((previewTarget as PreviewBookTarget).token, token);
    });

    test('parses published viewer URLs with page and ar flags', () {
      final res1 = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/b/he-mat-troi/p/4',
      );
      expect(res1, isA<PublishedBookTarget>());
      final p1 = res1 as PublishedBookTarget;
      expect(p1.slug, 'he-mat-troi');
      expect(p1.page, 4);
      expect(p1.startInAr, isFalse);

      final res2 = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/b/he-mat-troi/ar/p/2',
      );
      expect(res2, isA<PublishedBookTarget>());
      final p2 = res2 as PublishedBookTarget;
      expect(p2.slug, 'he-mat-troi');
      expect(p2.page, 2);
      expect(p2.startInAr, isTrue);
    });

    test('parses preview URLs and rejects invalid values', () {
      const token = 'AbCdEfGhIjKlMnOpQrStUvWxYz012345';
      final preview = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/preview/$token/ar',
      );
      expect(preview, isA<PreviewBookTarget>());
      expect((preview as PreviewBookTarget).startInAr, isTrue);

      final invalid = BookariaLinkParser.parse('https://example.com/unknown');
      expect(invalid, isA<InvalidBookariaLink>());
    });
  });
}
