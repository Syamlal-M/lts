/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ibsplc.apiserviceleaveforcasting.service.LeaveForecastService;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

import static com.ibsplc.apiserviceleaveforcasting.repository.CustomerSpecifications.*;
import static java.time.temporal.ChronoUnit.DAYS;

/**
 * @author Narjeesh
 *
 */
@Service
public class LeaveForecastServiceImpl implements LeaveForecastService {

	@Autowired
	private LeaveForecastRepository leaveForecastRepository;

	@Autowired
	private EmployeeInfoRepository employeeInfoRepository;



	private Optional<Roles> getPriorityRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		List<String> authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		return Roles.getPriority(authorities);
	}

	@Override
	public ResponseEntity updateLeaves(List<LeaveForcastRequest> forcastRequests, String employeeId) {

		Optional<EmployeeInfoDto> employeeOptional = findEmployeeByUserRole(employeeId);
		if(employeeOptional.isPresent()) {
			List<EmployeeLeaveForcastDto> employeeForecast = forcastRequests.stream().flatMap(forecastRequest -> {
				List<LeaveForcastRequest> separatedForecastDates = breakDatesIfBetweenMonths(forecastRequest);
				return separatedForecastDates.stream().map(forecast -> {
					if(forecast.getFromDate().isAfter(LocalDate.now()) && forecast.getToDate().isAfter(LocalDate.now())) {
						return EmployeeLeaveForcastDto.builder()
								.fromDate(forecast.getFromDate())
								.toDate(forecast.getToDate())
								.employee(employeeOptional.get())
								.month(forecast.getToDate().getMonth().toString())
								.year(forecast.getToDate().getYear())
								.noOfDays((int) DAYS.between(forecast.getFromDate(), forecast.getToDate()) + 1)
								.planningType(PlanningType.ACTUAL.toString()).build();
					} else {
						return EmployeeLeaveForcastDto.builder()
								.fromDate(forecast.getFromDate())
								.employee(employeeOptional.get())
								.toDate(forecast.getToDate())
								.month(forecast.getToDate().getMonth().toString())
								.year(forecast.getToDate().getYear())
								.noOfDays((int) DAYS.between(forecast.getFromDate(), forecast.getToDate()))
								.planningType(PlanningType.EXPECTED.toString()).build();
					}
				});
			}).collect(Collectors.toList());
			leaveForecastRepository.saveAll(employeeForecast);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	private List<LeaveForcastRequest> breakDatesIfBetweenMonths(LeaveForcastRequest forecast) {
		if(forecast.getFromDate().getMonth() != forecast.getToDate().getMonth()) {
			long monthsBetween = ChronoUnit.MONTHS.between(forecast.getFromDate(), forecast.getToDate());
			List<LeaveForcastRequest> leaveForeCast = new ArrayList<>();
			LocalDate fromDate = forecast.getFromDate();
			for(int month = 0; month <= monthsBetween; month ++) {
				LocalDate toDate = null;
				if(month == monthsBetween) {
					toDate = forecast.getToDate();
				} else {
					toDate = fromDate.withDayOfMonth(fromDate.getMonth().length(fromDate.isLeapYear()));
				}
				breakLeavesBetweenWeeks(leaveForeCast, fromDate, toDate, forecast.getPlanningType());
				fromDate = toDate.plusDays(1);
			}
			return leaveForeCast;
		} else {
			List<LeaveForcastRequest> leaveForeCast = new ArrayList<>();
			breakLeavesBetweenWeeks(leaveForeCast, forecast.getFromDate(), forecast.getToDate(), forecast.getPlanningType());
			return leaveForeCast;
		}
	}

	private void breakLeavesBetweenWeeks(List<LeaveForcastRequest> leaveForeCast, LocalDate fromDate, LocalDate toDate, PlanningType planningType) {
		int fromDateWeekNumber = fromDate.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear());
		int toDateWeekNumber = toDate.get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear());
		if(fromDateWeekNumber != toDateWeekNumber) {
			for(int weekNumber = fromDateWeekNumber; weekNumber <= toDateWeekNumber; weekNumber++) {
				if(fromDate.getDayOfWeek().equals(DayOfWeek.SUNDAY) || fromDate.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
					fromDate = fromDate.with(DayOfWeek.FRIDAY).plusDays(3);
				} else {
					leaveForeCast.add(LeaveForcastRequest.builder()
							.fromDate(fromDate)
							.toDate(toDate.isAfter(fromDate.with(DayOfWeek.FRIDAY)) ? fromDate.with(DayOfWeek.FRIDAY) : toDate)
							.planningType(planningType)
							.build());
					fromDate = fromDate.with(DayOfWeek.FRIDAY).plusDays(3);
				}
			}
		} else if(toDate.getDayOfWeek().equals(DayOfWeek.SUNDAY) || toDate.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
			leaveForeCast.add(LeaveForcastRequest.builder()
					.fromDate(fromDate)
					.toDate(fromDate.with(DayOfWeek.FRIDAY))
					.planningType(planningType)
					.build());
		} else {
			leaveForeCast.add(LeaveForcastRequest.builder()
					.fromDate(fromDate)
					.toDate(toDate)
					.planningType(planningType)
					.build());
		}

	}

	private Optional<EmployeeInfoDto> findEmployeeByUserRole(String employeeId) {
		Optional<Roles> role = getPriorityRole();
		EmployeeInfoDto emp = (EmployeeInfoDto) Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getAttribute("employeeDetails", RequestAttributes.SCOPE_REQUEST);
		if(role.isPresent()) {
			switch (role.get()) {
				case USER: return employeeInfoRepository.findAll(hasEmployeesByEmpId(emp.getEmployeeId())).stream().findFirst();
				case TEAM_USER: return employeeInfoRepository.findAll(hasEmployeesByEmpId(employeeId).and(hasEmployeesByTeam(emp.getTeam().getTeamName()))).stream().findFirst();
				case ADMIN:
				case SUPER_ADMIN: return employeeInfoRepository.findAll(hasEmployeesByEmpId(employeeId)).stream().findFirst();
			}
		}
		return Optional.empty();
	}

}
