package com.ibsplc.apiserviceleaveforcasting.response;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ibsplc.apiserviceleaveforcasting.enums.SpanType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class LeaveDetailResponse {

    private Long leaveForcastId;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate fromDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate toDate;
    private double noOfDays;
    private String month;

    private SpanType spanType;
    private int year;
    private String planningType;

    private boolean exceptional;
    private String reason;

    @JsonIgnore
    private List<String> dateList;
}
