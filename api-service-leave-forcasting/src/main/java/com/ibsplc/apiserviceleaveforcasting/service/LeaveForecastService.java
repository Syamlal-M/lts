package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author Narjeesh
 *
 */
public interface LeaveForecastService {

	public ResponseEntity updateLeaves(List<LeaveForcastRequest> employees, String employeeId);


}
