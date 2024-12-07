package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Classes.User;
import com.example.demo.Service.UserService;

@RestController  // Ensure it’s a REST controller for JSON response
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        System.out.println(
                "Received User Data: " + user.getUsername() + ", " + user.getGmail() + ", " + user.getPassword());

        // Save the user to the database
        userService.saveUser(user);

        // Return a success response
        return "User registered successfully!";
    }
    
    @GetMapping("/customer/all")
    public List<User> getAllCustomers() {
        // Fetch and return all customers
        return userService.getAllUsers();
    }
}
