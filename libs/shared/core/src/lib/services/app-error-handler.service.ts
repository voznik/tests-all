// tslint:disable:prefer-const quotemark
import { ErrorHandler, Injectable, Injector } from '@angular/core';
// import { UiModalService } from '../../../../ui/src/lib/services/ui-modal.service';
import { ApiErrorResponse } from '../models';
import { Logger } from './logger.service';

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
  handleApiError(error: ApiErrorResponse) {
    let innerHtml: any = '<p class="message">An error occurred.</p>';

    // this._modalService = this.injector.get(UiModalService);

    // handle unauthorized
    if (error.responseCode === '01') {
      //
    }
    super.handleError(error);
  }

  handleError(error: Error) {
    super.handleError(error);
  }
}
