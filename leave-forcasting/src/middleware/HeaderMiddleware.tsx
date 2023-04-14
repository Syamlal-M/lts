import { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

type CallbackHeaders = () => Record<string, string>;

function HeaderMiddleware(axiosClient: AxiosInstance, callback: CallbackHeaders): void {
    axiosClient.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        const headers = callback();
        request.headers = {
            ...request.headers,
            ...headers,
        } as AxiosRequestHeaders;
        return request;
    });
}

export default HeaderMiddleware;