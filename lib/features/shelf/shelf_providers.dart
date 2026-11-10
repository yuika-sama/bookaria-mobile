import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/storage/app_database.dart';

class ShelfBooksNotifier extends AsyncNotifier<List<OfflineBookRecord>> {
  @override
  Future<List<OfflineBookRecord>> build() {
    return ref.watch(appDatabaseProvider).listOfflineBooks();
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(appDatabaseProvider).listOfflineBooks(),
    );
  }
}

final shelfBooksProvider =
    AsyncNotifierProvider<ShelfBooksNotifier, List<OfflineBookRecord>>(
  ShelfBooksNotifier.new,
);

final offlineBookBySlugProvider =
    FutureProvider.family<OfflineBookRecord?, String>((ref, slug) async {
  return ref.watch(appDatabaseProvider).findOfflineBookBySlug(slug);
});
