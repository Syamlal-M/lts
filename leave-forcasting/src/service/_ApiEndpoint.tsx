const API_ENDPOINTS = {
  LOGIN: "api/employee/login",
  GET_SIGNEDIN_USER_DETAILS: "/api/employee",
  GET_REPORT: "api/employee/leave-summary?org={:org}&team={:team}&month={:month}&year={:year}",
  GET_EMPLOYEE_LIST:
    "api/employee/search?org={:org}&team={:team}&location={:location}&name={:name}&page={:page}&limit={:limit}",
  DOWNLOAD_EMPLOYEE_INFO: "api/employee/export?org={:org}&team={:team}",
  DOWNLOAD_REPORT: "/api/employee/leave/export?org={:org}&team={:team}&month={:month}",
  PUT_EMPLOYEE: "api/employee/import?file",
  GET_ORGANIZATION_LIST: "api/employee/organisation",
  GET_LOCATION_LIST: "api/employee/roles",
  GET_ROLE_LIST: "api/employee/roles",
  GET_TEAM_LIST: "api/employee/teams",
  PUT_EMPLOYEE_LEAVES: "/api/employee/leaves/{:employeeId}",
  ASSIGN_ROLE: "api/employee/role/{:employeeId}?roleName={:roleName}",
  DOWNLOADTEMPLATE: "api/employee/default-file"
};

export default API_ENDPOINTS;
