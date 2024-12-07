package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Classes.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserName(String userName); // Match 'userName' in Cart entity
}
