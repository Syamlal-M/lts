/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.view;

/**
 *
 * @author jithin123
 */
public class BasicResponseView {
    
private Object response;

  public BasicResponseView() {
    this.response = true;
  }

  public BasicResponseView(Object response) {
    this.response = response;
  }

  public Object getResponse() {
    return response;
  }

  public void setResponse(Object response) {
    this.response = response;
  }
  
  
}
