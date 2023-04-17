import { getApiUrl } from "utils/AccessPointUtils"
import Api from "./_Api";

const PlanningService = {
    searchEmployees: (params: Record<string, any>) => {
        let url = getApiUrl("GET_EMPLOYEE_LIST", params);
        return Api.get(url);
    }
};

export default PlanningService;