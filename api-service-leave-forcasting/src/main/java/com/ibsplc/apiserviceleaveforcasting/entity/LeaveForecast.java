/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Narjeesh
 *
 */
@Entity
@Table(name = "leave_submission")
public class LeaveForecast {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lsId;

	private String monthYear;

	private String leaveDateList;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "employee_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Employee employee;

	/**
	 * @return the lsId
	 */
	public Long getLsId() {
		return lsId;
	}

	/**
	 * @param lsId the lsId to set
	 */
	public void setLsId(Long lsId) {
		this.lsId = lsId;
	}

	/**
	 * @return the monthYear
	 */
	public String getMonthYear() {
		return monthYear;
	}

	/**
	 * @param monthYear the monthYear to set
	 */
	public void setMonthYear(String monthYear) {
		this.monthYear = monthYear;
	}

	/**
	 * @return the leaveDateList
	 */
	public String getLeaveDateList() {
		return leaveDateList;
	}

	/**
	 * @param leaveDateList the leaveDateList to set
	 */
	public void setLeaveDateList(String leaveDateList) {
		this.leaveDateList = leaveDateList;
	}

	/**
	 * @return the employee
	 */
	public Employee getEmployee() {
		return employee;
	}

	/**
	 * @param employee the employee to set
	 */
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

}
