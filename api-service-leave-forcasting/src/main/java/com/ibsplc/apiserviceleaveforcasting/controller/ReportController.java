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
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("leave-summary")
    public List<EmployeeSummaryView> fetchLeaveForecastSummary(@RequestParam(required = false) String duration, @RequestParam(required = false) String org,
            @RequestParam(required = false) String team) throws CustomException, Exception {
        try {
            List<EmployeeSummaryView> employeeSummaryResponseList = reportService.fetchLeaveSummary(duration, org, team);
            return employeeSummaryResponseList;
        }
        catch (CustomException e)
        {
            e.printStackTrace();
            throw new CustomException( e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception occurred in API :: " + e.getMessage());
        }

    }
}
