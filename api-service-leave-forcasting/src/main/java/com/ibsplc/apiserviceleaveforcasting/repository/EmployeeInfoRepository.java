/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jithin123
 */
@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfoDto, Long>, JpaSpecificationExecutor {

    public List<EmployeeInfoDto> findByEmployeeIdIn(List<String> employeeIdList);

    public Page findByEmployeeNameLike(String employeeName, Pageable pageable);

    @Query("SELECT e FROM EmployeeInfoDto e WHERE e.employeeId = :id")
    public Optional<EmployeeInfoDto> findEmployeeById(String id);

    public  Optional<EmployeeInfoDto> findByEmployeeId(String empId);
    
}
