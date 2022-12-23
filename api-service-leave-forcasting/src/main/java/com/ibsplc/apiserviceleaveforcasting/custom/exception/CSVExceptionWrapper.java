/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author jithin123
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class CSVExceptionWrapper extends RuntimeException {
    private final Integer lineNo;

    public CSVExceptionWrapper(Integer lineNo, String msg) {
        super(msg+" at row number "+ lineNo);
        this.lineNo = lineNo;
    }

    public Integer getLineNo() {
        return lineNo;
    }
}
