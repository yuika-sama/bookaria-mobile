import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../app/theme.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/ui/pin/pin_input_panel.dart';
import '../../core/ui/tokens/app_spacing.dart';
import '../../core/ui/widgets/bookaria_feedback.dart';
import '../../core/ui/widgets/bookaria_logo.dart';
import '../../core/ui/widgets/interactive_scale.dart';
import '../../core/utils/formatters.dart';
import '../offline_pack/offline_pack_manager.dart';
import '../shelf/shelf_providers.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final prefs = ref.watch(appPreferencesProvider);
    final shelfAsync = ref.watch(shelfBooksProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final theme = Theme.of(context);

    final totalBooks = shelfAsync.asData?.value.length ?? 0;
    final totalBytes = shelfAsync.asData?.value
            .fold<int>(0, (sum, item) => sum + item.totalBytes) ??
        0;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Hồ sơ & Cài đặt'),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
        children: [
          // Brand Header Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            decoration: BoxDecoration(
              color: tokens.bgSurface,
              borderRadius: AppRadius.roundedLg,
              border: Border.all(color: tokens.borderDefault),
              boxShadow: AppShadows.soft(theme.colorScheme.shadow),
            ),
            child: Row(
              children: [
                const BookariaLogo(size: 42, showWordmark: false),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Bookaria Reader',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Ứng dụng sách AR & 3D tương tác cho trẻ em',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: tokens.textMuted,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.xl),

          Text('Giao diện', style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: AppSpacing.sm),
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
          const SizedBox(height: AppSpacing.xl),

          Text('Trải nghiệm đọc & AR',
              style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: AppSpacing.sm),
          Card(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Tự động phát âm thanh & thuyết minh'),
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
          const SizedBox(height: AppSpacing.xl),

          Text('Chế độ Trẻ em (Kid Mode)',
              style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: AppSpacing.sm),
          Card(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Bật Chế độ Trẻ em'),
                  subtitle: Text(
                    prefs.kidModeEnabled
                        ? 'Đang lọc sách ≤ ${prefs.kidMaxAge} tuổi • Ẩn liên kết ngoài'
                        : 'Cần mã PIN phụ huynh (${prefs.kidPin == '0000' ? 'mặc định 0000' : 'đã thiết lập'}) để tắt',
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
                  leading: const Icon(Icons.password_rounded),
                  title: const Text('Đổi mã PIN phụ huynh'),
                  subtitle: const Text('Sử dụng bàn phím số an toàn'),
                  trailing: const Icon(Icons.chevron_right_rounded),
                  onTap: () => unawaited(_changePinDialog(context, ref, prefs)),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.xl),

          Text('Lưu trữ Offline',
              style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: AppSpacing.sm),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Đang lưu $totalBooks cuốn sách (${formatBytes(totalBytes)})',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Tài nguyên 3D (.glb) và âm thanh được lưu trữ ngoại tuyến và chống trùng lặp tự động.',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: tokens.textMuted,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  InteractiveScale(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final deleted = await ref
                            .read(offlinePackManagerProvider.notifier)
                            .runAssetGarbageCollection();
                        if (context.mounted) {
                          BookariaFeedback.showSuccess(
                            context,
                            message: 'Đã dọn $deleted tệp tài nguyên dư thừa không còn sách sử dụng.',
                          );
                        }
                      },
                      icon: const Icon(Icons.cleaning_services_outlined),
                      label: const Text('Dọn tài nguyên dư thừa (GC)'),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
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
      if (context.mounted) {
        BookariaFeedback.showSuccess(context, message: 'Đã kích hoạt Chế độ Trẻ em.');
      }
      return;
    }

    // Turning Kid Mode OFF requires parent PIN verification via unified PinAuthSheet
    final verified = await PinAuthSheet.showVerify(
      context,
      expectedPin: prefs.kidPin,
      reason: 'Nhập mã PIN phụ huynh để tắt Chế độ Trẻ em.',
    );

    if (verified) {
      await ref
          .read(appPreferencesProvider.notifier)
          .setKidMode(enabled: false);
      if (context.mounted) {
        BookariaFeedback.showSuccess(context, message: 'Đã tắt Chế độ Trẻ em.');
      }
    }
  }

  Future<void> _changePinDialog(
    BuildContext context,
    WidgetRef ref,
    AppPreferencesState prefs,
  ) async {
    final newPin = await PinAuthSheet.showChange(
      context,
      currentPin: prefs.kidPin,
    );

    if (newPin == null) return;

    await ref.read(appPreferencesProvider.notifier).setKidMode(
          enabled: prefs.kidModeEnabled,
          newPin: newPin,
        );
    if (context.mounted) {
      BookariaFeedback.showSuccess(
        context,
        message: 'Đã cập nhật mã PIN phụ huynh thành công.',
      );
    }
  }
}
