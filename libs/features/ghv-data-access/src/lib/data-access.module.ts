import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  isDevMode,
} from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS, APOLLO_FLAGS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { onError } from '@apollo/client/link/error';
import { UiDialogService } from '@ghv/ui';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

export const GQL_URL = new InjectionToken<string>('BaseUrl');

export function createApollo(
  httpLink: HttpLink,
  uri: string,
  dialogService: UiDialogService
): ApolloClientOptions<any> {
  const http = httpLink.create({ uri });
  const error = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        dialogService.showAlert({
          type: 'danger',
          title: 'GraphQL error',
          message: `Message: ${message},
          Location: ${locations}, Path: ${path}`,
        });
      });

    if (networkError) {
      const status = (networkError as HttpErrorResponse).status;
      if (
        status == HttpStatusCode.Unauthorized ||
        status == HttpStatusCode.Forbidden
      ) {
        // handled by auth interceptor
        return;
      }
      dialogService.showAlert({
        type: 'danger',
        title: 'Network error',
        message: `Name: ${networkError.name},
        Message: ${networkError.message}`,
      });
    }
  });

  const link = error.concat(http);

  return {
    link,
    cache: new InMemoryCache(),
    connectToDevTools: isDevMode(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  imports: [ApolloModule],
})
export class GHVDataAccessModule {
  static forRoot(
    options: {
      uri: string;
    } = {
      uri: 'http://localhost/graphql',
    }
  ): ModuleWithProviders<GHVDataAccessModule> {
    return {
      ngModule: GHVDataAccessModule,
      providers: [
        {
          provide: GQL_URL,
          useValue: options.uri,
        },
        {
          provide: APOLLO_FLAGS,
          useValue: {
            // useInitialLoading: true,
          },
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink, GQL_URL, UiDialogService],
        },
      ],
    };
  }
}
