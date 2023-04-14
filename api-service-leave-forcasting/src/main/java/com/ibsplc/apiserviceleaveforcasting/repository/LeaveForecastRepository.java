/**
 * 
 */
package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeLeaveForcastDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * @author Narjeesh
 *
 */
@Repository
public interface LeaveForecastRepository extends JpaRepository<EmployeeLeaveForcastDto, Long>, JpaSpecificationExecutor {
    

}
