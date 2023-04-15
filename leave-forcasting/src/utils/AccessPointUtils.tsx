import RoutesUrl from "pages/_RoutesUrl";
import ApiEndpoint from "service/_ApiEndpoint";

interface IParams {
    [key: string]: string | number | boolean
}

type RouteKey = keyof typeof RoutesUrl;
type ApiUrlKey = keyof typeof ApiEndpoint;

const replaceParams = (url: string, params: IParams = {}, regex: RegExp): string => {
    const path = url ? url.replace(regex, (_, key) => String(params[key])) : "";
    return path;
};

const getRouteUrl = (key: RouteKey, params: IParams = {}): string => {
    const regex = /:(.*?)/g;
    const endpoint = RoutesUrl[key];
    const path = replaceParams(endpoint, params, regex);
    return path;
};

const getApiUrl = (key: ApiUrlKey, params: IParams = {}): string => {
    const regex = /{:(.*?)}/g;
    const endpoint = ApiEndpoint[key];
    const path = encodeURI(replaceParams(endpoint, params, regex));
    return path;
};

export type { IParams };

export {
    getApiUrl,
    getRouteUrl
};