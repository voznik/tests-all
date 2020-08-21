import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '@workspace/shared/shared';
import {
  UiAlertComponent,
  UiDialogComponent,
  UiShellComponent,
} from './components';
import {
  ALERT_CONFIG_TOKEN,
  defaultAlertConfig,
  TOP_LEVEL_MENU,
} from './models';

const UI_COMPONENTS = [UiAlertComponent, UiDialogComponent, UiShellComponent];

@NgModule({
  imports: [SharedModule, ClarityModule, OverlayModule],
  exports: [ClarityModule, OverlayModule, ...UI_COMPONENTS],
  declarations: [...UI_COMPONENTS],
})
export class UiModule {
  static forRoot(): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [
        { provide: ALERT_CONFIG_TOKEN, useValue: defaultAlertConfig },
        // { provide: TOP_LEVEL_MENU, useValue: {}, multi: true },
      ],
    };
  }
}
