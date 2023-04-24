package com.ibsplc.apiserviceleaveforcasting.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmployeeRolePermissionResponse {

    private String permissionName;
    private boolean read;
    private boolean write;
}
