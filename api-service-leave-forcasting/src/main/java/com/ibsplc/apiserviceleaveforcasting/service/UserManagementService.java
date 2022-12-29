package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.entity.User;
import com.ibsplc.apiserviceleaveforcasting.view.LoginResponseView;

import java.util.Optional;

public interface UserManagementService {

    public Boolean registerUser(String employeeID, String username, String password, String emailId);

    public Boolean assignRole(String userId, String role);

    public LoginResponseView login(String userId, String password);
}
