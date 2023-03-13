package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.Roles;
import com.ibsplc.apiserviceleaveforcasting.entity.User;
import com.ibsplc.apiserviceleaveforcasting.repository.RolesRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.UserRepository;
import com.ibsplc.apiserviceleaveforcasting.service.UserManagementService;
import com.ibsplc.apiserviceleaveforcasting.util.GenerateEncryptionPassword;
import com.ibsplc.apiserviceleaveforcasting.view.LoginResponseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


/**
 * User Management service
 */
@Service
public class UserManagementServiceImpl implements UserManagementService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    RolesRepository rolesRepository;

    /**
     * User registration
     */
    @Override
    public Boolean registerUser(String employeeID, String username, String password, String emailId) {
        User user = new User();
        //Roles role = new Roles();

        Optional<User> existingUser = userRepository.findById(employeeID);
        if (existingUser.isPresent()) {
            throw new CustomException("User with given employee id already exists");
        }
        Optional<User> existingUserName = userRepository.findByUsername(username.trim().toLowerCase());
        if (existingUserName.isPresent()) {
            throw new CustomException("Username is taken, please provide unique username");
        }
        Optional<User> existingMailID = userRepository.findByEmailId(emailId.trim().toLowerCase());
        if (existingMailID.isPresent()) {
            throw new CustomException("Provided e-mail id is associated with another user account, please provide alternate e-mail id");
        }
        user.setUserId(employeeID);
        GenerateEncryptionPassword generateEncryptionPassword = new GenerateEncryptionPassword();
        String encryptedPassword = generateEncryptionPassword.generateEncryptedPassword(password);
        user.setPassword(encryptedPassword);
        user.setUsername(username);
        user.setEmailId(emailId);
        user.setRoleId(2);
        User savedUser = userRepository.save(user);
        Boolean status = savedUser.getUserId() != null;
        return status;


    }

    /**
     * Assign role
     * @param userId
     * @param roleName
     */
    @Override
    public Boolean assignRole(String userId, String roleName) {

        User user = new User();
//        Roles role = new Roles();

        Optional<User> userDataFromDB = userRepository.findById(userId.trim());
        if (userDataFromDB.isEmpty()) {
            throw new CustomException("User details not found for given user id");
        }
        Optional<Roles> roleDataFromDB = rolesRepository.findByRoleName(roleName.trim());
        if (roleDataFromDB.isEmpty()) {
            throw new CustomException("Please provide valid role name");
        }
        if (userDataFromDB.get().getRoleId() == roleDataFromDB.get().getRoleId()) {
            throw new CustomException("User has already been assigned the provided role");
        }
//        role.setRoleId(roleDataFromDB.getRoleId());

        user.setRoleId(roleDataFromDB.get().getRoleId());
        user.setUserId(userId);
        user.setEmailId(userDataFromDB.get().getEmailId());
        user.setPassword(userDataFromDB.get().getPassword());
        user.setUsername(userDataFromDB.get().getUsername());

        User updatedUser = userRepository.save(user);
        Boolean status = updatedUser.getUserId() != null ? true : false;
        return status;


    }

    /**
     * Login service
     * @param userId
     * @param password
     * @return
     */
    @Override
    public LoginResponseView login(String userId, String password) {

        Optional<User> checkUserExist = userRepository.findByUserId(userId);
        LoginResponseView loginResponseView = new LoginResponseView();
        if (!checkUserExist.isPresent()) {
            throw new CustomException("User id does not exist in database. Please register first and proceed to login");
        }
        GenerateEncryptionPassword generateEncryptionPassword = new GenerateEncryptionPassword();
        String encryptedPassword =  generateEncryptionPassword.generateEncryptedPassword(password);
        Optional<User> user = userRepository.findByUserIdAndPassword(userId, encryptedPassword);
        if (user.isPresent()) {
            loginResponseView.setUserId(userId);
            loginResponseView.setUsername(user.get().getUsername());
            HashMap<Integer, String> role = new HashMap<>();
            Optional<Roles> roles = rolesRepository.findById(user.get().getRoleId());
            if (!roles.isPresent()) {
                throw new CustomException("Role data not present for the role id :: " + user.get().getRoleId());
            }
            role.put(user.get().getRoleId(), roles.get().getRoleName());
            loginResponseView.setRole(role);
        } else {
            throw new CustomException("Authentication failure");
        }

        return loginResponseView;


    }

    /**
     * Fetches all users
     */
    @Override
    public List<LoginResponseView> fetchAllUsers() {

        List<User> allUserList = userRepository.findAll();
        List<LoginResponseView> usersList = new ArrayList<>();
        if (allUserList != null && allUserList.size() > 0) {
            List<Roles> rolesList = rolesRepository.findAll();
            if(rolesList != null && rolesList.size() > 0) {
                for (User user : allUserList) {
                    LoginResponseView userResponse = new LoginResponseView();
                    userResponse.setUserId(user.getUserId());
                    userResponse.setUsername(user.getUsername());
                    HashMap<Integer, String> roleData = new HashMap<>();
                    Optional<Roles> roleName = rolesList.stream().filter(r -> r.getRoleId() == user.getRoleId()).findFirst();
                    roleData.put(user.getRoleId(), roleName.get().getRoleName());
                    userResponse.setRole(roleData);
                    usersList.add(userResponse);
                }
            }
            else throw new CustomException("No roles found to fetch from database");
        }
        else throw new CustomException("No users found to fetch from database");


        return usersList;
    }
}
