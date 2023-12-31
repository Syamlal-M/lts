/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.controller.api;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.BadRequestException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.enums.Action;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeLeaveReportResponse;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeRevenueReportResponse;
import com.ibsplc.apiserviceleaveforcasting.service.LeaveForecastService;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil.validateLeaveForecast;
import static java.util.stream.Collectors.groupingBy;

/**
 * @author jithin123
 */
@RestController
@RequestMapping("api/employee")
public class EmployeeLeaveController {
    @Autowired
    private LeaveForecastService leaveForecastService;
    @Autowired
    ReportService reportService;

    @PutMapping("leaves/{employeeId}")
    public ResponseEntity updateLeaves(@RequestBody List<LeaveForcastRequest> leaveForecast,
                                       @PathVariable String employeeId) {
        if(leaveForecast.stream().anyMatch(l -> l.getAction() == null || l.getPlanningType() == null)) {
            throw new BadRequestException("Action or planingType is not defined");
        }
        validateLeaveForecast(leaveForecast.stream().filter(l -> l.getAction().equals(Action.INSERT) || l.getAction().equals(Action.UPDATE)).collect(Collectors.toList()));
        return leaveForecastService.updateLeaves(leaveForecast, employeeId);
    }

    @PutMapping("leaves/bulk")
    public ResponseEntity bulkLeaves(@RequestBody List<LeaveForcastRequest> leaveForecast) {
        if(leaveForecast.stream().anyMatch(l -> l.getAction() == null || l.getPlanningType() == null)) {
            throw new BadRequestException("Action or planingType is not defined");
        }
        Map<String, List<LeaveForcastRequest>> groupedLeaves =
                leaveForecast.stream().collect(groupingBy(LeaveForcastRequest::getEmpId));

        groupedLeaves.forEach((empId, employeeForecast)  -> {
            validateLeaveForecast(employeeForecast.stream().filter(l -> l.getAction().equals(Action.INSERT) || l.getAction().equals(Action.UPDATE)).collect(Collectors.toList()));
            leaveForecastService.updateLeaves(employeeForecast, empId);
                        });
        return ResponseEntity.noContent().build();
    }

    @GetMapping("leave-summary")
    public List<EmployeeLeaveReportResponse> fetchLeaveForecastSummary(@RequestParam(required = false) String month,
                                                                       @RequestParam(required = false) String year,
                                                                       @RequestParam(required = false) String org,
                                                                       @RequestParam(required = false) String team) throws InternalServerException, Exception {
        try {
            return reportService.fetchLeaveSummary(month, year, org, team);
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerException(e.getMessage());
        }
    }

    @GetMapping("leave-summary/{employeeId}")
    public List<EmployeeLeaveReportResponse> fetchLeaveForecastSummaryForEmployee(@PathVariable String employeeId) throws InternalServerException, Exception {
        try {
            return reportService.fetchLeaveForecastSummaryForEmployee(employeeId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerException(e.getMessage());
        }
    }


    @GetMapping("leave/export")
    public void exportEmployees(@RequestParam(required = false) String month,
                                @RequestParam(required = false) String year,
                                @RequestParam(required = false) String org,
                                @RequestParam(required = false) String team,
                                HttpServletResponse response) throws Exception {
        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=leavereport-%s.xlsx", LocalDateTime.now());
        response.setHeader(headerKey, headerValue);
        reportService.exportLeaveSummary(month, year, org, team, response);
    }

    @GetMapping("revenue")
    public List<EmployeeRevenueReportResponse> getEmployeeRevenue(@RequestParam(required = false) String month,
                                                                  @RequestParam(required = false) String year,
                                                                  @RequestParam(required = false) String org,
                                                                  @RequestParam(required = false) String team) throws InternalServerException, Exception {
        try {
            return reportService.fetchRevenueSummary(month, year, org, team);
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerException("Exception occurred in API :: " + e.getMessage());
        }
    }
}
