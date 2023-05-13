package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.request.UserLoginRequest;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeInfoResponse;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeResponse;

import java.util.List;

public interface EmployeeManagementService {

    public void createEmployeeAuth(EmployeeRegistrationRequest request);

    public void updateRole(String employeeId, String role);

    public EmployeeResponse login(UserLoginRequest request);

    public List<EmployeeInfoResponse> fetchAllUsers();

}
