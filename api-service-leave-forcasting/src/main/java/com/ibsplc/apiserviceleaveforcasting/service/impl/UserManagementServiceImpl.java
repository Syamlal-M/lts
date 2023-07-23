package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.BadRequestException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.UnAuthorisedException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeRole;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.mapper.EmployeeMapper;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.RolesRepository;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeResponse;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeManagementService;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.*;
import java.util.stream.Collectors;


/**
 * User Management service
 */
@Service
public class UserManagementServiceImpl implements EmployeeManagementService {


    @Autowired
    EmployeeInfoRepository employeeInfoRepository;

    @Autowired
    RolesRepository rolesRepository;

    /**
     * User registration
     */
    @Override
    public void createEmployeeAuth(EmployeeRegistrationRequest request) {
        EmployeeInfoDto user = new EmployeeInfoDto();
        user.setEmployeeId(request.getEmployeeId());
        user.setEmailId(request.getEmailId());
        EmployeeRole role = null;
        if(request.getRole() != null && !request.getRole().isEmpty()) {
            role = rolesRepository.findByRoleName(request.getRole()).get();
        } else {
            role = rolesRepository.findByRoleName("USER").get();
        }
        user.setRole(role);
        employeeInfoRepository.save(user);
    }

    /**
     * Assign role
     */
    @Override
    public void updateRole(String employeeId, String role) {
        if(Roles.getRole(role).isEmpty()) {
            throw new BadRequestException("No Valid Roles found");
        };
        Optional<EmployeeInfoDto> employee = employeeInfoRepository.findEmployeeById(employeeId);
        if (employee.isEmpty()) {
            throw new BadRequestException("Employee details not found for given Employee id");
        }
        EmployeeInfoDto employeeInfoDto = employee.get();
        Optional<EmployeeRole> currentRole = rolesRepository.findByRoleName(role);
        employeeInfoDto.setRole(currentRole.get());
        employeeInfoRepository.save(employeeInfoDto);
    }

    /**
     * Login service
     * @return
     */
    @Override
    public EmployeeResponse getEmployee() {
        EmployeeInfoDto employee = (EmployeeInfoDto) Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getAttribute("employeeDetails", RequestAttributes.SCOPE_REQUEST);
        if (employee != null) {
            return EmployeeMapper.map(employee, Roles.getRole(employee.getRole().getRoleName()).get());
        } else {
            throw new UnAuthorisedException("User not found");
        }

    }

    /**
     * Fetches all users
     */
    @Override
    public List<EmployeeInfoResponse> fetchAllUsers() {
        List<EmployeeInfoDto> allUserList = employeeInfoRepository.findAll();
        return allUserList.stream().map(employeeInfo -> {
            EmployeeInfoResponse.EmployeeInfoResponseBuilder builder = EmployeeInfoResponse.builder();
            builder.employeeName(employeeInfo.getEmployeeId());
            builder.role(Map.of(employeeInfo.getRole().getRoleId(), employeeInfo.getRole().getRoleName()));
            return builder.build();
        }).collect(Collectors.toList());
    }
}
