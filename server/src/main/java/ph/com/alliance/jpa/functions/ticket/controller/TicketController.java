package ph.com.alliance.jpa.functions.ticket.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.apache.commons.compress.utils.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.email.service.EmailService;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;
import ph.com.alliance.jpa.functions.ticket.service.IticketService;

@RestController
@RequestMapping("/ticket")
public class TicketController{
	
	@Autowired
	IticketService ticketservice;
	
	@Autowired
	private Environment env;
	
	@Autowired
	EmailService emailService;
	
	
	
	@GetMapping("/getall")
	public Object getAllTickets() {
		// TODO Auto-generated method stub
		return ApiResult.CreateSuccess(ticketservice.getAllTickets());
	}
	
	@GetMapping("/gettable")
	public Object getAllFromTable() {
		return ApiResult.CreateSuccess(ticketservice.getAllFromTable());
	}
	
	@GetMapping("/assignee/{assigneeId}")
	public ApiResult getTicketByAssignee(@PathVariable Integer assigneeId) {
		return ApiResult.CreateSuccess(ticketservice.getTicketByAssignee(assigneeId));
	}
	


	
	@DeleteMapping("/delete")
	public void deleteAll(@RequestBody Map<String, Object> ticketTable)  {
		List<Integer> ticketIds = (List<Integer>) ticketTable.get("ticketId");
		ticketservice.deleteTickets(ticketIds);
	}
	
	@PostMapping("/create")
	public ApiResult createTicket(TicketModel ticketmodel, MultipartFile file) {
		ticketservice.createTicket(ticketmodel, file);
		return ApiResult.CreateSuccess(ticketmodel);
	}
	
	@PutMapping("/update/{ticketId}")
	public ApiResult updateTicket(@PathVariable Integer ticketId, @RequestBody TicketModel ticketModel) {
		ticketservice.updateTicket(ticketId, ticketModel);
		return ApiResult.CreateSuccess(ticketModel);
	}
	
	@PutMapping("/update-status/{ticketId}")
	public ApiResult updateApiResult(@PathVariable Integer ticketId, @RequestBody TicketModel ticketModel) {
		ticketservice.updateTicketStatus(ticketId, ticketModel);
		return ApiResult.CreateSuccess(ticketModel);
	}
	
	@GetMapping("/get/{ticketId}")
	public ApiResult getTicketById(@PathVariable Integer ticketId) {
		ticketservice.findTicket(ticketId);
		
		return ApiResult.CreateSuccess(ticketservice.findTicket(ticketId), "Success");
	}
	
	@PostMapping("file")
	public Object testFile(@RequestParam("file") MultipartFile file) throws IOException
	{
	
		String basePath = env.getProperty("files.path") + "/sampleuploads";
		File directory = new File(basePath);
		if(!directory.exists()) {
			directory.mkdir();
		}
	    Path filePath = Paths.get(basePath, file.getOriginalFilename());
		Files.write(filePath, file.getBytes());
		return file;
		 
	}
	
	
	
	
	
	@DeleteMapping("/delete/{ticketId}")
	public ApiResult deleteTicket(@PathVariable Integer ticketId) {
		ticketservice.deleteTicket(ticketId);
		return ApiResult.CreateSuccess("Successfully Deleted!");	
	}
	
	@GetMapping("/status/{status}")
	public ApiResult findbyStatus(@PathVariable String status) {
		ticketservice.findbyStatus(status);
		return ApiResult.CreateSuccess(ticketservice.findbyStatus(status), "Retrieved Successfully");
	}
	
}