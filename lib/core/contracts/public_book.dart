class UserRef {
  const UserRef({
    required this.id,
    required this.displayName,
  });

  final String id;
  final String displayName;

  factory UserRef.fromJson(Map<String, dynamic> json) {
    return UserRef(
      id: json['id'] as String,
      displayName: json['displayName'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'displayName': displayName,
      };
}

class BookVersionRef {
  const BookVersionRef({
    required this.id,
    required this.versionNo,
    required this.publishedAt,
  });

  final String id;
  final int versionNo;
  final DateTime publishedAt;

  factory BookVersionRef.fromJson(Map<String, dynamic> json) {
    return BookVersionRef(
      id: json['id'] as String,
      versionNo: (json['versionNo'] as num).toInt(),
      publishedAt: DateTime.parse(json['publishedAt'] as String),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'versionNo': versionNo,
        'publishedAt': publishedAt.toUtc().toIso8601String(),
      };
}

class PublicBookCard {
  const PublicBookCard({
    required this.slug,
    required this.title,
    required this.coverUrl,
    required this.author,
    required this.language,
    required this.ageMin,
    required this.ageMax,
    required this.arPageCount,
  });

  final String slug;
  final String title;
  final String? coverUrl;
  final UserRef author;
  final String language;
  final int? ageMin;
  final int? ageMax;
  final int arPageCount;

  factory PublicBookCard.fromJson(Map<String, dynamic> json) {
    return PublicBookCard(
      slug: json['slug'] as String,
      title: json['title'] as String,
      coverUrl: json['coverUrl'] as String?,
      author: UserRef.fromJson(json['author'] as Map<String, dynamic>),
      language: json['language'] as String,
      ageMin: (json['ageMin'] as num?)?.toInt(),
      ageMax: (json['ageMax'] as num?)?.toInt(),
      arPageCount: (json['arPageCount'] as num).toInt(),
    );
  }
}

class PublicBook {
  const PublicBook({
    required this.slug,
    required this.title,
    required this.description,
    required this.author,
    required this.coverUrl,
    required this.language,
    required this.ageMin,
    required this.ageMax,
    required this.version,
    required this.manifestUrl,
    required this.pageCount,
    required this.arPageCount,
    required this.downloadBytes,
    required this.printPdfUrl,
  });

  final String slug;
  final String title;
  final String? description;
  final UserRef author;
  final String? coverUrl;
  final String language;
  final int? ageMin;
  final int? ageMax;
  final BookVersionRef version;
  final String manifestUrl;
  final int pageCount;
  final int arPageCount;
  final int downloadBytes;
  final String? printPdfUrl;

  factory PublicBook.fromJson(Map<String, dynamic> json) {
    return PublicBook(
      slug: json['slug'] as String,
      title: json['title'] as String,
      description: json['description'] as String?,
      author: UserRef.fromJson(json['author'] as Map<String, dynamic>),
      coverUrl: json['coverUrl'] as String?,
      language: json['language'] as String,
      ageMin: (json['ageMin'] as num?)?.toInt(),
      ageMax: (json['ageMax'] as num?)?.toInt(),
      version: BookVersionRef.fromJson(json['version'] as Map<String, dynamic>),
      manifestUrl: json['manifestUrl'] as String,
      pageCount: (json['pageCount'] as num).toInt(),
      arPageCount: (json['arPageCount'] as num).toInt(),
      downloadBytes: (json['downloadBytes'] as num).toInt(),
      printPdfUrl: json['printPdfUrl'] as String?,
    );
  }
}

class PublicAuthor {
  const PublicAuthor({
    required this.id,
    required this.displayName,
    required this.organization,
    required this.bio,
    required this.avatarUrl,
  });

  final String id;
  final String displayName;
  final String? organization;
  final String? bio;
  final String? avatarUrl;

  factory PublicAuthor.fromJson(Map<String, dynamic> json) {
    return PublicAuthor(
      id: json['id'] as String,
      displayName: json['displayName'] as String,
      organization: json['organization'] as String?,
      bio: json['bio'] as String?,
      avatarUrl: json['avatarUrl'] as String?,
    );
  }
}

class AuthorProfile {
  const AuthorProfile({
    required this.author,
    required this.books,
  });

  final PublicAuthor author;
  final List<PublicBookCard> books;

  factory AuthorProfile.fromJson(Map<String, dynamic> json) {
    final booksRaw = json['books'] as List<dynamic>? ?? const [];
    return AuthorProfile(
      author: PublicAuthor.fromJson(json['author'] as Map<String, dynamic>),
      books: booksRaw
          .map((item) => PublicBookCard.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }
}

class PaginationMeta {
  const PaginationMeta({
    required this.page,
    required this.limit,
    required this.total,
    required this.totalPages,
  });

  final int page;
  final int limit;
  final int total;
  final int totalPages;

  factory PaginationMeta.fromJson(Map<String, dynamic> json) {
    return PaginationMeta(
      page: (json['page'] as num).toInt(),
      limit: (json['limit'] as num).toInt(),
      total: (json['total'] as num).toInt(),
      totalPages: (json['totalPages'] as num).toInt(),
    );
  }
}

class PagedResponse<T> {
  const PagedResponse({
    required this.data,
    required this.meta,
  });

  final List<T> data;
  final PaginationMeta meta;
}

enum PublicBooksSort {
  newest('newest'),
  popular('popular');

  const PublicBooksSort(this.wireName);
  final String wireName;
}

class PublicBooksQuery {
  const PublicBooksQuery({
    this.q,
    this.age,
    this.topic,
    this.language,
    this.sort = PublicBooksSort.newest,
    this.page = 1,
    this.limit = 20,
  });

  final String? q;
  final int? age;
  final String? topic;
  final String? language;
  final PublicBooksSort sort;
  final int page;
  final int limit;

  Map<String, dynamic> toQueryParams() {
    return {
      if (q != null && q!.trim().isNotEmpty) 'q': q!.trim(),
      if (age != null) 'age': age,
      if (topic != null && topic!.trim().isNotEmpty) 'topic': topic!.trim(),
      if (language != null && language!.isNotEmpty) 'language': language,
      'sort': sort.wireName,
      'page': page,
      'limit': limit,
    };
  }
}
