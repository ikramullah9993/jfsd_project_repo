package com.example.demo.Service;

import com.example.demo.Controller.EmailRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String username, double total, String address,
            List<EmailRequest.CartItem> items) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-email@gmail.com"); // Replace with your actual email
            message.setTo(toEmail);
            message.setSubject("Order Confirmation");

            // Build email body with item details
            StringBuilder itemsDetails = new StringBuilder();
            for (EmailRequest.CartItem item : items) {
                itemsDetails.append(String.format("Item: %s\nQuantity: %d\nPrice: ₹%.2f\n\n",
                        item.getItemName(), item.getQuantity(), item.getIndividualPrice()));
            }

            String body = String.format(
                    "Hello %s,\n\nThank you for your order!\n\nItems:\n%s\nTotal amount: ₹%.2f\nDelivery Address: %s\n\nWe will notify you once your order is shipped.",
                    username, itemsDetails.toString(), total, address);
            message.setText(body);

            mailSender.send(message);
            System.out.println("Mail sent successfully");
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace for debugging
            System.out.println("Error sending email: " + e.getMessage());
        }
    }
}
