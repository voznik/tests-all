import { InjectionToken, TemplateRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export class AlertData {
  id?: string;
  icon?: string;
  type?: AlertType;
  text?: string;
  actionText?: string;
  template?: TemplateRef<AnyObject>;
  templateContext?: AnyObject;
}

export type AlertType = 'danger' | 'warning' | 'info' | 'success';

export interface AlertConfig {
  size?: string;
  closable?: boolean;
}

export const defaultAlertConfig: AlertConfig = {
  //
};

export const ALERT_CONFIG_TOKEN = new InjectionToken('alert-config');

export class AlertRef {
  constructor(private readonly overlay: OverlayRef) {}

  close() {
    this.overlay.dispose();
  }

  isVisible() {
    return this.overlay && this.overlay.overlayElement;
  }
}
