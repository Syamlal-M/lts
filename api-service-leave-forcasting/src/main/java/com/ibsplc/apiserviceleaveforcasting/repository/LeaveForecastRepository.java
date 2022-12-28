/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import java.util.List;

import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Narjeesh
 *
 */
@Repository
public interface LeaveForecastRepository extends JpaRepository<LeaveForecast, Long> {
	
//	List<LeaveForecast> findByEmployeeEmpId(String empId);

	@Query("SELECT e FROM LeaveForecast e WHERE e.monthYear = :duration")
	public List<LeaveForecast> findByMonthYear(@Param("duration")String duration);


}
