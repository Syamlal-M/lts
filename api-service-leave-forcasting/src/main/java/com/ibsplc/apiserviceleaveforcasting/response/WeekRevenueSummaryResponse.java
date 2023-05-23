package com.ibsplc.apiserviceleaveforcasting.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class WeekRevenueSummaryResponse {
    private Integer weekNumber;

    private String startAndEndDate;
    private List<LeaveDetailResponse> expectedDates;
    private List<LeaveDetailResponse> actualDates;
    private double expectedNoOfDays;
    private double actualNoOfDays;
    private Double expectedRevenue;
    private Double actualRevenue;
    private Double revenueDifference;
    private List<String> dateList;
}
