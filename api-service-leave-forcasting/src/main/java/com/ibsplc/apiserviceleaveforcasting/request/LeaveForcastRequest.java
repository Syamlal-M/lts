package com.ibsplc.apiserviceleaveforcasting.request;


import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class LeaveForcastRequest {

    private String empId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private PlanningType planningType;
}
