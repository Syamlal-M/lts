package com.ibsplc.apiserviceleaveforcasting.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class EmployeeRevenueReportResponse {

    private String employeeId;
    private String employeeName;
    private List<WeekRevenueSummaryResponse> weeks;
    private int expectedNoOfDays;
    private int actualNoOfDays;
    private Double expectedRevenue;
    private Double actualRevenue;
    private Double revenueDifference;
}
