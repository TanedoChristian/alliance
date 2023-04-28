package ph.com.alliance.jpa.functions.employee.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;

public interface IEmployeeService {
	
	 Object getAllEmployee();
	 List<EmployeeModel> findEmployee(String username, String password);
	 void insertEmployee(Employee employee);
	 void deleteEmployee(Integer id);
	 void updateEmployee(Integer id, Employee employee, MultipartFile file);
	 void updatePassword(Integer id, String oldPassword, String newPassword);
	 
	 
	 void forgotPassword(String email, String newPassword);
	 
	 Object getById(Integer id);
	 Object getAllAdmin();
	 void sendOtp(String email);
}
