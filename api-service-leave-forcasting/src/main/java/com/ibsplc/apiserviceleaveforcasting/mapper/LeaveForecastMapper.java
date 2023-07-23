package com.ibsplc.apiserviceleaveforcasting.mapper;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.SpanType;
import com.ibsplc.apiserviceleaveforcasting.enums.Status;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeLeaveReportResponse;
import com.ibsplc.apiserviceleaveforcasting.response.LeaveDetailResponse;
import com.ibsplc.apiserviceleaveforcasting.response.MonthLeaveSummaryResponse;
import com.ibsplc.apiserviceleaveforcasting.response.YearLeaveSummaryResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.util.stream.Collectors.groupingBy;

public class LeaveForecastMapper {


    public static EmployeeLeaveReportResponse map(Map.Entry<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> employee) {
        EmployeeInfoDto emp  = employee.getKey();
        List<EmployeeLeaveForcastDto> leaveForeCast = employee.getValue();
        Map<String, List<EmployeeLeaveForcastDto>> groupedYear = leaveForeCast
                .stream().collect(groupingBy(l -> Integer.toString(l.getFromDate().getYear())));

        List<YearLeaveSummaryResponse> yearData = groupedYear.entrySet().stream().map((yearWise) -> {

            Map<String, List<EmployeeLeaveForcastDto>> groupedMonth = yearWise.getValue()
                    .stream().collect(groupingBy(l -> l.getFromDate().getMonth().toString()));

            List<MonthLeaveSummaryResponse> monthSummary = groupedMonth.entrySet().stream().map((monthName) -> {
                List<LeaveDetailResponse> leaveDetails = monthName.getValue()
                        .stream().map(LeaveForecastMapper::getLeaveDetailResponse).collect(Collectors.toList());
                double totalNoOfDaysInWeek = leaveDetails.stream().mapToDouble(LeaveDetailResponse::getNoOfDays).sum();
                List<String> datesList  = leaveDetails.stream().flatMap(ld -> ld.getDateList().stream()).collect(Collectors.toList());
                String planningType = monthName.getValue().stream().findFirst().get().getPlanningType();
                return MonthLeaveSummaryResponse.builder()
                        .month(monthName.getKey())
                        .leaveDates(Objects.equals(planningType, PlanningType.EXPECTED_NO_LEAVES.toString()) ? Collections.emptyList(): leaveDetails)
                        .planningType(planningType)
                        .noOfDays(totalNoOfDaysInWeek)
                        .dateList(Objects.equals(planningType, PlanningType.EXPECTED_NO_LEAVES.toString()) ? Collections.emptyList(): datesList)
                        .build();
            }).collect(Collectors.toList());
            return YearLeaveSummaryResponse.builder()
                    .year(yearWise.getKey())
                    .month(monthSummary)
                    .noOfDays(monthSummary.stream().mapToDouble(MonthLeaveSummaryResponse::getNoOfDays).sum()).build();
        }).collect(Collectors.toList());

        double totalLeaves = yearData.stream().mapToDouble(YearLeaveSummaryResponse::getNoOfDays).sum();
        return EmployeeLeaveReportResponse.builder().employeeId(emp.getEmployeeId())
                .employeeName(emp.getEmployeeName())
                .emailId(emp.getEmailId())
                .year(yearData)
                .noOfDays(totalLeaves).build();
    }

    public static LeaveDetailResponse getLeaveDetailResponse(EmployeeLeaveForcastDto leaveDays) {
        List<String> dateString = Stream.iterate(leaveDays.getFromDate(), date -> date.plusDays(1))
                .limit(ChronoUnit.DAYS.between(leaveDays.getFromDate(), leaveDays.getToDate()) + 1)
                .map(LocalDate::toString).collect(Collectors.toList());

        return LeaveDetailResponse.builder()
                .leaveForcastId(leaveDays.getLeaveForecastId())
                .month(leaveDays.getMonth())
                .noOfDays(leaveDays.getNoOfDays())
                .spanType(leaveDays.getNoOfDays() < 1 ? SpanType.HALF : SpanType.FULL)
                .fromDate(leaveDays.getFromDate())
                .toDate(leaveDays.getToDate())
                .dateList(dateString)
                .exceptional(leaveDays.isExceptional())
                .year(leaveDays.getYear())
                .reason(leaveDays.getReason())
                .planningType(leaveDays.getPlanningType()).build();
    }

    public static EmployeeLeaveForcastDto mapToEmployeeLeaveForcastDto(LeaveForcastRequest forecast, EmployeeInfoDto employee, String modifiedBy) {
        double noOfDays = forecast.getPlanningType() == PlanningType.EXPECTED_NO_LEAVES ? 0 :
                Objects.equals(forecast.getSpan(), Optional.of(SpanType.HALF)) ? 0.5 :(int) DAYS.between(forecast.getFromDate(), forecast.getToDate()) + 1;
        return EmployeeLeaveForcastDto.builder()
                .exceptional(forecast.isExceptional())
                .fromDate(forecast.getFromDate())
                .toDate(forecast.getToDate())
                .employee(employee)
                .month(forecast.getToDate().getMonth().toString())
                .year(forecast.getToDate().getYear())
                .noOfDays(noOfDays)
                .modifiedBy(modifiedBy)
                .status(Status.ACTIVE.toString())
                .createdDate(LocalDateTime.now())
                .updatedDate(LocalDateTime.now())
                .planningType(forecast.getPlanningType().toString())
                .reason(forecast.getReason())
                .build();
    }

}
