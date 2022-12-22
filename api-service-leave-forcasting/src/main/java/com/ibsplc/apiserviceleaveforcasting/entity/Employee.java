package com.ibsplc.apiserviceleaveforcasting.entity;

/**
 * @author Narjeesh
 *
 */
public class Employee {

	private int employeeId;
	private int employeeName;

	public Employee() {
		super();
	}

	public Employee(int employeeId, int employeeName) {
		super();
		this.employeeId = employeeId;
		this.employeeName = employeeName;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public int getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(int employeeName) {
		this.employeeName = employeeName;
	}

}
