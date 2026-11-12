import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../app/theme.dart';
import '../../core/config/app_config.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/utils/formatters.dart';
import '../offline_pack/offline_pack_manager.dart';
import '../shelf/shelf_providers.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final prefs = ref.watch(appPreferencesProvider);
    final config = ref.watch(appConfigProvider);
    final shelfAsync = ref.watch(shelfBooksProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    final totalBooks = shelfAsync.asData?.value.length ?? 0;
    final totalBytes = shelfAsync.asData?.value
            .fold<int>(0, (sum, item) => sum + item.totalBytes) ??
        0;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Hồ sơ & Cài đặt'),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 96),
        children: [
          Text('Giao diện', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          SegmentedButton<ThemeMode>(
            segments: const [
              ButtonSegment(
                value: ThemeMode.light,
                icon: Icon(Icons.light_mode_outlined),
                label: Text('Sáng'),
              ),
              ButtonSegment(
                value: ThemeMode.dark,
                icon: Icon(Icons.dark_mode_outlined),
                label: Text('Tối'),
              ),
              ButtonSegment(
                value: ThemeMode.system,
                icon: Icon(Icons.brightness_auto_outlined),
                label: Text('Hệ thống'),
              ),
            ],
            selected: {prefs.themeMode},
            onSelectionChanged: (selection) {
              unawaited(
                ref
                    .read(appPreferencesProvider.notifier)
                    .setThemeMode(selection.first),
              );
            },
          ),
          const SizedBox(height: 20),
          Text('Trải nghiệm đọc & AR',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          Card(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Tự động phát nhạc nền & thuyết minh'),
                  subtitle: const Text('Phát khi nhận diện được trang AR'),
                  value: prefs.autoplayAudio,
                  onChanged: (v) => unawaited(
                    ref.read(appPreferencesProvider.notifier).setAutoplayAudio(v),
                  ),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  title: const Text('Phản hồi rung (Haptics)'),
                  subtitle: const Text('Rung nhẹ khi chạm vật thể hoặc nhận diện trang'),
                  value: prefs.hapticsEnabled,
                  onChanged: (v) => unawaited(
                    ref
                        .read(appPreferencesProvider.notifier)
                        .setHapticsEnabled(v),
                  ),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  title: const Text('Giữ màn hình luôn sáng'),
                  subtitle: const Text('Tránh tắt màn hình khi bé đang đọc/quét AR'),
                  value: prefs.keepScreenAwake,
                  onChanged: (v) => unawaited(
                    ref
                        .read(appPreferencesProvider.notifier)
                        .setKeepScreenAwake(v),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Text('Chế độ Trẻ em (Kid Mode)',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          Card(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Bật Chế độ Trẻ em'),
                  subtitle: Text(
                    prefs.kidModeEnabled
                        ? 'Lọc sách ≤ ${prefs.kidMaxAge} tuổi • Ẩn liên kết ngoài'
                        : 'Cần nhập mã PIN (${prefs.kidPin == '0000' ? 'mặc định 0000' : 'đã đặt'}) để tắt',
                  ),
                  value: prefs.kidModeEnabled,
                  onChanged: (next) =>
                      unawaited(_toggleKidMode(context, ref, prefs, next)),
                ),
                const Divider(height: 1),
                ListTile(
                  title: const Text('Giới hạn độ tuổi hiển thị'),
                  subtitle: Text('Tối đa ${prefs.kidMaxAge} tuổi khi bật Kid Mode'),
                  trailing: DropdownButton<int>(
                    value: prefs.kidMaxAge,
                    underline: const SizedBox.shrink(),
                    items: const [
                      DropdownMenuItem(value: 6, child: Text('≤ 6 tuổi')),
                      DropdownMenuItem(value: 8, child: Text('≤ 8 tuổi')),
                      DropdownMenuItem(value: 10, child: Text('≤ 10 tuổi')),
                      DropdownMenuItem(value: 12, child: Text('≤ 12 tuổi')),
                    ],
                    onChanged: (age) {
                      if (age != null) {
                        unawaited(
                          ref.read(appPreferencesProvider.notifier).setKidMode(
                                enabled: prefs.kidModeEnabled,
                                maxAge: age,
                              ),
                        );
                      }
                    },
                  ),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.pin_outlined),
                  title: const Text('Đổi mã PIN phụ huynh'),
                  trailing: const Icon(Icons.chevron_right_rounded),
                  onTap: () => unawaited(_changePinDialog(context, ref, prefs)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Text('Lưu trữ Offline',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Đang lưu $totalBooks cuốn sách (${formatBytes(totalBytes)})',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Tài nguyên .glb & âm thanh được chống trùng lặp tự động trong shared_assets/.',
                    style: Theme.of(context)
                        .textTheme
                        .bodySmall
                        ?.copyWith(color: tokens.textMuted),
                  ),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: () async {
                      final deleted = await ref
                          .read(offlinePackManagerProvider.notifier)
                          .runAssetGarbageCollection();
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                              'Đã dọn $deleted tệp tài nguyên không còn sách tham chiếu.',
                            ),
                          ),
                        );
                      }
                    },
                    icon: const Icon(Icons.cleaning_services_outlined),
                    label: const Text('Dọn tài nguyên dư thừa (GC)'),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text('Kết nối máy chủ',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('API Base URL', style: Theme.of(context).textTheme.labelMedium),
                  const SizedBox(height: 2),
                  SelectableText(config.apiBaseUrl),
                  const SizedBox(height: 8),
                  Text('Web Viewer Origin',
                      style: Theme.of(context).textTheme.labelMedium),
                  const SizedBox(height: 2),
                  SelectableText(config.webViewerOrigin),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _toggleKidMode(
    BuildContext context,
    WidgetRef ref,
    AppPreferencesState prefs,
    bool nextValue,
  ) async {
    if (nextValue) {
      await ref
          .read(appPreferencesProvider.notifier)
          .setKidMode(enabled: true);
      return;
    }

    // Turning Kid Mode OFF requires parent PIN verification
    final verified = await showDialog<bool>(
      context: context,
      builder: (_) => _VerifyPinDialog(expectedPin: prefs.kidPin),
    );

    if (verified == true) {
      await ref
          .read(appPreferencesProvider.notifier)
          .setKidMode(enabled: false);
    } else if (verified == false && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Mã PIN không chính xác.')),
      );
    }
  }

  Future<void> _changePinDialog(
    BuildContext context,
    WidgetRef ref,
    AppPreferencesState prefs,
  ) async {
    final newPin = await showDialog<String>(
      context: context,
      builder: (_) => _ChangePinDialog(expectedPin: prefs.kidPin),
    );

    if (newPin == null) return;
    if (newPin.isEmpty) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('PIN cũ không khớp hoặc PIN mới dưới 4 ký tự.'),
          ),
        );
      }
      return;
    }

    await ref.read(appPreferencesProvider.notifier).setKidMode(
          enabled: prefs.kidModeEnabled,
          newPin: newPin,
        );
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Đã cập nhật mã PIN phụ huynh.')),
      );
    }
  }
}

class _VerifyPinDialog extends StatefulWidget {
  const _VerifyPinDialog({required this.expectedPin});

  final String expectedPin;

  @override
  State<_VerifyPinDialog> createState() => _VerifyPinDialogState();
}

class _VerifyPinDialogState extends State<_VerifyPinDialog> {
  final TextEditingController _pinController = TextEditingController();

  @override
  void dispose() {
    _pinController.dispose();
    super.dispose();
  }

  void _confirm([String? rawValue]) {
    final entered = (rawValue ?? _pinController.text).trim();
    Navigator.of(context).pop(entered == widget.expectedPin);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Xác nhận mã PIN phụ huynh'),
      content: TextField(
        controller: _pinController,
        keyboardType: TextInputType.number,
        obscureText: true,
        maxLength: 6,
        decoration: const InputDecoration(
          labelText: 'Nhập mã PIN (mặc định 0000)',
        ),
        onSubmitted: _confirm,
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: const Text('Hủy'),
        ),
        FilledButton(
          onPressed: () => _confirm(),
          child: const Text('Xác nhận'),
        ),
      ],
    );
  }
}

class _ChangePinDialog extends StatefulWidget {
  const _ChangePinDialog({required this.expectedPin});

  final String expectedPin;

  @override
  State<_ChangePinDialog> createState() => _ChangePinDialogState();
}

class _ChangePinDialogState extends State<_ChangePinDialog> {
  final TextEditingController _oldPinController = TextEditingController();
  final TextEditingController _newPinController = TextEditingController();

  @override
  void dispose() {
    _oldPinController.dispose();
    _newPinController.dispose();
    super.dispose();
  }

  void _submit() {
    final oldMatch = _oldPinController.text.trim() == widget.expectedPin;
    final next = _newPinController.text.trim();
    if (!oldMatch || next.length < 4) {
      Navigator.of(context).pop('');
      return;
    }
    Navigator.of(context).pop(next);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Đổi mã PIN phụ huynh'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _oldPinController,
            keyboardType: TextInputType.number,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Mã PIN hiện tại',
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _newPinController,
            keyboardType: TextInputType.number,
            obscureText: true,
            maxLength: 6,
            decoration: const InputDecoration(
              labelText: 'Mã PIN mới (4–6 số)',
            ),
            onSubmitted: (_) => _submit(),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Hủy'),
        ),
        FilledButton(
          onPressed: _submit,
          child: const Text('Lưu PIN'),
        ),
      ],
    );
  }
}
