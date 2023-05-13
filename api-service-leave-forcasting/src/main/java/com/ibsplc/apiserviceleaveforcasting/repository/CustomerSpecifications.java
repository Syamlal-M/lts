package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import com.ibsplc.apiserviceleaveforcasting.entity.OrganisationDto;
import com.ibsplc.apiserviceleaveforcasting.entity.TeamDto;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import java.time.LocalDate;

public class CustomerSpecifications {

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByOrganisation(String organisation) {
        return (root, query, criteriaBuilder) -> {
            Join<EmployeeLeaveForcastDto, EmployeeInfoDto> employee = root.join("employee");
            Join<EmployeeInfoDto, OrganisationDto> organisationTable = employee.join("org");
            return criteriaBuilder.like(organisationTable.get("organisation"), "%" + organisation + "%");
        };
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByEmployeeName(String employeeName) {
        return (root, query, criteriaBuilder) -> {
            Join<EmployeeLeaveForcastDto, EmployeeInfoDto> employee = root.join("employee");
            return criteriaBuilder.like(employee.get("employeeName"), "%" + employeeName + "%");
        };
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByEmployeeId(String employeeId) {
        return (root, query, criteriaBuilder) -> {
            Join<EmployeeLeaveForcastDto, EmployeeInfoDto> employee = root.join("employee");
            return criteriaBuilder.equal(employee.get("employeeId"), employeeId);
        };
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByCity(String city) {
        return (root, query, criteriaBuilder) -> {
            Join<EmployeeLeaveForcastDto, EmployeeInfoDto> employee = root.join("employee");
            return criteriaBuilder.like(employee.get("city"), "%" + city + "%");
        };
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByTeam(String team) {
        return (root, query, criteriaBuilder) -> {
            Join<EmployeeLeaveForcastDto, EmployeeInfoDto> employee = root.join("employee");
            Join<EmployeeInfoDto, TeamDto> teamTable = employee.join("team");
            return criteriaBuilder.like(teamTable.get("teamName"), "%" + team + "%");
        };
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByMonth(String month) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("month"), month);
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByStatus(String status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByFromDate(LocalDate fromDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("fromDate"), fromDate);
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByToDate(LocalDate toDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("toDate"), toDate);
    }

    public static Specification<EmployeeLeaveForcastDto> hasLeaveForecastByYear(String year) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("year"), year);
    }


    public static Specification<EmployeeInfoDto> hasEmployeesByEmployeeName(String employeeName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("employeeName"), "%"+employeeName+"%");
    }

    public static Specification<EmployeeInfoDto> hasEmployeesByOrganisation(String organisation) {
        return (root, query, criteriaBuilder) -> {
            Join<OrganisationDto, EmployeeInfoDto> employee = root.join("org");
            return criteriaBuilder.like(employee.get("organisation"), "%"+organisation+"%");
        };
    }

    public static Specification<EmployeeInfoDto> hasEmployeesByTeam(String team) {
        return (root, query, criteriaBuilder) -> {
            Join<TeamDto, EmployeeInfoDto> employee = root.join("team");
            return criteriaBuilder.like(employee.get("teamName"), "%"+team+"%");
        };
    }

    public static Specification<EmployeeInfoDto> hasEmployeesByEmpId(String empId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("employeeId"), "%"+empId+"%");
    }
}
