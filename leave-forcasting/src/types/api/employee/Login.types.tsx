interface IRequest {
    username: string,
    password: string,
}

interface Role {
    [key: string]: string;
}

interface IResponse {
    username: string;
    userId: string;
    token: string;
    role: Role;
    access: string[];
}

export type { IRequest, IResponse };