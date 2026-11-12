import 'package:bookaria_mobile/core/qr/bookaria_link_parser.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('BookariaLinkParser', () {
    test('parses bare slug and preview token', () {
      final slugTarget = BookariaLinkParser.parse('vuon-co-tich-ar');
      expect(slugTarget, isA<PublishedBookTarget>());
      final pub = slugTarget as PublishedBookTarget;
      expect(pub.slug, 'vuon-co-tich-ar');
      expect(pub.page, isNull);
      expect(pub.startInAr, isFalse);
      expect(pub.toAppLocation(), '/reader/book/vuon-co-tich-ar');

      const token = 'AbCdEfGhIjKlMnOpQrStUvWxYz012345';
      final previewTarget = BookariaLinkParser.parse(token);
      expect(previewTarget, isA<PreviewBookTarget>());
      final prev = previewTarget as PreviewBookTarget;
      expect(prev.token, token);
      expect(prev.toAppLocation(), '/reader/preview/$token');
    });

    test('parses published viewer URLs with /read, /p/:page, /ar, and ?mode=ar', () {
      final resRead = BookariaLinkParser.parse(
        'https://viewer.localhost:5174/b/he-mat-troi/read',
      );
      expect(resRead, isA<PublishedBookTarget>());
      final read = resRead as PublishedBookTarget;
      expect(read.slug, 'he-mat-troi');
      expect(read.page, 1);
      expect(read.startInAr, isFalse);
      expect(read.toAppLocation(), '/reader/book/he-mat-troi?page=1');

      final resQueryAr = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/b/he-mat-troi?mode=ar&page=3',
      );
      expect(resQueryAr, isA<PublishedBookTarget>());
      final queryAr = resQueryAr as PublishedBookTarget;
      expect(queryAr.page, 3);
      expect(queryAr.startInAr, isTrue);
      expect(
        queryAr.toAppLocation(),
        '/reader/book/he-mat-troi?page=3&mode=ar',
      );

      final resArPage = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/b/he-mat-troi/ar/p/2',
      );
      expect(resArPage, isA<PublishedBookTarget>());
      final arPage = resArPage as PublishedBookTarget;
      expect(arPage.slug, 'he-mat-troi');
      expect(arPage.page, 2);
      expect(arPage.startInAr, isTrue);
    });

    test('parses custom bookaria:// deep links for published and preview books', () {
      final customPub = BookariaLinkParser.parse('bookaria://b/vuon-co-tich/p/5');
      expect(customPub, isA<PublishedBookTarget>());
      final pub = customPub as PublishedBookTarget;
      expect(pub.slug, 'vuon-co-tich');
      expect(pub.page, 5);
      expect(pub.startInAr, isFalse);

      const token = 'AbCdEfGhIjKlMnOpQrStUvWxYz012345';
      final customPreview = BookariaLinkParser.parse(
        'bookaria://preview/$token/camera',
      );
      expect(customPreview, isA<PreviewBookTarget>());
      final prev = customPreview as PreviewBookTarget;
      expect(prev.token, token);
      expect(prev.startInAr, isTrue);
      expect(prev.toAppLocation(), '/reader/preview/$token?mode=ar');
    });

    test('rejects invalid routes, schemes, and unknown hosts', () {
      const token = 'AbCdEfGhIjKlMnOpQrStUvWxYz012345';
      final preview = BookariaLinkParser.parse(
        'https://viewer.bookaria.vn/preview/$token/ar',
      );
      expect(preview, isA<PreviewBookTarget>());
      expect((preview as PreviewBookTarget).startInAr, isTrue);

      expect(
        BookariaLinkParser.parse('https://example.com/unknown'),
        isA<InvalidBookariaLink>(),
      );
      expect(
        BookariaLinkParser.parse('javascript:alert(1)'),
        isA<InvalidBookariaLink>(),
      );
      expect(
        BookariaLinkParser.parse('https://viewer.bookaria.vn/b/he-mat-troi/foo'),
        isA<InvalidBookariaLink>(),
      );
    });
  });
}
