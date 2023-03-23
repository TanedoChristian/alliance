 package ph.com.alliance.jpa.functions.ticket.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import ph.com.alliance.jpa.functions.ticket.model.Ticket;

@Repository
public interface ITicketDao extends JpaRepository<Ticket, Integer>{
	@Query(value="select * from hr.ticket where status = :status", nativeQuery = true)
	List<Ticket> findbyStatus(@Param(value = "status") String status);
	

	
	

	
}
