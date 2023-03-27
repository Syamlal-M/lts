export function getApiBaseUrl() {
    const DEFAULT_URL = "http://localhost:8080";

    return process.env.REACT_APP_API_BASE_URL || DEFAULT_URL;
}

export function getDefaultApiHeaders() {
    return { "Authorization": "Bearer <Token>" }
}