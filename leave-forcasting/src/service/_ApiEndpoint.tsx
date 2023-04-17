const API_ENDPOINTS = {
    LOGIN: "api/employee/login",
    GET_REPORT: "api/leave-summary?duration={:duration}&org={:org}&team={:team}",
    GET_EMPLOYEE_LIST: "api/employee/search?org={:org}&team={:team}&location={:location}&name={:name}&page={:page}&limit={:limit}",
    GET_EMPLOYEE_SUMMARY: "api/employee/search?limit=50",
    PUT_EMPLOYEE: "api/employee/import?file"
};

export default API_ENDPOINTS;