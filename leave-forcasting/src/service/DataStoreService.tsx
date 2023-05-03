import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils"
import { TeamListResponse } from "types/api/employee/Team.types";
import { RoleListResponse } from "types/api/employee/Role.types";
import { LocationListResponse } from "types/api/employee/Location.types";
import { OrganizationListResponse } from "types/api/employee/Organization.types";

const DataStoreService = {
    getOrganizationList: (): Promise<OrganizationListResponse> => {
        const url: string = getApiUrl("GET_ORGANIZATION_LIST");
        return Api.get(url);
    },

    getTeamList: (): Promise<TeamListResponse> => {
        const url: string = getApiUrl("GET_TEAM_LIST");
        return Api.get(url);
    },

    getLocationList: (): Promise<LocationListResponse> => {
        const url: string = getApiUrl("GET_LOCATION_LIST");
        return Api.get(url);
    },

    getRoleList: (): Promise<RoleListResponse> => {
        const url: string = getApiUrl("GET_ROLE_LIST");
        return Api.get(url);
    },
};

export default DataStoreService;