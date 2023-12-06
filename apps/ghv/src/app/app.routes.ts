/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'repositories',
    loadChildren: () =>
      import('@ghv/viewer-repositories').then((m) => m.ReposModule),
  },
  {
    path: '',
    redirectTo: 'repositories',
    pathMatch: 'full',
  },
];
