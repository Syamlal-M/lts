/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

import com.ibsplc.apiserviceleaveforcasting.entity.*;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.repository.*;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CsvImportException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeService;
import com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import static com.ibsplc.apiserviceleaveforcasting.repository.CustomerSpecifications.*;
import static java.time.temporal.ChronoUnit.DAYS;

/**
 *
 * @author jithin123
 */
@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeInfoRepository employeeRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private LeaveForecastRepository leaveForecastRepository;


    @Override
    public void exportEmployees(int page, int limit, String employeeName, String organization, String team, String location, HttpServletResponse response) throws Exception {
        Page<EmployeeInfoDto> employeeViewPage = searchEmployee(0, Integer.MAX_VALUE, employeeName, organization, team, location);
        List<EmployeeInfoDto> employeeViews = employeeViewPage.get().collect(Collectors.toList());
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

    private void writeDataLines(XSSFWorkbook workbook, XSSFSheet sheet, List<EmployeeInfoDto> employeeViews) {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (EmployeeInfoDto employeeView : employeeViews) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
            createCell(row, columnCount++, rowCount - 1, style, sheet);
            createCell(row, columnCount++, employeeView.getEmployeeId(), style, sheet);
            createCell(row, columnCount++, employeeView.getEmployeeName(), style, sheet);
            createCell(row, columnCount++, employeeView.getNameInClientRecords(), style, sheet);
            createCell(row, columnCount++, employeeView.getVendorName(), style, sheet);
            createCell(row, columnCount++, employeeView.getJobTitle().getJobTitle(), style, sheet);
            createCell(row, columnCount++, employeeView.getHm(), style, sheet);
            createCell(row, columnCount++, employeeView.getBillRate().toString(), style, sheet);
            createCell(row, columnCount++, employeeView.getCountry().getCountry(), style, sheet);
            createCell(row, columnCount++, employeeView.getCity().getLocation(), style, sheet);
            createCell(row, columnCount++, employeeView.getSow().getSow(), style, sheet);
            createCell(row, columnCount++, employeeView.getOrg().getOrganisation(), style, sheet);
            createCell(row, columnCount++, employeeView.getTeam().getTeamName(), style, sheet);
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
            List<EmployeeRegistrationRequest> employeeFormList = new ArrayList<>();
            Map<String, EmployeeRegistrationRequest> employeeFormMap = new HashMap<>();
            for (int index = 0; index < worksheet.getPhysicalNumberOfRows(); index++) {
                if(index > 0){
                    XSSFRow row = worksheet.getRow(index);
                    EmployeeRegistrationRequest employeeForm = new EmployeeRegistrationRequest(row);
                    employeeFormList.add(employeeForm);
                    employeeFormMap.put(employeeForm.getEmployeeId(), employeeForm);
                    employeeIdList.add(row.getCell(0).toString());
                }
            }
            if (!employeeFormList.isEmpty()) {
                formValidation(employeeFormList);
                Map<String, EmployeeInfoDto> existingEmployeeMap = new HashMap<>();
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
    
    private void formValidation(List<EmployeeRegistrationRequest> employeeFormList) {
        try {
            ValidationUtil.validate(employeeFormList);
        } catch (CsvImportException e) {
            throw new CSVExceptionWrapper(
                    e.getLineNo() != null ? e.getLineNo() + 2 : null,
                    e.getMessage()
            );
        }

    }
    
    private void findExistingEmployees(List<String> employeeIdList,Map<String, EmployeeInfoDto> existingEmployeeMap) throws Exception{
        try{
            int size = employeeIdList.size();
            int counter = 1;
            List<String> tempEmployeeIdList = new ArrayList<>();
            List<EmployeeInfoDto> employeeList = new ArrayList<>();
            for (String employeeId : employeeIdList) {
                tempEmployeeIdList.add(employeeId);
                if (counter % 1000 == 0 || counter == size) {
                    List<EmployeeInfoDto> temployeeList = employeeRepository.findByEmployeeIdIn(tempEmployeeIdList);
                    if(temployeeList != null && !temployeeList.isEmpty()){
                        employeeList.addAll(temployeeList);
                        tempEmployeeIdList.clear();
                    }
                }
                counter++;
            }
            if(!employeeList.isEmpty()){
                existingEmployeeMap = employeeList.stream().collect(Collectors.toMap(x -> x.getEmployeeId(), x -> x));
            }
        }catch(Exception ex){
            throw new Exception();
        }
            
    }

    @Override
    public void createEmployee(EmployeeRegistrationRequest request) throws Exception {
           Optional<EmployeeInfoDto> employeeInfo = employeeRepository.findEmployeeById(request.getEmployeeId());
           Map<String, EmployeeRegistrationRequest> employeeRequestMap = new HashMap<>();
        employeeRequestMap.put(request.getEmployeeId(), request);
           if(employeeInfo.isPresent()) {
               Map<String, EmployeeInfoDto> existingEmployeeRequestMap = new HashMap<>();
               existingEmployeeRequestMap.put(employeeInfo.get().getEmployeeId(), employeeInfo.get());
               saveOrUpdateEmployees(Collections.singletonList(request.getEmployeeId()), employeeRequestMap, existingEmployeeRequestMap);
           } else {
               saveOrUpdateEmployees(Collections.singletonList(request.getEmployeeId()), employeeRequestMap, Collections.EMPTY_MAP);
           }
    }
    
    private void saveOrUpdateEmployees(List<String> employeeIdList, Map<String, EmployeeRegistrationRequest> employeeFormMap, Map<String, EmployeeInfoDto> existingEmployeeMap) throws Exception {
        try {
            List<EmployeeInfoDto> saveUpdateEmployeeList = new ArrayList<>();
            for (String employeeId : employeeIdList) {
                EmployeeRegistrationRequest empForm = employeeFormMap.get(employeeId);
                EmployeeInfoDto emp = null;
                if (existingEmployeeMap.get(employeeId) != null) {
                    emp = existingEmployeeMap.get(employeeId);
                } else {
                    emp = new EmployeeInfoDto();
                    emp.setEmployeeId(empForm.getEmployeeId());
                }
                emp.setEmployeeName(empForm.getEmployeeName());
                emp.setNameInClientRecords(empForm.getExpediaFgName());
                emp.setVendorName(empForm.getVendorName());
                emp.setJobTitle(JobTitleDto.builder().jobTitle(empForm.getJobTitle()).build());
                emp.setHm(empForm.getHm());
                emp.setBillRate(empForm.getBillRate());
                emp.setCountry(CountryDto.builder().country(empForm.getCountry()).build());
                emp.setCity(EmployeeLocationDto.builder().location(empForm.getCity()).build());
                emp.setSow(SowDto.builder().sow(empForm.getSow()).build());
                emp.setOrg(OrganisationDto.builder().organisation(empForm.getOrg()).build());
                emp.setTeam(TeamDto.builder().teamName(empForm.getTeam()).build());
                emp.setBillability(empForm.getBillability());
                emp.setRemarks(empForm.getRemarks());
                saveUpdateEmployeeList.add(emp);
            }

            if (!saveUpdateEmployeeList.isEmpty()) {
                int size = saveUpdateEmployeeList.size();
                int counter = 1;
                List<EmployeeInfoDto> temp = new ArrayList<>();
                for (EmployeeInfoDto employee : saveUpdateEmployeeList) {
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
    public Page searchEmployee(int page, int limit, String employeeName, String organization, String team, String city) {
        Pageable pageable = PageRequest.of(page, limit);
        Optional<Roles> role = getPriorityRole();
        EmployeeInfoDto emp = (EmployeeInfoDto) Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getAttribute("employeeDetails", RequestAttributes.SCOPE_REQUEST);
        if(role.isPresent()) {
            switch (role.get()) {
                case USER:  return employeeRepository.findAll(hasEmployeesByEmployeeName(emp.getEmployeeName()), pageable);
                case TEAM_USER: return employeeRepository.findAll(hasEmployeesByEmployeeName(employeeName)
                        .and(hasEmployeesByTeam(emp.getTeam().getTeamName())), pageable);
                case ADMIN:
                case SUPER_ADMIN: return employeeRepository.findAll(hasEmployeesByEmployeeName(employeeName).or(hasEmployeesByTeam(team)).or(hasEmployeesByOrganisation(organization)), pageable);
            }
        }
        // map the dto to response Model
        return null;
    }

    private Optional<Roles> getPriorityRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Roles.getPriority(authorities);
    }

    @Override
    public List<String> getTeams() {
        return teamRepository.findAll().stream().map(TeamDto::getTeamName).distinct().collect(Collectors.toList());
    }

    @Override
    public List<String> getRoles() {
        return rolesRepository.findAll().stream().map(EmployeeRole::getRoleName).distinct().collect(Collectors.toList());
    }

    @Override
    public List<String> getOrganisation() {
        return organisationRepository.findAll().stream().map(OrganisationDto::getOrganisation).distinct().collect(Collectors.toList());
    }
}
