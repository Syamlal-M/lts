import Cookies from 'universal-cookie';

type Token = Record<any, any>;

type TokenConfig = {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean;
};

const DEFAULT_CONFIG: TokenConfig = {
    path: '/',
    httpOnly: false,
};

function setToken(token: Token, config: TokenConfig = {}) {
    const cookies = new Cookies();
    const options = Object.assign({}, DEFAULT_CONFIG, config);

    Object.entries(token).forEach(([key, value]) => {
        cookies.set(key, value, options);
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