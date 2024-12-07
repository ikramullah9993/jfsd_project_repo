package com.example.demo.Service;

import com.example.demo.Classes.Image;
import com.example.demo.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    private final Path rootLocation = Paths.get("uploads"); // Directory where files are stored

    public String saveImage(MultipartFile file) throws IOException {
        // Ensure the upload directory exists
        Files.createDirectories(rootLocation);

        // Define the path where the file will be stored
        String fileName = file.getOriginalFilename();
        Path destinationFile = rootLocation.resolve(Paths.get(fileName)).normalize().toAbsolutePath();

        // Save the file to the file system
        file.transferTo(destinationFile);

        // Return the file path which will be stored in the database
        return destinationFile.toString();
    }

    public void saveImagePath(String filePath) {
        // Create a new Image object and save the file path in the database
        Image image = new Image();
        image.setFilePath(filePath);
        imageRepository.save(image);
    }

    public String getImagePath(Long id) {
        // Fetch the file path from the database
        Optional<Image> image = imageRepository.findById(id);
        return image.map(Image::getFilePath).orElse(null);
    }

    public void deleteImage(Long id) throws IOException {
        // Delete image both from the database and the file system
        Optional<Image> imageOptional = imageRepository.findById(id);
        if (imageOptional.isPresent()) {
            String filePath = imageOptional.get().getFilePath();
            Path path = rootLocation.resolve(filePath).normalize();
            Files.deleteIfExists(path);
            imageRepository.deleteById(id);
        } else {
            throw new IOException("Image not found");
        }
    }
    
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }
}
