import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const ReportService = {
  fetchReport: (criteria: Record<string, any> = {}) => {
    const url = getApiUrl("GET_REPORT", criteria);
    return Api.get(url, criteria);
  },

    fetchDownloadReport: (criteria: Record<string, any> = {}) => {
    const url = getApiUrl("DOWNLOAD_REPORT", criteria);
    return Api.get(url, { responseType: "blob" });
  }
};

export default ReportService;
