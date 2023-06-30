package com.ibsplc.apiserviceleaveforcasting.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DateWithMonth {
    private String month;
    private int year;
}
