import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppErrorHandler } from './app-error-handler.service';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  appErrorHandler;
  constructor(private injector: Injector) {
    this.appErrorHandler = this.injector.get(ErrorHandler);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          // const apiErr = new ApiErrorResponse(err);
          (this.appErrorHandler as AppErrorHandler).handleApiError(err);
          return throwError(err);
        }
        return throwError(err);
      })
    );
  }
}
