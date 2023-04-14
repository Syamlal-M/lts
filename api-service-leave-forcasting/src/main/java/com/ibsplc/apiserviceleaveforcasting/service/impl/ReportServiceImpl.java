package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.response.*;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
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

        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> groupedReport = getEmployeeLeaveForcastDtos(month, year, organization, team);

        return groupedReport.entrySet().stream().map(emp -> {
            Map<Integer, List<EmployeeLeaveForcastDto>> groupedWeek = emp.getValue()
                    .stream().collect(groupingBy(l -> l.getFromDate().get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())));

            List<WeekLeaveSummaryResponse> weekSummaryList = groupedWeek.entrySet().stream().map((weekNumber) -> {
                LocalDate week = LocalDate.now().with(ChronoField.ALIGNED_WEEK_OF_YEAR, weekNumber.getKey());
                LocalDate start = week.with(DayOfWeek.MONDAY);
                LocalDate end = week.with(DayOfWeek.FRIDAY);
                List<LeaveDetailResponse> leaveDetails = weekNumber.getValue()
                        .stream().map(ReportServiceImpl::getLeaveDetailResponse).collect(Collectors.toList());
                int totalNoOfDaysInWeek = leaveDetails.stream().mapToInt(LeaveDetailResponse::getNoOfDays).sum();
                List<String> datesList  = leaveDetails.stream().flatMap(ld -> ld.getDateList().stream()).collect(Collectors.toList());
                return WeekLeaveSummaryResponse.builder().weekNumber(weekNumber.getKey())
                        .leaveDates(leaveDetails)
                        .startAndEndDate(start + " to " + end)
                        .noOfDays(totalNoOfDaysInWeek)
                        .dateList(datesList)
                        .build();
            }).collect(Collectors.toList());

            int totalLeaves = weekSummaryList.stream().mapToInt(days -> Math.toIntExact(days.getNoOfDays())).sum();
            return EmployeeLeaveReportResponse.builder().employeeId(emp.getKey().getEmployeeId())
                    .employeeName(emp.getKey().getEmployeeName())
                    .weeks(weekSummaryList.stream().sorted(Comparator.comparing(WeekLeaveSummaryResponse::getWeekNumber)).collect(Collectors.toList())).noOfDays(totalLeaves).build();
        }).collect(Collectors.toList());
    }

    private static LeaveDetailResponse getLeaveDetailResponse(EmployeeLeaveForcastDto leaveByWeek) {
        List<String> dateString = Stream.iterate(leaveByWeek.getFromDate(), date -> date.plusDays(1))
                .limit(ChronoUnit.DAYS.between(leaveByWeek.getFromDate(), leaveByWeek.getToDate()) + 1)
                .map(LocalDate::toString).collect(Collectors.toList());
        ;
        return LeaveDetailResponse.builder()
                .month(leaveByWeek.getMonth())
                .noOfDays(leaveByWeek.getNoOfDays())
                .fromDate(leaveByWeek.getFromDate())
                .toDate(leaveByWeek.getToDate())
                .dateList(dateString)
                .year(leaveByWeek.getYear())
                .planningType(leaveByWeek.getPlanningType()).build();
    }

    private Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> getEmployeeLeaveForcastDtos(String month, String year, String organization, String team) {
        List<EmployeeLeaveForcastDto> leaveSummaryResponseList = leaveForecastRepository.findAll(hasLeaveForecastByOrganisation(organization)
                .or((hasLeaveForecastByMonth(month).and(hasLeaveForecastByYear(year)))
                        .or(hasLeaveForecastByTeam(team))));
        return leaveSummaryResponseList.stream().collect(groupingBy(leave -> leave.getEmployee()));

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
                List<LeaveDetailResponse> expectedLeaves = leaveDetails.stream().filter(l ->  l.getPlanningType().equalsIgnoreCase(PlanningType.EXPECTED.name())).collect(Collectors.toList());
                List<LeaveDetailResponse> actualLeaves = leaveDetails.stream().filter(l ->  l.getPlanningType().equalsIgnoreCase(PlanningType.ACTUAL.name())).collect(Collectors.toList());
                int totalExpectedDays = expectedLeaves.stream().mapToInt(LeaveDetailResponse::getNoOfDays).sum();
                int totalActualDays = actualLeaves.stream().mapToInt(LeaveDetailResponse::getNoOfDays).sum();
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

            int expectedTotalLeaves = weekSummaryList.stream().mapToInt(days -> Math.toIntExact(days.getExpectedNoOfDays())).sum();
            int actualTotalLeaves = weekSummaryList.stream().mapToInt(days -> Math.toIntExact(days.getExpectedNoOfDays())).sum();
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
