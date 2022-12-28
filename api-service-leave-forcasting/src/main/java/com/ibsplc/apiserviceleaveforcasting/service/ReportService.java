package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeSummaryView;

import java.util.HashMap;
import java.util.List;


public interface ReportService {


    public List<EmployeeSummaryView> fetchLeaveSummary(String duration) throws CustomException;

    public HashMap<Integer, List<String>> segregateLeavesBasedOnWeek(String dateList);
}
