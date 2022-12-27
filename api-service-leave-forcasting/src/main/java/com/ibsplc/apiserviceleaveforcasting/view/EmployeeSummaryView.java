package com.ibsplc.apiserviceleaveforcasting.view;

import java.util.List;

public class EmployeeSummaryView {

    private String employeeId;

    private String employeeName;

    private String organizationName;

    private String teamName;

    private List<LeaveSummaryView> leaveSummaryResponseList;


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public List<LeaveSummaryView> getLeaveSummaryResponseList() {
        return leaveSummaryResponseList;
    }

    public void setLeaveSummaryResponseList(List<LeaveSummaryView> leaveSummaryResponseList) {
        this.leaveSummaryResponseList = leaveSummaryResponseList;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
