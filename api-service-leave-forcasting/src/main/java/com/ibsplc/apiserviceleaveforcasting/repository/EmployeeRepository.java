/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeView;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jithin123
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String>{
    
    public List<Employee> findByEmpIdIn(List<String> employeeIdList);
    
    @Query(value = "SELECT new com.ibsplc.apiserviceleaveforcasting.view.EmployeeView(e) FROM "
            + " Employee e WHERE (:searchCriteria = 0) "
            + " OR (:searchCriteria = 1 AND e.employeeName LIKE :name AND e.org LIKE :org AND e.team LIKE :team AND e.city LIKE :location) "
            + " OR(:searchCriteria = 2 AND e.employeeName LIKE :name AND e.org LIKE :org) "
            + " OR(:searchCriteria = 3 AND e.employeeName LIKE :name AND e.team LIKE :team) "
            + " OR(:searchCriteria = 4 AND e.employeeName LIKE :name AND e.city LIKE :location) "
            + " OR(:searchCriteria = 5 AND e.org LIKE :org AND e.team LIKE :team) "
            + " OR(:searchCriteria = 6 AND e.org LIKE :org AND e.city LIKE :location) "
            + " OR(:searchCriteria = 7 AND e.team LIKE :team AND e.city LIKE :location) "
            + " OR(:searchCriteria = 8 AND e.employeeName LIKE :name) "
            + " OR(:searchCriteria = 9 AND e.org LIKE :org) "
            + " OR(:searchCriteria = 10 AND e.team LIKE :team) "
            + " OR(:searchCriteria = 11 AND e.city LIKE :location) "
            + " ORDER BY e.empId",
    countQuery="SELECT COUNT(*) FROM Employee e WHERE (:searchCriteria = 0) "
            + " OR (:searchCriteria = 1 AND e.employeeName LIKE :name AND e.org LIKE :org AND e.team LIKE :team AND e.city LIKE :location) "
            + " OR(:searchCriteria = 2 AND e.employeeName LIKE :name AND e.org LIKE :org) "
            + " OR(:searchCriteria = 3 AND e.employeeName LIKE :name AND e.team LIKE :team) "
            + " OR(:searchCriteria = 4 AND e.employeeName LIKE :name AND e.city LIKE :location) "
            + " OR(:searchCriteria = 5 AND e.org LIKE :org AND e.team LIKE :team) "
            + " OR(:searchCriteria = 6 AND e.org LIKE :org AND e.city LIKE :location) "
            + " OR(:searchCriteria = 7 AND e.team LIKE :team AND e.city LIKE :location) "
            + " OR(:searchCriteria = 8 AND e.employeeName LIKE :name) "
            + " OR(:searchCriteria = 9 AND e.org LIKE :org) "
            + " OR(:searchCriteria = 10 AND e.team LIKE :team) "
            + " OR(:searchCriteria = 11 AND e.city LIKE :location)")
    public Page<EmployeeView> searchEmployee(int searchCriteria, String name, String org, String team, String location, Pageable pageAble);
    
	public Page<Employee> findByOrgAndTeam(String org, String team, Pageable paging);

	public Page<Employee> findByOrg(String org, Pageable paging);

	public Page<Employee> findByTeam(String team, Pageable paging);
        
        @Query("SELECT DISTINCT e.team FROM Employee e")
        public List<String> findUniqueTeams();

    @Query("SELECT e FROM Employee e WHERE e.empId = :id")
    public Optional<Employee> findEmployeeById(String id);
    
}
