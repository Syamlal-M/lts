/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.entity;

import javax.persistence.*;

import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author Narjeesh
 *
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "EmployeeLeaveForecast")
public class EmployeeLeaveForcastDto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long leaveForecastId;
	private LocalDate fromDate;
	private LocalDate toDate;
	private int noOfDays;
	private String month;
	private int year;
	private String planningType;

	private String status;

	private LocalDateTime createdDate;

	private LocalDateTime updatedDate;

	private String modifiedBy;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private EmployeeInfoDto employee;


}
