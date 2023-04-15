const ApiEndpoint = {
    login: "api/employee/login",
    report: "api/leave-summary?duration={:duration}&org={:org}&team={:team}",
    searchEmployees: "api/employee/search?org={:org}&team={:team}&location={:location}&name={:name}&page={:page}&limit={:limit}",
};

export default ApiEndpoint;