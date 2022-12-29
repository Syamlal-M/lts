package com.ibsplc.apiserviceleaveforcasting.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Roles {

    @Id
    private Integer roleId;

    private String roleName;



//    @OneToOne(mappedBy = "role",
//            fetch = FetchType.LAZY, optional = true)
//    private User user;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }


}
