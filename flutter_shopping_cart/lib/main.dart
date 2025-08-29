import 'package:flutter/material.dart';
import 'package:flutter_shopping_cart/model/cart_model.dart';
import 'package:provider/provider.dart';
import 'pages/intro_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CartModel(),
      child: MaterialApp(debugShowCheckedModeBanner: false, home: IntroPage()),
    );
  }
}
