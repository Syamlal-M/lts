package com.ibsplc.apiserviceleaveforcasting.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class WeekLeaveSummaryResponse {

    private Integer weekNumber;
    private List<LeaveDetailResponse> leaveDates;
    private String startAndEndDate;
    private int noOfDays;

    private List<String> dateList;
}
