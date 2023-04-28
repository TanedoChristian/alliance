package ph.com.alliance.jpa.functions.ticket.service;

import java.beans.Beans;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.functions.email.model.SampleEmailModel;
import ph.com.alliance.jpa.functions.email.service.EmailService;
import ph.com.alliance.jpa.functions.employee.dao.IEmployeeDao;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.file.service.FileService;
import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;
@Service
public class TicketService implements IticketService {

  @Autowired
  ITicketDao ticketDao;

  @Autowired
  FileService fileService;

  @Autowired
  IEmployeeDao employeeDao;

  @Autowired
  EmailService emailService;

  @Override
  public Object getAllTickets() {
    return ticketDao.findAll();
  }

  @Override
  public void updateTicket(Integer ticketId, TicketModel ticketModel) {

    try {
      Ticket ticket = new Ticket();
      BeanUtils.copyProperties(ticket, ticketModel);
      ticket.setTicketId(ticketId);
      ticketDao.saveAndFlush(ticket);

      SampleEmailModel mailModel = new SampleEmailModel();
      mailModel.setSignature("jgerzon@asi-dev1.com");
      mailModel.setEmail("tanedochristian1@gmail.com");
      mailModel.setName("cj");
      emailService.sendMail(mailModel);

    } catch (IllegalAccessException e) {

      e.printStackTrace();
    } catch (InvocationTargetException e) {

      e.printStackTrace();
    } catch (Exception e) {

      e.printStackTrace();
    }
  }

  @Override
  public void createTicket(TicketModel ticketmodel, MultipartFile file) {

    try {

      EmployeeModel employeeModel = employeeDao.findEmployeeByCategoryId(ticketmodel.getCategory());

      SampleEmailModel emailModel = new SampleEmailModel();
      emailModel.setName(employeeModel.getFirstname());
      emailModel.setEmail(employeeModel.getEmail());

      emailService.sendMail(emailModel);

      Ticket ticket = new Ticket();
      ticketmodel.setAttachment(file.getOriginalFilename());
      ticket.setTicketId(null);
      fileService.uploadFile(file);
      BeanUtils.copyProperties(ticket, ticketmodel);
      ticketDao.saveAndFlush(ticket);
    } catch (IllegalAccessException e1) {

      e1.printStackTrace();
    } catch (InvocationTargetException e1) {

      e1.printStackTrace();
    }

  }

  @Override
  public
  void deleteTicket(Integer ticketId) {
    ticketDao.deleteById(ticketId);
  }

  public void deleteTickets(List < Integer > tickets) {
    for (Integer ticket: tickets) {
      ticketDao.deleteById(ticket);
    }
  }

  @Override
  public List < Ticket > findbyStatus(String status) {
    ticketDao.findbyStatus(status);
    List < Ticket > tickets = ticketDao.findbyStatus(status);
    return tickets;
  }

  @Override
  public Object findTicket(Integer ticketId) {
    // TODO Auto-generated method stub
    Ticket ticket = ticketDao.findById(ticketId).orElse(null);
    return ticket;
  }

  @Override
  public void updateTicketStatus(Integer ticketId, TicketModel ticketModel) {
    // TODO Auto-generated method stub
    try {
      Ticket ticket = ticketDao.findById(ticketId).orElse(null);
      ticket.setTicketId(ticketId);
      ticket.setStatus(ticketModel.getStatus());
      ticketDao.saveAndFlush(ticket);
      BeanUtils.copyProperties(ticket, ticketModel);

    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  @Override
  public List < Map < String, Object >> getAllFromTable() {
    // TODO Auto-generated method stub
    return ticketDao.getAllFromTable();
  }

  @Override
  public List < Map < String, Object >> getTicketByAssignee(Integer id) {
    return ticketDao.getTicketsByAssignee(id);
  }

  @Override
  public List < Map < String, Object >> getTicketCount() {
    return ticketDao.getTicketCount();
  }

  @Override
  public Object getTicketByDateRange(String date, String date2) {
    return ticketDao.getTicketByDate(date, date2);
  }

}