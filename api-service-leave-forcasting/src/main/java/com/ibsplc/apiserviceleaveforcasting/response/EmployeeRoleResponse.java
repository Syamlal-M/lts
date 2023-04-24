package com.ibsplc.apiserviceleaveforcasting.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Builder
@Getter
@Setter
public class EmployeeRoleResponse {

    private String roleName;
    private List<EmployeeRolePermissionResponse> permissionsList;
}
