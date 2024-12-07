package com.example.demo.Service;

import com.example.demo.Classes.Seller;
import com.example.demo.Repository.SellerRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public Seller registerSeller(Seller seller) {
        return sellerRepository.save(seller); // Save the seller to the database
    }

    public Seller findByGmail(String gmail) {
        return sellerRepository.findByGmail(gmail);
    }

    public boolean validateSeller(String gmail, String password) {
        Seller seller = sellerRepository.findByGmail(gmail);
        return seller != null && seller.getPassword().equals(password); // Validate Gmail and password
    }
    
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public void deleteSeller(Long id) {
        sellerRepository.deleteById(id);
    }
}
