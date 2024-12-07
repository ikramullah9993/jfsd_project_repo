package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        System.out.println("Saving User: " + user.getUsername());  // Log user data before saving
        userRepository.save(user);
    }

    public User findByGmail(String gmail) {
        return userRepository.findByGmail(gmail); // This will search the user by Gmail
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
