import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../app/theme.dart';
import '../../core/contracts/public_book.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/utils/formatters.dart';
import '../offline_pack/offline_pack_manager.dart';
import '../shelf/shelf_providers.dart';
import 'explore_providers.dart';

class BookDetailScreen extends ConsumerWidget {
  const BookDetailScreen({
    super.key,
    required this.slug,
  });

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final detailAsync = ref.watch(bookDetailProvider(slug));
    final offlineAsync = ref.watch(offlineBookBySlugProvider(slug));
    final downloadMap = ref.watch(offlinePackManagerProvider);
    final downloadTask = downloadMap[slug];
    final prefs = ref.watch(appPreferencesProvider);
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chi tiết sách'),
      ),
      body: detailAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) {
          final offline = offlineAsync.asData?.value;
          if (offline != null) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: tokens.statusWarningBg,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'Bạn đang ngoại tuyến. Vẫn có thể mở bản "${offline.title}" đã lưu trong Tủ sách.',
                      style: TextStyle(color: tokens.statusWarningText),
                    ),
                  ),
                  const SizedBox(height: 16),
                  FilledButton.icon(
                    onPressed: () => unawaited(
                      context.push(
                        '/reader/book/$slug?page=${offline.lastPageIndex + 1}',
                      ),
                    ),
                    icon: const Icon(Icons.menu_book_rounded),
                    label: const Text('Mở bản đọc Offline'),
                  ),
                ],
              ),
            );
          }

          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(error.toString(), textAlign: TextAlign.center),
                  const SizedBox(height: 16),
                  FilledButton(
                    onPressed: () => ref.invalidate(bookDetailProvider(slug)),
                    child: const Text('Thử lại'),
                  ),
                ],
              ),
            ),
          );
        },
        data: (book) {
          final offline = offlineAsync.asData?.value;
          final isUpToDateOffline =
              offline != null && offline.versionId == book.version.id;
          final isDownloading =
              downloadTask != null && !downloadTask.isCompleted && downloadTask.errorMessage == null;

          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      width: 112,
                      height: 152,
                      color: tokens.bgSurfaceSubtle,
                      child: book.coverUrl != null
                          ? Image.network(
                              book.coverUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (_, _, _) => Icon(
                                Icons.auto_stories_outlined,
                                size: 40,
                                color: tokens.textMuted,
                              ),
                            )
                          : Icon(
                              Icons.auto_stories_outlined,
                              size: 40,
                              color: tokens.textMuted,
                            ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          book.title,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Tác giả: ${book.author.displayName}',
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: tokens.textMuted,
                              ),
                        ),
                        const SizedBox(height: 10),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            _InfoPill('${book.pageCount} trang'),
                            _InfoPill('${book.arPageCount} trang AR'),
                            _InfoPill(formatAgeRange(book.ageMin, book.ageMax)),
                            _InfoPill('Dung lượng ${formatBytes(book.downloadBytes)}'),
                            _InfoPill('v${book.version.versionNo}'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: () =>
                          unawaited(context.push('/reader/book/${book.slug}')),
                      icon: const Icon(Icons.view_in_ar_outlined),
                      label: const Text('Đọc 3D'),
                    ),
                  ),
                  if (book.arPageCount > 0) ...[
                    const SizedBox(width: 12),
                    Expanded(
                      child: FilledButton.tonalIcon(
                        onPressed: () => unawaited(
                          context.push('/reader/book/${book.slug}?mode=ar'),
                        ),
                        icon: const Icon(Icons.camera_alt_outlined),
                        label: const Text('Quét AR'),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: 12),
              _OfflineDownloadCard(
                book: book,
                isDownloading: isDownloading,
                isUpToDateOffline: isUpToDateOffline,
                hasOlderOffline: offline != null && !isUpToDateOffline,
                downloadTask: downloadTask,
                onDownload: () async {
                  try {
                    await ref
                        .read(offlinePackManagerProvider.notifier)
                        .downloadBook(book);
                    ref.invalidate(shelfBooksProvider);
                    ref.invalidate(offlineBookBySlugProvider(slug));
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Đã tải gói đọc Offline thành công.'),
                        ),
                      );
                    }
                  } catch (err) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Không thể tải offline: $err')),
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
                        ref.invalidate(offlineBookBySlugProvider(slug));
                      },
              ),
              if (book.printPdfUrl != null && !prefs.kidModeEnabled) ...[
                const SizedBox(height: 12),
                OutlinedButton.icon(
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
                  label: const Text('Tải PDF để in sách'),
                ),
              ],
              const SizedBox(height: 20),
              Text(
                'Giới thiệu',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Text(
                (book.description != null && book.description!.trim().isNotEmpty)
                    ? book.description!
                    : 'Cuốn sách tương tác Bookaria hỗ trợ chế độ 3D, quét AR trên trang in và đọc không cần mạng khi tải về máy.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      height: 1.5,
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
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: tokens.bgSurfaceSubtle,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: tokens.borderDefault),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.bodySmall,
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
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      downloadTask?.statusLabel ?? 'Đang tải về máy…',
                      style: Theme.of(context).textTheme.titleSmall,
                    ),
                  ),
                  TextButton(
                    onPressed: onCancel,
                    child: const Text('Hủy'),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              LinearProgressIndicator(value: downloadTask?.progress),
            ],
          ),
        ),
      );
    }

    if (isUpToDateOffline) {
      return Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: tokens.statusSuccessBg,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(Icons.offline_pin_rounded, color: tokens.statusSuccessText),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                'Đã lưu bản Offline mới nhất (${formatBytes(book.downloadBytes)})',
                style: TextStyle(
                  color: tokens.statusSuccessText,
                  fontWeight: FontWeight.w600,
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
                ),
              ),
          ],
        ),
      );
    }

    return OutlinedButton.icon(
      onPressed: onDownload,
      icon: const Icon(Icons.download_for_offline_outlined),
      label: Text(
        hasOlderOffline
            ? 'Cập nhật bản Offline (${formatBytes(book.downloadBytes)})'
            : 'Tải đọc Offline (${formatBytes(book.downloadBytes)})',
      ),
    );
  }
}
