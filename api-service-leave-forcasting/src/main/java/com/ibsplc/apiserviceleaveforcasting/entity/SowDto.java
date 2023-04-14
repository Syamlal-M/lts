package com.ibsplc.apiserviceleaveforcasting.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "EmployeeSow")
public class SowDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long EmployeeOrganisationID;

    private String sow;

}
