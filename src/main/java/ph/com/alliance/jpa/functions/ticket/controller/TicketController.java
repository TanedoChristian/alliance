package ph.com.alliance.jpa.functions.ticket.controller;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;
import ph.com.alliance.jpa.functions.ticket.service.IticketService;

@RestController
@RequestMapping("/ticket")
public class TicketController{
	
	@Autowired
	IticketService ticketservice;
	
	@GetMapping("/getall")
	public Object getAllTickets() {
		// TODO Auto-generated method stub
		return ApiResult.CreateSuccess(ticketservice.getAllTickets());
	}
	

	
	@PostMapping("/test")
	public ApiResult createTicket(TicketModel ticketmodel) {
		// TODO Auto-generated method stub
		ticketservice.createTicket(ticketmodel);
		return ApiResult.CreateSuccess(ticketmodel);
		
	}
	
	@PutMapping("/update/{ticketId}")
	public ApiResult updateTicket(@PathVariable Integer ticketId, TicketModel ticketModel) {
		ticketservice.updateTicket(ticketId, ticketModel);
		return ApiResult.CreateSuccess(ticketModel);
	}

	
}