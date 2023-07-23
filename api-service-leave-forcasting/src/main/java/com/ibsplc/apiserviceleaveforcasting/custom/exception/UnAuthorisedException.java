package com.ibsplc.apiserviceleaveforcasting.custom.exception;

public class UnAuthorisedException extends RuntimeException {

    public UnAuthorisedException(String message) {
        super(message);
    }
}
