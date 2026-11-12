import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../core/qr/bookaria_link_parser.dart';
import '../features/explore/book_detail_screen.dart';
import '../features/explore/explore_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/reader/ar_bridge/ar_engine_bridge.dart';
import '../features/reader/unified_reader_screen.dart';
import '../features/scanner/quick_scanner_screen.dart';
import '../features/shelf/shelf_screen.dart';
import 'app_shell.dart';
import 'book_access_guard.dart';

ReaderViewMode _parseMode(String? raw) {
  return switch (raw?.toLowerCase()) {
    'ar' => ReaderViewMode.modeAr,
    'tabletop' => ReaderViewMode.modeTabletop,
    _ => ReaderViewMode.mode3d,
  };
}

bool _isPinVerified(GoRouterState state) {
  final extra = state.extra;
  return extra is ReaderRouteExtra && extra.parentPinVerified;
}

final bookariaRootNavigatorKeyProvider =
    Provider<GlobalKey<NavigatorState>>((ref) {
  return GlobalKey<NavigatorState>(debugLabel: 'root');
});

final bookariaRouterProvider = Provider<GoRouter>((ref) {
  final rootNavigatorKey = ref.watch(bookariaRootNavigatorKeyProvider);

  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: '/explore',
    redirect: (context, state) {
      final scheme = state.uri.scheme.toLowerCase();
      if (scheme == 'bookaria' || scheme == 'http' || scheme == 'https') {
        final parsed = BookariaLinkParser.parse(state.uri.toString());
        return switch (parsed) {
          PublishedBookTarget() => parsed.toAppLocation(),
          PreviewBookTarget() => parsed.toAppLocation(),
          InvalidBookariaLink() => '/explore',
        };
      }
      return null;
    },
    onException: (_, _, router) {
      router.go('/explore');
    },
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppShell(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/explore',
                builder: (context, state) => const ExploreScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/shelf',
                builder: (context, state) => const ShelfScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/profile',
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/scan',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => const QuickScannerScreen(),
      ),
      GoRoute(
        path: '/book/:slug',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => BookDetailScreen(
          slug: state.pathParameters['slug']!,
        ),
      ),
      GoRoute(
        path: '/reader/book/:slug',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/reader/preview/:token',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      // Direct `bookaria-viewer` web route equivalents (for deep links / internal navigation)
      GoRoute(
        path: '/b/:slug',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/b/:slug/read',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage:
              int.tryParse(state.uri.queryParameters['page'] ?? '') ?? 1,
          initialMode: ReaderViewMode.mode3d,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/b/:slug/p/:page',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.pathParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/b/:slug/camera',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/b/:slug/ar',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/b/:slug/ar/p/:page',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          slug: state.pathParameters['slug']!,
          initialPage: int.tryParse(state.pathParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token/read',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage:
              int.tryParse(state.uri.queryParameters['page'] ?? '') ?? 1,
          initialMode: ReaderViewMode.mode3d,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token/p/:page',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.pathParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token/camera',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token/ar',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
      GoRoute(
        path: '/preview/:token/ar/p/:page',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.pathParameters['page'] ?? ''),
          initialMode: ReaderViewMode.modeAr,
          parentPinVerified: _isPinVerified(state),
        ),
      ),
    ],
  );
});
