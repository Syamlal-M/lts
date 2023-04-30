package com.ibsplc.apiserviceleaveforcasting.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.apache.poi.xssf.usermodel.XSSFRow;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class EmployeeRegistrationRequest {
    @NotEmpty(message = "Emp Id must not be null or empty")
    private String employeeId;
    private String password;
    @NotEmpty(message = "EmailId must not be null or empty")
    private String emailId;
    private String role;
    @NotEmpty(message = "Employee Name must not be null or empty")
    private String employeeName;
    @NotEmpty(message = "Expedia FG Name must not be null or empty")
    private String expediaFgName;
    @NotEmpty(message = "Vendor Name must not be null or empty")
    private String vendorName;
    @NotEmpty(message = "Job Title must not be null or empty")
    private String jobTitle;
    @NotEmpty(message = "HM must not be null or empty")
    private String hm;
    @Positive(message = "Should be positive")
    private Double billRate;
    @NotEmpty(message = "Country must not be null or empty")
    private String country;
    @NotEmpty(message = "City must not be null or empty")
    private String city;
    @NotEmpty(message = "SOW must not be null or empty")
    private String sow;
    @NotEmpty(message = "Org must not be null or empty")
    private String org;
    @NotEmpty(message = "Team must not be null or empty")
    private String team;
    @NotEmpty(message = "Billability must not be null or empty")
    private String billability;
    private String remarks;

    public EmployeeRegistrationRequest(XSSFRow row){
        this.employeeId = row.getCell(0) != null ? row.getCell(0).toString().trim() : null;
        this.employeeName = row.getCell(1) != null ? row.getCell(1).toString().trim() : null;
        this.expediaFgName = row.getCell(2) != null ? row.getCell(2).toString().trim() : null;
        this.vendorName = row.getCell(3) != null ? row.getCell(3).toString().trim() : null;
        this.jobTitle = row.getCell(4) != null ? row.getCell(4).toString().trim() : null;
        this.hm = row.getCell(5) != null ? row.getCell(5).toString().trim() : null;
        this.billRate = row.getCell(6) != null ? Double.valueOf(row.getCell(6).toString().trim()) : null;
        this.country = row.getCell(7) != null ? row.getCell(7).toString().trim() : null;
        this.city = row.getCell(8) != null ? row.getCell(8).toString().trim() : null;
        this.sow = row.getCell(9) != null ? row.getCell(9).toString().trim() : null;
        this.org = row.getCell(10) != null ? row.getCell(10).toString().trim() : null;
        this.team =  row.getCell(11) != null ? row.getCell(11).toString().trim() : null;
        this.billability = row.getCell(12) != null ? row.getCell(12).toString().trim() : null;
        this.remarks = row.getCell(13) != null ? row.getCell(13).toString().trim() : null;
    }

}
