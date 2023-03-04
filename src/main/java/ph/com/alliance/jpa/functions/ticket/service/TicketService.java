package ph.com.alliance.jpa.functions.ticket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;

@Service
public class TicketService implements IticketService {

	@Autowired
	ITicketDao ticketDao;

	@Override
	public Object getAllTickets() {
		return ticketDao.findAll();
	}
}