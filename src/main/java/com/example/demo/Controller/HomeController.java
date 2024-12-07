package com.example.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/api/home")
    public String showHome() {
        return "Welcome to the Home Page!";  // Just return a message or relevant data
    }
}
