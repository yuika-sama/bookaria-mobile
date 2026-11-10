import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/preferences/app_preferences.dart';
import '../core/telemetry/reading_events_service.dart';
import 'router.dart';
import 'theme.dart';

class BookariaApp extends ConsumerStatefulWidget {
  const BookariaApp({super.key});

  @override
  ConsumerState<BookariaApp> createState() => _BookariaAppState();
}

class _BookariaAppState extends ConsumerState<BookariaApp> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        unawaited(ref.read(readingEventsServiceProvider).flushPending());
      }
    });
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
