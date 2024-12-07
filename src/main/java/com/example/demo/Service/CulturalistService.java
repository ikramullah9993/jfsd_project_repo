package com.example.demo.Service;

import com.example.demo.Classes.Culturalist;
import com.example.demo.Repository.CulturalistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CulturalistService {

    @Autowired
    private CulturalistRepository culturalistRepository;

    public Culturalist registerCulturalist(Culturalist culturalist) {
        return culturalistRepository.save(culturalist);
    }

    public Culturalist findByGmail(String gmail) {
        return culturalistRepository.findByGmail(gmail);
    }

    public boolean validateCulturalist(String gmail, String password) {
        Culturalist culturalist = culturalistRepository.findByGmail(gmail);
        return culturalist != null && culturalist.getPassword().equals(password);
    }

    public List<Culturalist> getAllCulturalists() {
        return culturalistRepository.findAll();
    }

    public void deleteCulturalist(Long id) {
        culturalistRepository.deleteById(id);
    }
}
