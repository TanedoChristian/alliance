package ph.com.alliance.jpa.functions.file.service;

import java.io.File;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFPrintSetup;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.opencsv.CSVWriter;

import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.ticket.dao.ITicketDao;
import ph.com.alliance.jpa.functions.ticket.model.Ticket;
import ph.com.alliance.jpa.functions.ticket.model.TicketModel;


@Service
public class FileServiceImp implements FileService {

	String basePath = System.getProperty("user.dir") + "\\";

	@Autowired
	private Environment env;

	@Autowired
	ITicketDao ticketDao;

	@Override
	public String downloadCsv(List<List<String>> items) throws IOException {
		String strFilePath = basePath + "file.csv";

		if (null != items) {
			OutputStreamWriter stream = new OutputStreamWriter(new FileOutputStream(strFilePath));
			CSVWriter writer = new CSVWriter(stream, CSVWriter.DEFAULT_SEPARATOR, CSVWriter.DEFAULT_QUOTE_CHARACTER,
					CSVWriter.DEFAULT_ESCAPE_CHARACTER, "\r\n");
			ArrayList<String[]> dataToWrite = new ArrayList<String[]>();

			for (List<String> item : items) {
				if (null != item && !item.isEmpty())
					dataToWrite.add(item.toArray(new String[item.size()]));
			}
			writer.writeAll(dataToWrite, true);
			writer.close();
		}

		return strFilePath;
	}

	@Override
	public String downloadXls(List<List<String>> items) throws Exception {
		String strFilePath = basePath + "file.xlsx";

		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("sheetname");
		sheet.getPrintSetup().setPaperSize(HSSFPrintSetup.A4_PAPERSIZE);
		sheet.getPrintSetup().setLandscape(true);

		if (null != items && !items.isEmpty()) {
			for (int iYaxis = 0; iYaxis < items.size(); iYaxis++) {
				List<String> item = items.get(iYaxis);
				Row row = sheet.createRow(iYaxis);
				for (int iXaxis = 0; iXaxis < items.size(); iXaxis++) {
					Cell cell = row.createCell(iXaxis);
					cell.setCellValue(item.get(iXaxis));
					sheet.autoSizeColumn(iXaxis);
				}
			}
		}

		try {
			FileOutputStream outputStream = new FileOutputStream(strFilePath);
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			throw e;
		}

		return strFilePath;
	}

	@Override
	public String downloadPdf(List<List<String>> items) throws FileNotFoundException, DocumentException {
		String strFilePath = basePath + "file.pdf";

		Document document = new Document(PageSize.A4.rotate(), 10f, 10f, 10f, 10f);
		PdfWriter.getInstance(document, new FileOutputStream(strFilePath));
		document.open();
		document.newPage();

		if (null != items && !items.isEmpty()) {
			PdfPTable table = new PdfPTable(items.get(0).size());
			table.setWidthPercentage(100);
			table.setSpacingBefore(10f);
			for (int iYaxis = 0; iYaxis < items.size(); iYaxis++) {
				List<String> item = items.get(iYaxis);
				for (int iXaxis = 0; iXaxis < items.size(); iXaxis++) {
					table.addCell(item.get(iXaxis));
				}
			}
			document.add(table);
		}
		document.close();
		return strFilePath;
	}

	@Override
	public Object uploadFile(MultipartFile file) {

		String basePath = env.getProperty("files.path") + "/sampleuploads";
		File directory = new File(basePath);
		if (!directory.exists()) {
			directory.mkdir();
		}
		Path filePath = Paths.get(basePath, file.getOriginalFilename());
		try {
			Files.write(filePath, file.getBytes());
		} catch (IOException e) {

			e.printStackTrace();
		}
		return file;
	}

	@Override
	public ResponseEntity<byte[]> download(String fileName) throws IOException {

		Path filePath = Paths.get("C:/serverFiles/sampleuploads/" + fileName);
		byte[] data = Files.readAllBytes(filePath);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		ContentDisposition.Builder builder = ContentDisposition.builder("attachment").filename(fileName);
		headers.setContentDisposition(builder.build());
		return ResponseEntity.ok().headers(headers).body(data);

	}

	@Override
	public void exportIntoCsv(PrintWriter writer) throws IOException {
		List<Ticket> tickets = ticketDao.findAll();
		writer.write("Ticket ID, Description, Category, Employee ID, Date Issued, Attachment, Status");
		writer.write("\n");
		for (Ticket ticket : tickets) {
			writer.write(ticket.getTicketId() + ","+ ticket.getDescription() + ","+ ticket.getCategory() + ","+  ticket.getEmployee_id()+ ","+ ticket.getDate_issued() + ","+ ticket.getAttachment()+ ","+ ticket.getStatus() + "\n");
		}
		writer.flush();
	}
	


}
