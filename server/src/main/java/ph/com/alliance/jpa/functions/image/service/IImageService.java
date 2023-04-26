package ph.com.alliance.jpa.functions.image.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.http.ResponseEntity;

public interface IImageService {
	ResponseEntity<byte[]> get(String name) throws FileNotFoundException, IOException;
}