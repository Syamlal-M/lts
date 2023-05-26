import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const EmployeeService = {
    fetchEmployee: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("PUT_EMPLOYEE", criteria);
        return Api.put(url, criteria);
    },

    fetchTemplate: async (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("DOWNLOADTEMPLATE", criteria);
      return Api.get(url, {headers: {"Content-Type": 'application/octet-stream'} });
    },

    fetchEmployeeSummary: (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("GET_EMPLOYEE_LIST", criteria);
      return Api.get(url, criteria);
  },

    fetchEmployeeDownload: (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("DOWNLOAD_EMPLOYEE_INFO", criteria);
      return Api.get(url, {headers: {"Content-Type": 'application/octet-stream'} });
  }
};

export default EmployeeService;