import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/explore/book_detail_screen.dart';
import '../features/explore/explore_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/reader/ar_bridge/ar_engine_bridge.dart';
import '../features/reader/unified_reader_screen.dart';
import '../features/scanner/quick_scanner_screen.dart';
import '../features/shelf/shelf_screen.dart';
import 'app_shell.dart';

ReaderViewMode _parseMode(String? raw) {
  return switch (raw?.toLowerCase()) {
    'ar' => ReaderViewMode.modeAr,
    'tabletop' => ReaderViewMode.modeTabletop,
    _ => ReaderViewMode.mode3d,
  };
}

final bookariaRouterProvider = Provider<GoRouter>((ref) {
  final rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');

  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: '/explore',
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
        ),
      ),
      GoRoute(
        path: '/reader/preview/:token',
        parentNavigatorKey: rootNavigatorKey,
        builder: (context, state) => UnifiedReaderScreen(
          previewToken: state.pathParameters['token']!,
          initialPage: int.tryParse(state.uri.queryParameters['page'] ?? ''),
          initialMode: _parseMode(state.uri.queryParameters['mode']),
        ),
      ),
    ],
  );
});
