interface Role {
  [key: string]: string;
}

interface SigninRequest {
  employeeId: string;
  password: string;
}

interface SigninResponse {
  username: string;
  userId: string;
  token: string;
  role: Role;
  access: string[];
}

export type { SigninRequest, SigninResponse };
