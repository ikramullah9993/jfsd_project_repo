package com.example.demo.Repository;

import com.example.demo.Classes.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByGmail(String gmail); // Find seller by Gmail
}
