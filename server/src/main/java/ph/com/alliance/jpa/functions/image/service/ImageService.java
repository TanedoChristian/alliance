package ph.com.alliance.jpa.functions.image.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.compress.utils.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.beans.Beans;


@Service
class ImageService implements IImageService{

	@Override
	public ResponseEntity<byte[]> get(String fileName) throws IOException {
		// TODO Auto-generated method stub
		String basePath = "C:/serverFiles/sampleuploads/"+ fileName;
		File directory = new File(basePath);
		InputStream in = new FileInputStream(directory);
		final HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_JPEG);
	    return new ResponseEntity<>(IOUtils.toByteArray(in), headers, HttpStatus.OK); 
		
	}
	
}