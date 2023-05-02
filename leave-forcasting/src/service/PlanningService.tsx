import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";
import { UpdateLeaveQueryParams, UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
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

    updateLeave: (params: UpdateLeaveQueryParams, requestBody: UpdateLeaveRequest): Promise<any> => {
        const url: string = getApiUrl("PUT_EMPLOYEE_LEAVES", params);
        return Api.put(url, requestBody);
    },
};

export default PlanningService;