import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import '../core/ui/tokens/app_spacing.dart';
import '../core/ui/widgets/interactive_scale.dart';

class AppShell extends StatelessWidget {
  const AppShell({
    super.key,
    required this.navigationShell,
  });

  final StatefulNavigationShell navigationShell;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,
      floatingActionButton: InteractiveScale(
        onTap: () {
          HapticFeedback.lightImpact();
          unawaited(context.push('/scan'));
        },
        borderRadius: AppRadius.roundedPill,
        child: FloatingActionButton.extended(
          onPressed: () => unawaited(context.push('/scan')),
          elevation: 3,
          highlightElevation: 6,
          icon: const Icon(Icons.qr_code_scanner_rounded),
          label: const Text(
            'Quét sách',
            style: TextStyle(fontWeight: FontWeight.w600, letterSpacing: 0.2),
          ),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: navigationShell.currentIndex,
        elevation: 0,
        height: 66,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        onDestinationSelected: (index) {
          if (index != navigationShell.currentIndex) {
            HapticFeedback.selectionClick();
          }
          navigationShell.goBranch(
            index,
            initialLocation: index == navigationShell.currentIndex,
          );
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.explore_outlined),
            selectedIcon: Icon(Icons.explore_rounded),
            label: 'Khám phá',
          ),
          NavigationDestination(
            icon: Icon(Icons.collections_bookmark_outlined),
            selectedIcon: Icon(Icons.collections_bookmark_rounded),
            label: 'Tủ sách',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline_rounded),
            selectedIcon: Icon(Icons.person_rounded),
            label: 'Hồ sơ',
          ),
        ],
      ),
    );
  }
}
