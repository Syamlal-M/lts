import Api from "./_Api";
import { getApiUrl } from "utils/AccessPointUtils";
import { SigninRequest, SigninResponse } from "types/api/employee/Authentication.types";

const AuthenticationService = {
  login: (request: SigninRequest): Promise<SigninResponse> => {
    const url = getApiUrl("LOGIN");
    return Api.post(url, request);
  }
};

export default AuthenticationService;
