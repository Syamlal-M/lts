/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service.impl;

import com.ibsplc.apiserviceleaveforcasting.service.TestService;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import org.springframework.stereotype.Service;

/**
 *
 * @author jithin123
 */
@Service
public class TestServiceImpl implements TestService{

    @Override
    public BasicResponseView test() {
        return new BasicResponseView(true);
    }
    
}
