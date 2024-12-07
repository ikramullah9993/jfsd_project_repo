package com.example.demo.Service;

import com.example.demo.Classes.Cart;
import com.example.demo.Repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Add an item to the cart
    public void addToCart(Cart cartItem) {
        cartRepository.save(cartItem);
    }

    // Get cart items for a specific user
    public List<Cart> getCartItems(String userName) { // Match parameter name to 'userName'
        return cartRepository.findByUserName(userName); // Correct method name
    }

    // Update item count
    public void updateItemCount(Long id, Integer count) {
        Cart cartItem = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        cartItem.setCount(count);
        cartRepository.save(cartItem);
    }

    // Remove an item from the cart
    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }
}
