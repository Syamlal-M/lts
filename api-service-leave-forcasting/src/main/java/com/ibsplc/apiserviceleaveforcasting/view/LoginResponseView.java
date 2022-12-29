package com.ibsplc.apiserviceleaveforcasting.view;

import java.util.HashMap;

public class LoginResponseView {

    private String userId;

    private String username;

    private HashMap<Integer, String> role;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public HashMap<Integer, String> getRole() {
        return role;
    }

    public void setRole(HashMap<Integer, String> role) {
        this.role = role;
    }
}
