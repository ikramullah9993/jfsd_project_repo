package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Classes.Cart;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    @PostMapping("/calculate-total")
    public ResponseEntity<Double> calculateTotal(@RequestBody List<Cart> cartItems) {
        double total = cartItems.stream()
                .mapToDouble(item -> item.getItemPrice() * item.getCount())
                .sum();
        return ResponseEntity.ok(total);
    }
}
