package com.ibsplc.apiserviceleaveforcasting.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class EmployeeLeaveReportResponse {

    private String employeeId;
    private String employeeName;
    private List<MonthLeaveSummaryResponse> month;
    private double noOfDays;
}
