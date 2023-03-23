package ph.com.alliance.jpa.functions.ticket.service;

import java.beans.Beans;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.functions.email.model.SampleEmailModel;
import ph.com.alliance.jpa.functions.email.service.EmailService;
import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;
@Service
public class TicketService implements IticketService {

	@Autowired
	ITicketDao ticketDao;
	
	@Autowired
	EmailService emailService;

	@Override
	public Object getAllTickets() {
		return ticketDao.findAll();
	}
	
	@Override
	public void updateTicket(Integer ticketId, TicketModel ticketModel) {
		
		try {
			Ticket ticket = new Ticket();
			BeanUtils.copyProperties(ticket, ticketModel);
			ticket.setTicketId(ticketId);
			ticketDao.saveAndFlush(ticket);
			SampleEmailModel mailModel = new SampleEmailModel();
			
			//find email by id
			// userDao.findEmilById
			// @Query(select email from user where id =:email)
			// findEmail(String email) -> ticketModel.getassignee_id
			// jgerzon@asi-dev1.com
			
			mailModel.setSignature("jgerzon@asi-dev1.com");
			mailModel.setEmail("tanedochristian1@gmail.com");
			mailModel.setName("cj");
			emailService.sendMail(mailModel);
			
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

	@Override
	public
	 void deleteTicket(Integer ticketId) {
		// TODO Auto-generated method stub
		ticketDao.deleteById(ticketId);
	}
	

	@Override
	public List<Ticket> findbyStatus(String status) {
		ticketDao.findbyStatus(status);
		List<Ticket> tickets = ticketDao.findbyStatus(status);
		return tickets;
	}

	@Override
	public Object findTicket(Integer ticketId) {
		// TODO Auto-generated method stub
		Ticket ticket = ticketDao.findById(ticketId).orElse(null);
		return ticket;
	}

	@Override
	public void updateTicketStatus(Integer ticketId, TicketModel ticketModel) {
		// TODO Auto-generated method stub
		try {
			Ticket ticket = ticketDao.findById(ticketId).orElse(null);
			
			ticket.setTicketId(ticketId);
			ticket.setStatus(ticketModel.getStatus());
			ticketDao.saveAndFlush(ticket);
			BeanUtils.copyProperties(ticket, ticketModel);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		
	}



	
	
}