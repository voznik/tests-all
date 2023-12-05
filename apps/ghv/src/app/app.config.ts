import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { TOP_LEVEL_MENU } from '@ghv/ui';

const REPOSITORIES_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'repositories',
    icon: 'credit-card',
    label: 'Repositories',
    route: '/repositories',
  },
  multi: true,
};

export const ISSUES_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'issues',
    icon: 'network-globe',
    label: 'Issues',
    route: '/issues',
  },
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), REPOSITORIES_MENU, ISSUES_MENU],
};
