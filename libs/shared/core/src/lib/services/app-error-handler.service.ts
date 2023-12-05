// tslint:disable:prefer-const quotemark
import { ErrorHandler, Injectable, Injector } from '@angular/core';
// import { UiModalService } from '../../../../ui/src/lib/services/ui-modal.service';
// import { ApiErrorResponse } from '../models';
import { Logger } from './logger.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  // private _modalService: UiModalService;
  constructor(private injector: Injector, private logger: Logger) {
    super();
  }

  /**
   *
   * Handling all errors, print logs, etc
   */
  handleApiError(error: HttpErrorResponse) {
    // handle unauthorized
    if (error.status === HttpStatusCode.Unauthorized) {
      // TODO:
    }
    super.handleError(error);
  }

  override handleError(error: Error) {
    super.handleError(error);
  }
}
