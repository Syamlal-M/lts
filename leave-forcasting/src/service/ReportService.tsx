import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const ReportService = {
    fetchForecast: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("report", criteria);
        return Api.get(url, criteria);
    }
};

export default ReportService;
