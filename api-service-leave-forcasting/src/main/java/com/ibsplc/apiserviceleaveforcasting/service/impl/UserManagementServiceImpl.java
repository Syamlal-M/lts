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
        Optional<EmployeeRole> role = rolesRepository.findByRoleName("ADMIN");
        user.setRoles(Arrays.asList(role.get()));
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
        if(currentRole.isPresent() &&
                employeeInfoDto.getRoles().stream().noneMatch(r -> r.getRoleName().equalsIgnoreCase(currentRole.get().getRoleName()))) {
            employeeInfoDto.getRoles().add(currentRole.get());
            employeeInfoDto.setRoles(employeeInfoDto.getRoles().stream().distinct().collect(Collectors.toList()));
            employeeInfoRepository.save(employeeInfoDto);
        }
    }

    /**
     * Login service
     * @return
     */
    @Override
    public EmployeeInfoResponse login(UserLoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        EmployeeInfoResponse.EmployeeInfoResponseBuilder builder = EmployeeInfoResponse.builder();
        Optional<EmployeeInfoDto> user = employeeInfoRepository.findByEmployeeId(request.getUsername());
        if (user.isPresent()) {
            builder.userId(user.get().getEmployeeId());
            builder.username(user.get().getEmployeeId());
            HashMap<Integer, String> role = new HashMap<>();
            List<GrantedAuthority> authorities = new ArrayList<>();
            for(EmployeeRole userRole: user.get().getRoles()) {
                role.put(userRole.getRoleId(), userRole.getRoleName());
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.getRoleName());
                authorities.add(authority);
            }
            builder.role(role);
            final UserDetails userDetails = new org.springframework.security.core.userdetails.User(request.getUsername(),
                    passwordEncoder.encode(request.getPassword()), authorities);
            final String token = jwtTokenUtil.generateToken(userDetails);
            builder.token(token);
            builder.access(user.get().getRoles().stream()
                    .flatMap(r -> r.getPermissionsList().stream().map(EmployeeRolePermissionDto::getPermissionName))
                    .distinct()
                    .collect(Collectors.toList()));
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
            builder.username(employeeInfo.getEmployeeId());
            builder.role(employeeInfo.getRoles().stream().collect(Collectors.toMap(EmployeeRole::getRoleId, EmployeeRole::getRoleName)));
            return builder.build();
        }).collect(Collectors.toList());
    }
}
