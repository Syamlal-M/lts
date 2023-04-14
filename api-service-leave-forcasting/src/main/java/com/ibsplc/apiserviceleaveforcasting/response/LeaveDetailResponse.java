package com.ibsplc.apiserviceleaveforcasting.response;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class LeaveDetailResponse {

    private LocalDate fromDate;
    private LocalDate toDate;
    private int noOfDays;
    private String month;
    private int year;
    private String planningType;

    @JsonIgnore
    private List<String> dateList;
}
