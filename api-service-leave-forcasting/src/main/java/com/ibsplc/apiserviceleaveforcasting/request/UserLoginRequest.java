package com.ibsplc.apiserviceleaveforcasting.request;

import java.io.Serializable;

public class UserLoginRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String employeeId;
    private String password;

    public UserLoginRequest()
    {

    }

    public UserLoginRequest(String employeeId, String password) {
        this.setEmployeeId(employeeId);
        this.setPassword(password);
    }

    public String getEmployeeId() {
        return this.employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
