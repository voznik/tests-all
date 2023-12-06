/* eslint-disable @typescript-eslint/no-unused-vars */
import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import {
  RouterFeatures,
  provideRouter,
  withDebugTracing,
  withDisabledInitialNavigation,
} from '@angular/router';
import { TOP_LEVEL_MENU } from '@ghv/ui';
import { appRoutes } from './app.routes';

const REPOSITORIES_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'repositories',
    icon: 'star',
    label: 'Top Repositories',
    route: '/repositories',
  },
  multi: true,
};

const ISSUES_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'issues',
    icon: 'network-globe',
    label: 'Issues',
    route: '/issues',
  },
  multi: true,
};

const handleDarkTheme = (document: Document) => {
  return () => {
    if (
      (document.defaultView as Window).matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    ) {
      document.body.setAttribute('cds-theme', 'dark');
    }
    return Promise.resolve();
  };
};

const routerFeatures: RouterFeatures[] = [withDisabledInitialNavigation()];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      ...routerFeatures.concat(isDevMode() ? withDebugTracing() : [])
    ),
    REPOSITORIES_MENU,
    {
      provide: APP_INITIALIZER,
      useFactory: handleDarkTheme,
      deps: [DOCUMENT],
      multi: true,
    },
  ],
};
