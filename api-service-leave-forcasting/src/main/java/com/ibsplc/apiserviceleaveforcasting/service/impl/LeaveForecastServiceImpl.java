/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.*;
import com.ibsplc.apiserviceleaveforcasting.mapper.LeaveForecastMapper;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import com.ibsplc.apiserviceleaveforcasting.service.LeaveForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
		EmployeeInfoDto emp = (EmployeeInfoDto) Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).getAttribute("employeeDetails", RequestAttributes.SCOPE_REQUEST);
		return Roles.getPriority(List.of(emp.getRole().getRoleName()));
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

	private List<LeaveForcastRequest> getActiveAndMapToLeaveForecastRequest(List<EmployeeLeaveForcastDto> leavesInDb) {
		return leavesInDb.stream()
				.filter(l -> l.getStatus().equalsIgnoreCase("ACTIVE"))
				.map(l -> LeaveForcastRequest.builder()
						.leaveForcastId(Optional.of(l.getLeaveForecastId()))
						.empId(l.getEmployee().getEmployeeId())
						.planningType(PlanningType.getPlanningType(l.getPlanningType()).get())
						.fromDate(l.getFromDate())
						.toDate(l.getToDate())
						.exceptional(l.isExceptional()).build())
				.collect(Collectors.toList());
	}

	@Override
	public ResponseEntity updateLeaves(List<LeaveForcastRequest> forecastRequests, String employeeId) {
		Optional<EmployeeInfoDto> employeeOptional = findEmployeeByUserRole(employeeId);
		List<EmployeeLeaveForcastDto> leavesInDb = leaveForecastRepository.findAll(hasLeaveForecastByEmployeeId(employeeId));

		List<LeaveForcastRequest> leavesFromDb = getActiveAndMapToLeaveForecastRequest(leavesInDb);
		validateInputWithDb(leavesFromDb, forecastRequests);
		if(employeeOptional.isPresent()) {
			List<EmployeeLeaveForcastDto> leavesToBeDeactivated = getDeactivateLeaveList(forecastRequests, employeeId, leavesInDb);
			List<EmployeeLeaveForcastDto> forecastToCreateOrUpdate = forecastRequests.stream()
					.filter(leave -> leave.getAction().equals(Action.INSERT) || leave.getAction().equals(Action.UPDATE))
					.flatMap(forecastRequest -> {
				List<LeaveForcastRequest> separatedForecastDates = breakDatesIfBetweenMonths(forecastRequest);
				return separatedForecastDates.stream().map(forecast -> LeaveForecastMapper.mapToEmployeeLeaveForcastDto(forecast, employeeOptional.get(), employeeId));
			}).collect(Collectors.toList());
			forecastToCreateOrUpdate.addAll(leavesToBeDeactivated);
			leaveForecastRepository.saveAll(forecastToCreateOrUpdate);
			List<EmployeeLeaveForcastDto> updatedLeaves = leaveForecastRepository.findAll(hasLeaveForecastByEmployeeId(employeeId));
			Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> employeeMap =
					updatedLeaves.stream().collect(groupingBy(EmployeeLeaveForcastDto::getEmployee));
			return ResponseEntity.ok(employeeMap.entrySet().stream().map(LeaveForecastMapper::map).collect(Collectors.toList()));
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	private List<EmployeeLeaveForcastDto> getDeactivateLeaveList(List<LeaveForcastRequest> leaves, String employeeId, List<EmployeeLeaveForcastDto> fromDb) {
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
				breakLeavesBetweenWeeks(leaveForeCast, fromDate, toDate, forecast.getPlanningType(), forecast);
				fromDate = toDate.plusDays(1);
			}
			return leaveForeCast;
		} else {
			List<LeaveForcastRequest> leaveForeCast = new ArrayList<>();
			breakLeavesBetweenWeeks(leaveForeCast, forecast.getFromDate(), forecast.getToDate(), forecast.getPlanningType(), forecast);
			return leaveForeCast;
		}
	}

	private void breakLeavesBetweenWeeks(List<LeaveForcastRequest> leaveForeCast, LocalDate fromDate, LocalDate toDate,
										 PlanningType planningType, LeaveForcastRequest forecast) {
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
							.exceptional(forecast.isExceptional())
							.span(forecast.getSpan())
							.reason(forecast.getReason())
							.build());
					fromDate = fromDate.with(DayOfWeek.FRIDAY).plusDays(3);
				}
			}
		} else if(toDate.getDayOfWeek().equals(DayOfWeek.SUNDAY) || toDate.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
			leaveForeCast.add(LeaveForcastRequest.builder()
					.fromDate(fromDate)
					.toDate(fromDate.with(DayOfWeek.FRIDAY))
					.planningType(planningType)
					.exceptional(forecast.isExceptional())
					.span(forecast.getSpan())
					.reason(forecast.getReason())
					.build());
		} else {
			leaveForeCast.add(LeaveForcastRequest.builder()
					.fromDate(fromDate)
					.toDate(toDate)
					.planningType(planningType)
					.exceptional(forecast.isExceptional())
					.span(forecast.getSpan())
					.reason(forecast.getReason())
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
