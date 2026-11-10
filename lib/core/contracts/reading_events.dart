class ReadingDevice {
  const ReadingDevice({
    required this.type,
    required this.os,
    required this.browser,
  });

  /// 'mobile' | 'tablet' | 'desktop'
  final String type;
  final String os;
  final String browser;

  Map<String, dynamic> toJson() => {
        'type': type,
        'os': os,
        'browser': browser,
      };

  factory ReadingDevice.fromJson(Map<String, dynamic> json) {
    return ReadingDevice(
      type: json['type'] as String,
      os: json['os'] as String,
      browser: json['browser'] as String,
    );
  }
}

sealed class ViewerEvent {
  const ViewerEvent({required this.type, required this.at});

  final String type;
  final DateTime at;

  Map<String, dynamic> toJson();

  factory ViewerEvent.open({DateTime? at}) =>
      OpenViewerEvent(at: (at ?? DateTime.now()).toUtc());

  factory ViewerEvent.pageFound({required String pageId, DateTime? at}) =>
      PageFoundViewerEvent(
        pageId: pageId,
        at: (at ?? DateTime.now()).toUtc(),
      );

  factory ViewerEvent.tap({
    required String pageId,
    required String objectId,
    DateTime? at,
  }) =>
      TapViewerEvent(
        pageId: pageId,
        objectId: objectId,
        at: (at ?? DateTime.now()).toUtc(),
      );

  factory ViewerEvent.scanTimeout({DateTime? at}) =>
      ScanTimeoutViewerEvent(at: (at ?? DateTime.now()).toUtc());
}

class OpenViewerEvent extends ViewerEvent {
  const OpenViewerEvent({required super.at}) : super(type: 'OPEN');

  @override
  Map<String, dynamic> toJson() => {
        'type': type,
        'at': at.toUtc().toIso8601String(),
      };
}

class PageFoundViewerEvent extends ViewerEvent {
  const PageFoundViewerEvent({required this.pageId, required super.at})
      : super(type: 'PAGE_FOUND');

  final String pageId;

  @override
  Map<String, dynamic> toJson() => {
        'type': type,
        'pageId': pageId,
        'at': at.toUtc().toIso8601String(),
      };
}

class TapViewerEvent extends ViewerEvent {
  const TapViewerEvent({
    required this.pageId,
    required this.objectId,
    required super.at,
  }) : super(type: 'TAP');

  final String pageId;
  final String objectId;

  @override
  Map<String, dynamic> toJson() => {
        'type': type,
        'pageId': pageId,
        'objectId': objectId,
        'at': at.toUtc().toIso8601String(),
      };
}

class ScanTimeoutViewerEvent extends ViewerEvent {
  const ScanTimeoutViewerEvent({required super.at})
      : super(type: 'SCAN_TIMEOUT');

  @override
  Map<String, dynamic> toJson() => {
        'type': type,
        'at': at.toUtc().toIso8601String(),
      };
}

class EventBatchBody {
  const EventBatchBody({
    required this.sessionId,
    required this.bookVersionId,
    required this.device,
    required this.events,
  });

  final String sessionId;
  final String bookVersionId;
  final ReadingDevice device;
  final List<Map<String, dynamic>> events;

  Map<String, dynamic> toJson() => {
        'sessionId': sessionId,
        'bookVersionId': bookVersionId,
        'device': device.toJson(),
        'events': events,
      };
}

enum ReportReason {
  inappropriate('INAPPROPRIATE', 'Nội dung không phù hợp'),
  copyright('COPYRIGHT', 'Vi phạm bản quyền'),
  other('OTHER', 'Lý do khác');

  const ReportReason(this.wireName, this.labelVi);
  final String wireName;
  final String labelVi;
}

class ReportBookBody {
  const ReportBookBody({
    required this.reason,
    this.note,
    this.pageId,
    required this.deviceId,
  });

  final ReportReason reason;
  final String? note;
  final String? pageId;
  final String deviceId;

  Map<String, dynamic> toJson() => {
        'reason': reason.wireName,
        if (note != null && note!.trim().isNotEmpty) 'note': note!.trim(),
        if (pageId != null) 'pageId': pageId,
        'deviceId': deviceId,
      };
}
