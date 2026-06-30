import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _pages = const [
    Center(child: Text('داشبورد موبایل')),
    Center(child: Text('جلسه فوکوس')),
    Center(child: Text('اهداف')),
    Center(child: Text('آموزش')),
    Center(child: Text('اتوماسیون')),
  ];

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        bottomNavigationBar: NavigationBar(
          selectedIndex: _selectedIndex,
          onDestinationSelected: (value) => setState(() => _selectedIndex = value),
          destinations: const [
            NavigationDestination(icon: Icon(Icons.dashboard), label: 'داشبورد'),
            NavigationDestination(icon: Icon(Icons.timer), label: 'فوکوس'),
            NavigationDestination(icon: Icon(Icons.flag), label: 'اهداف'),
            NavigationDestination(icon: Icon(Icons.school), label: 'آموزش'),
            NavigationDestination(icon: Icon(Icons.auto_awesome), label: 'خودکار'),
          ],
        ),
        body: IndexedStack(index: _selectedIndex, children: _pages),
      ),
    );
  }
}
