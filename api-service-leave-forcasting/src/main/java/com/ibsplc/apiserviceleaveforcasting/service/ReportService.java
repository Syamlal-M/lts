package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeSummaryView;

import java.util.HashMap;
import java.util.List;


public interface ReportService {


    public List<EmployeeSummaryView> fetchLeaveSummary(String duration, String organization, String team) throws CustomException;

    public HashMap<Integer, List<String>> segregateLeavesBasedOnWeek(String dateList);
}
