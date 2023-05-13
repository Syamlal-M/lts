package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeRole;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeRolePermissionDto;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.RolesRepository;
import com.ibsplc.apiserviceleaveforcasting.request.UserLoginRequest;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeManagementService;
import com.ibsplc.apiserviceleaveforcasting.util.JwtTokenUtil;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * User registration
     */
    @Override
    public void createEmployeeAuth(EmployeeRegistrationRequest request) {
        EmployeeInfoDto user = new EmployeeInfoDto();
        user.setEmployeeId(request.getEmployeeId());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
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
            throw new CustomException("No Valid Roles found");
        };
        Optional<EmployeeInfoDto> employee = employeeInfoRepository.findEmployeeById(employeeId);
        if (employee.isEmpty()) {
            throw new CustomException("Employee details not found for given Employee id");
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
    public EmployeeInfoResponse login(UserLoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmployeeId(), request.getPassword()));
        EmployeeInfoResponse.EmployeeInfoResponseBuilder builder = EmployeeInfoResponse.builder();
        Optional<EmployeeInfoDto> user = employeeInfoRepository.findByEmployeeId(request.getEmployeeId());
        if (user.isPresent()) {
            builder.empId(user.get().getEmployeeId());
            builder.employeeName(user.get().getEmployeeName());
            HashMap<Integer, String> role = new HashMap<>();
            List<GrantedAuthority> authorities = new ArrayList<>();
            EmployeeRole employeeRole = user.get().getRole();
                role.put(employeeRole.getRoleId(), employeeRole.getRoleName());
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(employeeRole.getRoleName());
                authorities.add(authority);
            builder.role(role);
            final UserDetails userDetails = new org.springframework.security.core.userdetails.User(request.getEmployeeId(),
                    passwordEncoder.encode(request.getPassword()), authorities);
            final String token = jwtTokenUtil.generateToken(userDetails);
            builder.token(token);
            builder.access(user.get().getRole().getPermissionsList().stream().map(EmployeeRolePermissionDto::getPermissionName).collect(Collectors.toList()));
        } else {
            throw new CustomException("Authentication failure");
        }

        return builder.build();


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
