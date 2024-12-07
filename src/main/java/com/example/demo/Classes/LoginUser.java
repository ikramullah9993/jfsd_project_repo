package com.example.demo.Classes;

import jakarta.persistence.*;

@Entity
@Table(name = "LoginUsers")
public class LoginUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String gmail;  // Changed to gmail

    @Column(nullable = false)
    private String password;

    public LoginUser() {}  // Default constructor

    public LoginUser(String gmail, String password) {
        this.gmail = gmail;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
