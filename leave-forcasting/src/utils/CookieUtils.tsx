import Cookies from 'universal-cookie';

type Token = Record<any, any>;

const DEFAULT_CONFIG = {
    path: '/',
    httpOnly: false,
};

function setToken(token: Token, config: Token = DEFAULT_CONFIG) {
    const cookies = new Cookies();

    Object.entries(token).forEach(([key, value]) => {
        cookies.set(key, value, config);
    });
}

function getToken(key: string) {
    const cookies = new Cookies();
    return cookies.get(key);
}

function resetToken(): void {
    const cookies = new Cookies();
    const allCookies = cookies.getAll();

    Object.keys(allCookies).forEach((cookieName: string) => {
        cookies.remove(cookieName);
    });
}

export {
    getToken,
    setToken,
    resetToken
}