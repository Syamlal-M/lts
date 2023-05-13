package com.ibsplc.apiserviceleaveforcasting.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
public class EmployeeInfoResponse {

    private String empId;
    private String employeeName;
    private String token;
    private Map<Integer, String> role;

    private List<String> access;
}
