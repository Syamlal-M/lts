package com.ibsplc.apiserviceleaveforcasting.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class YearLeaveSummaryResponse {

    private  String year;

    private List<MonthLeaveSummaryResponse> month;

    private double noOfDays;
}
