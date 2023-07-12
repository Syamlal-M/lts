package com.ibsplc.apiserviceleaveforcasting.config;

import com.ibsplc.apiserviceleaveforcasting.entity.*;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.enums.Status;
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

        createEmployee("A-100", "SUPER_ADMIN", "A-9369@ibsplc.com");
        createEmployee("A-101", "ADMIN", "A-101@gmail.com");
        createEmployee("A-102", "TEAM_USER", "A-102@gmail.com");
        createEmployee("A-103", "USER", "A-103@gmail.com");
    }

    private void createEmployee(String employeeId, String role, String email) {
        service.createEmployeeAuth(EmployeeRegistrationRequest.builder()
                .employeeId(employeeId)
                .emailId(email)
                .role(role).build());
        EmployeeInfoDto emp = employeeRepository.findByEmployeeId(employeeId).get();
        emp.setEmployeeId(employeeId);
        emp.setEmployeeName(String.format("%s-EmployeeName", employeeId));
        emp.setNameInClientRecords(String.format("%s-ExpediaFgName", employeeId));
        emp.setVendorName(String.format("%s-VendorName", employeeId));
        emp.setJobTitle(JobTitleDto.builder().jobTitle(String.format("%s-JobTitle", employeeId)).build());
        emp.setHm(String.format("%s-Hm", employeeId));
        emp.setBillRate(200.0);
        emp.setCurrency("USD");
        emp.setCountry(CountryDto.builder().country("City").build());
        emp.setCity(EmployeeLocationDto.builder().location("Country").build());
        emp.setSow(SowDto.builder().sow("SOW").build());
        emp.setOrg(OrganisationDto.builder().organisation(String.format("%s-Org", employeeId)).build());
        emp.setTeam(TeamDto.builder().teamName(String.format("%s-Team", employeeId)).build());
        emp.setBillability("Billability");
        emp.setRemarks("Remarks");
        emp.setCreated(LocalDateTime.now());
        emp.setUpdated(LocalDateTime.now());
        employeeRepository.save(emp);
        Optional<EmployeeInfoDto> employee = employeeRepository.findEmployeeById(employeeId);
        EmployeeLeaveForcastDto forecast = new EmployeeLeaveForcastDto();
        forecast.setEmployee(employee.get());
        forecast.setYear(2023);
        forecast.setMonth(LocalDate.now().getMonth().toString());
        forecast.setFromDate(LocalDate.now());
        forecast.setPlanningType(PlanningType.EXPECTED_WITH_LEAVES.toString());
        forecast.setNoOfDays(2);
        forecast.setModifiedBy(employeeId);
        forecast.setUpdatedDate(LocalDateTime.now());
        forecast.setCreatedDate(LocalDateTime.now());
        forecast.setStatus(Status.ACTIVE.toString());
        forecast.setToDate(LocalDate.now().plusDays(1));
        leaveForecastRepository.save(forecast);

    }
}
