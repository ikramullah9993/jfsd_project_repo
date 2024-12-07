package com.example.demo.Controller;

import java.util.List;

public class EmailRequest {

    private String email;
    private String username;
    private double total;
    private String address;
    private List<CartItem> items;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    // Inner class for CartItem
    public static class CartItem {
        private String itemName;
        private int quantity;
        private double individualPrice;

        // Getters and Setters
        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getIndividualPrice() {
            return individualPrice;
        }

        public void setIndividualPrice(double individualPrice) {
            this.individualPrice = individualPrice;
        }
    }
}
