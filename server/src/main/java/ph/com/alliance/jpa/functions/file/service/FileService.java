package ph.com.alliance.jpa.functions.file.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.DocumentException;

public interface FileService {

    String downloadCsv(List<List<String>> items) throws IOException;

    String downloadXls(List<List<String>> items) throws Exception;

    String downloadPdf(List<List<String>> items) throws FileNotFoundException, DocumentException;
 
    Object uploadFile(MultipartFile file);
   
    ResponseEntity<byte []> download(String filename) throws IOException;

}
