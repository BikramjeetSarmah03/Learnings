import 'package:flutter/material.dart';

class GroceryItem extends StatelessWidget {
  final String itemName;
  final String itemPrice;
  final String imagePath;
  final dynamic color;
  void Function()? onPressed;

  GroceryItem({
    super.key,
    required this.itemName,
    required this.itemPrice,
    required this.imagePath,
    required this.color,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(12.0),
      child: Container(
        decoration: BoxDecoration(
          color: color[100],
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Padding(padding: EdgeInsets.all(4)),

            // image
            Text(imagePath, style: TextStyle(fontSize: 48)),

            // name
            Text(itemName, style: TextStyle(fontSize: 24)),

            // price + button
            MaterialButton(
              onPressed: onPressed,
              color: color[800],
              child: Text(
                "\$$itemPrice",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
