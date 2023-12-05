import { InjectionToken, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState, User } from '../models';
import { STORAGE } from './storage.service';
import { Router } from '@angular/router';

export interface AuthService {
  authState$: Observable<AuthState>;
  currentUser: Observable<User | null>;
  login(payload: User, redirect: string): Promise<void>;
  logout(): Promise<void>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthServiceImpl(inject(STORAGE), inject(Router)),
});

export const AUTH_REDIRECT = new InjectionToken<string>('RedirectAfterLogin');

class AuthServiceImpl implements AuthService {
  private authState: BehaviorSubject<AuthState>;
  public authState$: Observable<AuthState>;

  get currentUser(): Observable<User | null> {
    return this.authState$.pipe(map((state) => state.user || null));
  }

  constructor(private tokenStorage: Storage, private router: Router) {
    const stored = this.tokenStorage.getItem('token');
    this.authState = new BehaviorSubject<AuthState>({
      error: null,
      pending: false,
      user: stored ? (JSON.parse(stored) as User) : null,
    });
    this.authState$ = this.authState.asObservable();
  }

  async login(payload: User, redirect: string): Promise<void> {
    this.tokenStorage.setItem('token', JSON.stringify(payload.token));
    this.authState.next({
      error: null,
      pending: false,
      user: payload,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    // redirect after login
    this.router.navigateByUrl(redirect);
  }

  async logout() {
    this.tokenStorage.removeItem('token');
    this.authState.next({
      error: null,
      pending: false,
      user: null,
    });
  }
}
