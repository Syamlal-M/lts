import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const ReportService = {
  fetchForecast: (criteria: Record<string, any> = {}) => {
    const url = getApiUrl("GET_REPORT", criteria);
    return Api.get(url, criteria);
  }
};

export default ReportService;
