package ph.com.alliance.jpa.functions.image.controller;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ph.com.alliance.jpa.functions.image.service.IImageService;


@RestController
class ImageController {
	
	@Autowired
	IImageService imageService;
	
	
	
	@GetMapping("image/{fileName:.+}")
	public ResponseEntity<byte []> getImage(@PathVariable("fileName") String fileName) throws FileNotFoundException, IOException {
		return  imageService.get(fileName);
	}
	
}