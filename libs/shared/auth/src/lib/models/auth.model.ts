export interface User {
  email?: string;
  name?: string;
  token: string;
}

export interface AuthState {
  error: string | null;
  pending: boolean;
  user?: User | null;
}
