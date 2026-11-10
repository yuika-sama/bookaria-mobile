enum BookariaErrorCode {
  validationError('VALIDATION_ERROR'),
  tokenInvalid('TOKEN_INVALID'),
  unauthenticated('UNAUTHENTICATED'),
  tokenExpired('TOKEN_EXPIRED'),
  invalidCredentials('INVALID_CREDENTIALS'),
  forbidden('FORBIDDEN'),
  emailNotVerified('EMAIL_NOT_VERIFIED'),
  bookTakenDown('BOOK_TAKEN_DOWN'),
  notFound('NOT_FOUND'),
  emailTaken('EMAIL_TAKEN'),
  revisionConflict('REVISION_CONFLICT'),
  assetInUse('ASSET_IN_USE'),
  categoryNotEmpty('CATEGORY_NOT_EMPTY'),
  categoryCycle('CATEGORY_CYCLE'),
  jobInProgress('JOB_IN_PROGRESS'),
  bookUnavailable('BOOK_UNAVAILABLE'),
  fileTooLarge('FILE_TOO_LARGE'),
  fileTypeNotAllowed('FILE_TYPE_NOT_ALLOWED'),
  quotaExceeded('QUOTA_EXCEEDED'),
  publishBlocked('PUBLISH_BLOCKED'),
  lastAdmin('LAST_ADMIN'),
  selfAction('SELF_ACTION'),
  accountLocked('ACCOUNT_LOCKED'),
  rateLimited('RATE_LIMITED'),
  markerPoolExhausted('MARKER_POOL_EXHAUSTED'),
  markerDuplicate('MARKER_DUPLICATE'),
  internalError('INTERNAL_ERROR'),
  networkError('NETWORK_ERROR'),
  unknown('UNKNOWN');

  const BookariaErrorCode(this.wireName);
  final String wireName;

  static BookariaErrorCode fromWire(String? value) {
    for (final code in values) {
      if (code.wireName == value) return code;
    }
    return BookariaErrorCode.unknown;
  }
}

class AppApiException implements Exception {
  const AppApiException({
    required this.code,
    required this.message,
    this.statusCode,
    this.requestId,
    this.details,
  });

  final BookariaErrorCode code;
  final String message;
  final int? statusCode;
  final String? requestId;
  final Object? details;

  factory AppApiException.fromResponseBody(
    dynamic body, {
    int? statusCode,
    String fallbackMessage = 'Chưa tải được dữ liệu từ máy chủ.',
  }) {
    if (body is Map<String, dynamic> && body['error'] is Map<String, dynamic>) {
      final err = body['error'] as Map<String, dynamic>;
      return AppApiException(
        code: BookariaErrorCode.fromWire(err['code'] as String?),
        message: (err['message'] as String?) ?? fallbackMessage,
        statusCode: statusCode,
        requestId: err['requestId'] as String?,
        details: err['details'],
      );
    }
    return AppApiException(
      code: statusCode == 404
          ? BookariaErrorCode.notFound
          : statusCode == 410
              ? BookariaErrorCode.bookUnavailable
              : BookariaErrorCode.unknown,
      message: fallbackMessage,
      statusCode: statusCode,
    );
  }

  @override
  String toString() => 'AppApiException(${code.wireName}): $message';
}
