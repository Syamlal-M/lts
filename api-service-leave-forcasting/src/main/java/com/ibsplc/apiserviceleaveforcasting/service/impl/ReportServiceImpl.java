package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.Status;
import com.ibsplc.apiserviceleaveforcasting.mapper.LeaveForecastMapper;
import com.ibsplc.apiserviceleaveforcasting.model.DateWithMonth;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.response.*;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
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
    public List<EmployeeLeaveReportResponse> fetchLeaveSummary(String month, String year, String organization, String team) throws InternalServerException {

        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> queryResult = getEmployeeLeaveForcastDtos(month, year, organization, team);
        return queryResult.entrySet().stream().map(LeaveForecastMapper::map).collect(Collectors.toList());
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
    public List<EmployeeRevenueReportResponse> fetchRevenueSummary(String month, String year, String organization, String team) throws InternalServerException {
        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> groupedReport = getEmployeeLeaveForcastDtos(month, year, organization, team);

        return groupedReport.entrySet().stream().map(employee -> {
            Map<Integer, List<EmployeeLeaveForcastDto>> groupedWeek = employee.getValue()
                    .stream().collect(groupingBy(l -> l.getFromDate().get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())));

            List<WeekRevenueSummaryResponse> weekSummaryList = groupedWeek.entrySet().stream().map((weekNumber) -> {
                LocalDate week = LocalDate.now().with(ChronoField.ALIGNED_WEEK_OF_YEAR, weekNumber.getKey());
                LocalDate start = week.with(DayOfWeek.MONDAY);
                LocalDate end = week.with(DayOfWeek.FRIDAY);
                List<LeaveDetailResponse> leaveDetails = weekNumber.getValue().stream().map(LeaveForecastMapper::getLeaveDetailResponse).collect(Collectors.toList());
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

    @Override
    public void exportLeaveSummary(String month, String year, String org, String team, HttpServletResponse response) throws IOException {
        List<EmployeeLeaveReportResponse> leaveReport = fetchLeaveSummary(month, year, org, team);
        LocalDate startDate = LocalDate.parse("2023-01-21");
        List<DateWithMonth> startAndEnd = Stream.iterate(LocalDate.parse("2023-01-21"), date -> date.plusMonths(1))
                .limit(ChronoUnit.MONTHS.between(startDate, LocalDate.now().plusMonths(6)) + 1)
                .map(localDa -> DateWithMonth.builder().month(localDa.getMonth().name()).year(localDa.getYear()).build())
                .collect(Collectors.toList());
        XSSFWorkbook workbook = new XSSFWorkbook();
        try {
            workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("report");
            writeHeaderLine(workbook, sheet, startAndEnd);
            writeDataLines(workbook, sheet, leaveReport, startAndEnd);
            ServletOutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
        } finally {
            workbook.close();
            response.getOutputStream().close();
        }
    }

    @Override
    public List<EmployeeLeaveReportResponse> fetchLeaveForecastSummaryForEmployee(String employeeId) {
        List<EmployeeLeaveForcastDto> updatedLeaves = leaveForecastRepository.findAll(hasLeaveForecastByEmployeeId(employeeId));
        Map<EmployeeInfoDto, List<EmployeeLeaveForcastDto>> employeeMap =
                updatedLeaves.stream().collect(groupingBy(EmployeeLeaveForcastDto::getEmployee));
        return employeeMap.entrySet().stream().map(LeaveForecastMapper::map).collect(Collectors.toList());
    }

    private void writeDataLines(XSSFWorkbook workbook, XSSFSheet sheet, List<EmployeeLeaveReportResponse> leaveReport, List<DateWithMonth> startAndEnd) {
        AtomicInteger rowNumber = new AtomicInteger(1);
        AtomicInteger employeeCount = new AtomicInteger(1);
        leaveReport.forEach(employee -> {
            Row row = sheet.createRow(rowNumber.get());
            AtomicInteger columnCount = new AtomicInteger();
            createCell(row, columnCount.getAndIncrement(), Integer.toString(employeeCount.get()), null, sheet);
            createCell(row, columnCount.getAndIncrement(), employee.getEmployeeId(), null, sheet);
            createCell(row, columnCount.getAndIncrement(), employee.getEmailId(), null, sheet);
            createCell(row, columnCount.getAndIncrement(), employee.getEmployeeName(), null, sheet);
            AtomicBoolean commentSet = new AtomicBoolean(false);
            startAndEnd.forEach(monthAndYear -> {
                Optional<MonthLeaveSummaryResponse> month = filterByMonth(employee, monthAndYear);
                    if(month.isPresent()) {
                        Cell cell = createCell(row, columnCount.getAndIncrement(), Double.valueOf(month.get().getNoOfDays()).toString(), null, sheet);
                        MonthLeaveSummaryResponse monthValue = month.get();
                        String dates = monthValue.getDateList().stream().reduce((s, s1) -> s +",").get();
                        if(!commentSet.get()) {
                            commentSet.set(true);
                            addComment(sheet, cell, dates);
                        }
                    } else {
                        createCell(row, columnCount.getAndIncrement(), "0", null, sheet);
                    }
            });
            employeeCount.getAndIncrement();
            rowNumber.getAndIncrement();
        });
    }

    private Optional<MonthLeaveSummaryResponse> filterByMonth(EmployeeLeaveReportResponse employee, DateWithMonth monthAndYear) {
        return employee.getYear().stream().filter(year -> year.getYear().equalsIgnoreCase(Integer.toString(monthAndYear.getYear())))
                .findFirst()
                .stream().map(YearLeaveSummaryResponse::getMonth)
                .flatMap(Collection::stream)
                .filter(m -> m.getMonth().equalsIgnoreCase(monthAndYear.getMonth()))
                .findFirst();
    }

    private void writeHeaderLine(XSSFWorkbook workbook, XSSFSheet sheet, List<DateWithMonth> startAndEnd) {
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        List<String> datesHeader = startAndEnd.stream()
                .map(date -> (date.getMonth().length() > 3 ? date.getMonth().substring(0, 3) : date.getMonth()) + "-" + date.getYear())
                .collect(Collectors.toList());
        List<String> headers = new ArrayList<>(List.of("SNo", "EmpId", "EmailId", "EmployeeName"));
        headers.addAll(datesHeader);
        int index = 0;
        for (String header : headers) {
            createCell(row, index, header, style, sheet);
            index++;
        }
    }

    private Cell createCell(Row row, int columnCount, Object value, CellStyle style, XSSFSheet sheet) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue((String) value);
        }
        if (style != null) cell.setCellStyle(style);
        return cell;
    }

    private void addComment(XSSFSheet sheet, Cell cell, String comment) {
        Drawing<?> drawing = cell.getSheet().createDrawingPatriarch();
        CreationHelper factory = sheet.getWorkbook().getCreationHelper();
        ClientAnchor anchor = factory.createClientAnchor();
        Comment comment1 = drawing.createCellComment(anchor);
        RichTextString str1 = factory.createRichTextString(comment);
        comment1.setString(str1);
        cell.setCellComment(comment1);
    }
}
