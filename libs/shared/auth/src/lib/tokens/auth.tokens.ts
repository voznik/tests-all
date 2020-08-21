import { InjectionToken } from '@angular/core';
import { AuthServiceIntf } from '../models';
import { authServiceFactory } from '../services/auth.service';

/** Injection token for the session storage service. */
export const AUTH_SERVICE = new InjectionToken<AuthServiceIntf>(
  'AUTH_SERVICE',
  { providedIn: 'root', factory: authServiceFactory }
);

export const AUTH_REDIRECT = new InjectionToken<string>('RedirectAfterLogin');
