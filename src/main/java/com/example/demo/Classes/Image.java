// package com.example.demo.Classes;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;

// @Entity
// public class Image {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;

//     private String filePath; // Store only the image file path

//     // Getters and Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getFilePath() {
//         return filePath;
//     }

//     public void setFilePath(String filePath) {
//         this.filePath = filePath;
//     }
// }

package com.example.demo.Classes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// @Entity
// public class Image {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;

//     private String filePath; // Store only the image file path

//     private String sellerGmail; // Associate the image with a seller

//     // Getters and Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getFilePath() {
//         return filePath;
//     }

//     public void setFilePath(String filePath) {
//         this.filePath = filePath;
//     }

//     public String getSellerGmail() {
//         return sellerGmail;
//     }

//     public void setSellerGmail(String sellerGmail) {
//         this.sellerGmail = sellerGmail;
//     }
// }


@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String filePath;
    private String sellerGmail;

    // New fields
    private String itemName;
    private Double itemPrice;
    private String itemSummary;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getSellerGmail() {
        return sellerGmail;
    }

    public void setSellerGmail(String sellerGmail) {
        this.sellerGmail = sellerGmail;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemSummary() {
        return itemSummary;
    }

    public void setItemSummary(String itemSummary) {
        this.itemSummary = itemSummary;
    }
}
