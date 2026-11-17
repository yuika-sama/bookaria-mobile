import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../app/theme.dart';
import '../../core/contracts/public_book.dart';
import '../../core/preferences/app_preferences.dart';
import '../../core/ui/animations/fade_slide_in.dart';
import '../../core/ui/tokens/app_spacing.dart';
import '../../core/ui/widgets/bookaria_empty_view.dart';
import '../../core/ui/widgets/bookaria_error_view.dart';
import '../../core/ui/widgets/bookaria_loading.dart';
import '../../core/ui/widgets/bookaria_logo.dart';
import '../../core/ui/widgets/interactive_scale.dart';
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
    _debounce = Timer(const Duration(milliseconds: 300), () {
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
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const BookariaLogo(size: 26, showWordmark: false),
            const SizedBox(width: AppSpacing.sm),
            Flexible(
              child: Text(
                'Khám phá Bookaria',
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
        actions: [
          if (prefs.kidModeEnabled)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: tokens.statusSuccessBg,
                  borderRadius: AppRadius.roundedPill,
                  border: Border.all(
                    color: tokens.statusSuccessText.withValues(alpha: 0.25),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      Icons.child_care_rounded,
                      size: 15,
                      color: tokens.statusSuccessText,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '≤${prefs.kidMaxAge}T',
                      style: TextStyle(
                        color: tokens.statusSuccessText,
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 6, 16, 8),
            child: TextField(
              controller: _searchController,
              onChanged: _onSearchChanged,
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(
                hintText: 'Tìm sách AR, tác giả, chủ đề…',
                prefixIcon: const Icon(Icons.search_rounded),
                suffixIcon: filter.query.isNotEmpty || _searchController.text.isNotEmpty
                    ? IconButton(
                        tooltip: 'Xóa tìm kiếm',
                        onPressed: () {
                          _searchController.clear();
                          ref.read(exploreFilterProvider.notifier).setQuery('');
                        },
                        icon: const Icon(Icons.close_rounded, size: 20),
                      )
                    : null,
              ),
            ),
          ),

          // Filter & Age Selection Chips
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              physics: const BouncingScrollPhysics(),
              children: [
                _ExploreFilterChip(
                  label: 'Mới nhất',
                  selected: filter.sort == PublicBooksSort.newest,
                  onSelected: () => ref
                      .read(exploreFilterProvider.notifier)
                      .setSort(PublicBooksSort.newest),
                ),
                const SizedBox(width: 8),
                _ExploreFilterChip(
                  label: 'Phổ biến',
                  selected: filter.sort == PublicBooksSort.popular,
                  onSelected: () => ref
                      .read(exploreFilterProvider.notifier)
                      .setSort(PublicBooksSort.popular),
                ),
                const SizedBox(width: 12),
                _ExploreFilterChip(
                  label: 'Tất cả độ tuổi',
                  selected: filter.age == null ||
                      (prefs.kidModeEnabled && filter.age! > prefs.kidMaxAge),
                  onSelected: () =>
                      ref.read(exploreFilterProvider.notifier).setAge(null),
                ),
                if (!prefs.kidModeEnabled || 4 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _ExploreFilterChip(
                    label: '4+ tuổi',
                    selected: filter.age == 4,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(4),
                  ),
                ],
                if (!prefs.kidModeEnabled || 7 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _ExploreFilterChip(
                    label: '7+ tuổi',
                    selected: filter.age == 7,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(7),
                  ),
                ],
                if (!prefs.kidModeEnabled || 10 <= prefs.kidMaxAge) ...[
                  const SizedBox(width: 8),
                  _ExploreFilterChip(
                    label: '10+ tuổi',
                    selected: filter.age == 10,
                    onSelected: () =>
                        ref.read(exploreFilterProvider.notifier).setAge(10),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.sm),

          // Main Books Area
          Expanded(
            child: RefreshIndicator(
              onRefresh: () async {
                ref.invalidate(exploreBooksProvider);
                await ref.read(exploreBooksProvider.future);
              },
              child: booksAsync.when(
                loading: () => ListView.separated(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 96),
                  itemCount: 4,
                  separatorBuilder: (_, _) => const SizedBox(height: 12),
                  itemBuilder: (_, _) => const BookariaCardSkeleton(),
                ),
                error: (error, _) => BookariaErrorView(
                  error: error,
                  onRetry: () async {
                    ref.invalidate(exploreBooksProvider);
                    await ref.read(exploreBooksProvider.future);
                  },
                  secondaryActionLabel: 'Mở Tủ sách Offline',
                  secondaryActionIcon: Icons.collections_bookmark_outlined,
                  onSecondaryAction: () => context.go('/shelf'),
                ),
                data: (paged) {
                  if (paged.data.isEmpty) {
                    return BookariaEmptyView(
                      icon: Icons.menu_book_outlined,
                      title: 'Không tìm thấy cuốn sách nào',
                      description: filter.query.isNotEmpty
                          ? 'Không có kết quả cho từ khóa "${filter.query}". Hãy thử từ khóa khác hoặc quét mã QR.'
                          : 'Thư viện chưa có sách phù hợp với bộ lọc tuổi hiện tại.',
                      actionLabel: filter.query.isNotEmpty ? 'Xóa từ khóa tìm kiếm' : 'Xem toàn bộ sách',
                      onAction: () {
                        _searchController.clear();
                        ref.read(exploreFilterProvider.notifier).setQuery('');
                        ref.read(exploreFilterProvider.notifier).setAge(null);
                      },
                    );
                  }

                  return ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 96),
                    physics: const BouncingScrollPhysics(
                      parent: AlwaysScrollableScrollPhysics(),
                    ),
                    itemCount: paged.data.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final book = paged.data[index];
                      final isDownloaded = offlineSlugs.contains(book.slug);
                      return FadeSlideIn(
                        delay: Duration(milliseconds: (index % 10) * 35),
                        child: _PublicBookListCard(
                          book: book,
                          isDownloaded: isDownloaded,
                          onTap: () => unawaited(
                            context.push('/book/${book.slug}'),
                          ),
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

class _ExploreFilterChip extends StatelessWidget {
  const _ExploreFilterChip({
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
      label: Text(
        label,
        overflow: TextOverflow.visible,
        softWrap: false,
      ),
      selected: selected,
      onSelected: (_) => onSelected(),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      labelPadding: const EdgeInsets.symmetric(horizontal: 4),
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
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

    return InteractiveScale(
      onTap: onTap,
      borderRadius: AppRadius.roundedMd,
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Book Cover Thumbnail
              ClipRRect(
                borderRadius: AppRadius.roundedSm,
                child: Container(
                  width: 84,
                  height: 114,
                  color: tokens.bgSurfaceSubtle,
                  child: book.coverUrl != null
                      ? Image.network(
                          book.coverUrl!,
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => Center(
                            child: Icon(
                              Icons.auto_stories_outlined,
                              size: 32,
                              color: tokens.textMuted,
                            ),
                          ),
                        )
                      : Center(
                          child: Icon(
                            Icons.auto_stories_outlined,
                            size: 32,
                            color: tokens.textMuted,
                          ),
                        ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),

              // Book Details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      book.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        height: 1.25,
                      ),
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
              const SizedBox(width: 4),
              Icon(
                Icons.chevron_right_rounded,
                color: tokens.textMuted,
                size: 22,
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
        borderRadius: AppRadius.roundedXs,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: foreground),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 11.5,
              fontWeight: FontWeight.w600,
              color: foreground,
            ),
          ),
        ],
      ),
    );
  }
}
