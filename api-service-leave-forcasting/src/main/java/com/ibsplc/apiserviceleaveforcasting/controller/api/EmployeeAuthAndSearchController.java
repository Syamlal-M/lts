package com.ibsplc.apiserviceleaveforcasting.controller.api;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.CSVExceptionWrapper;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.InternalServerException;
import com.ibsplc.apiserviceleaveforcasting.custom.exception.UnAuthorisedException;
import com.ibsplc.apiserviceleaveforcasting.request.EmployeeRegistrationRequest;
import com.ibsplc.apiserviceleaveforcasting.response.EmployeeResponse;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeService;
import com.ibsplc.apiserviceleaveforcasting.service.EmployeeManagementService;
import com.ibsplc.apiserviceleaveforcasting.view.BasicResponseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("api/employee")
public class EmployeeAuthAndSearchController {

    @Autowired
    EmployeeManagementService employeeManagementService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/auth")
    public ResponseEntity createEmployeeAuth(@RequestBody EmployeeRegistrationRequest request) throws InternalServerException, Exception {
        try {
            employeeManagementService.createEmployeeAuth(request);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerException(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity createEmployee(@RequestBody EmployeeRegistrationRequest request) throws InternalServerException, Exception {
        try {
            employeeService.createEmployee(request);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerException(e.getMessage());
        }
    }

    @PutMapping("/role/{employeeId}")
    public ResponseEntity assignRole(@PathVariable String employeeId, @RequestParam String roleName) throws Exception {
        try {
            employeeManagementService.updateRole(employeeId, roleName);
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage(), e);
        }

    }

    @GetMapping("")
    public ResponseEntity<EmployeeResponse> getEmployee() throws Exception {
        try {
            return ResponseEntity.ok(employeeManagementService.getEmployee());
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }
    }

    @GetMapping("export")
    public void exportEmployees(@RequestParam(required = false, defaultValue = "0") int page,
                                @RequestParam(required = false, defaultValue = "50") int limit,
                                @RequestParam(required = false) String name,
                                @RequestParam(required = false) String org,
                                @RequestParam(required = false) String team,
                                @RequestParam(required = false) String location,
                                HttpServletResponse response) throws Exception {
        response.setContentType("application/octet-stream");
        employeeService.exportEmployees(page, limit, name, org, team, location, response);
    }

    @GetMapping("default-file")
    public void exportEmployees(HttpServletResponse response) throws Exception {
        response.setContentType("application/octet-stream");
        employeeService.defaultFile(response);
    }

    @PutMapping("import")
    public BasicResponseView importEmployees(@RequestParam MultipartFile file) throws CSVExceptionWrapper, Exception {
        return employeeService.importEmployees(file);
    }

    @GetMapping("search")
    public List<EmployeeResponse> searchEmployee(@RequestParam(required = false, defaultValue = "0") int page,
                                                 @RequestParam(required = false, defaultValue = "50") int limit,
                                                 @RequestParam(required = false) String name,
                                                 @RequestParam(required = false) String org,
                                                 @RequestParam(required = false) String team,
                                                 @RequestParam(required = false) String location) {
        return employeeService.searchEmployee(page, limit, name, org, team, location);
    }

    @GetMapping("teams")
    public List<String> getTeams() {
        return employeeService.getTeams();
    }

    @GetMapping("roles")
    public List<String> getRoles() {
        return employeeService.getRoles();
    }

    @GetMapping("organisation")
    public List<String> getOrganisation() {
        return employeeService.getOrganisation();
    }
}
