import 'dart:io';

import 'package:bookaria_mobile/app/book_access_guard.dart';
import 'package:bookaria_mobile/app/theme.dart';
import 'package:bookaria_mobile/core/config/app_config.dart';
import 'package:bookaria_mobile/core/contracts/manifest.dart';
import 'package:bookaria_mobile/core/contracts/public_book.dart';
import 'package:bookaria_mobile/core/contracts/reading_events.dart';
import 'package:bookaria_mobile/core/network/api_client.dart';
import 'package:bookaria_mobile/core/preferences/app_preferences.dart';
import 'package:bookaria_mobile/core/storage/app_database.dart';
import 'package:bookaria_mobile/core/storage/offline_storage_paths.dart';
import 'package:bookaria_mobile/core/telemetry/reading_events_service.dart';
import 'package:bookaria_mobile/features/explore/book_detail_screen.dart';
import 'package:bookaria_mobile/features/explore/explore_providers.dart';
import 'package:bookaria_mobile/features/profile/profile_screen.dart';
import 'package:bookaria_mobile/features/reader/unified_reader_screen.dart';
import 'package:bookaria_mobile/features/shelf/shelf_providers.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _FakeApiClient extends BookariaApiClient {
  _FakeApiClient({
    required this.books,
    required this.bookDetail,
    required this.manifest,
  }) : super(AppConfig.fromEnvironment());

  final List<PublicBookCard> books;
  final PublicBook bookDetail;
  final Manifest manifest;
  PublicBooksQuery? lastQuery;

  @override
  Future<PagedResponse<PublicBookCard>> getPublicBooks(
    PublicBooksQuery query, {
    CancelToken? cancelToken,
  }) async {
    lastQuery = query;
    return PagedResponse(
      data: books,
      meta: PaginationMeta(
        page: 1,
        limit: 20,
        total: books.length,
        totalPages: 1,
      ),
    );
  }

  @override
  Future<PublicBook> getPublicBookBySlug(
    String slug, {
    CancelToken? cancelToken,
  }) async {
    return bookDetail;
  }

  @override
  Future<Manifest> fetchManifestFromUrl(
    String manifestUrl, {
    CancelToken? cancelToken,
  }) async {
    return manifest;
  }

  @override
  Future<PreviewLoadResult> getPreviewManifest(
    String token, {
    CancelToken? cancelToken,
  }) async {
    return PreviewLoadResult(
      manifest: manifest,
      expiresAt: DateTime.utc(2030, 1, 1),
    );
  }
}

class _FakeAppDatabase implements AppDatabase {
  final Map<String, OfflineBookRecord> _books = {};
  final Map<String, Map<String, dynamic>> _progress = {};

  @override
  Future<List<OfflineBookRecord>> listOfflineBooks() async =>
      _books.values.toList();

  @override
  Future<OfflineBookRecord?> findOfflineBookBySlug(String slug) async {
    for (final book in _books.values) {
      if (book.slug == slug) return book;
    }
    return null;
  }

  @override
  Future<void> upsertOfflineBook(OfflineBookRecord record) async {
    _books[record.bookId] = record;
  }

  @override
  Future<void> updateLastPage(String slug, int pageIndex) async {}

  @override
  Future<void> deleteOfflineBook(String bookId) async {
    _books.remove(bookId);
  }

  @override
  Future<Map<String, dynamic>?> loadWorkflowProgress(
    String bookId,
    int versionNo,
  ) async =>
      _progress['$bookId:$versionNo'];

  @override
  Future<void> saveWorkflowProgress({
    required String bookId,
    required int versionNo,
    required Map<String, dynamic> snapshot,
  }) async {
    _progress['$bookId:$versionNo'] = snapshot;
  }

  @override
  Future<void> enqueueEvent({
    required String sessionId,
    required String bookVersionId,
    required Map<String, dynamic> deviceJson,
    required Map<String, dynamic> eventJson,
  }) async {}

  @override
  Future<List<PendingEventRow>> peekPendingEvents({int limit = 50}) async =>
      const [];

  @override
  Future<void> deletePendingEvents(List<int> ids) async {}

  @override
  Future<void> close() async {}
}

class _NoopShelfNotifier extends ShelfBooksNotifier {
  @override
  Future<List<OfflineBookRecord>> build() async => const [];

  @override
  Future<void> refresh() async => state = const AsyncData([]);
}

class _NoopEventsService implements ReadingEventsService {
  @override
  dynamic noSuchMethod(Invocation invocation) => Future<void>.value();

  @override
  String newSessionId() => 'test-session-id';

  @override
  Future<void> record({
    required String sessionId,
    required String bookVersionId,
    required ViewerEvent event,
  }) async {}

  @override
  Future<void> flushPending() async {}
}

Manifest _buildInteractiveManifest() {
  return Manifest.fromJson({
    'schemaVersion': 1,
    'bookId': 'book-1',
    'workflowVariables': [
      {
        'key': 'stars',
        'name': 'Stars',
        'type': 'number',
        'initialValue': 0,
      },
    ],
    'version': 1,
    'title': 'Sách Khám Phá 3D',
    'trackerEngine': 'mindar',
    'generatedAt': '2026-10-10T00:00:00.000Z',
    'targetGroups': const <dynamic>[],
    'pages': [
      {
        'pageId': 'p1',
        'title': 'Trang Mở Đầu',
        'aspect': 1.0,
        'imageUrl': 'https://cdn.example.com/p1.jpg',
        'thumbnailUrl': 'https://cdn.example.com/p1_thumb.jpg',
        'marker': {'mode': 'NONE'},
        'settings': {'backgroundLoop': true},
        'scene': {
          'schemaVersion': 1,
          'objects': [
            {
              'id': 'planet',
              'type': 'model',
              'name': 'Hành Tinh',
              'transform': {
                'position': [0, 0, 0],
                'rotation': [0, 0, 0],
                'scale': [1, 1, 1],
              },
            },
          ],
          'interactions': [
            {
              'id': 'rule-1',
              'trigger': {'type': 'onTap', 'objectId': 'planet'},
              'actions': [
                {
                  'type': 'setState',
                  'key': 'stars',
                  'operation': 'increment',
                  'value': 1,
                },
              ],
            },
          ],
        },
      },
    ],
    'assets': const <String, dynamic>{},
    'credits': const <dynamic>[],
  });
}

PublicBook _buildSampleBook({int? ageMin = 12}) {
  return PublicBook(
    slug: 'kham-pha-vu-tru',
    title: 'Khám Phá Vũ Trụ',
    description: 'Sách khoa học 3D.',
    author: const UserRef(id: 'u1', displayName: 'Tác giả A'),
    coverUrl: null,
    language: 'vi',
    ageMin: ageMin,
    ageMax: ageMin != null ? ageMin + 3 : null,
    version: BookVersionRef(
      id: '00000000-0000-4000-8000-000000000010',
      versionNo: 1,
      publishedAt: DateTime.utc(2026, 10, 10),
    ),
    manifestUrl: 'https://cdn.example.com/manifest.json',
    pageCount: 1,
    arPageCount: 0,
    downloadBytes: 1024,
    printPdfUrl: null,
  );
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  GoogleFonts.config.allowRuntimeFetching = false;

  test('BookAccessGuard.isAgeAllowed handles Kid Mode thresholds correctly', () {
    const kidPrefs = AppPreferencesState(
      kidModeEnabled: true,
      kidMaxAge: 8,
    );
    expect(BookAccessGuard.isAgeAllowed(null, kidPrefs), isTrue);
    expect(BookAccessGuard.isAgeAllowed(6, kidPrefs), isTrue);
    expect(BookAccessGuard.isAgeAllowed(8, kidPrefs), isTrue);
    expect(BookAccessGuard.isAgeAllowed(9, kidPrefs), isFalse);

    const adultPrefs = AppPreferencesState(kidModeEnabled: false, kidMaxAge: 8);
    expect(BookAccessGuard.isAgeAllowed(15, adultPrefs), isTrue);
  });

  test('exploreBooksProvider clamps query age and filters unsafe cards in Kid Mode', () async {
    SharedPreferences.setMockInitialValues({
      'bookaria.pref.kidMode': true,
      'bookaria.pref.kidMaxAge': 8,
    });
    final prefs = await SharedPreferences.getInstance();
    final fakeApi = _FakeApiClient(
      books: const [
        PublicBookCard(
          slug: 'sach-be',
          title: 'Sách Cho Bé',
          coverUrl: null,
          author: UserRef(id: 'a1', displayName: 'A1'),
          language: 'vi',
          ageMin: 4,
          ageMax: 8,
          arPageCount: 2,
        ),
        PublicBookCard(
          slug: 'sach-moi-lua-tuoi',
          title: 'Sách Mọi Lứa Tuổi',
          coverUrl: null,
          author: UserRef(id: 'a1', displayName: 'A1'),
          language: 'vi',
          ageMin: null,
          ageMax: null,
          arPageCount: 1,
        ),
        PublicBookCard(
          slug: 'sach-lon',
          title: 'Sách Thiếu Niên',
          coverUrl: null,
          author: UserRef(id: 'a1', displayName: 'A1'),
          language: 'vi',
          ageMin: 12,
          ageMax: 16,
          arPageCount: 3,
        ),
      ],
      bookDetail: _buildSampleBook(),
      manifest: _buildInteractiveManifest(),
    );

    final container = ProviderContainer(
      overrides: [
        sharedPreferencesProvider.overrideWithValue(prefs),
        bookariaApiClientProvider.overrideWithValue(fakeApi),
      ],
    );
    addTearDown(container.dispose);

    container.read(exploreFilterProvider.notifier).setAge(14);
    final res = await container.read(exploreBooksProvider.future);

    expect(fakeApi.lastQuery?.age, 8);
    expect(res.data.map((b) => b.slug).toList(), [
      'sach-be',
      'sach-moi-lua-tuoi',
    ]);
  });

  testWidgets(
    'BookDetailScreen hides Web Viewer link and shows restriction notice in Kid Mode',
    (tester) async {
      SharedPreferences.setMockInitialValues({
        'bookaria.pref.kidMode': true,
        'bookaria.pref.kidMaxAge': 8,
      });
      final prefs = await SharedPreferences.getInstance();
      final db = _FakeAppDatabase();

      final fakeApi = _FakeApiClient(
        books: const [],
        bookDetail: _buildSampleBook(ageMin: 12),
        manifest: _buildInteractiveManifest(),
      );

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            sharedPreferencesProvider.overrideWithValue(prefs),
            appDatabaseProvider.overrideWithValue(db),
            bookariaApiClientProvider.overrideWithValue(fakeApi),
            shelfBooksProvider.overrideWith(_NoopShelfNotifier.new),
          ],
          child: MaterialApp(
            theme: buildBookariaTheme(Brightness.light),
            home: const BookDetailScreen(slug: 'kham-pha-vu-tru'),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('Mở trên Web Viewer'), findsNothing);
      expect(find.textContaining('Cần mã PIN phụ huynh'), findsOneWidget);
    },
  );

  testWidgets(
    'UnifiedReaderScreen prompts Parent PIN for preview under Kid Mode and executes lowercase model + setState fallback',
    (tester) async {
      SharedPreferences.setMockInitialValues({
        'bookaria.pref.kidMode': true,
        'bookaria.pref.kidPin': '1234',
      });
      final prefs = await SharedPreferences.getInstance();
      final db = _FakeAppDatabase();
      final paths = OfflineStoragePaths(Directory.systemTemp);

      final fakeApi = _FakeApiClient(
        books: const [],
        bookDetail: _buildSampleBook(ageMin: 5),
        manifest: _buildInteractiveManifest(),
      );

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            sharedPreferencesProvider.overrideWithValue(prefs),
            appDatabaseProvider.overrideWithValue(db),
            offlineStoragePathsProvider.overrideWith((ref) async => paths),
            bookariaApiClientProvider.overrideWithValue(fakeApi),
            readingEventsServiceProvider.overrideWithValue(_NoopEventsService()),
            shelfBooksProvider.overrideWith(_NoopShelfNotifier.new),
          ],
          child: MaterialApp(
            theme: buildBookariaTheme(Brightness.light),
            home: const UnifiedReaderScreen(
              previewToken: 'AbCdEfGhIjKlMnOpQrStUvWxYz012345',
            ),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));

      // Parent PIN dialog shown because Kid Mode blocks Preview by default
      expect(find.text('Xác nhận phụ huynh'), findsOneWidget);

      // Dismiss without PIN -> locked view shown
      await tester.tap(find.text('Đóng'));
      await tester.pumpAndSettle();
      expect(find.text('Đã khóa bởi Chế độ Trẻ em'), findsOneWidget);

      // Retry with valid PIN -> loads stage & runs lowercase 'model' + 'setState'
      await tester.tap(find.text('Mở bằng mã PIN phụ huynh'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
      await tester.enterText(find.byType(TextField), '1234');
      await tester.tap(find.text('Mở khóa'));
      await tester.pumpAndSettle();

      expect(find.byIcon(Icons.view_in_ar_rounded), findsOneWidget);
      await tester.ensureVisible(find.byType(ActionChip));
      await tester.pumpAndSettle();
      await tester.tap(find.byType(ActionChip));
      await tester.pumpAndSettle();

      expect(find.text('Cập nhật "stars" = 1'), findsOneWidget);
      expect(find.text('stars: 1'), findsOneWidget);
    },
  );

  testWidgets(
    'ProfileScreen PIN verification & change dialogs dispose controllers cleanly after route transitions',
    (tester) async {
      SharedPreferences.setMockInitialValues({
        'bookaria.pref.kidMode': true,
        'bookaria.pref.kidPin': '0000',
      });
      final prefs = await SharedPreferences.getInstance();

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            sharedPreferencesProvider.overrideWithValue(prefs),
            appConfigProvider.overrideWithValue(AppConfig.fromEnvironment()),
            shelfBooksProvider.overrideWith(_NoopShelfNotifier.new),
          ],
          child: MaterialApp(
            theme: buildBookariaTheme(Brightness.light),
            home: const ProfileScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      // Wrong PIN keeps Kid Mode enabled
      await tester.ensureVisible(find.text('Bật Chế độ Trẻ em'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Bật Chế độ Trẻ em'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), '9999');
      await tester.tap(find.text('Xác nhận'));
      await tester.pumpAndSettle();
      expect(find.text('Mã PIN không chính xác.'), findsOneWidget);
      expect(prefs.getBool('bookaria.pref.kidMode'), isTrue);
      await tester.pump(const Duration(seconds: 5));
      await tester.pumpAndSettle();

      // Valid PIN turns Kid Mode off
      await tester.tap(find.text('Bật Chế độ Trẻ em'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), '0000');
      await tester.tap(find.text('Xác nhận'));
      await tester.pumpAndSettle();
      expect(prefs.getBool('bookaria.pref.kidMode'), isFalse);

      // Change PIN: invalid short new PIN shows validation snackbar
      await tester.ensureVisible(find.text('Đổi mã PIN phụ huynh'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Đổi mã PIN phụ huynh'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).first, '0000');
      await tester.enterText(find.byType(TextField).last, '12');
      await tester.tap(find.text('Lưu PIN'));
      await tester.pumpAndSettle();
      expect(
        find.text('PIN cũ không khớp hoặc PIN mới dưới 4 ký tự.'),
        findsOneWidget,
      );
      expect(prefs.getString('bookaria.pref.kidPin'), '0000');
      await tester.pump(const Duration(seconds: 5));
      await tester.pumpAndSettle();

      // Change PIN: valid old + new PIN persists updated PIN cleanly
      await tester.tap(find.text('Đổi mã PIN phụ huynh'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).first, '0000');
      await tester.enterText(find.byType(TextField).last, '2468');
      await tester.tap(find.text('Lưu PIN'));
      await tester.pumpAndSettle();
      expect(find.text('Đã cập nhật mã PIN phụ huynh.'), findsOneWidget);
      expect(prefs.getString('bookaria.pref.kidPin'), '2468');
    },
  );

  testWidgets(
    'BookAccessGuard.promptParentPin handles cancel, wrong PIN, and submit without controller lifecycle errors',
    (tester) async {
      bool? lastResult;
      await tester.pumpWidget(
        MaterialApp(
          theme: buildBookariaTheme(Brightness.light),
          home: Scaffold(
            body: Builder(
              builder: (context) => Center(
                child: ElevatedButton(
                  onPressed: () async {
                    lastResult = await BookAccessGuard.promptParentPin(
                      context,
                      expectedPin: '4321',
                      reason: 'Kiểm tra PIN',
                    );
                  },
                  child: const Text('Mở PIN'),
                ),
              ),
            ),
          ),
        ),
      );

      // Cancel dialog
      await tester.tap(find.text('Mở PIN'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Đóng'));
      await tester.pumpAndSettle();
      expect(lastResult, isFalse);

      // Wrong PIN
      await tester.tap(find.text('Mở PIN'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), '0000');
      await tester.tap(find.text('Mở khóa'));
      await tester.pumpAndSettle();
      expect(lastResult, isFalse);
      expect(find.text('Mã PIN phụ huynh không chính xác.'), findsOneWidget);

      // Correct PIN via keyboard submit
      await tester.tap(find.text('Mở PIN'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), '4321');
      await tester.testTextInput.receiveAction(TextInputAction.done);
      await tester.pumpAndSettle();
      expect(lastResult, isTrue);
    },
  );
}
