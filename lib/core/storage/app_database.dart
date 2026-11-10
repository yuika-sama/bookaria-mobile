import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';

class OfflineBookRecord {
  const OfflineBookRecord({
    required this.bookId,
    required this.slug,
    required this.title,
    required this.authorName,
    this.coverLocalPath,
    required this.versionId,
    required this.versionNo,
    required this.localDir,
    required this.totalBytes,
    required this.pageCount,
    required this.arPageCount,
    this.lastPageIndex = 0,
    required this.downloadedAt,
    this.lastOpenedAt,
  });

  final String bookId;
  final String slug;
  final String title;
  final String authorName;
  final String? coverLocalPath;
  final String versionId;
  final int versionNo;
  final String localDir;
  final int totalBytes;
  final int pageCount;
  final int arPageCount;
  final int lastPageIndex;
  final DateTime downloadedAt;
  final DateTime? lastOpenedAt;

  Map<String, Object?> toRow() => {
        'book_id': bookId,
        'slug': slug,
        'title': title,
        'author_name': authorName,
        'cover_local_path': coverLocalPath,
        'version_id': versionId,
        'version_no': versionNo,
        'local_dir': localDir,
        'total_bytes': totalBytes,
        'page_count': pageCount,
        'ar_page_count': arPageCount,
        'last_page_index': lastPageIndex,
        'downloaded_at': downloadedAt.toUtc().toIso8601String(),
        'last_opened_at': lastOpenedAt?.toUtc().toIso8601String(),
      };

  factory OfflineBookRecord.fromRow(Map<String, Object?> row) {
    return OfflineBookRecord(
      bookId: row['book_id'] as String,
      slug: row['slug'] as String,
      title: row['title'] as String,
      authorName: row['author_name'] as String,
      coverLocalPath: row['cover_local_path'] as String?,
      versionId: row['version_id'] as String,
      versionNo: row['version_no'] as int,
      localDir: row['local_dir'] as String,
      totalBytes: row['total_bytes'] as int,
      pageCount: row['page_count'] as int,
      arPageCount: row['ar_page_count'] as int,
      lastPageIndex: row['last_page_index'] as int,
      downloadedAt: DateTime.parse(row['downloaded_at'] as String),
      lastOpenedAt: row['last_opened_at'] != null
          ? DateTime.parse(row['last_opened_at'] as String)
          : null,
    );
  }
}

class PendingEventRow {
  const PendingEventRow({
    required this.id,
    required this.sessionId,
    required this.bookVersionId,
    required this.deviceJson,
    required this.eventJson,
    required this.createdAt,
  });

  final int id;
  final String sessionId;
  final String bookVersionId;
  final Map<String, dynamic> deviceJson;
  final Map<String, dynamic> eventJson;
  final DateTime createdAt;

  factory PendingEventRow.fromRow(Map<String, Object?> row) {
    return PendingEventRow(
      id: row['id'] as int,
      sessionId: row['session_id'] as String,
      bookVersionId: row['book_version_id'] as String,
      deviceJson:
          jsonDecode(row['device_json'] as String) as Map<String, dynamic>,
      eventJson:
          jsonDecode(row['event_json'] as String) as Map<String, dynamic>,
      createdAt: DateTime.parse(row['created_at'] as String),
    );
  }
}

class AppDatabase {
  AppDatabase._(this._db);

  final Database _db;

  static Future<AppDatabase> open({
    String? customPath,
    DatabaseFactory? factory,
  }) async {
    final dbFactory = factory ?? databaseFactory;
    final dbPath =
        customPath ?? p.join(await getDatabasesPath(), 'bookaria_mobile.db');
    final db = await dbFactory.openDatabase(
      dbPath,
      options: OpenDatabaseOptions(
        version: 1,
        onCreate: _onCreate,
      ),
    );
    return AppDatabase._(db);
  }

  static Future<void> _onCreate(Database db, int version) async {
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

    await db.execute('''
      CREATE TABLE workflow_progress (
        book_id TEXT NOT NULL,
        version_no INTEGER NOT NULL,
        values_json TEXT NOT NULL,
        answers_json TEXT NOT NULL,
        counts_json TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (book_id, version_no)
      )
    ''');

    await db.execute('''
      CREATE TABLE pending_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        book_version_id TEXT NOT NULL,
        device_json TEXT NOT NULL,
        event_json TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    ''');
  }

  Future<List<OfflineBookRecord>> listOfflineBooks() async {
    final rows = await _db.query(
      'offline_books',
      orderBy: 'COALESCE(last_opened_at, downloaded_at) DESC',
    );
    return rows.map(OfflineBookRecord.fromRow).toList();
  }

  Future<OfflineBookRecord?> findOfflineBookBySlug(String slug) async {
    final rows = await _db.query(
      'offline_books',
      where: 'slug = ?',
      whereArgs: [slug],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return OfflineBookRecord.fromRow(rows.first);
  }

  Future<void> upsertOfflineBook(OfflineBookRecord record) async {
    await _db.insert(
      'offline_books',
      record.toRow(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> updateLastPage(String slug, int pageIndex) async {
    await _db.update(
      'offline_books',
      {
        'last_page_index': pageIndex,
        'last_opened_at': DateTime.now().toUtc().toIso8601String(),
      },
      where: 'slug = ?',
      whereArgs: [slug],
    );
  }

  Future<void> deleteOfflineBook(String bookId) async {
    await _db.delete(
      'offline_books',
      where: 'book_id = ?',
      whereArgs: [bookId],
    );
  }

  Future<Map<String, dynamic>?> loadWorkflowProgress(
    String bookId,
    int versionNo,
  ) async {
    final rows = await _db.query(
      'workflow_progress',
      where: 'book_id = ? AND version_no = ?',
      whereArgs: [bookId, versionNo],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    final row = rows.first;
    return {
      'version': 1,
      'values': jsonDecode(row['values_json'] as String),
      'answers': jsonDecode(row['answers_json'] as String),
      'counts': jsonDecode(row['counts_json'] as String),
    };
  }

  Future<void> saveWorkflowProgress({
    required String bookId,
    required int versionNo,
    required Map<String, dynamic> snapshot,
  }) async {
    await _db.insert(
      'workflow_progress',
      {
        'book_id': bookId,
        'version_no': versionNo,
        'values_json': jsonEncode(snapshot['values'] ?? const {}),
        'answers_json': jsonEncode(snapshot['answers'] ?? const {}),
        'counts_json': jsonEncode(snapshot['counts'] ?? const {}),
        'updated_at': DateTime.now().toUtc().toIso8601String(),
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> enqueueEvent({
    required String sessionId,
    required String bookVersionId,
    required Map<String, dynamic> deviceJson,
    required Map<String, dynamic> eventJson,
  }) async {
    await _db.insert('pending_events', {
      'session_id': sessionId,
      'book_version_id': bookVersionId,
      'device_json': jsonEncode(deviceJson),
      'event_json': jsonEncode(eventJson),
      'created_at': DateTime.now().toUtc().toIso8601String(),
    });
  }

  Future<List<PendingEventRow>> peekPendingEvents({int limit = 50}) async {
    final rows = await _db.query(
      'pending_events',
      orderBy: 'id ASC',
      limit: limit,
    );
    return rows.map(PendingEventRow.fromRow).toList();
  }

  Future<void> deletePendingEvents(List<int> ids) async {
    if (ids.isEmpty) return;
    final placeholders = List.filled(ids.length, '?').join(',');
    await _db.delete(
      'pending_events',
      where: 'id IN ($placeholders)',
      whereArgs: ids,
    );
  }

  Future<void> close() => _db.close();
}

final appDatabaseProvider = Provider<AppDatabase>((ref) {
  throw UnimplementedError(
    'appDatabaseProvider must be overridden in ProviderScope during startup.',
  );
});
