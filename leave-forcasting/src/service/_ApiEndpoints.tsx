const ENDPOINTS: Record<string, string> = {
    login: "api/user/login?userid={:userId}&password={:password}",
};

const replaceParams = (url: string, params: Record<string, string> = {}) => {
    const regex = /{:(.*?)}/g;
    const path = url ? url.replace(regex, (match, key) => params[key]) : "";
    return path;
};


const getApiUrl = (key: string, params: Record<string, string> = {}) => {
    const endpoint = ENDPOINTS[key];
    const path = encodeURI(replaceParams(endpoint, params));
    return path;
};

export { getApiUrl };