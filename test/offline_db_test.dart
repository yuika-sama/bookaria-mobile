import 'package:bookaria_mobile/core/storage/app_database.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  sqfliteFfiInit();

  test('AppDatabase stores offline books, workflow progress, and pending events', () async {
    final db = await AppDatabase.open(
      customPath: inMemoryDatabasePath,
      factory: databaseFactoryFfi,
    );
    addTearDown(db.close);

    final record = OfflineBookRecord(
      bookId: 'book-1',
      slug: 'vuon-co-tich',
      title: 'Vườn Cổ Tích',
      authorName: 'Minh',
      versionId: 'ver-1',
      versionNo: 1,
      localDir: '/tmp/book-1/v1',
      totalBytes: 4096,
      pageCount: 6,
      arPageCount: 4,
      downloadedAt: DateTime.utc(2026, 10, 10),
    );

    await db.upsertOfflineBook(record);
    await db.updateLastPage('vuon-co-tich', 3);

    final loaded = await db.findOfflineBookBySlug('vuon-co-tich');
    expect(loaded, isNotNull);
    expect(loaded!.lastPageIndex, 3);

    await db.saveWorkflowProgress(
      bookId: 'book-1',
      versionNo: 1,
      snapshot: {
        'version': 1,
        'values': {'score': 20},
        'answers': const <String, dynamic>{},
        'counts': {'p1:dragon': 2},
      },
    );
    final progress = await db.loadWorkflowProgress('book-1', 1);
    expect(progress?['values'], {'score': 20});

    await db.enqueueEvent(
      sessionId: 's1',
      bookVersionId: 'ver-1',
      deviceJson: {'type': 'mobile', 'os': 'Android', 'browser': 'BookariaApp'},
      eventJson: {'type': 'OPEN', 'at': '2026-10-10T00:00:00Z'},
    );
    final events = await db.peekPendingEvents();
    expect(events.length, 1);

    await db.deletePendingEvents([events.first.id]);
    expect(await db.peekPendingEvents(), isEmpty);

    await db.deleteOfflineBook('book-1');
    expect(await db.listOfflineBooks(), isEmpty);
  });
}
