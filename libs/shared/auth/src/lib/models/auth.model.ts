export interface User {
  login?: string;
  email?: string;
  name?: string;
  token?: string;
}

export interface LoginPayload {
  type: 'token';
  token: string;
}

export interface AuthState {
  error: string | undefined;
  pending: boolean;
  user: User | undefined;
}
