import { Observable } from 'rxjs';

export interface AuthServiceIntf {
  authState$: Observable<AuthState>;
  currentUser: Observable<User>;
  login(payload: { email: string }): void;
  logout(): void;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  error: string | null;
  pending: boolean;
  user: User | null;
}
