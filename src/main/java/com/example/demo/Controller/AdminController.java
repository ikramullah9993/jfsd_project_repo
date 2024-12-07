package com.example.demo.Controller;

import com.example.demo.Service.AdminService;
import com.example.demo.Classes.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*") // Allows requests from any origin (for React app)
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin request) {
        boolean isValid = adminService.validateAdmin(request.getEmail(), request.getPassword());

        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}