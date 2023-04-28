package ph.com.alliance.jpa.functions.employee.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.common.MailModel;
import ph.com.alliance.jpa.functions.email.model.SampleEmailModel;
import ph.com.alliance.jpa.functions.email.service.EmailService;
import ph.com.alliance.jpa.functions.employee.dao.IEmployeeDao;
import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.file.service.FileService;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;

@Service
public class EmployeeService implements IEmployeeService{

	@Autowired
	IEmployeeDao employeeDao;
	
	@Autowired
	FileService fileService;
	
	@Autowired
	EmailService emailService;

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



	@Override
	public void insertEmployee(Employee employee) {
		
		EmployeeModel employeeModel = new EmployeeModel();
		try {
			
			employee.setEmployeeId(null);
			BeanUtils.copyProperties(employeeModel, employee);
			employeeDao.saveAndFlush(employeeModel);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	
	}



	@Override
	public void deleteEmployee(Integer id) {
		// TODO Auto-generated method stub
		employeeDao.deleteById(id);
	}



	@Override
	public void updateEmployee(Integer id, Employee employee, MultipartFile file) {
		// TODO Auto-generated method stub
		try {
			
			EmployeeModel employeeModel = employeeDao.findById(id).orElse(null);			
			employeeModel.setEmployeeId(id);
			
			
			
			if(employee.getFirstname() != null) {
				employeeModel.setFirstname(employee.getFirstname());
			}	
			
			if(employee.getLastname() != null) {
				employeeModel.setLastname(employee.getLastname());
			}
			
			if(employee.getType() != null) {
				employeeModel.setType(employee.getType());
			}
			
			if(employee.getUsername() != null) {
				employeeModel.setUsername(employee.getUsername());
			}
			
			if(employee.getPassword() != null) {
				employeeModel.setPassword(employee.getPassword());
			}
			
			if(employee.getEmail() != null) {
				employeeModel.setEmail(employee.getEmail());
			}
			
			if(file != null) {
				fileService.uploadFile(file);
				employeeModel.setImg(file.getOriginalFilename());
			}
			
			
			employeeDao.saveAndFlush(employeeModel);
			BeanUtils.copyProperties(employeeModel, employee);		
		}catch(Exception e) {
			e.printStackTrace();
		}
	}



	@Override
	public Object getById(Integer id) {
		return employeeDao.findById(id).orElse(null);
	}



	@Override
	public void updatePassword(Integer id, String oldPassword, String newPassword) {
		// TODO Auto-generated method stub
		
		try {
			EmployeeModel employeeModel = employeeDao.findById(id).orElse(null);
			
			if(employeeModel.getPassword().equals(oldPassword)) {
				employeeModel.setPassword(newPassword);
				employeeDao.saveAndFlush(employeeModel);
			}
			
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}



	@Override
	public Object getAllAdmin() {
		return employeeDao.getAllAdmin();
	}



	@Override
	public void sendOtp(String email) {
		SampleEmailModel emailModel = new SampleEmailModel();
		emailModel.setEmail(email);
		emailModel.setSignature("4572");
		emailService.changePasswordMail(emailModel);
		
		
		

	}

	



	
	
	
	
}