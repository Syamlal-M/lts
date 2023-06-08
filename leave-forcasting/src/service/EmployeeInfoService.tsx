import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const EmployeeService = {
    fetchEmployee: (criteria: any) => {
        let url = getApiUrl("PUT_EMPLOYEE");
        return Api.put(url, criteria);
    },

    fetchTemplate: async (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("DOWNLOADTEMPLATE", criteria);
      return Api.get(url, { responseType: "blob" });
    },

    fetchEmployeeSummary: (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("GET_EMPLOYEE_LIST", criteria);
      return Api.get(url, criteria);
  },

    fetchEmployeeDownload: (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("DOWNLOAD_EMPLOYEE_INFO", criteria);
      return Api.get(url, { responseType: "blob" });
  }
};

export default EmployeeService;