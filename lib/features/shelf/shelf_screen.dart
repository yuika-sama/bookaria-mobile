import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../app/book_access_guard.dart';
import '../../app/theme.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/storage/app_database.dart';
import '../../core/utils/formatters.dart';
import '../offline_pack/offline_pack_manager.dart';
import 'shelf_providers.dart';

class ShelfScreen extends ConsumerWidget {
  const ShelfScreen({super.key});

  Future<void> _openOfflineBook(
    BuildContext context,
    AppPreferencesState prefs,
    OfflineBookRecord record, {
    bool ar = false,
  }) async {
    final decision = await BookAccessGuard.authorizeKnownBook(
      context,
      prefs: prefs,
      ageMin: record.ageMin,
      title: record.title,
    );
    if (!decision.allowed || !context.mounted) return;
    final page = record.lastPageIndex + 1;
    final modeParam = ar ? '&mode=ar' : '';
    await context.push(
      '/reader/book/${record.slug}?page=$page$modeParam',
      extra: decision.verifiedByParentPin
          ? const ReaderRouteExtra(parentPinVerified: true)
          : null,
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final shelfAsync = ref.watch(shelfBooksProvider);
    final prefs = ref.watch(appPreferencesProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tủ sách Offline'),
        actions: [
          IconButton(
            tooltip: 'Làm mới tủ sách',
            onPressed: () =>
                unawaited(ref.read(shelfBooksProvider.notifier).refresh()),
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: shelfAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text('Không đọc được dữ liệu tủ sách: $err'),
          ),
        ),
        data: (books) {
          if (books.isEmpty) {
            return ListView(
              padding: const EdgeInsets.all(32),
              children: [
                const SizedBox(height: 56),
                Icon(
                  Icons.collections_bookmark_outlined,
                  size: 60,
                  color: tokens.textMuted,
                ),
                const SizedBox(height: 16),
                Text(
                  'Tủ sách Offline đang trống',
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Tải sách ở mục Khám phá để bé đọc 3D & quét AR mọi lúc, không cần mạng.',
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: tokens.textMuted),
                ),
                const SizedBox(height: 20),
                FilledButton.icon(
                  onPressed: () => context.go('/explore'),
                  icon: const Icon(Icons.explore_outlined),
                  label: const Text('Khám phá thư viện'),
                ),
              ],
            );
          }

          final totalBytes =
              books.fold<int>(0, (sum, item) => sum + item.totalBytes);

          return RefreshIndicator(
            onRefresh: () => ref.read(shelfBooksProvider.notifier).refresh(),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
              children: [
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: tokens.bgSurface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: tokens.borderDefault),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.sd_storage_outlined,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          '${books.length} cuốn sách đã lưu • ${formatBytes(totalBytes)}',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                for (final record in books) ...[
                  _OfflineBookCard(
                    record: record,
                    isAgeRestricted: prefs.kidModeEnabled &&
                        !BookAccessGuard.isAgeAllowed(record.ageMin, prefs),
                    onOpen: () =>
                        unawaited(_openOfflineBook(context, prefs, record)),
                    onOpenAr: record.arPageCount > 0
                        ? () => unawaited(
                              _openOfflineBook(
                                context,
                                prefs,
                                record,
                                ar: true,
                              ),
                            )
                        : null,
                    onDelete: () => _confirmDelete(context, ref, record),
                  ),
                  const SizedBox(height: 12),
                ],
              ],
            ),
          );
        },
      ),
    );
  }

  Future<void> _confirmDelete(
    BuildContext context,
    WidgetRef ref,
    OfflineBookRecord record,
  ) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Xóa bản Offline?'),
        content: Text(
          'Xóa "${record.title}" khỏi bộ nhớ thiết bị? Các tài nguyên dùng chung bởi sách khác vẫn được giữ lại.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: const Text('Hủy'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(dialogContext).pop(true),
            child: const Text('Xóa'),
          ),
        ],
      ),
    );
    if (confirmed == true) {
      await ref
          .read(offlinePackManagerProvider.notifier)
          .deleteOfflineBook(record);
      ref.invalidate(shelfBooksProvider);
      ref.invalidate(offlineBookBySlugProvider(record.slug));
    }
  }
}

class _OfflineBookCard extends StatelessWidget {
  const _OfflineBookCard({
    required this.record,
    required this.isAgeRestricted,
    required this.onOpen,
    required this.onDelete,
    this.onOpenAr,
  });

  final OfflineBookRecord record;
  final bool isAgeRestricted;
  final VoidCallback onOpen;
  final VoidCallback? onOpenAr;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;
    final coverExists = record.coverLocalPath != null &&
        File(record.coverLocalPath!).existsSync();

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onOpen,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: 72,
                  height: 96,
                  color: tokens.bgSurfaceSubtle,
                  child: coverExists
                      ? Image.file(
                          File(record.coverLocalPath!),
                          fit: BoxFit.cover,
                        )
                      : Icon(
                          Icons.offline_pin_outlined,
                          color: tokens.textMuted,
                        ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      record.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${record.authorName} • v${record.versionNo}',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: tokens.textMuted,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      isAgeRestricted
                          ? 'Cần PIN phụ huynh (${record.ageMin}+ tuổi) • ${formatBytes(record.totalBytes)}'
                          : 'Đọc tiếp trang ${record.lastPageIndex + 1}/${record.pageCount} • ${formatBytes(record.totalBytes)}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: isAgeRestricted
                            ? tokens.statusWarningText
                            : tokens.statusSuccessText,
                      ),
                    ),
                  ],
                ),
              ),
              if (onOpenAr != null)
                IconButton(
                  tooltip: 'Quét AR Offline',
                  onPressed: onOpenAr,
                  icon: Icon(
                    Icons.camera_alt_outlined,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ),
              IconButton(
                tooltip: 'Xóa bản offline',
                onPressed: onDelete,
                icon: Icon(
                  Icons.delete_outline_rounded,
                  color: tokens.textMuted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
