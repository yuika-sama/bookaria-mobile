import 'package:bookaria_mobile/core/storage/app_database.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  sqfliteFfiInit();

  test('AppDatabase stores offline books with metadata, workflow progress, and pending events', () async {
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
      versionId: '00000000-0000-4000-8000-000000000011',
      versionNo: 1,
      localDir: '/tmp/book-1/v1',
      totalBytes: 4096,
      pageCount: 6,
      arPageCount: 4,
      ageMin: 4,
      ageMax: 8,
      language: 'vi',
      description: 'Truyện cổ tích AR',
      downloadedAt: DateTime.utc(2026, 10, 10),
    );

    await db.upsertOfflineBook(record);
    await db.updateLastPage('vuon-co-tich', 3);

    final loaded = await db.findOfflineBookBySlug('vuon-co-tich');
    expect(loaded, isNotNull);
    expect(loaded!.lastPageIndex, 3);
    expect(loaded.ageMin, 4);
    expect(loaded.ageMax, 8);
    expect(loaded.language, 'vi');
    expect(loaded.description, 'Truyện cổ tích AR');

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

  test('AppDatabase upgrades cleanly from v1 to v2', () async {
    final tempDir = await databaseFactoryFfi.getDatabasesPath();
    final dbPath = '$tempDir/upgrade_v1_v2_${DateTime.now().microsecondsSinceEpoch}.db';

    final v1 = await databaseFactoryFfi.openDatabase(
      dbPath,
      options: OpenDatabaseOptions(
        version: 1,
        onCreate: (db, _) async {
          await db.execute('''
            CREATE TABLE offline_books (
              book_id TEXT PRIMARY KEY,
              slug TEXT NOT NULL UNIQUE,
              title TEXT NOT NULL,
              author_name TEXT NOT NULL,
              cover_local_path TEXT,
              version_id TEXT NOT NULL,
              version_no INTEGER NOT NULL,
              local_dir TEXT NOT NULL,
              total_bytes INTEGER NOT NULL,
              page_count INTEGER NOT NULL,
              ar_page_count INTEGER NOT NULL,
              last_page_index INTEGER NOT NULL DEFAULT 0,
              downloaded_at TEXT NOT NULL,
              last_opened_at TEXT
            )
          ''');
        },
      ),
    );
    await v1.insert('offline_books', {
      'book_id': 'legacy-book',
      'slug': 'sach-cu',
      'title': 'Sách Cũ',
      'author_name': 'Tác giả',
      'version_id': 'ver-1',
      'version_no': 1,
      'local_dir': '/tmp/legacy',
      'total_bytes': 1024,
      'page_count': 2,
      'ar_page_count': 1,
      'last_page_index': 1,
      'downloaded_at': '2026-01-01T00:00:00.000Z',
    });
    await v1.close();

    final upgraded = await AppDatabase.open(
      customPath: dbPath,
      factory: databaseFactoryFfi,
    );
    addTearDown(upgraded.close);

    final record = await upgraded.findOfflineBookBySlug('sach-cu');
    expect(record, isNotNull);
    expect(record!.title, 'Sách Cũ');
    expect(record.ageMin, isNull);
    expect(record.language, 'vi');
  });
}
