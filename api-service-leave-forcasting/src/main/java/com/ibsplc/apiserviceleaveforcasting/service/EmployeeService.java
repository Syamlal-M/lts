/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;

import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author jithin123
 */
public interface EmployeeService {    
    public void exportEmployees(int page, int limit, String employeeName, String organization, String team, String location, int roleId, HttpServletResponse response) throws Exception;
    public BasicResponseView importEmployees(MultipartFile file) throws CSVExceptionWrapper, Exception;
    public Page searchEmployee(int page, int limit, String employeeName, String organization, String team, String location, int roleId);
    public ResponseEntity<Page<Employee>> getEmployeesWithLeaves(String org, String team, int page, int limit);
    public ResponseEntity<List<Employee>> updateLeaves(List<Employee> employees);
    public List<String> getUniqueTeamsOfEmployee();
}
