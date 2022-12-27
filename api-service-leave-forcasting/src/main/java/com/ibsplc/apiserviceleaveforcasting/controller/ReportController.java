package com.ibsplc.apiserviceleaveforcasting.controller;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeSummaryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("leave-summary/{duration}")
    public List<EmployeeSummaryView> fetchLeaveForecastSummary(@PathVariable String duration) throws CustomException {
        try {
            List<EmployeeSummaryView> employeeSummaryResponseList = reportService.fetchLeaveSummary(duration);
            return employeeSummaryResponseList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Exception occurred in API :: " + e.getMessage());
        }

    }
}
