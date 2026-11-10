import 'dart:async';

import 'package:flutter/services.dart';

import '../../../core/contracts/manifest.dart';

enum ReaderViewMode {
  mode3d('3D'),
  modeAr('AR'),
  modeTabletop('Tabletop');

  const ReaderViewMode(this.label);
  final String label;
}

class ArTrackingStatus {
  const ArTrackingStatus({
    required this.isAvailable,
    this.isTracked = false,
    this.isExtendedAnchorActive = false,
    this.detectedPageId,
    this.statusMessage,
  });

  final bool isAvailable;
  final bool isTracked;
  final bool isExtendedAnchorActive;
  final String? detectedPageId;
  final String? statusMessage;
}

/// Abstract bridge connecting Flutter UI to Native ARKit (Swift) / ARCore (Kotlin)
/// or Stage 1 hybrid WebGL runtime.
abstract class ArEngineBridge {
  Stream<ArTrackingStatus> get statusStream;
  Future<bool> checkDeviceArSupport();
  Future<void> loadPage({
    required Manifest manifest,
    required ManifestPage page,
    required String localAssetsRootDir,
    required ReaderViewMode mode,
  });
  Future<void> setTorchEnabled(bool enabled);
  Future<void> tapObject(String objectId);
  Future<String?> captureSnapshotPhoto();
  Future<void> dispose();
}

/// Default MethodChannel implementation ready to bind native iOS ARKit & Android ARCore.
class MethodChannelArEngineBridge implements ArEngineBridge {
  static const _channel = MethodChannel('vn.bookaria.mobile/ar_engine');
  final _statusController = StreamController<ArTrackingStatus>.broadcast();

  MethodChannelArEngineBridge() {
    _channel.setMethodCallHandler(_onNativeCall);
  }

  @override
  Stream<ArTrackingStatus> get statusStream => _statusController.stream;

  Future<dynamic> _onNativeCall(MethodCall call) async {
    if (call.method == 'onTrackingChanged' && call.arguments is Map) {
      final args = Map<String, dynamic>.from(call.arguments as Map);
      _statusController.add(
        ArTrackingStatus(
          isAvailable: args['isAvailable'] as bool? ?? true,
          isTracked: args['isTracked'] as bool? ?? false,
          isExtendedAnchorActive:
              args['isExtendedAnchorActive'] as bool? ?? false,
          detectedPageId: args['detectedPageId'] as String?,
          statusMessage: args['statusMessage'] as String?,
        ),
      );
    }
  }

  @override
  Future<bool> checkDeviceArSupport() async {
    try {
      final supported = await _channel.invokeMethod<bool>('checkArSupport');
      return supported ?? false;
    } on MissingPluginException {
      // Native ARKit/ARCore PlatformView plugin will be attached in Phase 2.
      return false;
    }
  }

  @override
  Future<void> loadPage({
    required Manifest manifest,
    required ManifestPage page,
    required String localAssetsRootDir,
    required ReaderViewMode mode,
  }) async {
    final physicalPageWidthMeters = manifest.pageWidthMm / 1000.0;
    final markerPhysicalWidthMeters = page.marker.mode == MarkerMode.bookariaMarker &&
            page.marker.transform != null
        ? page.marker.transform!.size * physicalPageWidthMeters
        : physicalPageWidthMeters;

    try {
      await _channel.invokeMethod<void>('loadPage', {
        'bookId': manifest.bookId,
        'pageId': page.pageId,
        'mode': mode.name,
        'aspect': page.aspect,
        'pageWidthMeters': physicalPageWidthMeters,
        'markerWidthMeters': markerPhysicalWidthMeters,
        'marker': page.marker.toJson(),
        'localAssetsRootDir': localAssetsRootDir,
        'scene': page.scene.toJson(),
      });
    } on MissingPluginException {
      _statusController.add(
        const ArTrackingStatus(
          isAvailable: false,
          statusMessage:
              'Native AR Engine chưa gắn vào PlatformView — đang dùng chế độ mô phỏng 3D.',
        ),
      );
    }
  }

  @override
  Future<void> setTorchEnabled(bool enabled) async {
    try {
      await _channel.invokeMethod<void>('setTorch', {'enabled': enabled});
    } on MissingPluginException {
      // Ignore until native AR camera plugin is bound.
    }
  }

  @override
  Future<void> tapObject(String objectId) async {
    try {
      await _channel.invokeMethod<void>('tapObject', {'objectId': objectId});
    } on MissingPluginException {
      // Handled by Dart Workflow / 3D bridge fallback.
    }
  }

  @override
  Future<String?> captureSnapshotPhoto() async {
    try {
      return await _channel.invokeMethod<String>('captureSnapshot');
    } on MissingPluginException {
      return null;
    }
  }

  @override
  Future<void> dispose() async {
    await _statusController.close();
  }
}
