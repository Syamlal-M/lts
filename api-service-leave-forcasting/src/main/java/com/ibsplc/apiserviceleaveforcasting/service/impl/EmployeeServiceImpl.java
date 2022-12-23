/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CsvImportException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.form.EmployeeForm;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeRespository;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeService;
import com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

/**
 *
 * @author jithin123
 */
@Service
public class EmployeeServiceImpl implements EmployeeService{
    
    @Autowired
    private EmployeeRespository employeeRepository;
    
   
    @Override
    public BasicResponseView importEmployees(MultipartFile file) throws CSVExceptionWrapper, Exception{
        if (file.getSize() > (10 * 1024 * 1024)) {
            throw new CustomException("file size exceeded more than 10MB");
        }
        
         String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!extension.equalsIgnoreCase("xlsx") && !extension.equalsIgnoreCase("xls")){
            throw new CustomException("File type not supported. Supported type is either xlsx or xls");
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
}
