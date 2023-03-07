package ph.com.alliance.jpa.functions.ticket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ticket")
public class TicketModel {
	
	@Id
	@Column(name="ticket_id")
	Integer ticketId;
	
	@Column(name="status")
	String status;
	
	@Column(name="description")
	String description;
	
	@Column(name="category")
	String category;
	
	@Column(name="date_issued")
	String date_issued;
	
	@Column(name="employee_id")
	Integer employee_id;
	
	@Column(name="attachment")
	String attachment;
	
	@Column(name="assignee_id")
	Integer assignee_id;
	
	
	

	public String getDate_issued() {
		return date_issued;
	}

	public void setDate_issued(String date_issued) {
		this.date_issued = date_issued;
	}

	public Integer getEmployee_id() {
		return employee_id;
	}

	public void setEmployeeId(Integer employee_id) {
		this.employee_id = employee_id;
	}

	public Integer getTicketId() {
		return ticketId;
	}

	public void setTicketId(Integer ticketId) {
		this.ticketId = ticketId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getAssignee_id() {
		return assignee_id;
	}

	public void setAssignee_id(Integer assignee_id) {
		this.assignee_id = assignee_id;
	}

	
	
	
}
