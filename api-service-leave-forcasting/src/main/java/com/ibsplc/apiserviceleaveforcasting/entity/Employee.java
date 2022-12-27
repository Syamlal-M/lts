/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author jithin123
 */
@Entity
public class Employee implements Serializable{
    @Id
    private String empId;
    private String employeeName;
    private String expediaFgName;
    private String vendorName;
    private String jobTitle;
    private String hm;
    private String billRate;
    private String country;
    private String city;
    private String sow;
    private String org;
    private String team;
    private String billability;
    private String remarks;
    
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private Set<LeaveForecast> leaveForecasts;

	public void addLeaveForecast(LeaveForecast leaveForecast) {
		leaveForecasts.add(leaveForecast);
		leaveForecast.setEmployee(this);
	}
    
    public Employee(){}
    
    
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
    public String getBillRate() {
        return billRate;
    }

    /**
     * @param billRate the billRate to set
     */
    public void setBillRate(String billRate) {
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
    
	/**
	 * @return the leaveForecasts
	 */
	public Set<LeaveForecast> getLeaveForecasts() {
		return leaveForecasts;
	}

	/**
	 * @param leaveForecasts the leaveForecasts to set
	 */
	public void setLeaveForecasts(Set<LeaveForecast> leaveForecasts) {
		this.leaveForecasts = leaveForecasts;
	}
    
}
