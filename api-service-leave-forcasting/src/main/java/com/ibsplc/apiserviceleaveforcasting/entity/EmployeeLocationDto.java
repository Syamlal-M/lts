package com.ibsplc.apiserviceleaveforcasting.entity;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "EmployeeLocation")
public class EmployeeLocationDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long EmployeeLocationID;

    private String location;
}
