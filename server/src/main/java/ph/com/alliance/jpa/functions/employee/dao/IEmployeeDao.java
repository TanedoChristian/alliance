package ph.com.alliance.jpa.functions.employee.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;

@Repository
public interface IEmployeeDao extends JpaRepository<EmployeeModel, Integer>{
	@Query(value="select * from hr.employee where username = :username and password = :password", nativeQuery = true)
	List<EmployeeModel> findEmployee(@Param(value = "username") String username, @Param(value = "password") String password);
	
	@Query(value="SELECT * from employee where type='admin'", nativeQuery = true)
	List<Map<String, Object>> getAllAdmin();
	
	@Query(value = "SELECT * from employee inner join category on category.employeeid = employee.employeeId where categoryId = :id", nativeQuery = true)
	EmployeeModel findEmployeeByCategoryId(@Param(value="id") String string);
	

}
  