package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CustomException;
import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeRepository;
import com.ibsplc.apiserviceleaveforcasting.repository.LeaveForecastRepository;
import com.ibsplc.apiserviceleaveforcasting.service.ReportService;
import com.ibsplc.apiserviceleaveforcasting.view.EmployeeSummaryView;
import com.ibsplc.apiserviceleaveforcasting.view.LeaveSummaryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for fetching data related to leave summary report
 */
@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    LeaveForecastRepository leaveForecastRepository;

    @Autowired
    EmployeeRepository employeeRepository;


    /**
     * Fetches the leave data and relevant employee data for a particular month and year and sends it back as response
     *
     * @param duration
     * @return
     */
    @Override
    public List<EmployeeSummaryView> fetchLeaveSummary(String duration) throws CustomException {


        List<EmployeeSummaryView> employeeSummaryResponseList = new ArrayList<>();
        List<LeaveForecast> leaveSummaryResponseList = leaveForecastRepository.findByMonthYear(duration);
        if (leaveSummaryResponseList != null && leaveSummaryResponseList.size() == 0) {
            throw new CustomException("Leave records for the range is not available");
        }

            List<String> employeeIdList =  leaveSummaryResponseList.stream().map(leaveForecast -> leaveForecast.getEmployee().getEmpId()).collect(Collectors.toList());
            List<Employee> employeeList = null;
            if (employeeIdList != null && employeeIdList.size() == 0) {
                throw new CustomException("Exception in gathering employee id/s from Leave-forecast data");
            }
            employeeList = employeeRepository.findByEmpIdIn(employeeIdList);
           if (employeeList != null && employeeList.size() == 0) {
                throw new CustomException("Employee data not present in database");
            }


                for (LeaveForecast ls : leaveSummaryResponseList) {

                    LeaveSummaryView leaveSummaryResponse = new LeaveSummaryView();
                    leaveSummaryResponse.setDateList(ls.getLeaveDateList());

                    HashMap<Integer, List<String>> weekBasedDateSegMap = segregateLeavesBasedOnWeek(ls.getLeaveDateList());
                    List<HashMap<Integer, List<String>>> weekBasedDateSegMapList = new ArrayList<>();
                    weekBasedDateSegMapList.add(weekBasedDateSegMap);
                    leaveSummaryResponse.setDateBasedOnWeek(weekBasedDateSegMapList);
                    leaveSummaryResponse.setEmpId(ls.getEmployee().getEmpId());
                    leaveSummaryResponse.setLeaveSubmissionId(ls.getLsId());
                    List<LeaveSummaryView> leaveSummaryResponseList1 = new ArrayList<>();
                    leaveSummaryResponseList1.add(leaveSummaryResponse);

                    Optional<Employee> employee = employeeList.stream().filter(e -> e.getEmpId().equalsIgnoreCase(ls.getEmployee().getEmpId())).findFirst();
                    if (employee.isPresent()) {

                        EmployeeSummaryView employeeSummaryResponse = new EmployeeSummaryView();
                        employeeSummaryResponse.setEmployeeId(employee.get().getEmpId());
                        employeeSummaryResponse.setEmployeeName(employee.get().getEmployeeName());
                        employeeSummaryResponse.setOrganizationName(employee.get().getOrg());
                        employeeSummaryResponse.setTeamName(employee.get().getTeam());

                        employeeSummaryResponse.setLeaveSummaryResponseList(leaveSummaryResponseList1);
                        employeeSummaryResponseList.add(employeeSummaryResponse);
                    }
                }

            return employeeSummaryResponseList;


    }

    /**
     * Segregates the leave dates to it respective week.
     *
     * @param leaveDateList
     * @return
     */
    @Override
    public HashMap<Integer, List<String>> segregateLeavesBasedOnWeek(String leaveDateList) {

        try {
            List<String> datesList = null;
            HashMap<Integer, List<String>> weekBasedDateMap = new HashMap<>();
            String dateStrings[] = leaveDateList.split(",");
            for (String dateString : dateStrings) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate dateTime = LocalDate.parse(dateString.trim(), formatter);
                WeekFields weekFields = WeekFields.of(Locale.getDefault());
                int weekOfMonth = dateTime.get(weekFields.weekOfMonth());

                // checking if the week of month has already been added to the map;
                // if so, then add the new date.

                if (weekBasedDateMap.containsKey(weekOfMonth)) {
                    datesList = weekBasedDateMap.get(weekOfMonth);
                    datesList.add(dateString);

                }
                //adding new week number with the date that falls on the week number
                else {
                    datesList = new ArrayList<>();
                    datesList.add(dateString);
                    weekBasedDateMap.put(weekOfMonth, datesList);
                }

            }

            return weekBasedDateMap;
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Exception in segregateLeavesBasedOnWeek :: " + e.getMessage());
        }
    }
}
