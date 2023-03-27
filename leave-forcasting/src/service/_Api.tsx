import ApiClient from "lib/axios/ApiClient";
import HeaderMiddleware from "middleware/HeaderMiddleware";
import LoggerMiddleware from "middleware/LoggerMiddleware";
import { getApiBaseUrl, getDefaultApiHeaders } from "utils";

const API_BASE_URL = getApiBaseUrl();
const DEFAULT_HEADER = getDefaultApiHeaders();

const Api = new ApiClient(API_BASE_URL).getInstance();

LoggerMiddleware(Api);
HeaderMiddleware(Api, DEFAULT_HEADER);

export default Api;