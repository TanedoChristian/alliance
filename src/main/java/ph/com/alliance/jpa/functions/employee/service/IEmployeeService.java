package ph.com.alliance.jpa.functions.employee.service;

import java.util.List;

import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;

public interface IEmployeeService {
	
	 Object getAllEmployee();
	 List<EmployeeModel> findEmployee(String username, String password);
	

}
