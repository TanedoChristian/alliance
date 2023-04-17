package ph.com.alliance.jpa.functions.ticket.model;

import java.util.List;

public class TicketModel {
	
	private Integer ticketId;
	private Integer status;
	private String description;
	private String category;
	private Integer employee_id;
	private String date_issued;
	private Integer assignee_id;
	private String attachment;
	
	
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	public Integer getAssignee_id() {
		return assignee_id;
	}
	public void setAssignee_id(Integer assignee_id) {
		this.assignee_id = assignee_id;
	}
	public Integer getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(Integer employee_id) {
		this.employee_id = employee_id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
	public String getDate_issued() {
		return date_issued;
	}
	public void setDate_issued(String date_issued) {
		this.date_issued = date_issued;
	}
	public Integer getTicketId() {
		return ticketId;
	}
	public void setTicketId(Integer ticketId) {
		this.ticketId = ticketId;
	}
}