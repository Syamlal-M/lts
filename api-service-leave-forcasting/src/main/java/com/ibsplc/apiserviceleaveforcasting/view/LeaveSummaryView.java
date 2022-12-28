package com.ibsplc.apiserviceleaveforcasting.view;

import java.util.HashMap;
import java.util.List;

public class LeaveSummaryView {

    private Long leaveSubmissionId;
    private String empId;
    private String empName;
    private String dateList;

    private List<HashMap<Integer, List<String>>> dateBasedOnWeek;


    public List<HashMap<Integer, List<String>>> getDateBasedOnWeek() {
        return dateBasedOnWeek;
    }

    public void setDateBasedOnWeek(List<HashMap<Integer, List<String>>> dateBasedOnWeek) {
        this.dateBasedOnWeek = dateBasedOnWeek;
    }

    public String getEmpId() {
        return empId;
    }

    public Long getLeaveSubmissionId() {
        return leaveSubmissionId;
    }

    public void setLeaveSubmissionId(Long leaveSubmissionId) {
        this.leaveSubmissionId = leaveSubmissionId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getDateList() {
        return dateList;
    }

    public void setDateList(String dateList) {
        this.dateList = dateList;
    }
}
