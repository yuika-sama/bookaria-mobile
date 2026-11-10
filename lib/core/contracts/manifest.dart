import 'scene.dart';

enum MarkerMode {
  bookariaMarker('BOOKARIA_MARKER'),
  customMarker('CUSTOM_MARKER'),
  none('NONE');

  const MarkerMode(this.wireName);
  final String wireName;

  static MarkerMode fromWire(String? value) {
    return values.firstWhere(
      (mode) => mode.wireName == value,
      orElse: () => MarkerMode.none,
    );
  }
}

enum AssetType {
  model('MODEL'),
  image('IMAGE'),
  audio('AUDIO'),
  video('VIDEO');

  const AssetType(this.wireName);
  final String wireName;

  static AssetType fromWire(String? value) {
    return values.firstWhere(
      (type) => type.wireName == value,
      orElse: () => AssetType.image,
    );
  }
}

enum LightingPreset {
  neutral('neutral'),
  warm('warm'),
  cool('cool');

  const LightingPreset(this.wireName);
  final String wireName;

  static LightingPreset fromWire(String? value) {
    return values.firstWhere(
      (preset) => preset.wireName == value,
      orElse: () => LightingPreset.neutral,
    );
  }
}

class MarkerTransform {
  const MarkerTransform({
    required this.x,
    required this.y,
    required this.size,
  });

  final double x;
  final double y;
  final double size;

  factory MarkerTransform.fromJson(Map<String, dynamic> json) {
    return MarkerTransform(
      x: (json['x'] as num).toDouble(),
      y: (json['y'] as num).toDouble(),
      size: (json['size'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {'x': x, 'y': y, 'size': size};
}

class ManifestMarker {
  const ManifestMarker({
    required this.mode,
    this.number,
    this.transform,
  });

  final MarkerMode mode;
  final int? number;
  final MarkerTransform? transform;

  factory ManifestMarker.fromJson(Map<String, dynamic> json) {
    return ManifestMarker(
      mode: MarkerMode.fromWire(json['mode'] as String?),
      number: (json['number'] as num?)?.toInt(),
      transform: json['transform'] is Map<String, dynamic>
          ? MarkerTransform.fromJson(json['transform'] as Map<String, dynamic>)
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
        'mode': mode.wireName,
        if (number != null) 'number': number,
        if (transform != null) 'transform': transform!.toJson(),
      };
}

class PageSettings {
  const PageSettings({
    this.backgroundAudioAssetId,
    this.backgroundLoop = true,
    this.narrationAssetId,
    this.lighting = LightingPreset.neutral,
  });

  final String? backgroundAudioAssetId;
  final bool backgroundLoop;
  final String? narrationAssetId;
  final LightingPreset lighting;

  factory PageSettings.fromJson(Map<String, dynamic>? json) {
    if (json == null) return const PageSettings();
    return PageSettings(
      backgroundAudioAssetId: json['backgroundAudioAssetId'] as String?,
      backgroundLoop: json['backgroundLoop'] as bool? ?? true,
      narrationAssetId: json['narrationAssetId'] as String?,
      lighting: LightingPreset.fromWire(json['lighting'] as String?),
    );
  }

  Map<String, dynamic> toJson() => {
        'backgroundAudioAssetId': backgroundAudioAssetId,
        'backgroundLoop': backgroundLoop,
        'narrationAssetId': narrationAssetId,
        'lighting': lighting.wireName,
      };
}

class ManifestGroup {
  const ManifestGroup({
    required this.group,
    required this.mindUrl,
    required this.pageIds,
  });

  final int group;
  final String mindUrl;
  final List<String> pageIds;

  factory ManifestGroup.fromJson(Map<String, dynamic> json) {
    return ManifestGroup(
      group: (json['group'] as num).toInt(),
      mindUrl: json['mindUrl'] as String,
      pageIds: (json['pageIds'] as List<dynamic>).cast<String>(),
    );
  }

  Map<String, dynamic> toJson() => {
        'group': group,
        'mindUrl': mindUrl,
        'pageIds': pageIds,
      };
}

class ManifestAsset {
  const ManifestAsset({
    required this.type,
    required this.url,
    required this.size,
    this.meta = const {},
  });

  final AssetType type;
  final String url;
  final int size;
  final Map<String, dynamic> meta;

  factory ManifestAsset.fromJson(Map<String, dynamic> json) {
    return ManifestAsset(
      type: AssetType.fromWire(json['type'] as String?),
      url: json['url'] as String,
      size: (json['size'] as num).toInt(),
      meta: (json['meta'] as Map<String, dynamic>?) ?? const {},
    );
  }

  Map<String, dynamic> toJson() => {
        'type': type.wireName,
        'url': url,
        'size': size,
        if (meta.isNotEmpty) 'meta': meta,
      };
}

class ManifestCredit {
  const ManifestCredit({
    required this.assetId,
    this.name,
    required this.license,
    required this.author,
    this.sourceUrl,
  });

  final String assetId;
  final String? name;
  final String license;
  final String author;
  final String? sourceUrl;

  factory ManifestCredit.fromJson(Map<String, dynamic> json) {
    return ManifestCredit(
      assetId: json['assetId'] as String,
      name: json['name'] as String?,
      license: json['license'] as String,
      author: json['author'] as String,
      sourceUrl: json['sourceUrl'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'assetId': assetId,
        if (name != null) 'name': name,
        'license': license,
        'author': author,
        if (sourceUrl != null) 'sourceUrl': sourceUrl,
      };
}

class ManifestPage {
  const ManifestPage({
    required this.pageId,
    this.title,
    required this.aspect,
    required this.imageUrl,
    required this.thumbnailUrl,
    this.group,
    this.targetIndex,
    required this.marker,
    required this.settings,
    required this.scene,
  });

  final String pageId;
  final String? title;
  final double aspect;
  final String imageUrl;
  final String thumbnailUrl;
  final int? group;
  final int? targetIndex;
  final ManifestMarker marker;
  final PageSettings settings;
  final Scene scene;

  bool get hasAr => marker.mode != MarkerMode.none;

  factory ManifestPage.fromJson(Map<String, dynamic> json) {
    return ManifestPage(
      pageId: json['pageId'] as String,
      title: json['title'] as String?,
      aspect: (json['aspect'] as num).toDouble(),
      imageUrl: json['imageUrl'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
      group: (json['group'] as num?)?.toInt(),
      targetIndex: (json['targetIndex'] as num?)?.toInt(),
      marker: ManifestMarker.fromJson(json['marker'] as Map<String, dynamic>),
      settings: PageSettings.fromJson(json['settings'] as Map<String, dynamic>?),
      scene: Scene.fromJson(json['scene'] as Map<String, dynamic>),
    );
  }

  Map<String, dynamic> toJson() => {
        'pageId': pageId,
        'title': title,
        'aspect': aspect,
        'imageUrl': imageUrl,
        'thumbnailUrl': thumbnailUrl,
        if (group != null) 'group': group,
        if (targetIndex != null) 'targetIndex': targetIndex,
        'marker': marker.toJson(),
        'settings': settings.toJson(),
        'scene': scene.toJson(),
      };
}

class Manifest {
  const Manifest({
    required this.schemaVersion,
    required this.bookId,
    this.workflowVariables = const [],
    required this.version,
    required this.title,
    required this.trackerEngine,
    required this.generatedAt,
    this.pageWidthMm = 210.0,
    required this.targetGroups,
    required this.pages,
    required this.assets,
    this.credits = const [],
  });

  final int schemaVersion;
  final String bookId;
  final List<WorkflowVariable> workflowVariables;
  final int version;
  final String title;
  final String trackerEngine;
  final DateTime generatedAt;

  /// Actual printed page width in millimetres (defaults to A4 210 mm).
  final double pageWidthMm;
  final List<ManifestGroup> targetGroups;
  final List<ManifestPage> pages;
  final Map<String, ManifestAsset> assets;
  final List<ManifestCredit> credits;

  bool get hasAnyArPage => pages.any((p) => p.hasAr);

  factory Manifest.fromJson(Map<String, dynamic> json) {
    final varsRaw = json['workflowVariables'] as List<dynamic>? ?? const [];
    final groupsRaw = json['targetGroups'] as List<dynamic>? ?? const [];
    final pagesRaw = json['pages'] as List<dynamic>? ?? const [];
    final assetsRaw = json['assets'] as Map<String, dynamic>? ?? const {};
    final creditsRaw = json['credits'] as List<dynamic>? ?? const [];

    return Manifest(
      schemaVersion: (json['schemaVersion'] as num).toInt(),
      bookId: json['bookId'] as String,
      workflowVariables: varsRaw
          .map((v) => WorkflowVariable.fromJson(v as Map<String, dynamic>))
          .toList(),
      version: (json['version'] as num).toInt(),
      title: json['title'] as String,
      trackerEngine: json['trackerEngine'] as String,
      generatedAt: DateTime.parse(json['generatedAt'] as String),
      pageWidthMm: (json['pageWidthMm'] as num?)?.toDouble() ?? 210.0,
      targetGroups: groupsRaw
          .map((g) => ManifestGroup.fromJson(g as Map<String, dynamic>))
          .toList(),
      pages: pagesRaw
          .map((p) => ManifestPage.fromJson(p as Map<String, dynamic>))
          .toList(),
      assets: assetsRaw.map(
        (key, value) => MapEntry(
          key,
          ManifestAsset.fromJson(value as Map<String, dynamic>),
        ),
      ),
      credits: creditsRaw
          .map((c) => ManifestCredit.fromJson(c as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'schemaVersion': schemaVersion,
        'bookId': bookId,
        if (workflowVariables.isNotEmpty)
          'workflowVariables': workflowVariables.map((v) => v.toJson()).toList(),
        'version': version,
        'title': title,
        'trackerEngine': trackerEngine,
        'generatedAt': generatedAt.toUtc().toIso8601String(),
        'pageWidthMm': pageWidthMm,
        'targetGroups': targetGroups.map((g) => g.toJson()).toList(),
        'pages': pages.map((p) => p.toJson()).toList(),
        'assets': assets.map((k, v) => MapEntry(k, v.toJson())),
        'credits': credits.map((c) => c.toJson()).toList(),
      };
}
