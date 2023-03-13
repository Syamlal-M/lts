package com.ibsplc.apiserviceleaveforcasting.config;

import com.ibsplc.apiserviceleaveforcasting.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class StartupInit {

    @Autowired
    UserManagementService service;

    @EventListener(ContextRefreshedEvent.class)
    public void contextRefreshedEvent() {
        service.registerUser("A-100", "user","password", "user@gmail.com");
        service.assignRole("A-100", "ADMIN");
    }
}
