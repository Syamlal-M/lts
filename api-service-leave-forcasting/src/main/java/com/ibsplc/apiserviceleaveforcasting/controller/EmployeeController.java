/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.controller;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.service.impl.EmployeeServiceImpl;

/**
 * @author Narjeesh
 *
 */
@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeServiceImpl EmployeeServiceImpl; 

	@GetMapping("/findLeaveForecast")
	public HashSet<Employee> findLeaveForecast() {
		return EmployeeServiceImpl.findLeaveForecast();
	}

	@PostMapping("/saveLeaveForecast")
	public void saveLeaveForecast(@RequestBody Employee employee) {
		EmployeeServiceImpl.saveLeaveForecast(employee);
	}
}
