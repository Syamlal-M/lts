import { getApiUrl } from "utils/AccessPointUtils"
import Api from "./_Api";

const PlanningService = {
    searchEmployees: (params: Record<string, any>) => {
        let url = getApiUrl("searchEmployees", params);
        return Api.get(url);
    }
};

export default PlanningService;