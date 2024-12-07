package com.example.demo.Controller;

import com.example.demo.Classes.Cart;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    static {
        Stripe.apiKey = ""; // Replace with your Stripe Secret Key
    }

    @PostMapping("/create-session")
    public ResponseEntity<String> createSession(@RequestBody List<Cart> cartItems) {
        try {
            // Build Stripe session
            List<SessionCreateParams.LineItem> lineItems = cartItems.stream()
                    .map(item -> SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("inr")
                                            .setUnitAmount((long) (item.getItemPrice() * 100)) // Convert price to smallest unit (paise)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(item.getItemName())
                                                            .build())
                                            .build())
                            .setQuantity((long) item.getCount()) // Set item quantity
                            .build())
                    .toList();

            // Create Stripe session
            SessionCreateParams params = SessionCreateParams.builder()
                    .addAllLineItem(lineItems)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:3000/success") // Redirect after payment
                    .setCancelUrl("http://localhost:3000/checkout") // Redirect if payment is canceled
                    .build();

            Session session = Session.create(params); // Create session

            return ResponseEntity.ok(session.getId()); // Return session ID
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating Stripe session: " + e.getMessage());
        }
    }
}
