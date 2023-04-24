import ROUTE_URLS from "pages/_RoutesUrl";
import API_ENDPOINTS from "service/_ApiEndpoint";

interface Params {
    [key: string]: string | number | boolean
}

type RouteKey = keyof typeof ROUTE_URLS;
type ApiUrlKey = keyof typeof API_ENDPOINTS;

const replaceParams = (url: string, params: Params = {}, regex: RegExp): string => {
    const path = url ? url.replace(regex, (_, key) => String(params[key] || "")) : "";
    return path;
};

const getRouteUrl = (key: RouteKey, params: Params = {}): string => {
    const regex = /:(.*?)/g;
    const endpoint = ROUTE_URLS[key];
    const path = replaceParams(endpoint, params, regex);
    return path;
};

const getApiUrl = (key: ApiUrlKey, params: Params = {}): string => {
    const regex = /{:(.*?)}/g;
    const endpoint = API_ENDPOINTS[key];
    const path = encodeURI(replaceParams(endpoint, params, regex));
    return path;
};

export type { Params };

export {
    getApiUrl,
    getRouteUrl
};