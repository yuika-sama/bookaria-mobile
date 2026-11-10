class Vec3 {
  const Vec3(this.x, this.y, this.z);

  final double x;
  final double y;
  final double z;

  static const zero = Vec3(0, 0, 0);
  static const one = Vec3(1, 1, 1);

  factory Vec3.fromJson(List<dynamic>? list, {Vec3 fallback = Vec3.zero}) {
    if (list == null || list.length < 3) return fallback;
    return Vec3(
      (list[0] as num).toDouble(),
      (list[1] as num).toDouble(),
      (list[2] as num).toDouble(),
    );
  }

  List<double> toJson() => [x, y, z];
}

class SceneTransform {
  const SceneTransform({
    this.position = Vec3.zero,
    this.rotation = Vec3.zero,
    this.scale = Vec3.one,
  });

  final Vec3 position;
  final Vec3 rotation;
  final Vec3 scale;

  factory SceneTransform.fromJson(Map<String, dynamic>? json) {
    if (json == null) return const SceneTransform();
    return SceneTransform(
      position: Vec3.fromJson(json['position'] as List<dynamic>?),
      rotation: Vec3.fromJson(json['rotation'] as List<dynamic>?),
      scale: Vec3.fromJson(
        json['scale'] as List<dynamic>?,
        fallback: Vec3.one,
      ),
    );
  }

  Map<String, dynamic> toJson() => {
        'position': position.toJson(),
        'rotation': rotation.toJson(),
        'scale': scale.toJson(),
      };
}

class ModelControl {
  const ModelControl({
    this.enabled = false,
    this.speed = 0.3,
    this.bounds = 'page',
    this.autoRotate = true,
    this.forwardAxis = '+z',
    this.idleClip,
    this.moveClip,
  });

  final bool enabled;
  final double speed;
  final String bounds;
  final bool autoRotate;
  final String forwardAxis;
  final String? idleClip;
  final String? moveClip;

  factory ModelControl.fromJson(Map<String, dynamic> json) {
    return ModelControl(
      enabled: json['enabled'] as bool? ?? false,
      speed: (json['speed'] as num?)?.toDouble() ?? 0.3,
      bounds: json['bounds'] as String? ?? 'page',
      autoRotate: json['autoRotate'] as bool? ?? true,
      forwardAxis: json['forwardAxis'] as String? ?? '+z',
      idleClip: json['idleClip'] as String?,
      moveClip: json['moveClip'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'enabled': enabled,
        'speed': speed,
        'bounds': bounds,
        'autoRotate': autoRotate,
        'forwardAxis': forwardAxis,
        if (idleClip != null) 'idleClip': idleClip,
        if (moveClip != null) 'moveClip': moveClip,
      };
}

class SceneObject {
  const SceneObject({
    required this.id,
    required this.type,
    this.name,
    required this.transform,
    this.visible = true,
    this.billboard = false,
    this.snapToPaper = false,
    this.assetId,
    this.text,
    this.audioKind,
    this.autoplay,
    this.loop,
    this.volume,
    this.controls,
    required this.raw,
  });

  final String id;
  final String type;
  final String? name;
  final SceneTransform transform;
  final bool visible;
  final bool billboard;
  final bool snapToPaper;
  final String? assetId;
  final String? text;
  final String? audioKind;
  final bool? autoplay;
  final bool? loop;
  final double? volume;
  final ModelControl? controls;
  final Map<String, dynamic> raw;

  factory SceneObject.fromJson(Map<String, dynamic> json) {
    return SceneObject(
      id: json['id'] as String,
      type: json['type'] as String,
      name: json['name'] as String?,
      transform: SceneTransform.fromJson(
        json['transform'] as Map<String, dynamic>?,
      ),
      visible: json['visible'] as bool? ?? true,
      billboard: json['billboard'] as bool? ?? false,
      snapToPaper: json['snapToPaper'] as bool? ?? false,
      assetId: json['assetId'] as String?,
      text: json['text'] as String?,
      audioKind: json['audioKind'] as String?,
      autoplay: json['autoplay'] as bool?,
      loop: json['loop'] as bool?,
      volume: (json['volume'] as num?)?.toDouble(),
      controls: json['controls'] is Map<String, dynamic>
          ? ModelControl.fromJson(json['controls'] as Map<String, dynamic>)
          : null,
      raw: Map<String, dynamic>.unmodifiable(json),
    );
  }

  Map<String, dynamic> toJson() => raw;
}

class WorkflowVariable {
  const WorkflowVariable({
    required this.key,
    required this.name,
    required this.type,
    required this.initialValue,
  });

  final String key;
  final String name;
  final String type; // 'number' | 'boolean' | 'string'
  final Object initialValue;

  factory WorkflowVariable.fromJson(Map<String, dynamic> json) {
    return WorkflowVariable(
      key: json['key'] as String,
      name: json['name'] as String,
      type: json['type'] as String,
      initialValue: json['initialValue'] as Object,
    );
  }

  Map<String, dynamic> toJson() => {
        'key': key,
        'name': name,
        'type': type,
        'initialValue': initialValue,
      };
}

class WorkflowChoice {
  const WorkflowChoice({
    required this.id,
    required this.text,
  });

  final String id;
  final String text;

  factory WorkflowChoice.fromJson(Map<String, dynamic> json) {
    return WorkflowChoice(
      id: json['id'] as String,
      text: json['text'] as String,
    );
  }
}

class WorkflowQuestion {
  const WorkflowQuestion({
    required this.questionId,
    required this.title,
    required this.choices,
    required this.correctChoiceId,
  });

  final String questionId;
  final String title;
  final List<WorkflowChoice> choices;
  final String correctChoiceId;

  factory WorkflowQuestion.fromJson(Map<String, dynamic> json) {
    final choicesRaw = json['choices'] as List<dynamic>? ?? const [];
    return WorkflowQuestion(
      questionId: json['questionId'] as String,
      title: json['title'] as String,
      choices: choicesRaw
          .map((c) => WorkflowChoice.fromJson(c as Map<String, dynamic>))
          .toList(),
      correctChoiceId: json['correctChoiceId'] as String,
    );
  }
}

class InteractionRule {
  const InteractionRule({
    required this.id,
    this.name,
    this.enabled = true,
    required this.trigger,
    required this.actions,
    this.onRetrigger = 'ignore',
    this.workflow,
    this.editorLayout,
  });

  final String id;
  final String? name;
  final bool enabled;
  final Map<String, dynamic> trigger;
  final List<Map<String, dynamic>> actions;
  final String onRetrigger;
  final Map<String, dynamic>? workflow;
  final List<Map<String, dynamic>>? editorLayout;

  String get triggerType => trigger['type'] as String? ?? '';
  String? get triggerObjectId => trigger['objectId'] as String?;

  factory InteractionRule.fromJson(Map<String, dynamic> json) {
    return InteractionRule(
      id: json['id'] as String,
      name: json['name'] as String?,
      enabled: json['enabled'] as bool? ?? true,
      trigger: Map<String, dynamic>.from(
        json['trigger'] as Map<String, dynamic>,
      ),
      actions: (json['actions'] as List<dynamic>)
          .map((a) => Map<String, dynamic>.from(a as Map<String, dynamic>))
          .toList(),
      onRetrigger: json['onRetrigger'] as String? ?? 'ignore',
      workflow: json['workflow'] is Map<String, dynamic>
          ? Map<String, dynamic>.from(json['workflow'] as Map<String, dynamic>)
          : null,
      editorLayout: (json['editorLayout'] as List<dynamic>?)
          ?.map((e) => Map<String, dynamic>.from(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        if (name != null) 'name': name,
        'enabled': enabled,
        'trigger': trigger,
        'actions': actions,
        'onRetrigger': onRetrigger,
        if (workflow != null) 'workflow': workflow,
        if (editorLayout != null) 'editorLayout': editorLayout,
      };
}

class Scene {
  const Scene({
    required this.schemaVersion,
    required this.objects,
    this.interactions = const [],
  });

  final int schemaVersion;
  final List<SceneObject> objects;
  final List<InteractionRule> interactions;

  List<SceneObject> get tappableObjects {
    final tapTargetIds = interactions
        .where((r) => r.enabled && r.triggerType == 'onTap')
        .map((r) => r.triggerObjectId)
        .whereType<String>()
        .toSet();
    return objects.where((o) => tapTargetIds.contains(o.id)).toList();
  }

  factory Scene.fromJson(Map<String, dynamic> json) {
    final objectsRaw = json['objects'] as List<dynamic>? ?? const [];
    final rulesRaw = json['interactions'] as List<dynamic>? ?? const [];
    return Scene(
      schemaVersion: (json['schemaVersion'] as num?)?.toInt() ?? 1,
      objects: objectsRaw
          .map((o) => SceneObject.fromJson(o as Map<String, dynamic>))
          .toList(),
      interactions: rulesRaw
          .map((r) => InteractionRule.fromJson(r as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'schemaVersion': schemaVersion,
        'objects': objects.map((o) => o.toJson()).toList(),
        'interactions': interactions.map((r) => r.toJson()).toList(),
      };
}
