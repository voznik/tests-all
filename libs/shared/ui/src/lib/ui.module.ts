import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '@2p2c/shared/shared';
import {
  UiAlertComponent,
  UiDialogComponent,
  UiShellComponent,
} from './components';
import { ALERT_CONFIG_TOKEN, defaultAlertConfig } from './models';

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
      ],
    };
  }
}
