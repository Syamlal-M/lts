package com.ibsplc.apiserviceleaveforcasting.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "EmployeeRolePermission")
public class EmployeeRolePermissionDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer EmployeeRolePermissionId;

    private String permissionName;
    private boolean read;
    private boolean write;
}
