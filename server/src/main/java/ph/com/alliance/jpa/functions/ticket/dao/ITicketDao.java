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
	
	@Query(value="select ticket.ticketId, ticket.description, ticket.status, ticket.attachment, category.category_title, concat(employee.firstname, ' ',employee.lastname) as requested_by,  ticket.date_issued, concat(category.firstname, ' ' , category.lastname) as assign_to from hr.ticket inner join category on category.categoryId = ticket.category inner join employee on employee.employeeId = ticket.category where category.employeeid = :id", nativeQuery = true)
	List<Map<String, Object>> getTicketsByAssignee(@Param(value = "id") Integer id);
	

}
