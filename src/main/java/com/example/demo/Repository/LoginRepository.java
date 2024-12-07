package com.example.demo.Repository;

import com.example.demo.Classes.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<LoginUser, Long> {
    LoginUser findByGmail(String gmail);  // Find user by Gmail
}
