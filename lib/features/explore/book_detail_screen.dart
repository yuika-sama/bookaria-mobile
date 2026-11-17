import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../app/book_access_guard.dart';
import '../../app/theme.dart';
import '../../core/config/app_config.dart';
import '../../core/contracts/public_book.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/ui/tokens/app_spacing.dart';
import '../../core/ui/widgets/bookaria_error_view.dart';
import '../../core/ui/widgets/bookaria_feedback.dart';
import '../../core/ui/widgets/bookaria_loading.dart';
import '../../core/ui/widgets/interactive_scale.dart';
import '../../core/utils/formatters.dart';
import '../offline_pack/offline_pack_manager.dart';
import '../shelf/shelf_providers.dart';
import 'explore_providers.dart';

class BookDetailScreen extends ConsumerStatefulWidget {
  const BookDetailScreen({
    super.key,
    required this.slug,
  });

  final String slug;

  @override
  ConsumerState<BookDetailScreen> createState() => _BookDetailScreenState();
}

class _BookDetailScreenState extends ConsumerState<BookDetailScreen> {
  bool _isActionInProgress = false;

  Future<void> _openBookReader(
    BuildContext context, {
    required AppPreferencesState prefs,
    required String title,
    required int? ageMin,
    required String location,
  }) async {
    if (_isActionInProgress) return;
    setState(() => _isActionInProgress = true);

    try {
      final decision = await BookAccessGuard.authorizeKnownBook(
        context,
        prefs: prefs,
        ageMin: ageMin,
        title: title,
      );
      if (!decision.allowed || !context.mounted) return;
      await context.push(
        location,
        extra: decision.verifiedByParentPin
            ? const ReaderRouteExtra(parentPinVerified: true)
            : null,
      );
    } finally {
      if (mounted) {
        setState(() => _isActionInProgress = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final detailAsync = ref.watch(bookDetailProvider(widget.slug));
    final offlineAsync = ref.watch(offlineBookBySlugProvider(widget.slug));
    final downloadMap = ref.watch(offlinePackManagerProvider);
    final downloadTask = downloadMap[widget.slug];
    final prefs = ref.watch(appPreferencesProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chi tiết sách'),
      ),
      body: detailAsync.when(
        loading: () => const BookariaLoadingIndicator(
          message: 'Đang tải thông tin sách…',
        ),
        error: (error, _) {
          final offline = offlineAsync.asData?.value;
          if (offline != null) {
            return Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: tokens.statusWarningBg,
                      borderRadius: AppRadius.roundedMd,
                      border: Border.all(
                        color: tokens.statusWarningText.withValues(alpha: 0.25),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.wifi_off_rounded,
                          color: tokens.statusWarningText,
                          size: 22,
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: Text(
                            'Bạn đang ngoại tuyến. Có thể mở bản "${offline.title}" đã lưu trong Tủ sách.',
                            style: TextStyle(
                              color: tokens.statusWarningText,
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  InteractiveScale(
                    child: FilledButton.icon(
                      onPressed: () => unawaited(
                        _openBookReader(
                          context,
                          prefs: prefs,
                          title: offline.title,
                          ageMin: offline.ageMin,
                          location:
                              '/reader/book/${widget.slug}?page=${offline.lastPageIndex + 1}',
                        ),
                      ),
                      icon: const Icon(Icons.menu_book_rounded),
                      label: const Text('Mở bản đọc Offline (3D)'),
                    ),
                  ),
                  if (offline.arPageCount > 0) ...[
                    const SizedBox(height: AppSpacing.sm),
                    InteractiveScale(
                      child: FilledButton.tonalIcon(
                        onPressed: () => unawaited(
                          _openBookReader(
                            context,
                            prefs: prefs,
                            title: offline.title,
                            ageMin: offline.ageMin,
                            location:
                                '/reader/book/${widget.slug}?mode=ar&page=${offline.lastPageIndex + 1}',
                          ),
                        ),
                        icon: const Icon(Icons.camera_alt_outlined),
                        label: const Text('Quét AR Offline'),
                      ),
                    ),
                  ],
                ],
              ),
            );
          }

          return BookariaErrorView(
            error: error,
            onRetry: () async => ref.invalidate(bookDetailProvider(widget.slug)),
          );
        },
        data: (book) {
          final config = ref.watch(appConfigProvider);
          final offline = offlineAsync.asData?.value;
          final isUpToDateOffline =
              offline != null && offline.versionId == book.version.id;
          final isDownloading = downloadTask != null &&
              !downloadTask.isCompleted &&
              downloadTask.errorMessage == null;
          final isAgeRestricted = prefs.kidModeEnabled &&
              !BookAccessGuard.isAgeAllowed(book.ageMin, prefs);

          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 40),
            physics: const BouncingScrollPhysics(),
            children: [
              // Book Header row
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: AppRadius.roundedMd,
                    child: Container(
                      width: 114,
                      height: 156,
                      color: tokens.bgSurfaceSubtle,
                      child: book.coverUrl != null
                          ? Image.network(
                              book.coverUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (_, _, _) => Center(
                                child: Icon(
                                  Icons.auto_stories_outlined,
                                  size: 40,
                                  color: tokens.textMuted,
                                ),
                              ),
                            )
                          : Center(
                              child: Icon(
                                Icons.auto_stories_outlined,
                                size: 40,
                                color: tokens.textMuted,
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.lg),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          book.title,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            height: 1.25,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Tác giả: ${book.author.displayName}',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: tokens.textMuted,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: [
                            _InfoPill('${book.pageCount} trang'),
                            _InfoPill('${book.arPageCount} trang AR'),
                            _InfoPill(formatAgeRange(book.ageMin, book.ageMax)),
                            _InfoPill(formatBytes(book.downloadBytes)),
                            _InfoPill('v${book.version.versionNo}'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              // Age restriction notice
              if (isAgeRestricted) ...[
                const SizedBox(height: AppSpacing.lg),
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: tokens.statusWarningBg,
                    borderRadius: AppRadius.roundedMd,
                    border: Border.all(
                      color: tokens.statusWarningText.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.lock_outline_rounded,
                        color: tokens.statusWarningText,
                        size: 20,
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: Text(
                          'Sách dành cho ${book.ageMin}+ tuổi (vượt giới hạn Kid Mode ≤ ${prefs.kidMaxAge} tuổi). Cần mã PIN phụ huynh để mở.',
                          style: TextStyle(
                            color: tokens.statusWarningText,
                            fontSize: 12.5,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: AppSpacing.xl),

              // Reading Actions
              Row(
                children: [
                  Expanded(
                    child: InteractiveScale(
                      child: FilledButton.icon(
                        onPressed: () => unawaited(
                          _openBookReader(
                            context,
                            prefs: prefs,
                            title: book.title,
                            ageMin: book.ageMin,
                            location: '/reader/book/${book.slug}',
                          ),
                        ),
                        icon: const Icon(Icons.view_in_ar_outlined),
                        label: const Text('Đọc 3D'),
                      ),
                    ),
                  ),
                  if (book.arPageCount > 0) ...[
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: InteractiveScale(
                        child: FilledButton.tonalIcon(
                          onPressed: () => unawaited(
                            _openBookReader(
                              context,
                              prefs: prefs,
                              title: book.title,
                              ageMin: book.ageMin,
                              location: '/reader/book/${book.slug}?mode=ar',
                            ),
                          ),
                          icon: const Icon(Icons.camera_alt_outlined),
                          label: const Text('Quét AR'),
                        ),
                      ),
                    ),
                  ],
                ],
              ),

              if (!prefs.kidModeEnabled) ...[
                const SizedBox(height: AppSpacing.sm),
                InteractiveScale(
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      final uri = config.bookWebViewerUrl(book.slug);
                      await launchUrl(
                        uri,
                        mode: LaunchMode.externalApplication,
                      );
                    },
                    icon: const Icon(Icons.open_in_browser_outlined),
                    label: const Text('Mở trên Web Viewer'),
                  ),
                ),
              ],

              const SizedBox(height: AppSpacing.md),

              // Offline Download Card
              _OfflineDownloadCard(
                book: book,
                isDownloading: isDownloading,
                isUpToDateOffline: isUpToDateOffline,
                hasOlderOffline: offline != null && !isUpToDateOffline,
                downloadTask: downloadTask,
                onDownload: () async {
                  final decision = await BookAccessGuard.authorizeKnownBook(
                    context,
                    prefs: prefs,
                    ageMin: book.ageMin,
                    title: book.title,
                  );
                  if (!decision.allowed) return;
                  try {
                    await ref
                        .read(offlinePackManagerProvider.notifier)
                        .downloadBook(book);
                    ref.invalidate(shelfBooksProvider);
                    ref.invalidate(offlineBookBySlugProvider(widget.slug));
                    if (context.mounted) {
                      BookariaFeedback.showSuccess(
                        context,
                        message: 'Đã tải gói đọc Offline thành công.',
                      );
                    }
                  } catch (err) {
                    if (context.mounted) {
                      BookariaFeedback.showError(
                        context,
                        message: 'Không thể tải offline: $err',
                      );
                    }
                  }
                },
                onCancel: () => ref
                    .read(offlinePackManagerProvider.notifier)
                    .cancelDownload(book.slug),
                onDeleteOffline: offline == null
                    ? null
                    : () async {
                        await ref
                            .read(offlinePackManagerProvider.notifier)
                            .deleteOfflineBook(offline);
                        ref.invalidate(shelfBooksProvider);
                        ref.invalidate(offlineBookBySlugProvider(widget.slug));
                        if (context.mounted) {
                          BookariaFeedback.showInfo(
                            context,
                            message: 'Đã xóa bản Offline khỏi thiết bị.',
                          );
                        }
                      },
              ),

              if (book.printPdfUrl != null && !prefs.kidModeEnabled) ...[
                const SizedBox(height: AppSpacing.sm),
                InteractiveScale(
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      final uri = Uri.tryParse(book.printPdfUrl!);
                      if (uri != null) {
                        await launchUrl(
                          uri,
                          mode: LaunchMode.externalApplication,
                        );
                      }
                    },
                    icon: const Icon(Icons.picture_as_pdf_outlined),
                    label: const Text('Tải bản PDF để in trang AR'),
                  ),
                ),
              ],

              const SizedBox(height: AppSpacing.xl),

              // Description section
              Text(
                'Giới thiệu tác phẩm',
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: tokens.bgSurface,
                  borderRadius: AppRadius.roundedMd,
                  border: Border.all(color: tokens.borderDefault),
                ),
                child: Text(
                  (book.description != null && book.description!.trim().isNotEmpty)
                      ? book.description!
                      : 'Cuốn sách tương tác Bookaria hỗ trợ các hiệu ứng mô hình 3D sống động, nhận diện quét AR trên trang in giấy và lưu trữ để bé đọc bất cứ lúc nào.',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    height: 1.55,
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.9),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _InfoPill extends StatelessWidget {
  const _InfoPill(this.label);
  final String label;

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<BookariaTokens>()!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: tokens.bgSurfaceSubtle,
        borderRadius: AppRadius.roundedXs,
        border: Border.all(color: tokens.borderDefault),
      ),
      child: Text(
        label,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              fontSize: 11.5,
              fontWeight: FontWeight.w500,
            ),
      ),
    );
  }
}

class _OfflineDownloadCard extends StatelessWidget {
  const _OfflineDownloadCard({
    required this.book,
    required this.isDownloading,
    required this.isUpToDateOffline,
    required this.hasOlderOffline,
    required this.downloadTask,
    required this.onDownload,
    required this.onCancel,
    required this.onDeleteOffline,
  });

  final PublicBook book;
  final bool isDownloading;
  final bool isUpToDateOffline;
  final bool hasOlderOffline;
  final DownloadTaskState? downloadTask;
  final VoidCallback onDownload;
  final VoidCallback onCancel;
  final VoidCallback? onDeleteOffline;

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    if (isDownloading) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      downloadTask?.statusLabel ?? 'Đang tải về máy…',
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                    ),
                  ),
                  TextButton(
                    onPressed: onCancel,
                    child: const Text('Hủy'),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: AppRadius.roundedPill,
                child: LinearProgressIndicator(
                  value: downloadTask?.progress,
                  minHeight: 6,
                ),
              ),
            ],
          ),
        ),
      );
    }

    if (isUpToDateOffline) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: tokens.statusSuccessBg,
          borderRadius: AppRadius.roundedMd,
          border: Border.all(
            color: tokens.statusSuccessText.withValues(alpha: 0.25),
          ),
        ),
        child: Row(
          children: [
            Icon(Icons.offline_pin_rounded, color: tokens.statusSuccessText, size: 22),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: Text(
                'Bản Offline đã cập nhật (${formatBytes(book.downloadBytes)})',
                style: TextStyle(
                  color: tokens.statusSuccessText,
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
            ),
            if (onDeleteOffline != null)
              IconButton(
                tooltip: 'Xóa bản offline',
                onPressed: onDeleteOffline,
                icon: Icon(
                  Icons.delete_outline_rounded,
                  color: tokens.statusSuccessText,
                  size: 20,
                ),
              ),
          ],
        ),
      );
    }

    return InteractiveScale(
      child: OutlinedButton.icon(
        onPressed: onDownload,
        icon: const Icon(Icons.download_for_offline_outlined),
        label: Text(
          hasOlderOffline
              ? 'Cập nhật bản Offline (${formatBytes(book.downloadBytes)})'
              : 'Tải đọc Offline (${formatBytes(book.downloadBytes)})',
        ),
      ),
    );
  }
}
