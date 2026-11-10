import 'dart:async';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mime/mime.dart';
import 'package:path/path.dart' as p;
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

import '../../core/storage/offline_storage_paths.dart';

/// Ephemeral localhost server serving downloaded offline assets (.glb, .mp3, .mp4, images)
/// at 0ms latency for Stage 1 WebGL 3D Viewer or hybrid scene runtimes.
class LocalAssetServer {
  LocalAssetServer(this._paths);

  final OfflineStoragePaths _paths;
  HttpServer? _server;

  int? get port => _server?.port;
  String? get baseUrl => port != null ? 'http://127.0.0.1:$port' : null;

  Future<String> start() async {
    if (_server != null) return baseUrl!;

    final storageRoot = Directory(
      p.join(_paths.rootDir.path, 'bookaria_storage'),
    );
    await storageRoot.create(recursive: true);

    Future<Response> handler(Request request) async {
      final relPath = p.normalize(request.url.path);
      if (relPath.startsWith('..') || p.isAbsolute(relPath)) {
        return Response.forbidden('Invalid path');
      }
      final file = File(p.join(storageRoot.path, relPath));
      if (!file.existsSync()) {
        return Response.notFound('Asset not found');
      }
      final contentType =
          lookupMimeType(file.path) ?? 'application/octet-stream';
      return Response.ok(
        file.openRead(),
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000',
        },
      );
    }

    _server = await shelf_io.serve(
      handler,
      InternetAddress.loopbackIPv4,
      0,
    );
    return baseUrl!;
  }

  Future<void> stop() async {
    await _server?.close(force: true);
    _server = null;
  }
}

final localAssetServerProvider = FutureProvider<LocalAssetServer>((ref) async {
  final paths = await ref.watch(offlineStoragePathsProvider.future);
  final server = LocalAssetServer(paths);
  await server.start();
  ref.onDispose(() {
    unawaited(server.stop());
  });
  return server;
});
