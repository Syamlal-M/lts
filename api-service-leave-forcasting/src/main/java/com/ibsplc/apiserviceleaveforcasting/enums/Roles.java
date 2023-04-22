package com.ibsplc.apiserviceleaveforcasting.enums;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public enum Roles {

    SUPER_ADMIN("SUPER_ADMIN", 1),
    ADMIN("ADMIN", 5),
    TEAM_USER("TEAM_USER", 10),
    USER("USER", 15);
    private String role;
    private int priority;
    Roles(String role, int priority) {
        this.role = role;
        this.priority = priority;
    }
    public static Optional<Roles> getRole(String role) {
        return Arrays.stream(values()).filter(r -> r.role.equalsIgnoreCase(role)).findFirst();
    }

    public static Optional<Roles> getPriority(List<String> roles) {
        return Arrays.stream(values()).filter(r -> roles.contains(r.role)).sorted().findFirst();
    }
}