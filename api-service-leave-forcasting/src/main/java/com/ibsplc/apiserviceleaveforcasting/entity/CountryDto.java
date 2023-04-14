package com.ibsplc.apiserviceleaveforcasting.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "CountryDto")
public class CountryDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long CountryDtoID;
    private String country;
}
