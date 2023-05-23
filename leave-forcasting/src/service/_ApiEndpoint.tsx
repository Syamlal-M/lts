const API_ENDPOINTS = {
    LOGIN: "api/employee/login",
    GET_REPORT: "api/employee/leave-summary?org={:org}&team={:team}&month={:month}&year={:year}",
    GET_EMPLOYEE_LIST: "api/employee/search?org={:org}&team={:team}&location={:location}&name={:name}&page={:page}&limit={:limit}",
    GET_EMPLOYEE_SUMMARY: "api/employee/search?org={:org}&team={:team}",
    GET_EMPLOYEE_INFO_DOWNLOAD: "api/employee/export?org={:org}&team={:team}",
    PUT_EMPLOYEE: "api/employee/import?file",
    GET_ORGANIZATION_LIST: "api/employee/organisation",
    GET_LOCATION_LIST: "api/employee/roles",
    GET_ROLE_LIST: "api/employee/roles",
    GET_TEAM_LIST: "api/employee/teams",
    PUT_EMPLOYEE_LEAVES: "/api/employee/leaves/{:employeeId}",
    ASSIGN_ROLE: "api/employee/role/{:employeeId}?roleName={:roleName}",
    TEMPLATE: "api/employee/default-file"
};

export default API_ENDPOINTS;