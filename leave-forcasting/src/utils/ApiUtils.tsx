function getApiBaseUrl() {
    const DEFAULT_URL = "";
    return process.env.REACT_APP_API_URL || DEFAULT_URL;
}

function getDefaultApiHeaders() {
    return { "Authorization": "Bearer <Token>" }
}

export {
    getApiBaseUrl,
    getDefaultApiHeaders
}
