package com.example.demo.Repository;

import com.example.demo.Classes.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByGmail(String gmail);  // Add this method to find by Gmail
}
