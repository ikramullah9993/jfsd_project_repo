package com.example.demo.Service;

import com.example.demo.Classes.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;  // Use UserRepository instead

    public boolean validateUser(String gmail, String password) {
        User user = userRepository.findByGmail(gmail.toLowerCase()); // Find user by Gmail
        if (user == null) {
            System.out.println("No user found with Gmail: " + gmail);
            return false;
        }
        return user.getPassword().equals(password);  // Validate password
    }
}
