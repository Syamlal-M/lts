package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.OrganisationDto;
import com.ibsplc.apiserviceleaveforcasting.entity.TeamDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrganisationRepository extends JpaRepository<OrganisationDto, String> {
}
