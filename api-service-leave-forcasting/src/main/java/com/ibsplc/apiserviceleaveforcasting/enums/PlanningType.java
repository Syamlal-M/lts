package com.ibsplc.apiserviceleaveforcasting.enums;

import java.util.Arrays;
import java.util.Optional;

public enum PlanningType {
    EXPECTED_WITH_LEAVES("EXPECTED_WITH_LEAVES"),
    ACTUAL("ACTUAL"),
    EXPECTED_NO_LEAVES("EXPECTED_NO_LEAVES");

    private String planningType;

    PlanningType(String planningType) {
        this.planningType = planningType;
    }


    public static Optional<PlanningType> getPlanningType(String planningType) {
        return Arrays.stream(values()).filter(p -> p.planningType.equalsIgnoreCase(planningType)).findFirst();
    }
}
