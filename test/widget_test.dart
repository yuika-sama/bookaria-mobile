import 'package:bookaria_mobile/app/app.dart';
import 'package:bookaria_mobile/core/contracts/public_book.dart';
import 'package:bookaria_mobile/core/contracts/reading_events.dart';
import 'package:bookaria_mobile/core/preferences/app_preferences.dart';
import 'package:bookaria_mobile/core/storage/app_database.dart';
import 'package:bookaria_mobile/core/telemetry/reading_events_service.dart';
import 'package:bookaria_mobile/features/explore/explore_providers.dart';
import 'package:bookaria_mobile/features/shelf/shelf_providers.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _NoopShelfBooksNotifier extends ShelfBooksNotifier {
  @override
  Future<List<OfflineBookRecord>> build() async => const [];

  @override
  Future<void> refresh() async {
    state = const AsyncData([]);
  }
}

class _NoopReadingEventsService implements ReadingEventsService {
  @override
  dynamic noSuchMethod(Invocation invocation) => Future<void>.value();

  @override
  ReadingDevice currentDevice() => const ReadingDevice(
        type: 'mobile',
        os: 'Linux',
        browser: 'BookariaAppTest',
      );

  @override
  String newSessionId() => 'test-session';

  @override
  Future<void> flushPending() async {}
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  GoogleFonts.config.allowRuntimeFetching = false;

  testWidgets('BookariaApp renders Explore, Shelf, and Profile tabs', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final prefs = await SharedPreferences.getInstance();

    const mockBooks = PagedResponse<PublicBookCard>(
      data: [
        PublicBookCard(
          slug: 'kham-pha-khung-long',
          title: 'Khám Phá Khủng Long',
          coverUrl: null,
          author: UserRef(id: 'u1', displayName: 'Bookaria Studio'),
          language: 'vi',
          ageMin: 5,
          ageMax: 9,
          arPageCount: 6,
        ),
      ],
      meta: PaginationMeta(page: 1, limit: 20, total: 1, totalPages: 1),
    );

    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          sharedPreferencesProvider.overrideWithValue(prefs),
          shelfBooksProvider.overrideWith(_NoopShelfBooksNotifier.new),
          readingEventsServiceProvider
              .overrideWithValue(_NoopReadingEventsService()),
          exploreBooksProvider.overrideWith((ref) async => mockBooks),
        ],
        child: const BookariaApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Khám phá Bookaria'), findsOneWidget);
    expect(find.text('Khám Phá Khủng Long'), findsOneWidget);

    await tester.tap(find.text('Tủ sách'));
    await tester.pumpAndSettle();
    expect(find.text('Tủ sách Offline đang trống'), findsOneWidget);

    await tester.tap(find.text('Hồ sơ'));
    await tester.pumpAndSettle();
    expect(find.text('Chế độ Trẻ em (Kid Mode)'), findsOneWidget);
  });
}
