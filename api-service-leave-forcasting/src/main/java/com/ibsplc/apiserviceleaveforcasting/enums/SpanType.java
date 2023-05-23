package com.ibsplc.apiserviceleaveforcasting.enums;

public enum SpanType {
    HALF("HALF"),
    FULL("FULL");

    private String coverageType;
    SpanType(String planningType) {
        this.coverageType = planningType;
    }

}
