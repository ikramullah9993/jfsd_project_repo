package com.example.demo.Controller;

import com.example.demo.Classes.Image;
import com.example.demo.Repository.ImageRepository;
import com.example.demo.Service.ImageService;

import jakarta.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

// @RestController
// @RequestMapping("/api/seller/images")
// public class ImageController {

//     private final Path rootLocation = Paths.get("uploads"); // Directory to store files

//     @Autowired
//     private ImageRepository imageRepository;

//     // Upload image and store the file path in the database
//     @PostMapping("/upload")
//     public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
//         try {
//             // Create the uploads directory if it doesn't exist
//             if (!Files.exists(rootLocation)) {
//                 Files.createDirectories(rootLocation);
//             }

//             // Save the file to the filesystem
//             Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename()))
//                     .normalize().toAbsolutePath();
//             file.transferTo(destinationFile);

//             // Create a new Image object to store in the database
//             Image image = new Image();
//             image.setName(file.getOriginalFilename());
//             image.setFilePath(destinationFile.toString()); // Save the path to the image
//             imageRepository.save(image);

//             return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
//         } catch (IOException e) {
//             return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
//         }
//     }

//     // Retrieve an image by its file path
//     @GetMapping("/{imageName}")
//     public ResponseEntity<Resource> serveFile(@PathVariable String imageName, HttpServletRequest request) {
//         try {
//             // Load the file as a resource
//             Path file = rootLocation.resolve(imageName).normalize();
//             Resource resource = new UrlResource(file.toUri());

//             // Check if the file exists
//             if (!resource.exists() || !resource.isReadable()) {
//                 throw new RuntimeException("File not found: " + imageName);
//             }

//             // Return the image as a response
//             return ResponseEntity.ok()
//                     .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                     .body(resource);
//         } catch (IOException e) {
//             return ResponseEntity.status(500).body(null);
//         }
//     }
// }


@RestController
@RequestMapping("/api/seller/images")
public class ImageController {

    private final Path rootLocation = Paths.get("uploads");

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageservice;

    // Upload image and store the file path with seller's Gmail
    // @PostMapping("/upload")
    // public ResponseEntity<String> handleFileUpload(
    //         @RequestParam("file") MultipartFile file,
    //         @RequestParam("sellerGmail") String sellerGmail) {
    //     try {
    //         if (!Files.exists(rootLocation)) {
    //             Files.createDirectories(rootLocation);
    //         }

    //         Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename()))
    //                 .normalize().toAbsolutePath();
    //         file.transferTo(destinationFile);

    //         Image image = new Image();
    //         image.setName(file.getOriginalFilename());
    //         image.setFilePath(destinationFile.toString());
    //         image.setSellerGmail(sellerGmail); // Set the seller Gmail
    //         imageRepository.save(image);

    //         return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
    //     }
    // }
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("sellerGmail") String sellerGmail,
            @RequestParam("itemName") String itemName,
            @RequestParam("itemPrice") Double itemPrice,
            @RequestParam("itemSummary") String itemSummary) {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            file.transferTo(destinationFile);

            Image image = new Image();
            image.setName(file.getOriginalFilename());
            image.setFilePath(destinationFile.toString());
            image.setSellerGmail(sellerGmail);
            image.setItemName(itemName);
            image.setItemPrice(itemPrice);
            image.setItemSummary(itemSummary);

            imageRepository.save(image);

            return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    // Retrieve all images for a specific seller
    @GetMapping("/seller/{sellerGmail}")
    public ResponseEntity<?> getImagesBySeller(@PathVariable String sellerGmail) {
        return ResponseEntity.ok(imageRepository.findBySellerGmail(sellerGmail));
    }

    // Serve image by name
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        File file = new File("uploads/" + imageName);
        if (file.exists()) {
            String extension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();
            MediaType mediaType = MediaType.IMAGE_JPEG; // Default fallback

            // Set appropriate media type based on file extension
            if (extension.equals("png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (extension.equals("gif")) {
                mediaType = MediaType.IMAGE_GIF;
            }

            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update image details
    @PutMapping("/{id}")
    public ResponseEntity<String> updateImage(
            @PathVariable Long id,
            @RequestBody Image updatedImage) {
        Optional<Image> existingImage = imageRepository.findById(id);

        if (existingImage.isPresent()) {
            Image image = existingImage.get();
            image.setItemName(updatedImage.getItemName());
            image.setItemPrice(updatedImage.getItemPrice());
            image.setItemSummary(updatedImage.getItemSummary());
            imageRepository.save(image);
            return ResponseEntity.ok("Image updated successfully");
        } else {
            return ResponseEntity.status(404).body("Image not found");
        }
    }

    // Delete an image
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        Optional<Image> existingImage = imageRepository.findById(id);

        if (existingImage.isPresent()) {
            imageRepository.deleteById(id);
            return ResponseEntity.ok("Image deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Image not found");
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Image>> getAllImages() {
        return ResponseEntity.ok(imageservice.getAllImages());
    }

}
