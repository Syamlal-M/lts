import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const EmployeeService = {
    fetchEmployee: (criteria: Record<string, any> = {}) => {
        let url = getApiUrl("PUT_EMPLOYEE", criteria);
        return Api.put(url, criteria);
    }
};

export default EmployeeService;