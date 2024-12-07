package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Classes.Image;

// @Repository
// public interface ImageRepository extends JpaRepository<Image, Long> {
// }

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findBySellerGmail(String sellerGmail);
}
