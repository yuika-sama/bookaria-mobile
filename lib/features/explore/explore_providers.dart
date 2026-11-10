import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/contracts/public_book.dart';
import '../../core/network/api_client.dart';
import '../../core/preferences/app_preferences.dart';

class ExploreFilterState {
  const ExploreFilterState({
    this.query = '',
    this.age,
    this.language,
    this.sort = PublicBooksSort.newest,
  });

  final String query;
  final int? age;
  final String? language;
  final PublicBooksSort sort;

  ExploreFilterState copyWith({
    String? query,
    int? age,
    bool clearAge = false,
    String? language,
    bool clearLanguage = false,
    PublicBooksSort? sort,
  }) {
    return ExploreFilterState(
      query: query ?? this.query,
      age: clearAge ? null : (age ?? this.age),
      language: clearLanguage ? null : (language ?? this.language),
      sort: sort ?? this.sort,
    );
  }
}

class ExploreFilterNotifier extends Notifier<ExploreFilterState> {
  @override
  ExploreFilterState build() => const ExploreFilterState();

  void setQuery(String value) => state = state.copyWith(query: value);

  void setAge(int? age) => state =
      age == null ? state.copyWith(clearAge: true) : state.copyWith(age: age);

  void setSort(PublicBooksSort sort) => state = state.copyWith(sort: sort);
}

final exploreFilterProvider =
    NotifierProvider<ExploreFilterNotifier, ExploreFilterState>(
  ExploreFilterNotifier.new,
);

final exploreBooksProvider = FutureProvider<PagedResponse<PublicBookCard>>(
  (ref) async {
    final filter = ref.watch(exploreFilterProvider);
    final prefs = ref.watch(appPreferencesProvider);
    final effectiveAge =
        prefs.kidModeEnabled ? (filter.age ?? prefs.kidMaxAge) : filter.age;

    final api = ref.watch(bookariaApiClientProvider);
    return api.getPublicBooks(
      PublicBooksQuery(
        q: filter.query,
        age: effectiveAge,
        language: filter.language,
        sort: filter.sort,
      ),
    );
  },
);

final bookDetailProvider = FutureProvider.family<PublicBook, String>(
  (ref, slug) async {
    final api = ref.watch(bookariaApiClientProvider);
    return api.getPublicBookBySlug(slug);
  },
);
