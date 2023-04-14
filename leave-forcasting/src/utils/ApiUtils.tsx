import { getToken } from "./CookieUtils";

function getApiBaseUrl(): string {
    const DEFAULT_URL = "";
    return process.env.REACT_APP_API_URL || DEFAULT_URL;
}

function getDefaultApiHeaders(): Record<string, string> {
    const token = getToken('token');
    return token ? { "Authorization": token } : {}
}

export {
    getApiBaseUrl,
    getDefaultApiHeaders
}
