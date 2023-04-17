import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils"
import { TeamListResponse } from "types/api/employee/Team.types";
import { LocationListResponse } from "types/api/employee/Location.types";
import { OrganizationListResponse } from "types/api/employee/Organization.types";

const PlanningService = {
    searchEmployees: (params: Record<string, any>) => {
        const url: string = getApiUrl("GET_EMPLOYEE_LIST", params);
        return Api.get(url);
    },

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
};

export default PlanningService;