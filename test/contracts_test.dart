import 'package:bookaria_mobile/core/contracts/manifest.dart';
import 'package:bookaria_mobile/core/contracts/public_book.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('PublicBook & Manifest contracts', () {
    test('parses PublicBookCard and PublicBook', () {
      final card = PublicBookCard.fromJson({
        'slug': 'vuon-co-tich',
        'title': 'Vườn Cổ Tích AR',
        'coverUrl': 'https://cdn.example.com/cover.jpg',
        'author': {'id': 'u1', 'displayName': 'Nguyễn Văn A'},
        'language': 'vi',
        'ageMin': 4,
        'ageMax': 8,
        'arPageCount': 5,
      });

      expect(card.slug, 'vuon-co-tich');
      expect(card.author.displayName, 'Nguyễn Văn A');
      expect(card.arPageCount, 5);

      final detail = PublicBook.fromJson({
        'slug': 'vuon-co-tich',
        'title': 'Vườn Cổ Tích AR',
        'description': 'Sách tương tác cho bé.',
        'author': {'id': 'u1', 'displayName': 'Nguyễn Văn A'},
        'coverUrl': null,
        'language': 'vi',
        'ageMin': 4,
        'ageMax': 8,
        'version': {
          'id': 'v1',
          'versionNo': 2,
          'publishedAt': '2026-10-01T10:00:00.000Z',
        },
        'manifestUrl': 'https://cdn.example.com/manifest.json',
        'pageCount': 8,
        'arPageCount': 5,
        'downloadBytes': 12345678,
        'printPdfUrl': 'https://cdn.example.com/print.pdf',
      });

      expect(detail.version.versionNo, 2);
      expect(detail.downloadBytes, 12345678);
      expect(detail.printPdfUrl, 'https://cdn.example.com/print.pdf');
    });

    test('parses Manifest with pageWidthMm fallback and Scene interactions', () {
      final manifest = Manifest.fromJson({
        'schemaVersion': 1,
        'bookId': 'b1',
        'workflowVariables': [
          {
            'key': 'score',
            'name': 'Điểm',
            'type': 'number',
            'initialValue': 0,
          },
        ],
        'version': 3,
        'title': 'Khám Phá Vũ Trụ',
        'trackerEngine': 'mindar',
        'generatedAt': '2026-10-01T12:00:00.000Z',
        'targetGroups': [
          {
            'group': 0,
            'mindUrl': 'https://cdn.example.com/group0.mind',
            'pageIds': ['p1'],
          },
        ],
        'pages': [
          {
            'pageId': 'p1',
            'title': 'Hệ Mặt Trời',
            'aspect': 0.75,
            'imageUrl': 'https://cdn.example.com/p1.jpg',
            'thumbnailUrl': 'https://cdn.example.com/p1_thumb.jpg',
            'marker': {
              'mode': 'BOOKARIA_MARKER',
              'number': 12,
              'transform': {'x': 0.85, 'y': 0.85, 'size': 0.14},
            },
            'settings': {
              'lighting': 'warm',
              'backgroundLoop': true,
            },
            'scene': {
              'schemaVersion': 1,
              'objects': [
                {
                  'id': 'sun',
                  'type': 'MODEL',
                  'name': 'Mặt Trời',
                  'assetId': 'a1',
                  'transform': {
                    'position': [0, 0.2, 0],
                    'rotation': [0, 0, 0],
                    'scale': [1, 1, 1],
                  },
                },
              ],
              'interactions': [
                {
                  'id': 'r1',
                  'trigger': {'type': 'onTap', 'objectId': 'sun'},
                  'actions': [
                    {'type': 'showMessage', 'text': 'Xin chào Mặt Trời!'},
                  ],
                },
              ],
            },
          },
        ],
        'assets': {
          'a1': {
            'type': 'MODEL',
            'url': 'https://cdn.example.com/sun.glb',
            'size': 204800,
          },
        },
        'credits': const <dynamic>[],
      });

      expect(manifest.pageWidthMm, 210.0);
      expect(manifest.hasAnyArPage, isTrue);
      expect(manifest.pages.first.marker.mode, MarkerMode.bookariaMarker);
      expect(manifest.pages.first.marker.number, 12);
      expect(manifest.pages.first.scene.tappableObjects.length, 1);
      expect(manifest.assets['a1']?.type, AssetType.model);
    });
  });
}
