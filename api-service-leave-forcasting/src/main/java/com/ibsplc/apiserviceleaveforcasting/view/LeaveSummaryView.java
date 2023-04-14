package com.ibsplc.apiserviceleaveforcasting.view;

import lombok.*;

import java.util.HashMap;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LeaveSummaryView {

    private Long leaveSubmissionId;
    private String empId;
    private String empName;
    private String dateList;
    private List<HashMap<Integer, List<String>>> dateBasedOnWeek;

}
