import 'package:flutter/material.dart';
import 'package:flutter_shopping_cart/pages/home.dart';

class IntroPage extends StatelessWidget {
  const IntroPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // logo
          const Padding(
            padding: EdgeInsets.all(80.0),
            child: Text(
              "🌸",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 200),
            ),
          ),

          // we deliver flowers to your doorstep
          const Padding(
            padding: EdgeInsets.all(40.0),
            child: Text(
              "We deliver flowers to your doorstep",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
          ),

          // fresh flowers anyday anytime
          Text("Fresh items everyday"),

          const SizedBox(height: 24),

          // get started button
          GestureDetector(
            onTap: () => Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return HomePage();
                },
              ),
            ),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.deepPurple,
                borderRadius: BorderRadius.circular(12),
              ),
              padding: EdgeInsets.symmetric(horizontal: 60, vertical: 20),
              child: Text(
                "Get Started",
                style: TextStyle(color: Colors.white, fontSize: 14),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
