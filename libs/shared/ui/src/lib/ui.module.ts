import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
// import { SharedModule } from '@workspace/shared/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  UiAlertComponent,
  UiDialogComponent,
  UiShellComponent,
} from './components';
import { ALERT_CONFIG_TOKEN, defaultAlertConfig } from './models';
import { CommonModule } from '@angular/common';

const UI_COMPONENTS = [UiAlertComponent, UiDialogComponent, UiShellComponent];

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ClarityModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule,
    ...UI_COMPONENTS,
  ],
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
