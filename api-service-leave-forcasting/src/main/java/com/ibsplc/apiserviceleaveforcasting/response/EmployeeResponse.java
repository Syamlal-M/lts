package com.ibsplc.apiserviceleaveforcasting.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
public class EmployeeResponse {
    private Long employeeInfoId;
    private String employeeId;
    private String emailId;
    private String employeeName;
    private String nameInClientRecords;
    private String vendorName;
    private String jobTitle;
    private String hm;
    private Optional<Double> billRate;
    private String currency;
    private String country;
    private String city;
    private String sow;
    private String org;
    private String team;
    private String billability;
    private String remarks;
    private EmployeeRoleResponse role;

}
