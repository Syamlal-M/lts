package com.ibsplc.apiserviceleaveforcasting.config;

import com.ibsplc.apiserviceleaveforcasting.entity.*;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.repository.RolePermissionRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.RolesRepository;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class StartupInit {

    @Autowired
    EmployeeManagementService service;

    @Autowired
    EmployeeInfoRepository employeeRepository;

    @Autowired
    LeaveForecastRepository leaveForecastRepository;

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    RolePermissionRepository rolePermissionRepository;
    @EventListener(ContextRefreshedEvent.class)
    public void contextRefreshedEvent() {

        rolePermissionRepository.save(EmployeeRolePermissionDto.builder().permissionName("LeaveForecast").read(true).write(true).build());
        rolePermissionRepository.save(EmployeeRolePermissionDto.builder().permissionName("EmployeeManagement").read(true).write(true).build());
        rolePermissionRepository.save(EmployeeRolePermissionDto.builder().permissionName("EmployeeSummary").read(true).write(true).build());
        rolePermissionRepository.save(EmployeeRolePermissionDto.builder().permissionName("LeaveForecastReport").read(true).write(true).build());

        Arrays.stream(Roles.values()).forEach(role -> {
            List<EmployeeRolePermissionDto> permission = new ArrayList<>();
            switch (role) {
                case USER: permission.add(rolePermissionRepository.findByPermissionName("LeaveForecast").get());
                    break;
                case ADMIN:
                case SUPER_ADMIN:
                    permission.add(rolePermissionRepository.findByPermissionName("LeaveForecast").get());
                    permission.add(rolePermissionRepository.findByPermissionName("EmployeeManagement").get());
                    permission.add(rolePermissionRepository.findByPermissionName("EmployeeSummary").get());
                    permission.add(rolePermissionRepository.findByPermissionName("LeaveForecastReport").get());
                    break;
                case TEAM_USER: permission.add(rolePermissionRepository.findByPermissionName("LeaveForecast").get());
                    permission.add(rolePermissionRepository.findByPermissionName("LeaveForecastReport").get());
                    break;
            }
            rolesRepository.save(EmployeeRole.builder().roleName(role.name()).permissionsList(permission).build());
        });
        service.createEmployeeAuth(EmployeeRegistrationRequest.builder().employeeId("A-100").emailId("user@gmail.com").password("password").build());
        service.updateRole("A-100","ADMIN");
        EmployeeInfoDto emp = employeeRepository.findByEmployeeId("A-100").get();
        emp.setEmployeeId("A-100");
        emp.setEmployeeName("EmployeeName");
        emp.setNameInClientRecords("ExpediaFgName");
        emp.setVendorName("VendorName");
        emp.setJobTitle(JobTitleDto.builder().jobTitle("JobTitle").build());
        emp.setHm("Hm");
        emp.setBillRate(200.0);
        emp.setCurrency("USD");
        emp.setCountry(CountryDto.builder().country("City").build());
        emp.setCity(EmployeeLocationDto.builder().location("Country").build());
        emp.setSow(SowDto.builder().sow("SOW").build());
        emp.setOrg(OrganisationDto.builder().organisation("Org").build());
        emp.setTeam(TeamDto.builder().teamName("Team").build());
        emp.setBillability("Billability");
        emp.setRemarks("Remarks");
        emp.setCreated(LocalDateTime.now());
        emp.setUpdated(LocalDateTime.now());
        employeeRepository.save(emp);
        Optional<EmployeeInfoDto> employee = employeeRepository.findEmployeeById("A-100");
        EmployeeLeaveForcastDto forecast = new EmployeeLeaveForcastDto();
        forecast.setEmployee(employee.get());
        forecast.setYear(2023);
        forecast.setMonth("APRIL");
        forecast.setFromDate(LocalDate.now());
        forecast.setPlanningType(PlanningType.EXPECTED.toString());
        forecast.setNoOfDays(2);
        forecast.setToDate(LocalDate.now().plusDays(1));
        leaveForecastRepository.save(forecast);
    }
}
