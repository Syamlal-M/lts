package com.ibsplc.apiserviceleaveforcasting.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.ibsplc.apiserviceleaveforcasting.enums.Action;
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

    private String empId;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate fromDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate toDate;
    private PlanningType planningType;
    private Optional<Action> action;
}
