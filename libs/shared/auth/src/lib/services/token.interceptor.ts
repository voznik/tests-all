import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AUTH_SERVICE, AuthService } from './auth.service';
import { UiDialogService } from '@ghv/ui';

type RequestUpdate = {
  headers?: HttpHeaders | undefined;
  setHeaders?: Record<string, string | string[]> | undefined;
};

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private authService: AuthService = inject(AUTH_SERVICE);
  private dialogService: UiDialogService = inject(UiDialogService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    const requestUpdate: RequestUpdate = {};
    if (token) {
      requestUpdate.setHeaders = {
        Authorization: `token ${token}`,
      };
    }
    request = request.clone(requestUpdate);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === HttpStatusCode.Unauthorized ||
          error.status === HttpStatusCode.Forbidden
        ) {
          const message = error.error?.message || error.message;
          this.dialogService.showAlert({
            message,
            type: 'danger',
            action: {
              title: 'Documentation',

              link: (error as any).documentation_url,
            },
          });
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
