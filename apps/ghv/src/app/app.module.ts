import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AUTH_STRATEGY,
  AuthModule,
  AuthStrategy,
  User,
  tokenInMemoryStorageFactory,
} from '@ghv/auth';
import { CoreModule } from '@ghv/core';
import { UiModule } from '@ghv/ui';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { CurrentUserGQL, GHVDataAccessModule } from '@ghv/viewer-data-access';
import { catchError, map, throwError } from 'rxjs';
import { LetDirective } from '@ngrx/component';

const graphqlAuthStrategy = (userGQL: CurrentUserGQL): AuthStrategy => {
  return {
    redirectAuthenticated: '/repositories',
    redirectUnauthenticated: '/login',
    login: async () => {
      return userGQL
        .fetch(undefined, { fetchPolicy: 'network-only' })
        .pipe(
          map((res) => res.data.viewer as User),
          catchError(({ networkError }) => throwError(networkError))
        )
        .toPromise();
    },
    storage: tokenInMemoryStorageFactory(),
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot({
      loggerLevel: isDevMode() ? 5 : 3,
    }),
    UiModule.forRoot(),
    GHVDataAccessModule.forRoot({
      uri: 'https://api.github.com/graphql',
    }),
    AuthModule.forRoot(),
    LetDirective,
  ],
  providers: [
    ...appConfig.providers,
    {
      provide: AUTH_STRATEGY,
      useFactory: graphqlAuthStrategy,
      deps: [CurrentUserGQL],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
