import {
  CoreModule,
  LoggerLevel,
  // APP_NAME,
  LOGGER_LEVEL,
} from '@2p2c/shared/core';
// import { UiDialogService } from '@2p2c/shared/ui/services';
import { SharedModule } from '@2p2c/shared/shared';
import { UiModule, UiDialogService } from '@2p2c/shared/ui';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpyLocation } from '@angular/common/testing';
import {
  ErrorHandler,
  NgModule,
  NO_ERRORS_SCHEMA,
  Renderer2,
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentMock, ErrorHandlerMock, Renderer2Mock } from './mocks';
import { RouterLinkDirectiveStub } from './stubs';

const TESTING_MODULES = [
  NoopAnimationsModule,
  RouterTestingModule,
  HttpClientTestingModule,
  SharedModule,
];

const TESTING_PROVIDERS = [
  {
    provide: LOGGER_LEVEL,
    useValue: LoggerLevel.DEBUG,
  },
  { provide: ErrorHandler, useClass: ErrorHandlerMock },
  { provide: Renderer2, useClass: Renderer2Mock },
  { provide: Location, useClass: SpyLocation },
  // UI
  // { provide: UiModalService, useClass: ModalServiceMock },
];

const TESTING_COMPONENTS = [ComponentMock];
const TESTING_DIRECTIVES = [RouterLinkDirectiveStub];

@NgModule({
  imports: [...TESTING_MODULES, CoreModule.forRoot({}), UiModule.forRoot()],
  declarations: [...TESTING_COMPONENTS, ...TESTING_DIRECTIVES],
  exports: [
    CoreModule,
    UiModule,
    ...TESTING_MODULES,
    ...TESTING_COMPONENTS,
    ...TESTING_DIRECTIVES,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: TESTING_PROVIDERS,
})
export class TestingModule {}
