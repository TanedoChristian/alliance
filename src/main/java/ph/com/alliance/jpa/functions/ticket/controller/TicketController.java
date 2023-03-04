package ph.com.alliance.jpa.functions.ticket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.ticket.service.IticketService;

@RestController
@RequestMapping("/ticket")
public class TicketController implements IticketService{
	
	@Autowired
	IticketService ticketservice;
	
	@GetMapping("/getall")
	@Override
	public Object getAllTickets() {
		// TODO Auto-generated method stub
		return ApiResult.CreateSuccess(ticketservice.getAllTickets());
	}
	
	
}