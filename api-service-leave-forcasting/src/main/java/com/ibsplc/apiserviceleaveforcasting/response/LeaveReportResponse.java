package com.ibsplc.apiserviceleaveforcasting.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class LeaveReportResponse {
    private List<EmployeeLeaveReportResponse> employeeLeaveReportSummary;
}
