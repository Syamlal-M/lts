/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibsplc.apiserviceleaveforcasting.service.impl.EmployeeServiceImpl;

/**
 * @author Narjeesh
 *
 */
@RestController
public class EmployeeController {

	@Autowired
	EmployeeServiceImpl employeeServiceImpl;

	@GetMapping("/findLeaveForecast")
	public void findLeaveForecast() {
		return;
	}

	@PostMapping("/saveLeaveForecast")
	public void saveLeaveForecast() {
		employeeServiceImpl.saveLeaveForecast();
	}
}
