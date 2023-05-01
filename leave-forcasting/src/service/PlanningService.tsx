import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";
import { LeaveSummaryQueryParams, LeaveSummaryResponse } from "types/api/employee/LeaveSummary.types";
import { EmployeeSearchQueryParams, EmployeeSearchResponse } from "types/api/employee/EmployeeSearch.types";

const PlanningService = {
    searchEmployees: (params: EmployeeSearchQueryParams): Promise<EmployeeSearchResponse> => {
        const url: string = getApiUrl("GET_EMPLOYEE_LIST", params);
        return Api.get(url);
    },

    getLeaveSummary: (params: LeaveSummaryQueryParams): Promise<LeaveSummaryResponse> => {
        const url: string = getApiUrl("GET_REPORT", params);
        return Api.get(url);
    },
};

export default PlanningService;