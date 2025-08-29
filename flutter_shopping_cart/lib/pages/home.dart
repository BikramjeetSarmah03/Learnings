import 'package:flutter/material.dart';
import 'package:flutter_shopping_cart/components/grocery_item.dart';
import 'package:flutter_shopping_cart/model/cart_model.dart';
import 'package:flutter_shopping_cart/pages/cart_page.dart';
import 'package:provider/provider.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: Stack(
        children: [
          FloatingActionButton(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => CartPage()),
            ),
            backgroundColor: Colors.black,
            child: const Icon(Icons.shopping_bag, color: Colors.white),
          ),

          // Badge
          Positioned(
            right: 0,
            top: 0,
            child: Consumer<CartModel>(
              builder: (context, cart, child) {
                return cart.cartItems.length > 0
                    ? Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 20,
                          minHeight: 20,
                        ),
                        child: Text(
                          cart.cartItems.length.toString(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      )
                    : const SizedBox(); // Show nothing if 0 items
              },
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 32),

            // good morning
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0),
              child: Container(
                alignment: Alignment
                    .centerLeft, // Align to the left within the container
                child: Text("Good Morning,", style: TextStyle(fontSize: 18)),
              ),
            ),

            SizedBox(height: 4),

            // lets order fresh items for you
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(
                "Let's order fresh flowers for you",
                style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
              ),
            ),

            SizedBox(height: 20),

            // divider
            Divider(),

            SizedBox(height: 20),

            // fresh items + grid
            Expanded(
              child: Consumer<CartModel>(
                builder: (context, value, child) {
                  return GridView.builder(
                    itemCount: value.shopItems.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 1 / 1.2,
                    ),
                    itemBuilder: (context, index) => GroceryItem(
                      itemName: value.shopItems[index][0],
                      itemPrice: value.shopItems[index][1],
                      imagePath: value.shopItems[index][2],
                      color: value.shopItems[index][3],
                      onPressed: () {
                        Provider.of<CartModel>(
                          context,
                          listen: false,
                        ).addItemToCart(index);
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
