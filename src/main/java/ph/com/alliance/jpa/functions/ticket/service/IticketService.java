package ph.com.alliance.jpa.functions.ticket.service;

import java.lang.reflect.InvocationTargetException;

import ph.com.alliance.jpa.functions.ticket.model.TicketModel;

public interface IticketService  {
	Object getAllTickets();
	void createTicket(TicketModel ticketmodel);
	void updateTicket(Integer ticketId,  TicketModel ticketModel);
	
}
