/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

import org.apache.poi.xssf.usermodel.XSSFRow;

/**
 *
 * @author jithin123
 */
public class EmployeeForm {
    
    @NotEmpty(message = "Emp Id must not be null or empty")
    private String empId;
    @NotEmpty(message = "Employee Name must not be null or empty")
    private String employeeName;
    @NotEmpty(message = "Expedia FG Name must not be null or empty")
    private String expediaFgName;
    @NotEmpty(message = "Vendor Name must not be null or empty")
    private String vendorName;
    @NotEmpty(message = "Job Title must not be null or empty")
    private String jobTitle;
    @NotEmpty(message = "HM must not be null or empty")
    private String hm;
    @Positive(message = "Should be positive")
    private Double billRate;
    @NotEmpty(message = "Country must not be null or empty")
    private String country;
    @NotEmpty(message = "City must not be null or empty")
    private String city;
    @NotEmpty(message = "SOW must not be null or empty")
    private String sow;
    @NotEmpty(message = "Org must not be null or empty")
    private String org;
    @NotEmpty(message = "Team must not be null or empty")
    private String team;
    @NotEmpty(message = "Billability must not be null or empty")
    private String billability;
    private String remarks;
    
    public EmployeeForm(XSSFRow row){
        this.empId = row.getCell(0) != null ? row.getCell(0).toString().trim() : null;
        this.employeeName = row.getCell(1) != null ? row.getCell(1).toString().trim() : null;
        this.expediaFgName = row.getCell(2) != null ? row.getCell(2).toString().trim() : null;
        this.vendorName = row.getCell(3) != null ? row.getCell(3).toString().trim() : null;
        this.jobTitle = row.getCell(4) != null ? row.getCell(4).toString().trim() : null;
        this.hm = row.getCell(5) != null ? row.getCell(5).toString().trim() : null;
        this.billRate = row.getCell(6) != null ? Double.valueOf(row.getCell(6).toString().trim()) : null;
        this.country = row.getCell(7) != null ? row.getCell(7).toString().trim() : null;
        this.city = row.getCell(8) != null ? row.getCell(8).toString().trim() : null;
        this.sow = row.getCell(9) != null ? row.getCell(9).toString().trim() : null;
        this.org = row.getCell(10) != null ? row.getCell(10).toString().trim() : null;
        this.team =  row.getCell(11) != null ? row.getCell(11).toString().trim() : null;
        this.billability = row.getCell(12) != null ? row.getCell(12).toString().trim() : null;
        this.remarks = row.getCell(13) != null ? row.getCell(13).toString().trim() : null;
    }
    
    public EmployeeForm(){}
    /**
     * @return the empId
     */
    public String getEmpId() {
        return empId;
    }

    /**
     * @param empId the empId to set
     */
    public void setEmpId(String empId) {
        this.empId = empId;
    }

    /**
     * @return the expediaFgName
     */
    public String getExpediaFgName() {
        return expediaFgName;
    }

    /**
     * @param expediaFgName the expediaFgName to set
     */
    public void setExpediaFgName(String expediaFgName) {
        this.expediaFgName = expediaFgName;
    }

    /**
     * @return the vendorName
     */
    public String getVendorName() {
        return vendorName;
    }

    /**
     * @param vendorName the vendorName to set
     */
    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    /**
     * @return the jobTitle
     */
    public String getJobTitle() {
        return jobTitle;
    }

    /**
     * @param jobTitle the jobTitle to set
     */
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    /**
     * @return the hm
     */
    public String getHm() {
        return hm;
    }

    /**
     * @param hm the hm to set
     */
    public void setHm(String hm) {
        this.hm = hm;
    }

    /**
     * @return the billRate
     */
    public Double getBillRate() {
        return billRate;
    }

    /**
     * @param billRate the billRate to set
     */
    public void setBillRate(Double billRate) {
        this.billRate = billRate;
    }

    /**
     * @return the country
     */
    public String getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * @return the city
     */
    public String getCity() {
        return city;
    }

    /**
     * @param city the city to set
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * @return the sow
     */
    public String getSow() {
        return sow;
    }

    /**
     * @param sow the sow to set
     */
    public void setSow(String sow) {
        this.sow = sow;
    }

    /**
     * @return the org
     */
    public String getOrg() {
        return org;
    }

    /**
     * @param org the org to set
     */
    public void setOrg(String org) {
        this.org = org;
    }

    /**
     * @return the team
     */
    public String getTeam() {
        return team;
    }

    /**
     * @param team the team to set
     */
    public void setTeam(String team) {
        this.team = team;
    }

    /**
     * @return the billability
     */
    public String getBillability() {
        return billability;
    }

    /**
     * @param billability the billability to set
     */
    public void setBillability(String billability) {
        this.billability = billability;
    }

    /**
     * @return the remarks
     */
    public String getRemarks() {
        return remarks;
    }

    /**
     * @param remarks the remarks to set
     */
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    
    /**
     * @return the employeeName
     */
    public String getEmployeeName() {
        return employeeName;
    }

    /**
     * @param employeeName the employeeName to set
     */
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    
}
