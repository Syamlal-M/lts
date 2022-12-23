/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;

//import org.springframework.web.bind.annotation.ControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 *
 * @author jithin123
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(CSVExceptionWrapper.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse csvExceptonWrapperHandlerHandler(CSVExceptionWrapper e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        return error;  
    }
    
    @ExceptionHandler(CustomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse customExceptionHandlerHandler(CustomException e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        return error;  
    }
}
