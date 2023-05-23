package com.ibsplc.apiserviceleaveforcasting.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.ibsplc.apiserviceleaveforcasting.enums.Action;
import com.ibsplc.apiserviceleaveforcasting.enums.SpanType;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Optional;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class LeaveForcastRequest {

    private Optional<Long> leaveForcastId;

    private String empId;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate fromDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate toDate;
    private PlanningType planningType;

    private boolean exceptional;
    private Optional<SpanType> span;
    private Action action;
}
