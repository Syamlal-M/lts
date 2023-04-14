package com.ibsplc.apiserviceleaveforcasting.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class EmployeeRole {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "EmployeeRoleId")
    private Integer roleId;
    @Column(name = "RoleName")
    private String roleName;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<EmployeeRolePermissionDto> permissionsList;
}
