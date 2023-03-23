package ph.com.alliance.jpa.functions.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.functions.employee.dao.IEmployeeDao;
import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;

@Service
public class EmployeeService implements IEmployeeService{

	@Autowired
	IEmployeeDao employeeDao;

	@Override
	public Object getAllEmployee() {
		// TODO Auto-generated method stub
		return employeeDao.findAll();
	}


	@Override
	public List<EmployeeModel> findEmployee(String username, String password) {
		employeeDao.findEmployee(username, password);
		List<EmployeeModel> employees = employeeDao.findEmployee(username, password);
		return employees;
	}

	



	
	
	
	
}