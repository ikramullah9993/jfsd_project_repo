package com.example.demo.Repository;

import com.example.demo.Classes.Culturalist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CulturalistRepository extends JpaRepository<Culturalist, Long> {
    Culturalist findByGmail(String gmail);
}
