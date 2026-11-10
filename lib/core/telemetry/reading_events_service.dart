import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:uuid/uuid.dart';

import '../contracts/reading_events.dart';
import '../network/api_client.dart';
import '../storage/app_database.dart';

class ReadingEventsService {
  ReadingEventsService({
    required this.apiClient,
    required this.database,
    FlutterSecureStorage? secureStorage,
  }) : _secureStorage = secureStorage ?? const FlutterSecureStorage();

  final BookariaApiClient apiClient;
  final AppDatabase database;
  final FlutterSecureStorage _secureStorage;
  static const _uuid = Uuid();
  static const _deviceIdKey = 'bookaria.report_device_id';

  bool _flushing = false;

  ReadingDevice currentDevice() {
    final os = kIsWeb
        ? 'Web'
        : Platform.isIOS
            ? 'iOS'
            : Platform.isAndroid
                ? 'Android'
                : 'Linux';
    return ReadingDevice(
      type: 'mobile',
      os: os,
      browser: 'BookariaApp',
    );
  }

  String newSessionId() => _uuid.v4();

  Future<String> getOrCreateReportDeviceId() async {
    final saved = await _secureStorage.read(key: _deviceIdKey);
    if (saved != null && saved.length >= 8 && saved.length <= 100) {
      return saved;
    }
    final generated = _uuid.v4();
    await _secureStorage.write(key: _deviceIdKey, value: generated);
    return generated;
  }

  Future<void> record({
    required String sessionId,
    required String bookVersionId,
    required ViewerEvent event,
  }) async {
    await database.enqueueEvent(
      sessionId: sessionId,
      bookVersionId: bookVersionId,
      deviceJson: currentDevice().toJson(),
      eventJson: event.toJson(),
    );
  }

  /// Flushes queued events in batches of up to 50 grouped by (sessionId, bookVersionId).
  Future<void> flushPending() async {
    if (_flushing) return;
    _flushing = true;
    try {
      while (true) {
        final rows = await database.peekPendingEvents(limit: 50);
        if (rows.isEmpty) break;

        final grouped = <String, List<PendingEventRow>>{};
        for (final row in rows) {
          final key = '${row.sessionId}|${row.bookVersionId}';
          grouped.putIfAbsent(key, () => []).add(row);
        }

        var sentAny = false;
        for (final group in grouped.values) {
          final first = group.first;
          final batch = EventBatchBody(
            sessionId: first.sessionId,
            bookVersionId: first.bookVersionId,
            device: ReadingDevice.fromJson(first.deviceJson),
            events: group.map((e) => e.eventJson).toList(),
          );
          try {
            await apiClient.postEventsBatch(batch);
            await database.deletePendingEvents(
              group.map((e) => e.id).toList(),
            );
            sentAny = true;
          } catch (_) {
            // Keep queued in SQLite until connectivity returns.
          }
        }
        if (!sentAny) break;
      }
    } finally {
      _flushing = false;
    }
  }
}

final readingEventsServiceProvider = Provider<ReadingEventsService>((ref) {
  return ReadingEventsService(
    apiClient: ref.watch(bookariaApiClientProvider),
    database: ref.watch(appDatabaseProvider),
  );
});
