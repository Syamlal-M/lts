const ApiEndpoint: Record<string, string> = {
    login: "api/user/login?userid={:userId}&password={:password}",
    report: "api/leave-summary?duration={:duration}&org={:org}&team={:team}"
};

export default ApiEndpoint;