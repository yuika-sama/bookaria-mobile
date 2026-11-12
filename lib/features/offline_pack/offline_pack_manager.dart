import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/contracts/manifest.dart';
import '../../core/contracts/public_book.dart';
import '../../core/network/api_client.dart';
import '../../core/storage/app_database.dart';
import '../../core/storage/offline_storage_paths.dart';

class DownloadTaskState {
  const DownloadTaskState({
    required this.slug,
    required this.progress,
    required this.receivedBytes,
    required this.totalBytes,
    this.statusLabel = 'Đang chuẩn bị…',
    this.errorMessage,
    this.isCompleted = false,
  });

  final String slug;
  final double progress;
  final int receivedBytes;
  final int totalBytes;
  final String statusLabel;
  final String? errorMessage;
  final bool isCompleted;
}

class OfflinePackManager extends Notifier<Map<String, DownloadTaskState>> {
  final Map<String, CancelToken> _cancelTokens = {};

  @override
  Map<String, DownloadTaskState> build() => const {};

  Future<OfflineBookRecord> downloadBook(PublicBook book) async {
    final slug = book.slug;
    if (_cancelTokens.containsKey(slug)) {
      throw StateError('Sách đang được tải xuống.');
    }

    final cancelToken = CancelToken();
    _cancelTokens[slug] = cancelToken;

    final api = ref.read(bookariaApiClientProvider);
    final db = ref.read(appDatabaseProvider);
    final paths = await ref.read(offlineStoragePathsProvider.future);

    _update(
      slug,
      DownloadTaskState(
        slug: slug,
        progress: 0.02,
        receivedBytes: 0,
        totalBytes: book.downloadBytes > 0 ? book.downloadBytes : 1,
        statusLabel: 'Đang tải manifest…',
      ),
    );

    try {
      final manifest = await api.fetchManifestFromUrl(
        book.manifestUrl,
        cancelToken: cancelToken,
      );

      final versionDir = paths.bookVersionDir(manifest.bookId, manifest.version);
      await paths.bookPagesDir(manifest.bookId, manifest.version).create(
            recursive: true,
          );
      await paths.bookTargetsDir(manifest.bookId, manifest.version).create(
            recursive: true,
          );

      // Compute download items with asset deduplication into shared_assets/
      final items = <_DownloadFileTask>[];
      var expectedTotalBytes = 0;

      String? coverLocalPath;
      if (book.coverUrl != null) {
        final coverFile = paths.coverFile(manifest.bookId, manifest.version);
        coverLocalPath = coverFile.path;
        items.add(_DownloadFileTask(book.coverUrl!, coverFile, 0));
      }

      for (final page in manifest.pages) {
        final imgFile =
            paths.pageImageFile(manifest.bookId, manifest.version, page.pageId);
        final thumbFile =
            paths.pageThumbFile(manifest.bookId, manifest.version, page.pageId);
        items.add(_DownloadFileTask(page.imageUrl, imgFile, 0));
        items.add(_DownloadFileTask(page.thumbnailUrl, thumbFile, 0));
      }

      for (final group in manifest.targetGroups) {
        final targetFile = paths.targetGroupFile(
          manifest.bookId,
          manifest.version,
          group.group,
        );
        items.add(_DownloadFileTask(group.mindUrl, targetFile, 0));
      }

      for (final entry in manifest.assets.entries) {
        final asset = entry.value;
        final assetFile = paths.sharedAssetFile(entry.key, asset.url);
        if (!assetFile.existsSync() || assetFile.lengthSync() != asset.size) {
          expectedTotalBytes += asset.size;
          items.add(_DownloadFileTask(asset.url, assetFile, asset.size));
        }
      }

      final totalEstimate =
          expectedTotalBytes > 0 ? expectedTotalBytes : book.downloadBytes;
      var completedBytes = 0;

      for (var i = 0; i < items.length; i++) {
        if (cancelToken.isCancelled) {
          throw DioException.requestCancelled(
            requestOptions: RequestOptions(path: items[i].url),
            reason: 'Cancelled by user',
          );
        }

        final task = items[i];
        final tempFile = File('${task.dest.path}.part');
        await api.downloadToFile(
          task.url,
          tempFile.path,
          cancelToken: cancelToken,
          onReceiveProgress: (received, total) {
            final denom = totalEstimate > 0 ? totalEstimate : 1;
            final ratio = ((completedBytes + received) / denom).clamp(0.05, 0.96);
            _update(
              slug,
              DownloadTaskState(
                slug: slug,
                progress: ratio,
                receivedBytes: completedBytes + received,
                totalBytes: denom,
                statusLabel: 'Đang tải tài nguyên (${i + 1}/${items.length})…',
              ),
            );
          },
        );
        if (tempFile.existsSync()) {
          await tempFile.rename(task.dest.path);
        }
        completedBytes +=
            task.expectedBytes > 0 ? task.expectedBytes : task.dest.lengthSync();
      }

      // Persist manifest atomically once all assets are on disk
      final manifestFile = paths.manifestFile(manifest.bookId, manifest.version);
      await manifestFile.writeAsString(jsonEncode(manifest.toJson()));

      final record = OfflineBookRecord(
        bookId: manifest.bookId,
        slug: book.slug,
        title: book.title,
        authorName: book.author.displayName,
        coverLocalPath: coverLocalPath,
        versionId: book.version.id,
        versionNo: book.version.versionNo,
        localDir: versionDir.path,
        totalBytes: book.downloadBytes > 0 ? book.downloadBytes : completedBytes,
        pageCount: book.pageCount,
        arPageCount: book.arPageCount,
        ageMin: book.ageMin,
        ageMax: book.ageMax,
        language: book.language,
        description: book.description,
        downloadedAt: DateTime.now().toUtc(),
      );
      await db.upsertOfflineBook(record);

      _update(
        slug,
        DownloadTaskState(
          slug: slug,
          progress: 1.0,
          receivedBytes: record.totalBytes,
          totalBytes: record.totalBytes,
          statusLabel: 'Đã sẵn sàng đọc Offline',
          isCompleted: true,
        ),
      );

      return record;
    } catch (err) {
      _update(
        slug,
        DownloadTaskState(
          slug: slug,
          progress: 0,
          receivedBytes: 0,
          totalBytes: book.downloadBytes,
          statusLabel: 'Tải thất bại',
          errorMessage: err.toString(),
        ),
      );
      rethrow;
    } finally {
      _cancelTokens.remove(slug);
    }
  }

  void cancelDownload(String slug) {
    _cancelTokens[slug]?.cancel('Đã hủy bởi người dùng');
    _cancelTokens.remove(slug);
    final next = Map<String, DownloadTaskState>.from(state);
    next.remove(slug);
    state = next;
  }

  Future<Manifest?> loadLocalManifest(OfflineBookRecord record) async {
    final paths = await ref.read(offlineStoragePathsProvider.future);
    final file = paths.manifestFile(record.bookId, record.versionNo);
    if (!file.existsSync()) return null;
    final jsonMap = jsonDecode(await file.readAsString()) as Map<String, dynamic>;
    return Manifest.fromJson(jsonMap);
  }

  Future<void> deleteOfflineBook(OfflineBookRecord record) async {
    final db = ref.read(appDatabaseProvider);
    final paths = await ref.read(offlineStoragePathsProvider.future);

    await db.deleteOfflineBook(record.bookId);
    final bookDir = paths.bookRootDir(record.bookId);
    if (bookDir.existsSync()) {
      await bookDir.delete(recursive: true);
    }
    await runAssetGarbageCollection();
  }

  /// Deletes files in `shared_assets/` no longer referenced by any remaining offline book.
  Future<int> runAssetGarbageCollection() async {
    final db = ref.read(appDatabaseProvider);
    final paths = await ref.read(offlineStoragePathsProvider.future);
    final books = await db.listOfflineBooks();
    final referencedAssetIds = <String>{};

    for (final book in books) {
      final manifest = await loadLocalManifest(book);
      if (manifest != null) {
        referencedAssetIds.addAll(manifest.assets.keys);
      }
    }

    var deletedCount = 0;
    if (paths.sharedAssetsDir.existsSync()) {
      for (final entity in paths.sharedAssetsDir.listSync()) {
        if (entity is File) {
          final fileName = entity.uri.pathSegments.last;
          final assetId = fileName.contains('.')
              ? fileName.substring(0, fileName.lastIndexOf('.'))
              : fileName;
          if (!referencedAssetIds.contains(assetId)) {
            await entity.delete();
            deletedCount++;
          }
        }
      }
    }
    return deletedCount;
  }

  void _update(String slug, DownloadTaskState task) {
    state = {...state, slug: task};
  }
}

class _DownloadFileTask {
  const _DownloadFileTask(this.url, this.dest, this.expectedBytes);
  final String url;
  final File dest;
  final int expectedBytes;
}

final offlinePackManagerProvider =
    NotifierProvider<OfflinePackManager, Map<String, DownloadTaskState>>(
  OfflinePackManager.new,
);
