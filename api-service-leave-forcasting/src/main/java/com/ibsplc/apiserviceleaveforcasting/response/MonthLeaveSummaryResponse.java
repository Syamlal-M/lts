package com.ibsplc.apiserviceleaveforcasting.response;


import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MonthLeaveSummaryResponse {

    private String month;
    private List<LeaveDetailResponse> leaveDates;
    private String startAndEndDate;
    private int noOfDays;

    private String planningType;

    private List<String> dateList;
}
