package com.example.demo.Controller;

import com.example.demo.Classes.LoginUser;
import com.example.demo.Classes.User;
import com.example.demo.Service.LoginService;
import com.example.demo.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginUser user) {
        // Validate user credentials
        boolean isUserValid = loginService.validateUser(user.getGmail(), user.getPassword());

        Map<String, Object> response = new HashMap<>();

        if (isUserValid) {
            // Fetch user data from the database using Gmail
            User validUser = userService.findByGmail(user.getGmail());
            response.put("success", true);
            response.put("userName", validUser.getUsername()); // Return the user's name
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
        }

        return ResponseEntity.ok(response);
    }
}
