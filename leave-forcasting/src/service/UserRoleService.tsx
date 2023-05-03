import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const UserRoleService = {
    fetchUserRole: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("GET_EMPLOYEE_LIST", criteria);
        return Api.get(url, criteria);
    },

    assignRole: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("ASSIGN_ROLE", criteria);
        return Api.put(url, criteria);
    },
};

export default UserRoleService;
