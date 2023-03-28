/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeService;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author jithin123
 */
@RestController
@RequestMapping("api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    
    @PutMapping("import")
    public BasicResponseView importEmployees(@RequestParam MultipartFile file) throws CSVExceptionWrapper, Exception{
        return employeeService.importEmployees(file);
    }

    @GetMapping("export")
    public void exportEmployees(@RequestParam(required = false, defaultValue = "0") int page,
                                             @RequestParam(required = false, defaultValue = "50") int limit,
                                             @RequestParam(required = false) String name,
                                             @RequestParam(required = false) String org,
                                             @RequestParam(required = false) String team,
                                             @RequestParam(required = false) String location,
                                             @RequestParam(value = "role", required = true) int roleId,
                                             HttpServletResponse response) throws Exception {
        response.setContentType("application/octet-stream");
        employeeService.exportEmployees(page, limit, name, org, team, location, roleId, response);
    }
    
    @GetMapping("search")
    public Page searchEmployee(@RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "50") int limit,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String org,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String location,
            @RequestHeader(value = "role", required = true) int roleId){
        return employeeService.searchEmployee(page, limit, name, org, team, location, roleId);
    }

	   @GetMapping("leaves")
    public ResponseEntity<Page<Employee>> getEmployeesWithLeaves(@RequestParam("org") String org,
            @RequestParam("team") String team, @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int limit) {
        return employeeService.getEmployeesWithLeaves(org, team, page, limit);
    }

    @PutMapping("leaves")
    public ResponseEntity<List<Employee>> updateLeaves(@RequestBody List<Employee> employees) {
        return employeeService.updateLeaves(employees);
    }
    
    @GetMapping("teams")
    public List<String> getUniqueTeamsOfEmployee(){
        return employeeService.getUniqueTeamsOfEmployee();
    }
}
