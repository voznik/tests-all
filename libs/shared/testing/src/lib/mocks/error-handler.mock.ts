import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerMock implements ErrorHandler {
  handleError(error: any): void {}
}
