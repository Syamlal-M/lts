/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import java.util.List;

import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author Narjeesh
 *
 */
@Repository
public interface LeaveForecastRepository extends JpaRepository<LeaveForecast, Long>, JpaSpecificationExecutor {
    

}
