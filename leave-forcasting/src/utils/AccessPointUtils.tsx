import RoutesUrl from "pages/_RoutesUrl";
import ApiEndpoint from "service/_ApiEndpoint";

const replaceParams = (url: string, params: Record<string, string> = {}, regex: RegExp) => {
    const path = url ? url.replace(regex, (_, key) => params[key]) : "";
    return path;
};

const getRouteUrl = (key: string, params: Record<string, string> = {}) => {
    const regex = /:(.*?)/g;
    const endpoint = RoutesUrl[key];
    const path = replaceParams(endpoint, params, regex);
    return path;
};

const getApiUrl = (key: string, params: Record<string, string> = {}) => {
    const regex = /{:(.*?)}/g;
    const endpoint = ApiEndpoint[key];
    const path = encodeURI(replaceParams(endpoint, params, regex));
    return path;
};

export {
    getApiUrl,
    getRouteUrl
};