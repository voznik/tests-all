/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route } from '@angular/router';
import { STORAGE, isLoggedInGuard } from '@ghv/auth';

export const appRoutes: Route[] = [
  // { path: 'welcome', component: WelcomeComponent },
  {
    path: 'repositories',
    loadComponent: () =>
      import('@ghv/ghv-repositories').then((m) => m.GhvRepositoriesComponent),
    canLoad: [isLoggedInGuard],
  },
  {
    path: 'issues',
    loadComponent: () =>
      import('@ghv/ghv-issues').then((m) => m.GhvIssuesComponent),
    canLoad: [isLoggedInGuard],
  },
  {
    path: '',
    redirectTo: 'repositories',
    pathMatch: 'full',
  },
];
