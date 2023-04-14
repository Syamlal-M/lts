package com.ibsplc.apiserviceleaveforcasting.entity;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "EmployeeJobTitle")
public class JobTitleDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long EmployeeJobTitleID;

    private String jobTitle;
}
