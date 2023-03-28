export function getApiBaseUrl() {
    const DEFAULT_URL = "";

    return process.env.REACT_APP_API_BASE_URL || DEFAULT_URL;
}

export function getDefaultApiHeaders() {
    return { "Authorization": "Bearer <Token>" }
}