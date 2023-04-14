package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeRolePermissionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RolePermissionRepository extends JpaRepository<EmployeeRolePermissionDto, Integer> {

    Optional<EmployeeRolePermissionDto> findByPermissionName(String permissionName);
}
