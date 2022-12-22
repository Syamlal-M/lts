package com.ibsplc.apiserviceleaveforcasting.service;

import java.util.HashSet;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;

/**
 * @author Narjeesh
 *
 */
public interface EmployeeService {

	public HashSet<Employee> findLeaveForecast();
	
	public void saveLeaveForecast(Employee employee);

}
