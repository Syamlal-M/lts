/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;

//import org.springframework.web.bind.annotation.ControllerAdvice;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOG = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    @ExceptionHandler(CSVExceptionWrapper.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse csvExceptonWrapperHandlerHandler(CSVExceptionWrapper e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        LOG.error(error.getMessage(), e.getCause());
        return error;  
    }
    
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse badRequestHandler(BadRequestException e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        LOG.error(error.getMessage(), e.getCause());
        return error;  
    }

    @ExceptionHandler(InternalServerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse customExceptionHandlerHandler(InternalServerException e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        LOG.error(error.getMessage(), e.getCause());
        return error;
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse validationException(ValidationException e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        LOG.error(error.getMessage(), e.getCause());
        return error;
    }

    @ExceptionHandler(UnAuthorisedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse unAuthorisedException(InternalServerException e, HttpServletRequest req){
        ErrorResponse error = new ErrorResponse(e.getMessage(), HttpStatus.UNAUTHORIZED);
        LOG.error(error.getMessage());
        return error;
    }
}
