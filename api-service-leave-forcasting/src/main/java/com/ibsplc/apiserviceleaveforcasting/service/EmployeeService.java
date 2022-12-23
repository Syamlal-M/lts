/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.service;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jithin123
 */
public interface EmployeeService {
    
    public BasicResponseView importEmployees(MultipartFile file) throws CSVExceptionWrapper, Exception;
    
}
