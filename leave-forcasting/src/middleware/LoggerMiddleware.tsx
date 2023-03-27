import { AxiosInstance } from 'axios';

type Environment = 'dev' | 'prod';
const environment: Environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

function LoggerMiddleware(axiosClient: AxiosInstance): void {
    axiosClient.interceptors.request.use((request) => {
        if (environment === 'dev') {
            console.log(`[axios] Request: ${request.method?.toUpperCase()} ${request.url}`);
        }
        return request;
    });

    axiosClient.interceptors.response.use((response) => {
        if (environment === 'dev') {
            console.log(`[axios] Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
        }
        return response;
    });
}

export default LoggerMiddleware;