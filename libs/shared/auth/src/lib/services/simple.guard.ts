import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { STORAGE } from './storage.service';

export function isLoggedInGuard(): CanActivateFn {
  const tokenStorage: Storage = inject(STORAGE);
  return (): boolean | Promise<boolean> => {
    return tokenStorage.getItem('token') !== null;
  };
}
