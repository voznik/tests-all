import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  appErrorHandler;
  constructor(private injector: Injector) {
    this.appErrorHandler = this.injector.get(ErrorHandler);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          // const apiErr = new ApiErrorResponse(err);
          this.appErrorHandler.handleApiError(err);
          return throwError(err);
        }
        return throwError(err);
      })
    );
  }
}
