package com.example.demo.Repository;

import com.example.demo.Classes.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email); // For finding an admin by email
}
