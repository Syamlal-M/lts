/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.*;
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
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

import static com.ibsplc.apiserviceleaveforcasting.repository.CustomerSpecifications.*;
import static com.ibsplc.apiserviceleaveforcasting.util.ValidationUtil.validateLeaveForecast;
import static java.time.temporal.ChronoUnit.DAYS;
import static java.util.stream.Collectors.groupingBy;

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

	private void validateInputWithDb(List<LeaveForcastRequest> leavesFromDb, List<LeaveForcastRequest> forcastRequests) {
		List<LeaveForcastRequest> toDeactivate = forcastRequests.stream().filter(l -> !l.getAction().equals(Action.INSERT)).collect(Collectors.toList());
		List<LeaveForcastRequest> filterToExcludeDataToBeDeletedFromRequest = leavesFromDb
				.stream()
				.filter(leave -> toDeactivate.stream().filter(toU -> toU.getLeaveForcastId().isPresent() && toU.getLeaveForcastId().get() == leave.getLeaveForcastId().get()).findFirst().isEmpty())
				.collect(Collectors.toList());
		List<LeaveForcastRequest> leavesToUpdate = forcastRequests
				.stream()
				.filter(l -> l.getAction().equals(Action.INSERT) || l.getAction().equals(Action.UPDATE))
				.collect(Collectors.toList());
		List<Month> listOfMonthToUpdate = leavesToUpdate
				.stream()
				.filter(l -> l.getPlanningType() == PlanningType.EXPECTED_WITH_LEAVES)
				.map(l -> l.getFromDate().getMonth()).collect(Collectors.toList());
		List<LeaveForcastRequest> finalList = filterToExcludeDataToBeDeletedFromRequest
				.stream()
				.filter(l -> !(listOfMonthToUpdate.contains(l.getFromDate().getMonth()) && l.getPlanningType() == PlanningType.EXPECTED_NO_LEAVES)).collect(Collectors.toList());
		finalList.addAll(leavesToUpdate);
		validateLeaveForecast(finalList);
	}

	@Override
	public ResponseEntity updateLeaves(List<LeaveForcastRequest> forcastRequests, String employeeId) {
		Optional<EmployeeInfoDto> employeeOptional = findEmployeeByUserRole(employeeId);
		List<EmployeeLeaveForcastDto> leavesInDb = leaveForecastRepository.findAll(hasLeaveForecastByEmployeeId(employeeId));
		List<LeaveForcastRequest> leavesFromDb = leavesInDb.stream()
				.filter(l -> l.getStatus().equalsIgnoreCase("ACTIVE"))
				.map(l -> new LeaveForcastRequest(Optional.of(l.getLeaveForecastId()), l.getEmployee().getEmployeeId(), l.getFromDate(), l.getToDate(), PlanningType.getPlanningType(l.getPlanningType()).get(), l.isExceptional(),null, null))
				.collect(Collectors.toList());
		validateInputWithDb(leavesFromDb, forcastRequests);
		if(employeeOptional.isPresent()) {
			List<EmployeeLeaveForcastDto> deactivateLeave = deactivateLeaveList(forcastRequests, employeeId, leavesInDb);

			List<EmployeeLeaveForcastDto> employeeForecastToCreate = forcastRequests.stream()
					.filter(leave -> leave.getAction().equals(Action.INSERT) || leave.getAction().equals(Action.UPDATE))
					.flatMap(forecastRequest -> {
				List<LeaveForcastRequest> separatedForecastDates = breakDatesIfBetweenMonths(forecastRequest);
				return separatedForecastDates.stream().map(forecast -> {
					double noOfDays = forecast.getPlanningType() == PlanningType.EXPECTED_NO_LEAVES ? 0 :
							Objects.equals(forecast.getSpan(), Optional.of(SpanType.HALF)) ? 0.5 :(int) DAYS.between(forecast.getFromDate(), forecast.getToDate()) + 1;
					return EmployeeLeaveForcastDto.builder()
							.exceptional(forecast.isExceptional())
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
							.planningType(forecast.getPlanningType().toString()).build();
				});
			}).collect(Collectors.toList());
			employeeForecastToCreate.addAll(deactivateLeave);
			leaveForecastRepository.saveAll(employeeForecastToCreate);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	private List<EmployeeLeaveForcastDto> deactivateLeaveList(List<LeaveForcastRequest> leaves, String employeeId, List<EmployeeLeaveForcastDto> fromDb) {
		List<Month> listOfMonthToUpdate = leaves
				.stream()
				.filter(leave -> !leave.getAction().equals(Action.DELETE))
				.map(l -> l.getFromDate().getMonth()).collect(Collectors.toList());
		/**
		 * In a Month, employee has leaves or no leaves
		 * If they have recorded as Expected_NO_LEAVES and then updates to leave
		 * Expected_NO_LEAVEES records will be deleted the below logic mimic the same
		 */
		List<EmployeeLeaveForcastDto> deleteListBasedOnExpectedNoLeaves = fromDb
				.stream()
				.filter(l -> listOfMonthToUpdate.contains(l.getFromDate().getMonth()) && l.getPlanningType().equals(PlanningType.EXPECTED_NO_LEAVES.toString()))
				.map(l -> {
					l.setStatus(Status.INACTIVE.toString());
					l.setModifiedBy(employeeId);
					l.setUpdatedDate(LocalDateTime.now());
					return l;
				}).collect(Collectors.toList());

		List<LeaveForcastRequest> listToDeleteFromRequest = leaves
				.stream()
				.filter(leave -> !leave.getAction().equals(Action.INSERT))
				.collect(Collectors.toList());

		List<EmployeeLeaveForcastDto> listToBeDeleted = listToDeleteFromRequest.stream().flatMap(leave -> {
			List<EmployeeLeaveForcastDto> leavesToUpdate = fromDb.stream()
					.filter(fromDbRecord -> fromDbRecord.getLeaveForecastId().equals(leave.getLeaveForcastId().orElse(0L)))
					.collect(Collectors.toList());
			return leavesToUpdate.stream().peek(leaveToUpdate -> {
				leaveToUpdate.setStatus(Status.INACTIVE.toString());
				leaveToUpdate.setModifiedBy(employeeId);
				leaveToUpdate.setUpdatedDate(LocalDateTime.now());
			});
		}).collect(Collectors.toList());
		listToBeDeleted.addAll(deleteListBasedOnExpectedNoLeaves);
		return listToBeDeleted;
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
