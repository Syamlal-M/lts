import ApiClient from "lib/axios/ApiClient";
import HeaderMiddleware from "middleware/HeaderMiddleware";
import LoggerMiddleware from "middleware/LoggerMiddleware";
import ResponseStatusMiddleware from "middleware/ResponseStatusMiddleware";
import { getApiBaseUrl, getDefaultApiHeaders } from "utils/ApiUtils";

const API_BASE_URL = getApiBaseUrl();
const DEFAULT_HEADER = getDefaultApiHeaders();

const Api = new ApiClient(API_BASE_URL).getInstance();

LoggerMiddleware(Api);
HeaderMiddleware(Api, DEFAULT_HEADER);
ResponseStatusMiddleware(Api);

export default Api;