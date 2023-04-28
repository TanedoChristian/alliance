package ph.com.alliance.jpa.functions.file.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ph.com.alliance.jpa.functions.file.service.FileService;
import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;

@RestController
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileService fileService;
	
	@Autowired
	ITicketDao ticketDao;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@GetMapping("/{filename:.+}")
	public ResponseEntity<byte []> download(@PathVariable String filename) throws IOException {
		return fileService.download(filename);
	}
	

    @RequestMapping(value = "/csv", method = RequestMethod.POST)
    public ResponseEntity<byte[]> downloadCsv(@RequestBody String items) throws Exception {
    	
        List<List<String>> list = convertToTableData (items);
        Path resultFile = new File(fileService.downloadCsv(list)).toPath();
        byte[] contents =  Files.readAllBytes(resultFile);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/csv"));
        headers.setContentDispositionFormData(resultFile.getFileName().toString(), resultFile.getFileName().toString());
        
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        
        return response;
    }
    
    @RequestMapping(value = "/xlsx", method = RequestMethod.POST)
    public ResponseEntity<byte[]> downloadXls(@RequestBody String items) throws Exception {

        List<List<String>> list = convertToTableData (items);
        Path resultFile = new File(fileService.downloadXls(list)).toPath();
        byte[] contents =  Files.readAllBytes(resultFile);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/xlsx"));
        headers.setContentDispositionFormData(resultFile.getFileName().toString(), resultFile.getFileName().toString());
        
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        
        return response;
    }
    
    @RequestMapping(value = "/pdf", method = RequestMethod.POST)
    public ResponseEntity<byte[]> downloadPdf(@RequestBody String items) throws Exception {

        List<List<String>> list = convertToTableData (items);
        Path resultFile = new File(fileService.downloadPdf(list)).toPath();
        byte[] contents =  Files.readAllBytes(resultFile);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.setContentDispositionFormData(resultFile.getFileName().toString(), resultFile.getFileName().toString());
        
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        
        return response;
    }
    
    
    @GetMapping("/export-csv")
    public void exportCsv(HttpServletResponse response) throws IOException {
    	
    	response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=ticket.csv");
        List<Ticket> tickets = ticketDao.findAll();
        PrintWriter writer = response.getWriter();
        writer.write("Status, Description, Category, Employee ID, Date Issued, Attachment, Ticket ID");
        writer.write("\n");
        for (Ticket ticket : tickets) {
            writer.write(ticket.getStatus() + ","+ ticket.getDescription() + ","+ ticket.getCategory() + ","+  ticket.getEmployee_id()+ ","+ ticket.getDate_issued() + ","+ ticket.getAttachment()+ ","+ ticket.getTicketId() + "\n");
        }
        writer.flush();
    }
    
    @PostMapping("/export-csv")
    public void exportCsv(HttpServletResponse response,  String start, String end) throws IOException {
    	response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=ticket.csv");
        List<Ticket> tickets = ticketDao.getTicketByDate(start, end);
        PrintWriter writer = response.getWriter();
        writer.write("Status, Description, Category, Employee ID, Date Issued, Attachment, Ticket ID");
        writer.write("\n");
        for (Ticket ticket : tickets) {
            writer.write(ticket.getStatus() + ","+ ticket.getDescription() + ","+ ticket.getCategory() + ","+  ticket.getEmployee_id()+ ","+ ticket.getDate_issued() + ","+ ticket.getAttachment()+ ","+ ticket.getTicketId() + "\n");
        }
        writer.flush();
    }
    
    @SuppressWarnings("unchecked")
    private List<List<String>> convertToTableData (String itemsList) throws JsonParseException, JsonMappingException, UnsupportedEncodingException, IOException {
        List<List<String>> dataList = new ArrayList<List<String>>();
        Object[] itemList = mapper.readValue(URLDecoder.decode(itemsList, "UTF-8"), Object[].class); 
        int i = 0;
        List<String> lines = new ArrayList<>();
        for (Object item: itemList){            
            if(i==0){
                for (String key : ((LinkedHashMap<String, String>)item).keySet() ) {
                    lines.add(key);
                }              
                dataList.add(lines);
            }
            lines = new ArrayList<>(); 
            for (String value : ((LinkedHashMap<String, String>)item).values()) {
                lines.add(value);
            }
            dataList.add(lines);
            i++;
        }        
        return dataList;
    }


}
