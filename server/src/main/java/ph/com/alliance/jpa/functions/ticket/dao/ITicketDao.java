 package ph.com.alliance.jpa.functions.ticket.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import ph.com.alliance.jpa.functions.ticket.model.Ticket;

@Repository
public interface ITicketDao extends JpaRepository<Ticket, Integer>{
	@Query(value="select * from hr.ticket where status = :status", nativeQuery = true)
	List<Ticket> findbyStatus(@Param(value = "status") String status);
	
	@Query(value="select ticket.ticketId, ticket.description, ticket.status, ticket.attachment, category.category_title, ticket.employee_id,  ticket.date_issued, concat(category.firstname, ' ' , category.lastname) as assign_to from hr.ticket inner join category on category.categoryId = ticket.category", nativeQuery=true)
	List<Map<String, Object>> getAllFromTable();
	
	@Query(value="select ticket.status, ticket.description, ticket.category, concat(employee.firstname, ' ', employee.lastname) as requested_by, ticket.ticketId, ticket.attachment, category.category_title, ticket.date_issued, concat(category.firstname, ' ', category.lastname) as assign_to from ticket inner join employee on employeeId = ticket.employee_id inner join category on category.categoryId = ticket.category where category.employeeid = :id", nativeQuery = true)
	List<Map<String, Object>> getTicketsByAssignee(@Param(value = "id") Integer id);
	
	@Query(value= "select count(*) as ticket_count, status from ticket group by status", nativeQuery = true)
	List<Map<String, Object>> getTicketCount();
	
	@Query(value = "select * from ticket where date(date_issued) >= :date_start and date(date_issued) <= :date_ended", nativeQuery = true)
	List<Ticket> getTicketByDate(@Param(value="date_start") String date, @Param(value="date_ended") String date1);
	
	

}
