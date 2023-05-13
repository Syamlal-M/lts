/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.Action;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Roles;
import com.ibsplc.apiserviceleaveforcasting.enums.Status;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import com.ibsplc.apiserviceleaveforcasting.service.LeaveForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

import static com.ibsplc.apiserviceleaveforcasting.repository.CustomerSpecifications.*;
import static com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil.validateLeaveForecast;
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
		List<EmployeeLeaveForcastDto> leavesInDb = leaveForecastRepository.findAll(hasLeaveForecastByEmployeeId(employeeId));
		List<LeaveForcastRequest> leavesFromDb = leavesInDb.stream()
				.map(l -> new LeaveForcastRequest(l.getEmployee().getEmployeeId(), l.getFromDate(), l.getToDate(), PlanningType.getPlanningType(l.getPlanningType()).get(), null))
				.collect(Collectors.toList());
		leavesFromDb.addAll(forcastRequests);
		validateLeaveForecast(leavesFromDb);
		if(employeeOptional.isPresent()) {
			deactivateLeave(forcastRequests.stream().filter(leave -> leave.getAction().isPresent() &&  leave.getAction().get().equals(Action.DELETE))
					.collect(Collectors.toList()), employeeId);
			List<EmployeeLeaveForcastDto> employeeForecastToCreate = forcastRequests.stream()
					.filter(leave -> leave.getAction().isEmpty() || leave.getAction().get().equals(Action.INSERT)).flatMap(forecastRequest -> {
				List<LeaveForcastRequest> separatedForecastDates = breakDatesIfBetweenMonths(forecastRequest);
				return separatedForecastDates.stream().map(forecast -> {
					String planningType;
					int noOfDays;
					if(forecast.getFromDate().isBefore(LocalDate.now())) {
						planningType = PlanningType.ACTUAL.toString();
						noOfDays = (int) DAYS.between(forecast.getFromDate(), forecast.getToDate()) + 1;
					} else {
						if (forecast.getPlanningType().equals(PlanningType.EXPECTED_WITH_LEAVES)) {
							planningType = PlanningType.EXPECTED_WITH_LEAVES.toString();
							noOfDays = (int) DAYS.between(forecast.getFromDate(), forecast.getToDate()) + 1;
						} else {
							planningType = PlanningType.EXPECTED_NO_LEAVES.toString();
							noOfDays = 0;
						}
					}
					return EmployeeLeaveForcastDto.builder()
							.fromDate(forecast.getFromDate())
							.toDate(forecast.getToDate())
							.employee(employeeOptional.get())
							.month(forecast.getToDate().getMonth().toString())
							.year(forecast.getToDate().getYear())
							.noOfDays(noOfDays)
							.modifiedBy(employeeId)
							.status(Status.ACTIVE.toString())
							.createdDate(LocalDateTime.now())
							.updatedDate(LocalDateTime.now())
							.planningType(planningType).build();
				});
			}).collect(Collectors.toList());
			leaveForecastRepository.saveAll(employeeForecastToCreate);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	private void deactivateLeave(List<LeaveForcastRequest> leaves, String employeeId) {
		leaveForecastRepository.saveAll(leaves.stream().flatMap(leave -> {
			List<EmployeeLeaveForcastDto> leavesToUpdate = leaveForecastRepository.findAll(hasLeaveForecastByFromDate(leave.getFromDate())
					.and(hasLeaveForecastByToDate(leave.getToDate())).and(hasLeaveForecastByEmployeeId(leave.getEmpId())));
			return leavesToUpdate.stream().map(leaveToUpdate -> {
				leaveToUpdate.setStatus(Status.INACTIVE.toString());
				leaveToUpdate.setModifiedBy(employeeId);
				leaveToUpdate.setUpdatedDate(LocalDateTime.now());
				return leaveToUpdate;
			});
		}).collect(Collectors.toList()));
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
