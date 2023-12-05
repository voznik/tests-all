/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('Storage Token');

export const tokenStorageFactory = (): Storage => {
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
