/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { Logger } from '@ghv/core';
import { UiDialogService } from '@ghv/ui';
import { AUTH_SERVICE } from './auth.service';

export const hasAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const authService = inject(AUTH_SERVICE);
  const logger: Logger = inject(Logger);
  const dialogService: UiDialogService = inject(UiDialogService);
  const hasAuth = authService.isAuthenticated;
  logger.log('hasAuthGuard =>', hasAuth);
  if (!hasAuth) {
    dialogService.showAlert({
      type: 'warning',
      // title: 'Unauthorized',
      message: 'You are not authorized to view this page.',
      icon: 'exclamation-triangle',
    });
    return createUrlTreeFromSnapshot(next, ['/', 'login']);
  }
  return hasAuth;
};
