import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

class OfflineStoragePaths {
  OfflineStoragePaths(this.rootDir);

  final Directory rootDir;

  Directory get sharedAssetsDir =>
      Directory(p.join(rootDir.path, 'bookaria_storage', 'shared_assets'));

  Directory get markersPoolDir => Directory(
        p.join(rootDir.path, 'bookaria_storage', 'markers', 'bookaria_pool'),
      );

  Directory bookRootDir(String bookId) =>
      Directory(p.join(rootDir.path, 'bookaria_storage', 'books', bookId));

  Directory bookVersionDir(String bookId, int versionNo) =>
      Directory(p.join(bookRootDir(bookId).path, 'v$versionNo'));

  Directory bookPagesDir(String bookId, int versionNo) =>
      Directory(p.join(bookVersionDir(bookId, versionNo).path, 'pages'));

  Directory bookTargetsDir(String bookId, int versionNo) =>
      Directory(p.join(bookVersionDir(bookId, versionNo).path, 'targets'));

  File manifestFile(String bookId, int versionNo) =>
      File(p.join(bookVersionDir(bookId, versionNo).path, 'manifest.json'));

  File coverFile(String bookId, int versionNo, {String ext = '.jpg'}) =>
      File(p.join(bookVersionDir(bookId, versionNo).path, 'cover$ext'));

  File pageImageFile(String bookId, int versionNo, String pageId,
          {String ext = '.jpg'}) =>
      File(p.join(bookPagesDir(bookId, versionNo).path, '$pageId$ext'));

  File pageThumbFile(String bookId, int versionNo, String pageId,
          {String ext = '.jpg'}) =>
      File(p.join(bookPagesDir(bookId, versionNo).path, '${pageId}_thumb$ext'));

  File sharedAssetFile(String assetId, String urlOrExt) {
    final ext = _safeExtension(urlOrExt);
    return File(p.join(sharedAssetsDir.path, '$assetId$ext'));
  }

  File targetGroupFile(String bookId, int versionNo, int group) =>
      File(p.join(bookTargetsDir(bookId, versionNo).path, 'group_$group.mind'));

  Future<void> ensureBaseDirectories() async {
    await sharedAssetsDir.create(recursive: true);
    await markersPoolDir.create(recursive: true);
  }

  static String _safeExtension(String input) {
    final uri = Uri.tryParse(input);
    final rawExt = p.extension(uri?.path ?? input);
    if (rawExt.isEmpty || rawExt.length > 10) return '.bin';
    return rawExt.toLowerCase();
  }

  static Future<OfflineStoragePaths> resolve() async {
    final dir = await getApplicationSupportDirectory();
    final paths = OfflineStoragePaths(dir);
    await paths.ensureBaseDirectories();
    return paths;
  }
}

final offlineStoragePathsProvider =
    FutureProvider<OfflineStoragePaths>((ref) async {
  return OfflineStoragePaths.resolve();
});
