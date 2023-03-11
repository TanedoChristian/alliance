 package ph.com.alliance.jpa.functions.ticket.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;

@Repository
public interface ITicketDao extends JpaRepository<Ticket, Integer>{

	
}
