import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const EmployeeSummaryService = {
    fetchForecast: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("GET_EMPLOYEE_LIST", criteria);
        return Api.get(url, criteria);
    }
};

export default EmployeeSummaryService;