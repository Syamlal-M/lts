package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeDetailsServiceImpl implements UserDetailsService {

    @Autowired
    EmployeeInfoRepository employeeInfoRepository;
    @Override
    public UserDetails loadUserByUsername(String employeeId) throws UsernameNotFoundException {
        Optional<EmployeeInfoDto> employee = employeeInfoRepository.findByEmployeeId(employeeId);
        if (employee.isPresent()) {
            Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).setAttribute("employeeDetails", employee.get(), RequestAttributes.SCOPE_REQUEST);
            return new org.springframework.security.core.userdetails.User(employee.get().getEmployeeId(), employee.get().getPassword(),
                    List.of(new SimpleGrantedAuthority(employee.get().getRole().getRoleName())));
        } else {
            throw new UsernameNotFoundException("User not found with username: " + employeeId);
        }
    }
}
