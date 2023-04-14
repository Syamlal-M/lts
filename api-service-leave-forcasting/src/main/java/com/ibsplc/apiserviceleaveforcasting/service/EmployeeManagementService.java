package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.request.UserLoginRequest;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeInfoResponse;

import java.util.List;

public interface EmployeeManagementService {

    public void createEmployeeAuth(EmployeeRegistrationRequest request);

    public void updateRole(String employeeId, String role);

    public EmployeeInfoResponse login(UserLoginRequest request);

    public List<EmployeeInfoResponse> fetchAllUsers();

}
