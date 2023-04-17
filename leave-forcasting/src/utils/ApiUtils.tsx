import PERMISSIONS from "data/Permissions";
import { getToken } from "./CookieUtils";
import { Permission } from "types/Route";

function getApiBaseUrl(): string {
    const DEFAULT_URL = "http://localhost:8080/";
    return process.env.REACT_APP_API_URL || DEFAULT_URL;
}

function getDefaultApiHeaders(): Record<string, string> {
    const token = getToken('token');
    return token ? { "Authorization": token } : {}
}

function isAutheticated(): boolean {
    return Boolean(getToken('token'));
}

function hasPermission(permission: Permission, permissionList: string[] = getToken('access')): boolean {
    permissionList = permissionList || [];
    return permissionList.includes(PERMISSIONS[permission]);
}

export {
    isAutheticated,
    hasPermission,
    getApiBaseUrl,
    getDefaultApiHeaders
}
