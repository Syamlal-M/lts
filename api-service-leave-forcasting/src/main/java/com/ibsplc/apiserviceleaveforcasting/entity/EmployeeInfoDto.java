/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibsplc.apiserviceleaveforcasting.entity;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

/**
 *
 * @author jithin123
 */

@Getter
@NoArgsConstructor
@Setter
@Builder
@AllArgsConstructor
@Entity
@Table(name = "EmployeeInfo")
@EqualsAndHashCode
public class EmployeeInfoDto implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long employeeInfoId;
    @Column(unique = true)
    private String employeeId;
    @Column(unique = true)
    private String emailId;
    private String employeeName;
    private String nameInClientRecords;
    private String vendorName;
    @ManyToOne(cascade = {CascadeType.ALL})
    private JobTitleDto jobTitle;
    private String hm;
    private Double billRate;
    private String currency;
    @ManyToOne(cascade = {CascadeType.ALL})
    private CountryDto country;
    @ManyToOne(cascade = {CascadeType.ALL})
    private EmployeeLocationDto city;
    @ManyToOne(cascade = {CascadeType.ALL})
    private SowDto sow;
    @ManyToOne(cascade = {CascadeType.ALL})
    private OrganisationDto org;
    @ManyToOne(cascade = {CascadeType.ALL})
    private TeamDto team;
    private String billability;
    private String remarks;
    private String password;
    private LocalDateTime created;
    private LocalDateTime updated;
    @ManyToOne(fetch = FetchType.EAGER)
    private EmployeeRole role;

}
