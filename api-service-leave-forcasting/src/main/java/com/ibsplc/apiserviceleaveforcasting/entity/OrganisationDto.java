package com.ibsplc.apiserviceleaveforcasting.entity;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "EmployeeOrganisation")
public class OrganisationDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long EmployeeOrganisationID;

    private String organisation;
}
