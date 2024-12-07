package com.example.demo.Controller;

import com.example.demo.Service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailSenderService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getEmail(), emailRequest.getUsername(),
                    emailRequest.getTotal(), emailRequest.getAddress(), emailRequest.getItems());
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send email.");
        }
    }
}
