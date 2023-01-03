/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import java.util.List;

import com.ibsplc.apiserviceleaveforcasting.entity.LeaveForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author Narjeesh
 *
 */
@Repository
public interface LeaveForecastRepository extends JpaRepository<LeaveForecast, Long> {
    
    @Query("SELECT l FROM LeaveForecast l INNER JOIN FETCH l.employee e "
            + " WHERE (:searchCriteria = 0) "
            + " OR(:searchCriteria = 1 AND e.org LIKE :org AND e.team LIKE :team) "
            + " OR(:searchCriteria = 2 AND e.org LIKE :org AND l.monthYear = :duration) "
            + " OR(:searchCriteria = 3 AND e.team LIKE :team AND l.monthYear = :duration) "
            + " OR(:searchCriteria = 4 AND e.org LIKE :org AND e.team LIKE :team AND l.monthYear = :duration) "
            + " OR(:searchCriteria = 5 AND e.org LIKE :org) "
            + " OR(:searchCriteria = 6 AND e.team LIKE :team) "
            + " OR(:searchCriteria = 7 AND l.monthYear = :duration)")
    public List<LeaveForecast> searchLeaveForcast(String duration, int searchCriteria, String org, String team);
	
//	List<LeaveForecast> findByEmployeeEmpId(String empId);

//	@Query("SELECT e FROM LeaveForecast e WHERE e.monthYear = :duration")
//	public List<LeaveForecast> findByMonthYear(@Param("duration")String duration);
    
    


}
