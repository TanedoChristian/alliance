package ph.com.alliance.jpa.functions.ticket.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.mail.search.IntegerComparisonTerm;

import org.springframework.web.multipart.MultipartFile;

import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;

public interface IticketService  {
	Object getAllTickets();
	void createTicket(TicketModel ticketmodel, MultipartFile file);
	void updateTicket(Integer ticketId,  TicketModel ticketModel);
	void updateTicketStatus(Integer ticketId,  TicketModel ticketModel);
	void deleteTicket(Integer ticketId);
	Object findTicket(Integer ticketId);
	List<Ticket> findbyStatus(String status);
	List<Map<String, Object>>getAllFromTable();
	void deleteTickets(List<Integer> tickets);

}
