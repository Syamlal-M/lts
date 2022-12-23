/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ibsplc.apiserviceleaveforcasting.util;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CsvImportException;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

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
}
