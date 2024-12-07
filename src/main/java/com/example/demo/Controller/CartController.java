package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Classes.Cart;
import com.example.demo.Service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add a product to the cart
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {

        cartService.addToCart(cart);
        return ResponseEntity.ok(cart);
    }

    // Get cart by username
    @GetMapping("/{username}")
    public ResponseEntity<List<Cart>> getCartByUsername(@PathVariable String username) {
        List<Cart> userCart = cartService.getCartItems(username);
        return ResponseEntity.ok(userCart);
    }

    // Update item count in the cart
    @PutMapping("/updateCount/{id}/{count}")
    public ResponseEntity<String> updateItemCount(@PathVariable Long id, @PathVariable Integer count) {
        cartService.updateItemCount(id, count);
        return ResponseEntity.ok("Item count updated successfully");
    }

    // Remove an item from the cart
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.ok("Item removed successfully");
    }
}

