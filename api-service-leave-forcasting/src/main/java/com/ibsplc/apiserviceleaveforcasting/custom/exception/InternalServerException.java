/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.custom.exception;


/**
 *
 * @author jithin123
 */
public class InternalServerException extends RuntimeException {
    private String message;
    public InternalServerException(){}
    public InternalServerException(String message){
        super(message);
        this.message = message;
    }


    public InternalServerException(String message, Exception e) {
        super(message, e);
    }
}
