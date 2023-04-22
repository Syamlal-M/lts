package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<EmployeeRole, Integer> {

    public Optional<EmployeeRole> findByRoleName(String roleName);
    public List<EmployeeRole> findByRoleNameIn(List<String> roleName);
}
