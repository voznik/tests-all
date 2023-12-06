import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import {
  loadCoreIconSet,
  loadEssentialIconSet,
  loadTechnologyIconSet,
  loadSocialIconSet,
  loadMediaIconSet,
} from '@cds/core/icon';
import { ClarityIcons } from '@cds/core/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  UiAlertComponent,
  UiDialogComponent,
  UiShellComponent,
} from './components';
import { ALERT_CONFIG_TOKEN, defaultAlertConfig } from './models';
import { CommonModule } from '@angular/common';
import { FormatDistancePipe, GenerateUrlWithProtocolPipe } from './pipes';
import { githubIconSvg } from './icons';

const UI_COMPONENTS = [UiAlertComponent, UiDialogComponent, UiShellComponent];
const UI_PIPES = [FormatDistancePipe, GenerateUrlWithProtocolPipe];

const loadIcons = () => {
  loadCoreIconSet();
  loadEssentialIconSet();
  loadTechnologyIconSet();
  loadSocialIconSet(), loadMediaIconSet();
  ClarityIcons.addIcons(['github', githubIconSvg as string]);
};

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
    ...UI_PIPES,
  ],
  declarations: [...UI_COMPONENTS, ...UI_PIPES],
})
export class UiModule {
  static forRoot(): ModuleWithProviders<UiModule> {
    loadIcons();
    return {
      ngModule: UiModule,
      providers: [
        { provide: ALERT_CONFIG_TOKEN, useValue: defaultAlertConfig },
        // { provide: TOP_LEVEL_MENU, useValue: {}, multi: true },
      ],
    };
  }
}
