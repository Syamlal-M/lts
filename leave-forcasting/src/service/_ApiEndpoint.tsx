const API_ENDPOINTS = {
    LOGIN: "api/employee/login",
    GET_REPORT: "api/leave-summary?duration={:duration}&org={:org}&team={:team}",
    GET_EMPLOYEE_LIST: "api/employee/search?org={:org}&team={:team}&location={:location}&name={:name}&page={:page}&limit={:limit}",
};

export default API_ENDPOINTS;