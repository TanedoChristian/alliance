package ph.com.alliance.jpa.functions.ticket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ticket")
public class Ticket {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ticketId;

	@Column(name = "status")
	private Integer status;

	@Column(name = "description")
	private String description;

	@Column(name = "category")
	private String category;

	@Column(name = "date_issued")
	private String date_issued;

	@Column(name = "employee_id")
	private Integer employee_id;

	@Column(name = "attachment")
	private String attachment;



	public Integer getTicketId() {
		return ticketId;
	}

	public void setTicketId(Integer ticketId) {
		this.ticketId = ticketId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDate_issued() {
		return date_issued;
	}

	public void setDate_issued(String date_issued) {
		this.date_issued = date_issued;
	}

	public Integer getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(Integer employee_id) {
		this.employee_id = employee_id;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
}
