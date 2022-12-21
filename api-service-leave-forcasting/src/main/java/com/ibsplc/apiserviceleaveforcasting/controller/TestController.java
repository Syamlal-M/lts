/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.controller;

import com.ibsplc.apiserviceleaveforcasting.service.TestService;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jithin123
 */
@RestController
@RequestMapping("test")
public class TestController {
    @Autowired
    private TestService testService;
    
    @GetMapping
    public BasicResponseView test(){
        return testService.test();
    }
    
}
