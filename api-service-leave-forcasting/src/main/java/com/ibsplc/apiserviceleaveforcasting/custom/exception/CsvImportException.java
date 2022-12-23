/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;

/**
 *
 * @author jithin123
 */
public class CsvImportException extends RuntimeException {

    private final Object form;
    private final String message;
    private final Integer lineNo;

    public CsvImportException(Object form, String message, Integer line) {
        this.form = form;
        this.message = message;
        this.lineNo = line;
    }

    public Object getForm() {
        return form;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public Integer getLineNo() {
        return lineNo;
    }
}
