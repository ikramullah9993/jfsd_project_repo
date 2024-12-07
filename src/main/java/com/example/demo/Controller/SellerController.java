package com.example.demo.Controller;

import com.example.demo.Classes.Seller;
import com.example.demo.Service.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    // Register Seller
    @PostMapping("/register")
    public ResponseEntity<String> registerSeller(@RequestBody Seller seller) {
        Seller savedSeller = sellerService.registerSeller(seller);
        return ResponseEntity.ok("Seller registered successfully with ID: " + savedSeller.getId());
    }

    // Login Seller
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginSeller(@RequestBody Seller seller) {
        boolean isValid = sellerService.validateSeller(seller.getGmail(), seller.getPassword());

        Map<String, Object> response = new HashMap<>();
        if (isValid) {
            Seller loggedInSeller = sellerService.findByGmail(seller.getGmail());
            response.put("success", true);
            response.put("sellerName", loggedInSeller.getName());
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
        }

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all")
    public List<Seller> getAllSellers() {
        return sellerService.getAllSellers();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
    }

}
