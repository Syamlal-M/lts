package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.SpanType;
import com.ibsplc.apiserviceleaveforcasting.enums.Status;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.response.*;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ibsplc.apiserviceleaveforcasting.repository.CustomerSpecifications.*;
import static java.util.stream.Collectors.groupingBy;

/**
 * Service for fetching data related to leave summary report
 */
@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    LeaveForecastRepository leaveForecastRepository;

    @Autowired
    EmployeeInfoRepository employeeRepository;

    /**
     * Fetches the leave data and relevant employee data for a particular month and year and sends it back as response
     *
     * @return
     */
    @Override
    public List<EmployeeLeaveReportResponse> fetchLeaveSummary(String month, String year, String organization, String team) throws CustomException {

        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> queryResult = getEmployeeLeaveForcastDtos(month, year, organization, team);

        return queryResult.entrySet().stream().map(emp -> {
            Map<String, List<EmployeeLeaveForcastDto>> groupedMonth = emp.getValue()
                    .stream().collect(groupingBy(l -> l.getFromDate().getMonth().toString()));

            List<MonthLeaveSummaryResponse> monthSummary = groupedMonth.entrySet().stream().map((monthName) -> {
                List<LeaveDetailResponse> leaveDetails = monthName.getValue()
                        .stream().map(ReportServiceImpl::getLeaveDetailResponse).collect(Collectors.toList());
                double totalNoOfDaysInWeek = leaveDetails.stream().mapToDouble(LeaveDetailResponse::getNoOfDays).sum();
                List<String> datesList  = leaveDetails.stream().flatMap(ld -> ld.getDateList().stream()).collect(Collectors.toList());
                return MonthLeaveSummaryResponse.builder()
                        .month(monthName.getKey())
                        .leaveDates(leaveDetails)
                        .planningType(monthName.getValue().stream().findFirst().get().getPlanningType())
                        .noOfDays(totalNoOfDaysInWeek)
                        .dateList(datesList)
                        .build();
            }).collect(Collectors.toList());

            double totalLeaves = monthSummary.stream().mapToDouble(MonthLeaveSummaryResponse::getNoOfDays).sum();
            return EmployeeLeaveReportResponse.builder().employeeId(emp.getKey().getEmployeeId())
                    .employeeName(emp.getKey().getEmployeeName())
                    .month(monthSummary.stream().sorted(Comparator.comparing(MonthLeaveSummaryResponse::getMonth)).collect(Collectors.toList())).noOfDays(totalLeaves).build();
        }).collect(Collectors.toList());
    }

    private static LeaveDetailResponse getLeaveDetailResponse(EmployeeLeaveForcastDto leaveDays) {
        List<String> dateString = Stream.iterate(leaveDays.getFromDate(), date -> date.plusDays(1))
                .limit(ChronoUnit.DAYS.between(leaveDays.getFromDate(), leaveDays.getToDate()) + 1)
                .map(LocalDate::toString).collect(Collectors.toList());
        ;
        return LeaveDetailResponse.builder()
                .leaveForcastId(leaveDays.getLeaveForecastId())
                .month(leaveDays.getMonth())
                .noOfDays(leaveDays.getNoOfDays())
                .spanType(leaveDays.getNoOfDays() < 1 ? SpanType.HALF : SpanType.FULL)
                .fromDate(leaveDays.getFromDate())
                .toDate(leaveDays.getToDate())
                .dateList(dateString)
                .year(leaveDays.getYear())
                .planningType(leaveDays.getPlanningType()).build();
    }

    private Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> getEmployeeLeaveForcastDtos(String month, String year, String organization, String team) {
        Specification<EmployeeLeaveForcastDto> spec = null;
        spec = addToQuery(organization, hasLeaveForecastByOrganisation(organization), spec);
        spec = addToQuery(team, hasLeaveForecastByTeam(team), spec);
        spec = addToQuery(month, hasLeaveForecastByMonth(month), spec);
        spec = addToQuery(year, hasLeaveForecastByYear(year), spec);
        spec =  addToQuery(Status.ACTIVE.toString(), hasLeaveForecastByStatus(Status.ACTIVE.toString()), spec);
        List<EmployeeLeaveForcastDto> leaveSummaryResponseList = leaveForecastRepository.findAll(spec);
        return leaveSummaryResponseList.stream().collect(groupingBy(EmployeeLeaveForcastDto::getEmployee));

    }

    private Specification<EmployeeLeaveForcastDto> addToQuery(String value, Specification<EmployeeLeaveForcastDto> valueCondition, Specification<EmployeeLeaveForcastDto> finalQuery) {
        if(value != null && !value.isEmpty()) {
            if(finalQuery == null) {
                return valueCondition;
            } else {
                return finalQuery.and(valueCondition);
            }
        } return finalQuery;
    }

    @Override
    public List<EmployeeRevenueReportResponse> fetchRevenueSummary(String month, String year, String organization, String team) throws CustomException {
        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> groupedReport = getEmployeeLeaveForcastDtos(month, year, organization, team);

        return groupedReport.entrySet().stream().map(employee -> {
            Map<Integer, List<EmployeeLeaveForcastDto>> groupedWeek = employee.getValue()
                    .stream().collect(groupingBy(l -> l.getFromDate().get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())));

            List<WeekRevenueSummaryResponse> weekSummaryList = groupedWeek.entrySet().stream().map((weekNumber) -> {
                LocalDate week = LocalDate.now().with(ChronoField.ALIGNED_WEEK_OF_YEAR, weekNumber.getKey());
                LocalDate start = week.with(DayOfWeek.MONDAY);
                LocalDate end = week.with(DayOfWeek.FRIDAY);
                List<LeaveDetailResponse> leaveDetails = weekNumber.getValue().stream().map(ReportServiceImpl::getLeaveDetailResponse).collect(Collectors.toList());
                List<LeaveDetailResponse> expectedLeaves = leaveDetails.stream().filter(l ->  l.getPlanningType().equalsIgnoreCase(PlanningType.EXPECTED_WITH_LEAVES.name())).collect(Collectors.toList());
                List<LeaveDetailResponse> actualLeaves = leaveDetails.stream().filter(l ->  l.getPlanningType().equalsIgnoreCase(PlanningType.ACTUAL.name())).collect(Collectors.toList());
                double totalExpectedDays = expectedLeaves.stream().mapToDouble(LeaveDetailResponse::getNoOfDays).sum();
                double totalActualDays = actualLeaves.stream().mapToDouble(LeaveDetailResponse::getNoOfDays).sum();
                // TODO: Handle Company holidays, so the total number would come down
                int totalWorkingDaysInAWeek = 5;
                Double expectedRevenue = (totalWorkingDaysInAWeek - totalExpectedDays) * employee.getKey().getBillRate();
                Double actualRevenue = (totalWorkingDaysInAWeek - totalActualDays) * employee.getKey().getBillRate();
                List<String> datesList  = leaveDetails.stream().flatMap(ld -> ld.getDateList().stream()).collect(Collectors.toList());
                return WeekRevenueSummaryResponse.builder()
                        .weekNumber(weekNumber.getKey())
                        .startAndEndDate(start + " to " + end)
                        .actualDates(actualLeaves)
                        .expectedDates(expectedLeaves)
                        .expectedNoOfDays(totalExpectedDays)
                        .actualNoOfDays(totalActualDays)
                        .expectedRevenue(expectedRevenue)
                        .actualRevenue(actualRevenue)
                        .revenueDifference(actualRevenue - expectedRevenue)
                        .dateList(datesList)
                        .build();
            }).collect(Collectors.toList());

            double expectedTotalLeaves = weekSummaryList.stream().mapToDouble(WeekRevenueSummaryResponse::getExpectedNoOfDays).sum();
            double actualTotalLeaves = weekSummaryList.stream().mapToDouble(WeekRevenueSummaryResponse::getExpectedNoOfDays).sum();
            Double expectedTotalRevenue = weekSummaryList.stream().mapToDouble(WeekRevenueSummaryResponse::getExpectedRevenue).sum();
            Double actualTotalRevenue = weekSummaryList.stream().mapToDouble(WeekRevenueSummaryResponse::getExpectedRevenue).sum();
            Double revenueDifference = weekSummaryList.stream().mapToDouble(WeekRevenueSummaryResponse::getRevenueDifference).sum();
            return EmployeeRevenueReportResponse.builder().employeeId(employee.getKey().getEmployeeId())
                    .actualNoOfDays(actualTotalLeaves)
                    .expectedRevenue(expectedTotalRevenue)
                    .actualRevenue(actualTotalRevenue)
                    .revenueDifference(revenueDifference)
                    .weeks(weekSummaryList.stream().sorted(Comparator.comparing(WeekRevenueSummaryResponse::getWeekNumber)).collect(Collectors.toList()))
                    .expectedNoOfDays(expectedTotalLeaves).build();
        }).collect(Collectors.toList());
    }
}
