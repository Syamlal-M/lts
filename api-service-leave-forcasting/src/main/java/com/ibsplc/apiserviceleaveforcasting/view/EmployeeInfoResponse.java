package com.ibsplc.apiserviceleaveforcasting.view;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
public class EmployeeInfoResponse {

    private String userId;
    private String username;
    private String token;
    private Map<Integer, String> role;

    private List<String> access;
}
