package ph.com.alliance.jpa.functions.ticket.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.io.File;
import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
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

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.pdf.AcroFields.Item;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.mysql.cj.xdevapi.JsonArray;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.common.MailModel;
import ph.com.alliance.jpa.functions.email.model.SampleEmailModel;
import ph.com.alliance.jpa.functions.email.service.EmailService;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;
import ph.com.alliance.jpa.functions.ticket.model.TicketTable;
import ph.com.alliance.jpa.functions.ticket.service.IticketService;

@RestController
@RequestMapping("/ticket")
public class TicketController{
	
	@Autowired
	IticketService ticketservice;
	
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
	

//	@DeleteMapping("/delete")
//	public void deleteAll(@RequestBody TicketTable ticketTable)  {
//		
//		
//	}
	
	@DeleteMapping("/delete")
	public void deleteAll(@RequestBody Map<String, Object> ticketTable)  {
		
		List<Integer> ticketIds = (List<Integer>) ticketTable.get("ticketId");
		ticketservice.deleteTickets(ticketIds);
	}
	
	@PostMapping("/create")
	public ApiResult createTicket(@RequestBody TicketModel ticketmodel) {
		
		ticketservice.createTicket(ticketmodel);
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
	public Object testFile(@RequestParam("file") MultipartFile file)
	{
		
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