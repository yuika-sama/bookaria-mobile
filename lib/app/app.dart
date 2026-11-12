import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/network/api_client.dart';
import '../core/platform/bookaria_platform.dart';
import '../core/preferences/app_preferences.dart';
import '../core/qr/bookaria_link_parser.dart';
import '../core/storage/app_database.dart';
import '../core/telemetry/reading_events_service.dart';
import 'book_access_guard.dart';
import 'router.dart';
import 'theme.dart';

class BookariaApp extends ConsumerStatefulWidget {
  const BookariaApp({super.key});

  @override
  ConsumerState<BookariaApp> createState() => _BookariaAppState();
}

class _BookariaAppState extends ConsumerState<BookariaApp> {
  StreamSubscription<String>? _deepLinkSub;
  bool _handlingDeepLink = false;
  String? _lastHandledLink;
  DateTime? _lastHandledAt;

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        unawaited(ref.read(readingEventsServiceProvider).flushPending());
      }
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        unawaited(_initDeepLinks());
      }
    });
  }

  @override
  void dispose() {
    unawaited(_deepLinkSub?.cancel());
    super.dispose();
  }

  Future<void> _initDeepLinks() async {
    final platform = ref.read(bookariaPlatformProvider);
    _deepLinkSub = platform.deepLinkStream.listen((raw) {
      unawaited(_handleIncomingDeepLink(raw));
    });

    final initial = await platform.getInitialLink();
    if (initial != null && mounted) {
      await _handleIncomingDeepLink(initial);
    }
  }

  Future<void> _handleIncomingDeepLink(String rawLink) async {
    final trimmed = rawLink.trim();
    if (trimmed.isEmpty || _handlingDeepLink) return;

    final now = DateTime.now();
    if (_lastHandledLink == trimmed &&
        _lastHandledAt != null &&
        now.difference(_lastHandledAt!) < const Duration(milliseconds: 1500)) {
      return;
    }

    _handlingDeepLink = true;
    _lastHandledLink = trimmed;
    _lastHandledAt = now;

    try {
      final target = BookariaLinkParser.parse(trimmed);
      final navContext =
          ref.read(bookariaRootNavigatorKeyProvider).currentContext;

      if (target is InvalidBookariaLink) {
        if (navContext != null && navContext.mounted) {
          ScaffoldMessenger.maybeOf(navContext)?.showSnackBar(
            SnackBar(content: Text(target.reason)),
          );
        }
        return;
      }

      if (navContext == null || !navContext.mounted) return;
      final decision = await BookAccessGuard.authorizeTarget(
        navContext,
        prefs: ref.read(appPreferencesProvider),
        db: ref.read(appDatabaseProvider),
        api: ref.read(bookariaApiClientProvider),
        target: target,
      );
      if (!mounted || !decision.allowed) return;

      final location = switch (target) {
        PublishedBookTarget() => target.toAppLocation(),
        PreviewBookTarget() => target.toAppLocation(),
        InvalidBookariaLink() => null,
      };
      if (location != null) {
        unawaited(
          ref.read(bookariaRouterProvider).push(
                location,
                extra: ReaderRouteExtra(
                  parentPinVerified: decision.verifiedByParentPin,
                ),
              ),
        );
      }
    } finally {
      _handlingDeepLink = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final prefs = ref.watch(appPreferencesProvider);
    final router = ref.watch(bookariaRouterProvider);

    return MaterialApp.router(
      title: 'Bookaria',
      debugShowCheckedModeBanner: false,
      theme: buildBookariaTheme(Brightness.light),
      darkTheme: buildBookariaTheme(Brightness.dark),
      themeMode: prefs.themeMode,
      routerConfig: router,
    );
  }
}
