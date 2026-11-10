import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/app_config.dart';
import '../contracts/api_error.dart';
import '../contracts/manifest.dart';
import '../contracts/public_book.dart';
import '../contracts/reading_events.dart';

class PreviewLoadResult {
  const PreviewLoadResult({
    required this.manifest,
    this.expiresAt,
  });

  final Manifest manifest;
  final DateTime? expiresAt;
}

class BookariaApiClient {
  BookariaApiClient(this.config, {Dio? dio})
      : _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: config.apiBaseUrl,
                connectTimeout: const Duration(seconds: 12),
                receiveTimeout: const Duration(seconds: 30),
                headers: const {
                  'Accept': 'application/json',
                },
              ),
            );

  final AppConfig config;
  final Dio _dio;

  Future<PagedResponse<PublicBookCard>> getPublicBooks(
    PublicBooksQuery query, {
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        '/public/books',
        queryParameters: query.toQueryParams(),
        cancelToken: cancelToken,
      );
      final body = response.data ?? const <String, dynamic>{};
      final itemsRaw = body['data'] as List<dynamic>? ?? const [];
      final metaRaw = body['meta'] as Map<String, dynamic>? ??
          const {'page': 1, 'limit': 20, 'total': 0, 'totalPages': 0};
      return PagedResponse(
        data: itemsRaw
            .map((e) => PublicBookCard.fromJson(e as Map<String, dynamic>))
            .toList(),
        meta: PaginationMeta.fromJson(metaRaw),
      );
    } on DioException catch (e) {
      throw _mapDioError(e, 'Chưa tải được thư viện sách công khai.');
    }
  }

  Future<PublicBook> getPublicBookBySlug(
    String slug, {
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        '/public/books/${Uri.encodeComponent(slug)}',
        cancelToken: cancelToken,
      );
      final data = response.data?['data'] as Map<String, dynamic>;
      return PublicBook.fromJson(data);
    } on DioException catch (e) {
      throw _mapDioError(e, 'Chưa tải được thông tin sách.');
    }
  }

  Future<AuthorProfile> getAuthorProfile(
    String authorId, {
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        '/public/authors/${Uri.encodeComponent(authorId)}',
        cancelToken: cancelToken,
      );
      final data = response.data?['data'] as Map<String, dynamic>;
      return AuthorProfile.fromJson(data);
    } on DioException catch (e) {
      throw _mapDioError(e, 'Chưa tải được hồ sơ tác giả.');
    }
  }

  Future<Manifest> fetchManifestFromUrl(
    String manifestUrl, {
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.get<dynamic>(
        manifestUrl,
        options: Options(
          responseType: ResponseType.plain,
          headers: const {'Cache-Control': 'no-store'},
        ),
        cancelToken: cancelToken,
      );
      final raw = response.data;
      final decoded = raw is String
          ? jsonDecode(raw) as Map<String, dynamic>
          : Map<String, dynamic>.from(raw as Map);
      return Manifest.fromJson(decoded);
    } on DioException catch (e) {
      throw _mapDioError(e, 'Không tải được dữ liệu manifest của sách.');
    }
  }

  Future<PreviewLoadResult> getPreviewManifest(
    String token, {
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        '/public/previews/${Uri.encodeComponent(token)}',
        cancelToken: cancelToken,
      );
      final data = response.data?['data'] as Map<String, dynamic>;
      final expiresHeader = response.headers.value('expires');
      return PreviewLoadResult(
        manifest: Manifest.fromJson(data),
        expiresAt: expiresHeader != null ? DateTime.tryParse(expiresHeader) : null,
      );
    } on DioException catch (e) {
      throw _mapDioError(
        e,
        'Liên kết xem trước đã hết hạn hoặc không còn khả dụng.',
      );
    }
  }

  Future<void> downloadToFile(
    String url,
    String savePath, {
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      await _dio.download(
        url,
        savePath,
        cancelToken: cancelToken,
        onReceiveProgress: onReceiveProgress,
      );
    } on DioException catch (e) {
      throw _mapDioError(e, 'Không tải được tài nguyên của sách.');
    }
  }

  Future<void> postEventsBatch(EventBatchBody batch) async {
    try {
      await _dio.post<void>(
        '/public/events',
        data: batch.toJson(),
      );
    } on DioException catch (e) {
      throw _mapDioError(e, 'Không gửi được thống kê đọc.');
    }
  }

  Future<void> reportBook(String slug, ReportBookBody body) async {
    try {
      await _dio.post<Map<String, dynamic>>(
        '/public/books/${Uri.encodeComponent(slug)}/reports',
        data: body.toJson(),
      );
    } on DioException catch (e) {
      throw _mapDioError(e, 'Chưa gửi được báo cáo. Vui lòng thử lại sau.');
    }
  }

  AppApiException _mapDioError(DioException error, String fallbackMessage) {
    if (error.response != null) {
      return AppApiException.fromResponseBody(
        error.response?.data,
        statusCode: error.response?.statusCode,
        fallbackMessage: fallbackMessage,
      );
    }
    if (error.type == DioExceptionType.cancel) {
      return const AppApiException(
        code: BookariaErrorCode.unknown,
        message: 'Đã hủy tải dữ liệu.',
      );
    }
    return const AppApiException(
      code: BookariaErrorCode.networkError,
      message: 'Không thể kết nối tới máy chủ Bookaria. Hãy kiểm tra mạng.',
    );
  }
}

final bookariaApiClientProvider = Provider<BookariaApiClient>((ref) {
  final config = ref.watch(appConfigProvider);
  return BookariaApiClient(config);
});
