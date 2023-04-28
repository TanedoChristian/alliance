package ph.com.alliance.jpa.functions.employee.controller;

import java.util.List;

import javax.mail.search.IntegerComparisonTerm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.employee.service.IEmployeeService;

@RestController
@RequestMapping("/employee")

public class EmployeeController{
	
	@Autowired
	IEmployeeService service;

	@GetMapping("/getall")
	public Object getAllEmployee() {
		return service.getAllEmployee();
	}
	
	@PostMapping("/insert")
	public Object insertEmployee(@RequestBody Employee employee) {
		service.insertEmployee(employee);
		return employee;
	}
	
	@PostMapping("/sendotp")
	public Object sendOtp(String email) {
		return service.sendOtp(email);
	}
	
	@GetMapping("/get/{id}")
	public ApiResult getEmployeeById(@PathVariable Integer id) {
		return ApiResult.CreateSuccess(service.getById(id));
	}
	
	@DeleteMapping("/delete/{id}")
	public ApiResult deleteEmployee(@PathVariable Integer id) {
		service.deleteEmployee(id);
		return ApiResult.CreateSuccess("Successfully Deleted!");
	}
	
	@GetMapping("/admin")
	public ApiResult getAllAdmin() {
		service.getAllAdmin();
		return ApiResult.CreateSuccess(service.getAllAdmin());
	}
	
	
	@PutMapping("/update/{id}")
	public ApiResult updateEmployee(@PathVariable Integer id, Employee employee, MultipartFile file) {
		service.updateEmployee(id, employee, file);
		return ApiResult.CreateSuccess("Successfully Updated");
	}
	
	@PutMapping("/change-password/{id}")
	public ApiResult changePassword(@PathVariable Integer id, String oldPassword, String newPassword) {
		
		service.updatePassword(id, oldPassword, newPassword);
		return ApiResult.CreateSuccess("Successfully Updated!");
		
	}
	
	
	@PutMapping("/forgot-password")
	public ApiResult forgotPassword(String email, String password) {

		service.forgotPassword(email, password);
		return ApiResult.CreateSuccess("Successfully Updated!");
		
	}
	
	
	@PostMapping("/employee-login")
	public ApiResult findUsername(@RequestBody Employee employee) {
		service.findEmployee(employee.getUsername(), employee.getPassword());
		return ApiResult.CreateSuccess(service.findEmployee(employee.getUsername(), employee.getPassword()));
	}
	
}