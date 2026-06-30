import 'package:flutter/material.dart';
import 'home.dart';

class TwentyEightyApp extends StatelessWidget {
  const TwentyEightyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '20/80',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6ee7b7),
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: const Color(0xFF0b1220),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
