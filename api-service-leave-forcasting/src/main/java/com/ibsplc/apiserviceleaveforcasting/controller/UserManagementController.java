package com.ibsplc.apiserviceleaveforcasting.controller;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.service.UserManagementService;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeSummaryView;
import com.ibsplc.apiserviceleaveforcasting.view.LoginResponseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserManagementController {

    @Autowired
    UserManagementService userManagementService;

    @PostMapping("register-user")
    public Boolean registerUser(@RequestParam(required = true) String userid,
                                @RequestParam(required = true) String username,
                                @RequestParam(required = true) String password,
                                @RequestParam(required = true) String emailId) throws CustomException, Exception {
        try {
            return userManagementService.registerUser(userid, username, password, emailId);
        } catch (CustomException e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception Occurred in registerUser:: " + e.getMessage());
        }
    }


    @PutMapping("assign-role")
    public Boolean assignRole(@RequestParam(required = true) String userId, @RequestParam(required = true) String roleName) throws Exception {
        try {
            return userManagementService.assignRole(userId, roleName);
        } catch (CustomException e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception Occurred in assignRole :: " + e.getMessage());
        }

    }

    @GetMapping("login")
    public LoginResponseView login(@RequestParam(required = true) String userid, @RequestParam(required = true) String password) throws Exception {
        try {
            return userManagementService.login(userid, password);
        } catch (CustomException e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception Occurred in login :: " + e.getMessage());
        }
    }

    @GetMapping("fetch-all-users-with-roles")
    public List<LoginResponseView> fetchAllUsers() throws Exception {
        try {
            return userManagementService.fetchAllUsers();
        } catch (CustomException e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception Occurred in fetchAllUsers:: " + e.getMessage());
        }
    }

}
