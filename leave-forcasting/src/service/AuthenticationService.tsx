import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";
import { IRequest, IResponse } from "types/api/employee/Login.types";

const AuthenticationService = {
    login: (request: IRequest): Promise<IResponse> => {
        const url = getApiUrl("LOGIN");
        return Api.post(url, request);
    },

    register: () => { },

    logout: () => { }
};

export default AuthenticationService;
