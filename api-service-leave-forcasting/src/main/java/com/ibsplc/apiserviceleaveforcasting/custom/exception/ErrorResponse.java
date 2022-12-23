/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;

import org.springframework.http.HttpStatus;

/**
 *
 * @author jithin123
 */

public class ErrorResponse {
    private String message;
    private int code;
    
    public ErrorResponse(String message, HttpStatus code){
        this.message=message;
        this.code=code.value();
    }

    
    public String getMessage() {
        return message;
    }

    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public int getCode(){
        return code;
    }
    
    public void setCode(int code){
        this.code=code;
    }
    
    
    
}
