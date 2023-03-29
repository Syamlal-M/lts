package com.ibsplc.apiserviceleaveforcasting.config;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StartupInit {

    @Autowired
    UserManagementService service;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    LeaveForecastRepository leaveForecastRepository;

    @EventListener(ContextRefreshedEvent.class)
    public void contextRefreshedEvent() {
        service.registerUser("A-100", "user","password", "user@gmail.com");
        service.assignRole("A-100", "ADMIN");
        Employee emp = new Employee();
        emp.setEmpId("A-100");
        emp.setEmployeeName("EmployeeName");
        emp.setExpediaFgName("ExpediaFgName");
        emp.setVendorName("VendorName");
        emp.setJobTitle("JobTitle");
        emp.setHm("Hm");
        emp.setBillRate("BillRate");
        emp.setCountry("Country");
        emp.setCity("City");
        emp.setSow("Sow");
        emp.setOrg("Org");
        emp.setTeam("Team");
        emp.setBillability("Billability");
        emp.setRemarks("Remarks");
        employeeRepository.save(emp);
        Optional<Employee> employee = employeeRepository.findEmployeeById("A-100");
        LeaveForecast forecast = new LeaveForecast();
        forecast.setEmployee(employee.get());
        forecast.setLeaveDateList("2023-04-02,2023-04-02");
        forecast.setMonthYear("APR_2023");
        leaveForecastRepository.save(forecast);
    }
}
