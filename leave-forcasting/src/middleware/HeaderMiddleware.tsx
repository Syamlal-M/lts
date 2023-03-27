import { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

type Headers = Record<string, string>;

function HeaderMiddleware(axiosClient: AxiosInstance, headers: Headers): void {
    axiosClient.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        request.headers = {
            ...request.headers,
            ...headers,
        } as AxiosRequestHeaders;
        return request;
    });
}

export default HeaderMiddleware;