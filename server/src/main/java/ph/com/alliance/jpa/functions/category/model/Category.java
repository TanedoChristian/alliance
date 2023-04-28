package ph.com.alliance.jpa.functions.category.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Integer categoryId;
	private String firstname;
	private String lastname;
	@Column(name="category_title")
	private String categoryTitle;
	private Integer employeeId;
	
	
	

	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getCategoryTitle() {
		return categoryTitle;
	}
	public void setCategoryTitle(String categoryTitle) {
		this.categoryTitle = categoryTitle;
	}
	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	

	
}