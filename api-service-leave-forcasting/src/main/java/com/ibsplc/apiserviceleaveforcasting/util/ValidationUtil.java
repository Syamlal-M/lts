/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ibsplc.apiserviceleaveforcasting.util;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CsvImportException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.ValidationException;
import com.ibsplc.apiserviceleaveforcasting.enums.PlanningType;
import com.ibsplc.apiserviceleaveforcasting.enums.SpanType;
import com.ibsplc.apiserviceleaveforcasting.request.LeaveForcastRequest;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import static java.time.temporal.ChronoUnit.DAYS;

/**
 *
 * @author jithin123
 */
public class ValidationUtil {

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    public static <T> void validate(List<T> objects) {
        if (objects != null) {
            for(int i = 0; i < objects.size(); i++) {
                validateObject(i, objects.get(i));
            }
        }
    }

    private static <T> void validateObject(Integer index, T o) {
        Set<ConstraintViolation<T>> violations = validator.validate(o);
        if (violations != null && !violations.isEmpty()) {
            String firstViolation = violations.stream()
                            .map(cv -> cv.getMessage()).findFirst()
                            .orElse("ERROR_IN_CSV");
            throw new CsvImportException(o, firstViolation, index);
        }
    }

    public static void validateLeaveForecast(List<LeaveForcastRequest> leaveForecast) {
        List<String> errors = new ArrayList<>();
        List<LeaveForcastRequest> expectedLeaves = leaveForecast.stream().filter(l -> !(l.getPlanningType() != null && l.getPlanningType().equals(PlanningType.ACTUAL))).collect(Collectors.toList());
        validateOverlappingIncomingDates(expectedLeaves, errors);
        validateFromAndToDate(leaveForecast, errors);
        validatePastDates(expectedLeaves, errors);
        validateHalfDayLeave(expectedLeaves, errors);
        if(!errors.isEmpty()) {
            throw new ValidationException("ERRORS: " + String.join(", ", errors));
        }
    }

    private static void validateHalfDayLeave(List<LeaveForcastRequest> expectedLeaves, List<String> errors) {
        expectedLeaves.forEach(leave -> {
            if(DAYS.between(leave.getFromDate(), leave.getToDate()) > 0 && Objects.equals(leave.getSpan(), Optional.of(SpanType.HALF))) {
                String msg = "Half day can span only 1 day " + leave.getFromDate() + " toDate " + leave.getToDate();
                errors.add(msg);
            }
        });
    }

    private static void validatePastDates(List<LeaveForcastRequest> leaveForecast, List<String> errors) {
        leaveForecast.forEach(leave -> {
            if(leave.getFromDate().isBefore(LocalDate.now()) || leave.getToDate().isBefore(LocalDate.now())) {
                String msg = "ToDate in past FromDate: " + leave.getFromDate() + " toDate " + leave.getToDate();
                errors.add(msg);
            }
        });
    }

    private static void validateFromAndToDate(List<LeaveForcastRequest> leaveForecast, List<String> errors) {
        leaveForecast.forEach(leave -> {
            if(leave.getToDate().isBefore(leave.getFromDate())) {
                String msg = "ToDate in past FromDate: " + leave.getFromDate() + " toDate " + leave.getToDate();
                errors.add(msg);
            }
        });
    }

    private static List<String> validateOverlappingIncomingDates(List<LeaveForcastRequest> leaveForecast, List<String> errors) {
        for(int outerIndex = 0; outerIndex < leaveForecast.size(); outerIndex ++) {
            LeaveForcastRequest leaveRequest = leaveForecast.get(outerIndex);
            for(int innerIndex = 1; innerIndex < leaveForecast.size() && outerIndex != innerIndex; innerIndex ++) {
                LeaveForcastRequest leaveRequest1 = leaveForecast.get(innerIndex);
                if ((leaveRequest1.getFromDate().isBefore(leaveRequest.getToDate()) || leaveRequest1.getFromDate().isEqual(leaveRequest.getToDate())) &&
                        (leaveRequest1.getToDate().isEqual(leaveRequest.getFromDate()) || leaveRequest1.getToDate().isAfter(leaveRequest.getFromDate()))) {
                    String fromDate = leaveRequest.getFromDate().toString();
                    String toDate = leaveRequest.getToDate().toString();
                    String fromDate1 = leaveRequest1.getFromDate().toString();
                    String toDate1 = leaveRequest1.getToDate().toString();
                    String msg = "Overlapping FromDate: " + fromDate + " toDate " + toDate + " FromDate1: " + fromDate1 + " toDate1 " + toDate1;
                    errors.add(msg);
                }
            }
        };
        return errors;
    }
}
