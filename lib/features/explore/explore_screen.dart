import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../app/theme.dart';
import '../../core/contracts/public_book.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/utils/formatters.dart';
import '../shelf/shelf_providers.dart';
import 'explore_providers.dart';

class ExploreScreen extends ConsumerStatefulWidget {
  const ExploreScreen({super.key});

  @override
  ConsumerState<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends ConsumerState<ExploreScreen> {
  final TextEditingController _searchController = TextEditingController();
  Timer? _debounce;

  @override
  void dispose() {
    _debounce?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged(String value) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 350), () {
      if (mounted) {
        ref.read(exploreFilterProvider.notifier).setQuery(value);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final filter = ref.watch(exploreFilterProvider);
    final prefs = ref.watch(appPreferencesProvider);
    final booksAsync = ref.watch(exploreBooksProvider);
    final shelfAsync = ref.watch(shelfBooksProvider);
    final offlineSlugs =
        shelfAsync.asData?.value.map((e) => e.slug).toSet() ?? const <String>{};
    final tokens = Theme.of(context).extension<BookariaTokens>()!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Khám phá Bookaria'),
        actions: [
          if (prefs.kidModeEnabled)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Chip(
                avatar: const Icon(Icons.child_care_rounded, size: 16),
                label: Text('Trẻ em ≤${prefs.kidMaxAge}T'),
                backgroundColor: tokens.statusSuccessBg,
                labelStyle: TextStyle(
                  color: tokens.statusSuccessText,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
                side: BorderSide.none,
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
            child: TextField(
              controller: _searchController,
              onChanged: _onSearchChanged,
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(
                hintText: 'Tìm tên sách AR, chủ đề, tác giả…',
                prefixIcon: const Icon(Icons.search_rounded),
                suffixIcon: filter.query.isNotEmpty || _searchController.text.isNotEmpty
                    ? IconButton(
                        tooltip: 'Xóa tìm kiếm',
                        onPressed: () {
                          _searchController.clear();
                          ref.read(exploreFilterProvider.notifier).setQuery('');
                        },
                        icon: const Icon(Icons.close_rounded),
                      )
                    : null,
              ),
            ),
          ),
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                ChoiceChip(
                  label: const Text('Mới nhất'),
                  selected: filter.sort == PublicBooksSort.newest,
                  onSelected: (_) => ref
                      .read(exploreFilterProvider.notifier)
                      .setSort(PublicBooksSort.newest),
                ),
                const SizedBox(width: 8),
                ChoiceChip(
                  label: const Text('Phổ biến'),
                  selected: filter.sort == PublicBooksSort.popular,
                  onSelected: (_) => ref
                      .read(exploreFilterProvider.notifier)
                      .setSort(PublicBooksSort.popular),
                ),
                const SizedBox(width: 12),
                _AgeChip(
                  label: 'Mọi tuổi',
                  selected: filter.age == null ||
                      (prefs.kidModeEnabled && filter.age! > prefs.kidMaxAge),
                  onSelected: () =>
                      ref.read(exploreFilterProvider.notifier).setAge(null),
                ),
                if (!prefs.kidModeEnabled || 4 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _AgeChip(
                    label: '4+ tuổi',
                    selected: filter.age == 4,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(4),
                  ),
                ],
                if (!prefs.kidModeEnabled || 7 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _AgeChip(
                    label: '7+ tuổi',
                    selected: filter.age == 7,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(7),
                  ),
                ],
                if (!prefs.kidModeEnabled || 10 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _AgeChip(
                    label: '10+ tuổi',
                    selected: filter.age == 10,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(10),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: RefreshIndicator(
              onRefresh: () async {
                ref.invalidate(exploreBooksProvider);
                await ref.read(exploreBooksProvider.future);
              },
              child: booksAsync.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (error, _) => _ExploreErrorState(
                  message: error.toString(),
                  onRetry: () => ref.invalidate(exploreBooksProvider),
                  onOpenShelf: () => context.go('/shelf'),
                  onOpenScanner: () => unawaited(context.push('/scan')),
                ),
                data: (paged) {
                  if (paged.data.isEmpty) {
                    return ListView(
                      children: [
                        const SizedBox(height: 72),
                        Icon(
                          Icons.menu_book_outlined,
                          size: 56,
                          color: tokens.textMuted,
                        ),
                        const SizedBox(height: 16),
                        Center(
                          child: Text(
                            'Không tìm thấy cuốn sách phù hợp',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Center(
                          child: Text(
                            'Thử từ khóa khác hoặc quét mã QR trên trang sách in.',
                            style: Theme.of(context)
                                .textTheme
                                .bodyMedium
                                ?.copyWith(color: tokens.textMuted),
                          ),
                        ),
                      ],
                    );
                  }

                  return ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 96),
                    itemCount: paged.data.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final book = paged.data[index];
                      final isDownloaded = offlineSlugs.contains(book.slug);
                      return _PublicBookListCard(
                        book: book,
                        isDownloaded: isDownloaded,
                        onTap: () => unawaited(
                          context.push('/book/${book.slug}'),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AgeChip extends StatelessWidget {
  const _AgeChip({
    required this.label,
    required this.selected,
    required this.onSelected,
  });

  final String label;
  final bool selected;
  final VoidCallback onSelected;

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => onSelected(),
    );
  }
}

class _PublicBookListCard extends StatelessWidget {
  const _PublicBookListCard({
    required this.book,
    required this.isDownloaded,
    required this.onTap,
  });

  final PublicBookCard book;
  final bool isDownloaded;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: 84,
                  height: 112,
                  color: tokens.bgSurfaceSubtle,
                  child: book.coverUrl != null
                      ? Image.network(
                          book.coverUrl!,
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => Icon(
                            Icons.auto_stories_outlined,
                            size: 32,
                            color: tokens.textMuted,
                          ),
                        )
                      : Icon(
                          Icons.auto_stories_outlined,
                          size: 32,
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
                      book.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      book.author.displayName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: tokens.textMuted,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: [
                        _MetaTag(
                          icon: Icons.view_in_ar_rounded,
                          label: '${book.arPageCount} trang AR',
                          background: tokens.bgSurfaceSubtle,
                          foreground: theme.colorScheme.onSurface,
                        ),
                        _MetaTag(
                          label: formatAgeRange(book.ageMin, book.ageMax),
                          background: tokens.bgSurfaceSubtle,
                          foreground: tokens.textMuted,
                        ),
                        if (isDownloaded)
                          _MetaTag(
                            icon: Icons.offline_pin_rounded,
                            label: 'Offline',
                            background: tokens.statusSuccessBg,
                            foreground: tokens.statusSuccessText,
                          ),
                      ],
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right_rounded,
                color: tokens.textMuted,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MetaTag extends StatelessWidget {
  const _MetaTag({
    this.icon,
    required this.label,
    required this.background,
    required this.foreground,
  });

  final IconData? icon;
  final String label;
  final Color background;
  final Color foreground;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 13, color: foreground),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: foreground,
            ),
          ),
        ],
      ),
    );
  }
}

class _ExploreErrorState extends StatelessWidget {
  const _ExploreErrorState({
    required this.message,
    required this.onRetry,
    required this.onOpenShelf,
    required this.onOpenScanner,
  });

  final String message;
  final VoidCallback onRetry;
  final VoidCallback onOpenShelf;
  final VoidCallback onOpenScanner;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tokens = theme.extension<BookariaTokens>()!;

    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        const SizedBox(height: 40),
        Icon(Icons.cloud_off_rounded, size: 52, color: tokens.textMuted),
        const SizedBox(height: 16),
        Text(
          'Chưa kết nối được thư viện trực tuyến',
          textAlign: TextAlign.center,
          style: theme.textTheme.titleMedium,
        ),
        const SizedBox(height: 8),
        Text(
          message,
          textAlign: TextAlign.center,
          style: theme.textTheme.bodySmall?.copyWith(color: tokens.textMuted),
        ),
        const SizedBox(height: 20),
        FilledButton.icon(
          onPressed: onRetry,
          icon: const Icon(Icons.refresh_rounded),
          label: const Text('Thử lại'),
        ),
        const SizedBox(height: 10),
        OutlinedButton.icon(
          onPressed: onOpenShelf,
          icon: const Icon(Icons.collections_bookmark_outlined),
          label: const Text('Mở Tủ sách Offline'),
        ),
        const SizedBox(height: 10),
        OutlinedButton.icon(
          onPressed: onOpenScanner,
          icon: const Icon(Icons.qr_code_scanner_rounded),
          label: const Text('Quét mã QR / Nhập mã sách'),
        ),
      ],
    );
  }
}
