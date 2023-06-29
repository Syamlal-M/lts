import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { getRouteUrl } from "utils/AccessPointUtils";
import { resetToken } from "utils/CookieUtils";

function ResponseStatusMiddleware(axiosClient: AxiosInstance): void {
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful responses here
      return response.data;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        // Handle bad responses here
      } else if (error.response && error.response.status === 401) {
        // Handle unauthorized responses here
        resetToken();
        window.location.href = getRouteUrl("SIGN_IN");
      } else if (error.response && error.response.status === 404) {
        // Handle not found responses here
      } else if (error.response && error.response.status === 500) {
        // Handle server error responses here
      } else {
        // Handle other error responses here
      }
      return Promise.reject(error.response?.data ? error.response.data : error);
    }
  );
}

export default ResponseStatusMiddleware;
