import { InjectionToken } from '@angular/core';
import { User } from '../models';

export const tokenInMemoryStorageFactory = (): Storage => {
  let value: string = '';
  return {
    length: 0,
    clear: () => (value = ''),
    getItem: (_) => value,
    key: () => null,
    removeItem: () => (value = ''),
    setItem: (_, v) => (value = v),
  };
};

export interface AuthStrategy {
  readonly redirectAuthenticated: string;
  readonly redirectUnauthenticated: string;
  storage: Storage;
  login(payload: any): Promise<User | undefined>;
}

const defaultAuthStrategy: AuthStrategy = {
  redirectAuthenticated: '/',
  redirectUnauthenticated: '/login',
  login: (payload) => Promise.resolve({} as User),
  storage: tokenInMemoryStorageFactory(),
};

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy>('AUTH_STRATEGY', {
  providedIn: 'root',
  factory: () => defaultAuthStrategy,
});
