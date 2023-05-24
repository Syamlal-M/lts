import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const EmployeeService = {
    fetchEmployee: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("PUT_EMPLOYEE", criteria);
        return Api.put(url, criteria);
    },

    fetchTemplate: async (criteria: Record<string, any> = {}) => {
      let url = getApiUrl("TEMPLATE", criteria);
      return Api.get(url, {headers: {"Content-Type": 'application/octet-stream'} });
    },
};

export default EmployeeService;