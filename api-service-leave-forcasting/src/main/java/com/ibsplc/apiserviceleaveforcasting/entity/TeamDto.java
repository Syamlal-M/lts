package com.ibsplc.apiserviceleaveforcasting.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Team")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;
    private String teamName;

}
