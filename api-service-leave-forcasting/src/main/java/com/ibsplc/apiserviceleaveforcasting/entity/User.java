package com.ibsplc.apiserviceleaveforcasting.entity;

import javax.persistence.*;

@Entity
public class User {

    @Id
    private String userId;

    private String username;

    private String password;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "roleId")
//    private Roles role;
    private Integer roleId;

    private String emailId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


//    public Roles getRole() {
//        return role;
//    }
//
//    public void setRole(Roles role) {
//        this.role = role;
//    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
