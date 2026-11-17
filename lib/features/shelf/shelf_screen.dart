import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../app/book_access_guard.dart';
import '../../app/theme.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/storage/app_database.dart';
import '../../core/ui/animations/fade_slide_in.dart';
import '../../core/ui/tokens/app_spacing.dart';
import '../../core/ui/widgets/bookaria_empty_view.dart';
import '../../core/ui/widgets/bookaria_error_view.dart';
import '../../core/ui/widgets/bookaria_feedback.dart';
import '../../core/ui/widgets/bookaria_loading.dart';
import '../../core/ui/widgets/interactive_scale.dart';
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
    final theme = Theme.of(context);

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
        loading: () => const BookariaLoadingIndicator(
          message: 'Đang mở tủ sách offline…',
        ),
        error: (err, _) => BookariaErrorView(
          error: err,
          onRetry: () async => ref.read(shelfBooksProvider.notifier).refresh(),
        ),
        data: (books) {
          if (books.isEmpty) {
            return BookariaEmptyView(
              icon: Icons.collections_bookmark_outlined,
              title: 'Tủ sách Offline đang trống',
              description:
                  'Tải các cuốn sách yêu thích ở mục Khám phá để bé có thể đọc 3D và quét AR bất cứ lúc nào mà không cần kết nối mạng.',
              actionLabel: 'Khám phá thư viện',
              actionIcon: Icons.explore_rounded,
              onAction: () => context.go('/explore'),
            );
          }

          final totalBytes =
              books.fold<int>(0, (sum, item) => sum + item.totalBytes);

          return RefreshIndicator(
            onRefresh: () => ref.read(shelfBooksProvider.notifier).refresh(),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
              physics: const BouncingScrollPhysics(
                parent: AlwaysScrollableScrollPhysics(),
              ),
              children: [
                // Storage Info Header
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: tokens.bgSurface,
                    borderRadius: AppRadius.roundedMd,
                    border: Border.all(color: tokens.borderDefault),
                    boxShadow: AppShadows.soft(theme.colorScheme.shadow),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: tokens.bgSurfaceSubtle,
                          borderRadius: AppRadius.roundedSm,
                        ),
                        child: Icon(
                          Icons.sd_storage_rounded,
                          size: 20,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Đã lưu ${books.length} cuốn sách',
                              style: theme.textTheme.titleSmall?.copyWith(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Tổng dung lượng: ${formatBytes(totalBytes)}',
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
                const SizedBox(height: AppSpacing.md),

                // Offline Books List
                for (int i = 0; i < books.length; i++) ...[
                  FadeSlideIn(
                    delay: Duration(milliseconds: (i % 8) * 40),
                    child: _OfflineBookCard(
                      record: books[i],
                      isAgeRestricted: prefs.kidModeEnabled &&
                          !BookAccessGuard.isAgeAllowed(books[i].ageMin, prefs),
                      onOpen: () =>
                          unawaited(_openOfflineBook(context, prefs, books[i])),
                      onOpenAr: books[i].arPageCount > 0
                          ? () => unawaited(
                                _openOfflineBook(
                                  context,
                                  prefs,
                                  books[i],
                                  ar: true,
                                ),
                              )
                          : null,
                      onDelete: () => _confirmDelete(context, ref, books[i]),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
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
      builder: (dialogContext) {
        final theme = Theme.of(dialogContext);
        final tokens = theme.extension<BookariaTokens>()!;
        return AlertDialog(
          icon: Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: tokens.statusDangerBg,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.delete_forever_rounded,
              color: tokens.statusDangerText,
              size: 28,
            ),
          ),
          title: const Text('Xóa sách Offline?'),
          content: Text(
            'Xóa cuốn sách "${record.title}" khỏi bộ nhớ máy? Bạn vẫn có thể tải lại bất kỳ lúc nào từ thư viện.',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: const Text('Hủy'),
            ),
            FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: tokens.statusDangerText,
                foregroundColor: Colors.white,
              ),
              onPressed: () => Navigator.of(dialogContext).pop(true),
              child: const Text('Xác nhận xóa'),
            ),
          ],
        );
      },
    );

    if (confirmed == true) {
      await ref
          .read(offlinePackManagerProvider.notifier)
          .deleteOfflineBook(record);
      ref.invalidate(shelfBooksProvider);
      ref.invalidate(offlineBookBySlugProvider(record.slug));
      if (context.mounted) {
        BookariaFeedback.showInfo(
          context,
          message: 'Đã xóa sách "${record.title}" khỏi bộ nhớ.',
        );
      }
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

    return InteractiveScale(
      onTap: onOpen,
      borderRadius: AppRadius.roundedMd,
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Cover
              ClipRRect(
                borderRadius: AppRadius.roundedSm,
                child: Container(
                  width: 74,
                  height: 102,
                  color: tokens.bgSurfaceSubtle,
                  child: coverExists
                      ? Image.file(
                          File(record.coverLocalPath!),
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => Center(
                            child: Icon(
                              Icons.auto_stories_outlined,
                              size: 28,
                              color: tokens.textMuted,
                            ),
                          ),
                        )
                      : Center(
                          child: Icon(
                            Icons.auto_stories_outlined,
                            size: 28,
                            color: tokens.textMuted,
                          ),
                        ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),

              // Details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      record.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                        height: 1.25,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      '${record.authorName} • v${record.versionNo}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: tokens.textMuted,
                      ),
                    ),
                    const SizedBox(height: 8),

                    // Progress & size indicator
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3.5,
                      ),
                      decoration: BoxDecoration(
                        color: isAgeRestricted
                            ? tokens.statusWarningBg
                            : tokens.statusSuccessBg,
                        borderRadius: AppRadius.roundedXs,
                      ),
                      child: Text(
                        isAgeRestricted
                            ? 'Cần PIN phụ huynh (${record.ageMin}+T)'
                            : 'Trang ${record.lastPageIndex + 1}/${record.pageCount} • ${formatBytes(record.totalBytes)}',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: isAgeRestricted
                              ? tokens.statusWarningText
                              : tokens.statusSuccessText,
                          fontSize: 11.5,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // Actions
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (onOpenAr != null)
                    IconButton(
                      tooltip: 'Quét AR Offline',
                      onPressed: onOpenAr,
                      icon: Icon(
                        Icons.camera_alt_rounded,
                        color: theme.colorScheme.primary,
                        size: 22,
                      ),
                    ),
                  IconButton(
                    tooltip: 'Xóa sách offline',
                    onPressed: onDelete,
                    icon: Icon(
                      Icons.delete_outline_rounded,
                      color: tokens.textMuted,
                      size: 22,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
