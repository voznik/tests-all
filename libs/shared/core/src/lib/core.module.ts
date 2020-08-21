import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler,
} from '@angular/core';
import { environment } from './environments/environment';
import { BASE_URL } from './models';
import {
  // AppErrorHandler,
  HttpErrorInterceptor,
  HttpService,
  Logger,
  LoggerLevel,
  LOGGER_LEVEL,
} from './services';

const CORE_PROVIDERS = [HttpService, Logger];

const isDev = !environment.production;

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
})
export class CoreModule {
  static forRoot(options: any): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: BASE_URL, useValue: options.baseUrl || '' },
        {
          provide: LOGGER_LEVEL,
          useValue: options.loggerLevel || LoggerLevel.LOG,
        },
        // { provide: ErrorHandler, useClass: AppErrorHandler },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        // isDev
        //   ? {
        //       provide: HTTP_INTERCEPTORS,
        //       useClass: ,
        //       multi: true,
        //     }
        //   : [],
        ...CORE_PROVIDERS,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded. Import in root module only.');
    }
  }
}
