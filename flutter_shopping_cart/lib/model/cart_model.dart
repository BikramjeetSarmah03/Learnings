import 'package:flutter/material.dart';

class CartModel extends ChangeNotifier {
  final List _shopItems = [
    ["Item 1", "4.00", "🍒", Colors.red],
    ["Item 2", "40.00", "💐", Colors.green],
    ["Item 3", "14.00", "🪻", Colors.blue],
    ["Item 4", "42.00", "🌼", Colors.yellow],
  ];

  // list of cart items
  List _cartItems = [];

  // add item to cart
  void addItemToCart(int index) {
    _cartItems.add(_shopItems[index]);
    notifyListeners();
  }

  // remove item from cart
  void removeItemFromCart(int index) {
    _cartItems.removeAt(index);
    notifyListeners();
  }

  // calculate total price
  String calculateTotal() {
    double totalPrice = 0;
    for (int i = 0; i < _cartItems.length; i++) {
      totalPrice += double.parse(_cartItems[i][1]);
    }
    return totalPrice.toStringAsFixed(2);
  }

  get shopItems => _shopItems;

  get cartItems => _cartItems;
}
