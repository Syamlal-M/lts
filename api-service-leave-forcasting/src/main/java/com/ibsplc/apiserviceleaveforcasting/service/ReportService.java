package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeLeaveReportResponse;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeRevenueReportResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


public interface ReportService {


    public List<EmployeeLeaveReportResponse> fetchLeaveSummary(String month, String year, String organization, String team) throws InternalServerException;
    public List<EmployeeRevenueReportResponse> fetchRevenueSummary(String month, String year, String organization, String team) throws InternalServerException;

    void exportLeaveSummary(String month, String year, String org, String team, HttpServletResponse response) throws IOException;

    List<EmployeeLeaveReportResponse> fetchLeaveForecastSummaryForEmployee(String employeeId);
}
