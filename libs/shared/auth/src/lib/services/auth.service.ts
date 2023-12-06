import { InjectionToken, inject } from '@angular/core';
import { Router } from '@angular/router';
import { isEmptyString, isNullOrUndefined } from '@ghv/utils';
import { BehaviorSubject, Observable, pluck } from 'rxjs';
import { AuthState, LoginPayload, User } from '../models';
import { AUTH_STRATEGY, AuthStrategy } from './auth.strategy';

type StateProps<T> = Extract<keyof T, string>;

export interface AuthService {
  select<K extends StateProps<AuthState>>(key: K): Observable<AuthState[K]>;
  select<K extends StateProps<AuthState>, P extends keyof AuthState[K]>(
    key: K,
    nested: P
  ): Observable<AuthState[K][P]>;
  readonly isAuthenticated: boolean;
  readonly token: string | undefined;
  login(payload: LoginPayload): Promise<void>;
  logout(): Promise<void>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthServiceImpl(inject(AUTH_STRATEGY), inject(Router)),
});

class AuthServiceImpl implements AuthService {
  private authState: BehaviorSubject<AuthState>;

  get state(): AuthState {
    return this.authState.getValue();
  }

  select<K extends StateProps<AuthState>>(key: K): Observable<AuthState[K]>;
  select<K extends StateProps<AuthState>, P extends keyof AuthState[K]>(
    key: K,
    nested: P
  ): Observable<AuthState[K][P]>;
  select(...keys: any[]) {
    return this.authState.pipe(pluck(...keys));
  }

  get isAuthenticated(): boolean {
    return !isNullOrUndefined(this.state.user);
  }

  get token(): string | undefined {
    return this.authStrategy.storage.getItem('token') ?? undefined;
  }

  constructor(private authStrategy: AuthStrategy, private router: Router) {
    const token = this.token;
    this.authState = new BehaviorSubject<AuthState>({
      error: undefined,
      pending: false,
      user: token ? ({ token } as User) : undefined,
    });
  }

  async login(payload: LoginPayload): Promise<void> {
    try {
      this.authStrategy.storage.setItem('token', payload.token);
      const user = await this.authStrategy.login(payload);
      if (!user) {
        throw new Error('Invalid user');
      }
      this.authState.next({
        error: undefined,
        pending: false,
        user: { ...user, token: payload.token },
      });

      this.router.navigateByUrl(this.authStrategy.redirectAuthenticated);
    } catch (error: any) {
      this.authStrategy.storage.removeItem('token');
      this.authState.next({
        error: error.error?.message || error.messag,
        pending: false,
        user: undefined,
      });
      throw new Error();
    }
  }

  async logout() {
    this.authStrategy.storage.removeItem('token');
    this.authState.next({
      error: undefined,
      pending: false,
      user: undefined,
    });
    this.router.navigateByUrl(this.authStrategy.redirectUnauthenticated);
  }
}
