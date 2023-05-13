package com.ibsplc.apiserviceleaveforcasting.mapper;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeResponse;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeRolePermissionResponse;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeRoleResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class EmployeeMapper {

    public static List<EmployeeResponse> mapEmployeeResponse(Page<EmployeeInfoDto> employeeInfoDtos, Roles role) {
        return employeeInfoDtos.stream().map(e -> EmployeeMapper.map(e, role)).collect(Collectors.toList());
    }

    public static EmployeeResponse map(EmployeeInfoDto employeeInfoDto, Roles role) {
        return EmployeeResponse.builder().employeeInfoId(employeeInfoDto.getEmployeeInfoId())
                .employeeName(employeeInfoDto.getEmployeeName())
                .employeeId(employeeInfoDto.getEmployeeId())
                .hm(employeeInfoDto.getHm())
                .org(employeeInfoDto.getOrg() != null ? employeeInfoDto.getOrg().getOrganisation() : null)
                .jobTitle(employeeInfoDto.getJobTitle() != null ? employeeInfoDto.getJobTitle().getJobTitle(): null)
                .nameInClientRecords(employeeInfoDto.getNameInClientRecords())
                .remarks(employeeInfoDto.getRemarks())
                .billability(employeeInfoDto.getBillability())
                .emailId(employeeInfoDto.getEmailId())
                .vendorName(employeeInfoDto.getVendorName())
                .billRate((role == Roles.ADMIN || role == Roles.SUPER_ADMIN) ? Optional.of(employeeInfoDto.getBillRate()) : Optional.empty())
                .city(employeeInfoDto.getCity().getLocation())
                .country(employeeInfoDto.getCountry().getCountry())
                .sow(((role == Roles.ADMIN || role == Roles.SUPER_ADMIN) && employeeInfoDto.getSow() != null) ? employeeInfoDto.getSow().getSow() : "")
                .jobTitle(employeeInfoDto.getJobTitle().getJobTitle())
                .role(EmployeeRoleResponse.builder().roleName(employeeInfoDto.getRole().getRoleName())
                        .permissionsList(employeeInfoDto.getRole().getPermissionsList().stream().map(pl -> EmployeeRolePermissionResponse.builder()
                                .permissionName(pl.getPermissionName()).read(pl.isRead()).write(pl.isWrite()).build()).collect(Collectors.toList())).build()).build();
    }
}
