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
public class BadRequestException extends RuntimeException {

  private Object data;
  
  public BadRequestException() {
  }

  public BadRequestException(String msg) {
    super(msg);
  }

  public BadRequestException(Throwable cause) {
    super(cause);
  }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
    
  public BadRequestException(Object data, String msg) {
        super(msg);
        this.data = data;
    }
}
