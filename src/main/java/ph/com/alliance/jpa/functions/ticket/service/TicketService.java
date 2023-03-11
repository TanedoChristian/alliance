package ph.com.alliance.jpa.functions.ticket.service;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;

@Service
public class TicketService implements IticketService {

	@Autowired
	ITicketDao ticketDao;

	@Override
	public Object getAllTickets() {
		return ticketDao.findAll();
	}
	
	@Override
	public void updateTicket(Integer ticketId, TicketModel ticketModel) {
		Ticket ticket = new Ticket();
		try {
			BeanUtils.copyProperties(ticket, ticketModel);
			ticket.setTicketId(ticketId);
			ticketDao.saveAndFlush(ticket);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	@Override
	public void createTicket(TicketModel ticketmodel) {
		// TODO Auto-generated method stub
		Ticket ticket = new Ticket();
		try {
			BeanUtils.copyProperties(ticket, ticketmodel);
			ticketDao.saveAndFlush(ticket);
		} catch (IllegalAccessException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (InvocationTargetException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	
	}

	

	
}