/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CsvImportException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import com.ibsplc.apiserviceleaveforcasting.form.EmployeeForm;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeRepository;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeService;
import com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author jithin123
 */
@Service
public class EmployeeServiceImpl implements EmployeeService{
    
    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public void exportEmployees(int page, int limit, String employeeName, String organization, String team, String location, int roleId, HttpServletResponse response) throws Exception {
        Page<EmployeeView> employeeViewPage = searchEmployee(0, Integer.MAX_VALUE, employeeName, organization, team, location, roleId);
        List<EmployeeView> employeeViews = employeeViewPage.get().collect(Collectors.toList());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=report.xlsx";
        response.setHeader(headerKey, headerValue);
        XSSFWorkbook workbook = new XSSFWorkbook();
        try {
            workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("report");
            writeHeaderLine(workbook, sheet);
            writeDataLines(workbook, sheet, employeeViews);
            ServletOutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
        } catch (CSVExceptionWrapper csvException) {
            throw csvException;
        } catch (Exception ex) {
            throw ex;
        } finally {
            workbook.close();
            response.getOutputStream().close();
        }
    }

    private void writeHeaderLine(XSSFWorkbook workbook, XSSFSheet sheet) {
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        List<String> headers = List.of("SNo", "EmpId", "EmployeeName", "ExpediaFgName", "VendorName", "JobTitle",
                "HM", "BillRate", "Country", "City", "SOW", "Org", "Team", "Billability", "Remarks");
        int index = 0;
        for(String header: headers) {
            createCell(row, index, header, style, sheet);
            index++;
        }
    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style, XSSFSheet sheet) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines(XSSFWorkbook workbook, XSSFSheet sheet, List<EmployeeView> employeeViews) {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (EmployeeView employeeView : employeeViews) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
            createCell(row, columnCount++, rowCount - 1, style, sheet);
            createCell(row, columnCount++, employeeView.getEmpId(), style, sheet);
            createCell(row, columnCount++, employeeView.getEmployeeName(), style, sheet);
            createCell(row, columnCount++, employeeView.getExpediaFgName(), style, sheet);
            createCell(row, columnCount++, employeeView.getVendorName(), style, sheet);
            createCell(row, columnCount++, employeeView.getJobTitle(), style, sheet);
            createCell(row, columnCount++, employeeView.getHm(), style, sheet);
            createCell(row, columnCount++, employeeView.getBillRate(), style, sheet);
            createCell(row, columnCount++, employeeView.getCountry(), style, sheet);
            createCell(row, columnCount++, employeeView.getCity(), style, sheet);
            createCell(row, columnCount++, employeeView.getSow(), style, sheet);
            createCell(row, columnCount++, employeeView.getOrg(), style, sheet);
            createCell(row, columnCount++, employeeView.getTeam(), style, sheet);
            createCell(row, columnCount++, employeeView.getBillability(), style, sheet);
            createCell(row, columnCount++, employeeView.getRemarks(), style, sheet);

        }
    }

    @Override
    public BasicResponseView importEmployees(MultipartFile file) throws CSVExceptionWrapper, Exception{
        if (file.getSize() > (10 * 1024 * 1024)) {
            throw new CustomException("file size exceeded more than 10MB");
        }
        
         String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!extension.equalsIgnoreCase("xlsx")){
            throw new CustomException("File type not supported. Supported type is xlsx");
        }
        
        boolean isUploadCompleted = false;
        XSSFWorkbook workbook;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
            XSSFSheet worksheet = workbook.getSheetAt(0);
            List<String> employeeIdList = new ArrayList<>();
            List<EmployeeForm> employeeFormList = new ArrayList<>();
            Map<String, EmployeeForm> employeeFormMap = new HashMap<>();
            for (int index = 0; index < worksheet.getPhysicalNumberOfRows(); index++) {
                if(index > 0){
                    XSSFRow row = worksheet.getRow(index);
                    EmployeeForm employeeForm = new EmployeeForm(row);
                    employeeFormList.add(employeeForm);
                    employeeFormMap.put(employeeForm.getEmpId(), employeeForm);
                    employeeIdList.add(row.getCell(0).toString());
                }
            }
            if (!employeeFormList.isEmpty()) {
                formValidation(employeeFormList);
                Map<String, Employee> existingEmployeeMap = new HashMap<>();
                findExistingEmployees(employeeIdList, existingEmployeeMap);
                saveOrUpdateEmployees(employeeIdList, employeeFormMap, existingEmployeeMap);
            }
            isUploadCompleted = true;
            
        } 
        catch(CSVExceptionWrapper csvException){
            throw csvException;
        }
        catch (Exception ex) {
            throw ex;
        }
        return new BasicResponseView(isUploadCompleted);
    }
    
    private void formValidation(List<EmployeeForm> employeeFormList) {
        try {
            ValidationUtil.validate(employeeFormList);
        } catch (CsvImportException e) {
            throw new CSVExceptionWrapper(
                    e.getLineNo() != null ? e.getLineNo() + 2 : null,
                    e.getMessage()
            );
        }

    }
    
    private void findExistingEmployees(List<String> employeeIdList,Map<String, Employee> existingEmployeeMap) throws Exception{
        try{
            int size = employeeIdList.size();
            int counter = 1;
            List<String> tempEmployeeIdList = new ArrayList<>();
            List<Employee> employeeList = new ArrayList<>();
            for (String employeeId : employeeIdList) {
                tempEmployeeIdList.add(employeeId);
                if (counter % 1000 == 0 || counter == size) {
                    List<Employee> temployeeList = employeeRepository.findByEmpIdIn(tempEmployeeIdList);
                    if(temployeeList != null && !temployeeList.isEmpty()){
                        employeeList.addAll(temployeeList);
                        tempEmployeeIdList.clear();
                    }
                }
                counter++;
            }
            if(!employeeList.isEmpty()){
                existingEmployeeMap = employeeList.stream().collect(Collectors.toMap(x -> x.getEmpId(), x -> x));
            }
        }catch(Exception ex){
            throw new Exception();
        }
            
    }
    
    private void saveOrUpdateEmployees(List<String> employeeIdList, Map<String, EmployeeForm> employeeFormMap, Map<String, Employee> existingEmployeeMap) throws Exception {
        try {
            List<Employee> saveUpdateEmployeeList = new ArrayList<>();
            for (String employeeId : employeeIdList) {
                EmployeeForm empForm = employeeFormMap.get(employeeId);
                Employee emp = null;
                if (existingEmployeeMap.get(employeeId) != null) {
                    emp = existingEmployeeMap.get(employeeId);
                } else {
                    emp = new Employee();
                    emp.setEmpId(empForm.getEmpId());
                }
                emp.setEmployeeName(empForm.getEmployeeName());
                emp.setExpediaFgName(empForm.getExpediaFgName());
                emp.setVendorName(empForm.getVendorName());
                emp.setJobTitle(empForm.getJobTitle());
                emp.setHm(empForm.getHm());
                emp.setBillRate(empForm.getBillRate());
                emp.setCountry(empForm.getCountry());
                emp.setCity(empForm.getCity());
                emp.setSow(empForm.getSow());
                emp.setOrg(empForm.getOrg());
                emp.setTeam(empForm.getTeam());
                emp.setBillability(empForm.getBillability());
                emp.setRemarks(empForm.getRemarks());
                saveUpdateEmployeeList.add(emp);
            }

            if (!saveUpdateEmployeeList.isEmpty()) {
                int size = saveUpdateEmployeeList.size();
                int counter = 1;
                List<Employee> temp = new ArrayList<>();
                for (Employee employee : saveUpdateEmployeeList) {
                    temp.add(employee);
                    if (counter % 1000 == 0 || counter == size) {
                        employeeRepository.saveAll(temp);
                        temp.clear();
                    }
                    counter++;
                }

            }
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public Page searchEmployee(int page, int limit, String employeeName, String organization, String team, String location, int roleId) {
        Pageable pageable = PageRequest.of(page, limit);
        employeeName = createSearchKey(employeeName);
        organization = createSearchKey(organization);
        team = createSearchKey(team);
        location = createSearchKey(location);
        int searchCriteriaMode = findCriteriaSearchMode(employeeName, organization, team, location);
        if(searchCriteriaMode == -1){
            return Page.empty();
        }
        
        Page<EmployeeView> employeeViewPage = employeeRepository.searchEmployee(searchCriteriaMode, employeeName, organization, team, location, pageable);
        employeeViewPage.stream().forEach(ev -> {
            if(roleId != 1){
                ev.setBillRate(null);
            }
        });
        return employeeViewPage;
    }
    
    //this is done to prevent sql injection attack
    private String createSearchKey(String str) {
        if (null == str) {
            return null;
        }
        return "%" + str.replaceAll("([%_])", "\\\\$1") + "%";
    }
    
    
    private int findCriteriaSearchMode(String employeeName, String organization, String team, String location){
        String n = (employeeName != null && employeeName.trim() != null) ? employeeName : null;
        String o = (organization != null && organization.trim() != null) ? organization : null;
        String t = (team != null && team.trim() != null) ? team : null;
        String l = (location != null && location.trim() != null) ? location : null;
        
        if(n ==null && o==null && t==null && l==null){
            return 0;
        }
        if(n != null && o != null && t != null && l != null){
            return 1;
        }
        if((n!=null && o!=null) &&(t==null && l==null)){
            return 2;
        }
        if((n!=null && t!=null) && (o==null && l==null)){
            return 3;
        }
        if((n!=null && l!=null) && (o==null && t==null)){
            return 4;
        }
        if((o!=null && t!=null) && (n==null && l==null)){
            return 5;
        }
        if((o!=null && l!=null) && (n==null && t==null)){
            return 6;
        }
        if((t!=null && l!=null) && (n==null && o==null)){
            return 7;
        }
        if(n!=null &&(o==null && t==null && l==null)){
            return 8;
        }
        if(o!=null &&(n==null && t==null && l==null)){
            return 9;
        }
        if(t!=null &&(n==null && o==null && l==null)){
            return 10;
        }
        if(l!=null &&(n==null && o==null && t==null)){
            return 11;
        }
       return -1;
    }

	@Override
	public ResponseEntity<Page<Employee>> getEmployeesWithLeaves(String org, String team, int page, int limit) {
		Page<Employee> employees = new PageImpl<>(new ArrayList<>());
		Pageable paging = PageRequest.of(page, limit);
		if (!org.isBlank() && !team.isBlank()) {
			employees = employeeRepository.findByOrgAndTeam(org, team, paging);
		} else if (!org.isBlank()) {
			employees = employeeRepository.findByOrg(org, paging);
		} else if (!team.isBlank()) {
			employees = employeeRepository.findByTeam(team, paging);
		} else
			employees = employeeRepository.findAll(paging);
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<Employee>> updateLeaves(List<Employee> employees) {
		List<Employee> _employees = new ArrayList<>();
		for (Employee employee : employees) {
			Optional<Employee> employeeOptional = employeeRepository.findById(employee.getEmpId());
			if (employeeOptional.isEmpty())
				return ResponseEntity.notFound().build();
			Set<LeaveForecast> leaves = employee.getLeaveForecasts();
			leaves.forEach(leave -> employee.addLeaveForecast(leave));
			_employees.add(employee);
		}
		return new ResponseEntity<>(employeeRepository.saveAll(_employees), HttpStatus.OK);
	}

    @Override
    public List<String> getUniqueTeamsOfEmployee() {
        return employeeRepository.findUniqueTeams();
    }
}
