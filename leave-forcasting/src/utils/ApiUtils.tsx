import PERMISSIONS from "data/Permissions";
import { getToken } from "./CookieUtils";
import { Permission } from "types/Route";

function getApiBaseUrl(): string {
    const DEFAULT_URL = "http://localhost:8080/";
    return process.env.REACT_APP_API_URL || DEFAULT_URL;
}

function getDefaultApiHeaders(): Record<string, string> {
    const token = getToken('accessToken');
    return token ? { "Authorization": token } : {}
}

function isAutheticated(): boolean {
    return Boolean(getToken('accessToken'));
}

function getPermissionList(): string[] {
    let permissionList: string[] = [];
    try {
        const role = JSON.parse(JSON.stringify(getToken('role')));
        permissionList = role.permissionsList.map((p: any) => (p.permissionName));
    } catch (e) {
        permissionList = [];
    }
    return permissionList;
}

function hasPermission(permission: Permission, permissionList: string[] = getPermissionList()): boolean {
    permissionList = permissionList || [];
    return permissionList.includes(PERMISSIONS[permission]);
}

export {
    isAutheticated,
    hasPermission,
    getApiBaseUrl,
    getDefaultApiHeaders
}
