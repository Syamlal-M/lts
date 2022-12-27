/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeView;
import java.util.List;
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
            + " Employee e ORDER BY e.empId",
    countQuery="SELECT COUNT(*) FROM Employee")
    public Page<EmployeeView> searchEmployee(Pageable pageAble);
    
	public Page<Employee> findByOrgAndTeam(String org, String team, Pageable paging);

	public Page<Employee> findByOrg(String org, Pageable paging);

	public Page<Employee> findByTeam(String team, Pageable paging);
    
}
