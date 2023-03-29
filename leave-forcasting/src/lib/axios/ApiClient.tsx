import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Headers = Record<string, string>;

interface ApiResponse<T> {
    data: T | null;
    error?: string | null;
}

class ApiClient {
    private readonly client: AxiosInstance;

    constructor(baseURL: string, defaultHeaders?: Headers) {
        this.client = axios.create({
            baseURL,
            headers: defaultHeaders,
        });
    }

    private async request<T>(method: HttpMethod, url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.client.request<T>({
                method,
                url,
                data,
                ...config,
            });
            return { data: response.data };
        } catch (error: any) {
            if (error.response?.data?.error) {
                return { data: null, error: error.response.data.error };
            } else {
                return { data: null, error: error.message };
            }
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('GET', url, undefined, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('POST', url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('PUT', url, data, config);
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('PATCH', url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', url, undefined, config);
    }

    public getInstance(): AxiosInstance {
        return this.client;
    }
}

export default ApiClient;