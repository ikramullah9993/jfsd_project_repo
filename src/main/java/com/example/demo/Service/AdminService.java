package com.example.demo.Service;

import com.example.demo.Classes.Admin;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean validateAdmin(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);

        // Check if admin exists and password matches
        return adminOptional.isPresent() && adminOptional.get().getPassword().equals(password);
    }
}
