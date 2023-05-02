import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

import { RoleListResponse } from "types/api/employee/Role.types";

const UserRoleService = {
    fetchUserRole: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("GET_EMPLOYEE_LIST", criteria);
        return Api.get(url, criteria);
    },
    getRoleList: (): Promise<RoleListResponse> => {
        const url: string = getApiUrl("GET_ROLE_LIST");
        return Api.get(url);
    },
    assignRole: (criteria: Record<string, any> = {}) => {
         let url = getApiUrl("ASSIGN_ROLE", criteria);
         return Api.put(url, criteria);
    },
};

export default UserRoleService;
