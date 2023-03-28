/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibsplc.apiserviceleaveforcasting.service.impl.LeaveForecastServiceImpl;

/**
 * @author Narjeesh
 *
 */
@RestController
@RequestMapping("leave-forecast")
public class LeaveForecastController {

	@Autowired
	LeaveForecastServiceImpl leaveForecastServiceImpl;

	@GetMapping
	public void findLeaveForecast() {
		return;
	}

	@PostMapping
	public void saveLeaveForecast() {
		leaveForecastServiceImpl.saveLeaveForecast();
	}
}
