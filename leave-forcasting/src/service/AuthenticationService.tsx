import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";

const AuthenticationService = {
    login: (userDetails: Record<string, any> = {}) => {
        let url = getApiUrl("login", userDetails);
        return Api.get(url, userDetails);
    },

    register: () => { },

    logout: () => { }
};

export default AuthenticationService;
