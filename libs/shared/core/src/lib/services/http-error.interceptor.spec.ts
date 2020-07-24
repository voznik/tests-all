import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ErrorHandler } from '@angular/core';
// import { ModalServiceMock } from '@pentegra/testing';
// import { UiModalService } from '@pentegra/ui';
import {
  ApiResponseData,
  DEMO_EXCEPTION_ERROR_RESPONSE,
  ApiErrorResponse,
} from '../models';
import { AppErrorHandler } from './app-error-handler.service';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { Logger, LOGGER_LEVEL, LoggerLevel } from './logger.service';

const testUrl = '/api/profiles/current';

describe('HttpErrorInterceptor', () => {
  describe('intercept', () => {
    let errorHandler: AppErrorHandler;
    let errorInterceptor: HttpErrorInterceptor;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let handleApiErrorSpy;
    let store: MockStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          Logger,
          HttpErrorInterceptor,
          { provide: ErrorHandler, useClass: AppErrorHandler },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
          },
          {
            provide: LOGGER_LEVEL,
            useValue: LoggerLevel.DEBUG,
          },
          {
            provide: UiModalService,
            useClass: ModalServiceMock,
          },
          provideMockStore(),
        ],
      });
      store = TestBed.inject(MockStore);
      httpClient = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
      errorInterceptor = TestBed.inject(HttpErrorInterceptor);
      errorHandler = TestBed.inject(ErrorHandler) as AppErrorHandler;
    });

    it('When 401 or 403, user is handled by AppErrorHandler out and error is rethrow', () => {
      handleApiErrorSpy = jest.spyOn(errorHandler, 'handleApiError');
      const errorResponse = {
        errorType: 'EXCEPTION',
        errorCode: 20,
        error: { title: '', errorMessage: 'Unauthorized' },
        errorFields: null,
      };
      const apeErrorResponse = new ApiErrorResponse(errorResponse);

      // Make an HTTP GET request
      httpClient.get<ApiResponseData<any>>(testUrl).subscribe(
        (res) => fail('should have failed with the 401 error'),
        (error) => {
          expect(error).toEqual(apeErrorResponse);
          expect(handleApiErrorSpy).toHaveBeenCalled();
          expect(handleApiErrorSpy).toHaveBeenCalledTimes(1);
        }
      );

      // The following `expectOne()` will match the request's URL.
      const req = httpMock.expectOne(testUrl);
      // Respond with mock error
      req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
      httpMock.verify();
    });
  });
});
