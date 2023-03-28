package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.Employee;
import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import org.springframework.cglib.core.Predicate;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class CustomerSpecifications {

    public static Specification<LeaveForecast> hasOrganisation(String organisation) {
        return (root, query, criteriaBuilder) -> {
            Join<LeaveForecast, Employee> authorsBook = root.join("employee");
            return criteriaBuilder.like(authorsBook.get("org"), organisation);
        };
    }

    public static Specification<LeaveForecast> hasTeam(String team) {
        return (root, query, criteriaBuilder) -> {
            Join<LeaveForecast, Employee> authorsBook = root.join("employee");
            return criteriaBuilder.like(authorsBook.get("team"), team);
        };
    }

    public static Specification<LeaveForecast> hasMonthYear(String monthYear) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("monthYear"), monthYear);
    }
}
