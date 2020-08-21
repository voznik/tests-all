import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AuthServiceIntf, AuthState } from '../models';

export class AuthService implements AuthServiceIntf {
  private authState: BehaviorSubject<AuthState>;
  public authState$: Observable<AuthState>;

  constructor() {
    const user = JSON.parse(window.sessionStorage.getItem('user')) || null;
    this.authState = new BehaviorSubject<AuthState>({
      error: null,
      pending: false,
      user,
    });
    this.authState$ = this.authState.asObservable();
  }

  login(payload: { email: string }): void {
    const user = {
      email: payload.email,
      name: payload.email.split('@')[0],
    };
    window.sessionStorage.setItem('user', JSON.stringify(user));
    this.authState.next({
      error: null,
      pending: false,
      user,
    });
  }

  logout() {
    window.sessionStorage.removeItem('user');
    this.authState.next({
      error: null,
      pending: false,
      user: null,
    });
  }

  get currentUser() {
    return this.authState$.pipe(pluck('user'));
  }
}

export function authServiceFactory(): AuthServiceIntf {
  return new AuthService();
}
