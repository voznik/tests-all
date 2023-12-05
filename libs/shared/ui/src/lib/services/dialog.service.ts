import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { generateUUID } from '@ghv/utils';
import { BehaviorSubject } from 'rxjs';
import { UiAlertComponent } from '../components/alert/alert.component';
import {
  ALERT_CONFIG_TOKEN,
  AlertConfig,
  AlertData,
  AlertRef,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UiDialogService {
  private alerts = new BehaviorSubject<AlertData[]>([
    // INFO: demo
    /* {
      id: generateUUID(),
      type: 'info',
      text: 'This is the first app level alert.',
      actionText: 'OK',
    }, */
  ]);
  alerts$ = this.alerts.asObservable();

  private lastAlert!: AlertRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(ALERT_CONFIG_TOKEN) private alertConfig: AlertConfig
  ) {}

  show(data: AlertData) {
    const overlayRef = this.overlay.create({});

    const alertRef = new AlertRef(overlayRef);
    this.lastAlert = alertRef;

    const injector = this.getInjector(data, alertRef, this.parentInjector);
    const alertPortal = new ComponentPortal(UiAlertComponent, null, injector);

    overlayRef.attach(alertPortal);

    return alertRef;
  }

  showAlert(alert: AlertData) {
    this.alerts.next([
      ...this.alerts.getValue(),
      { ...alert, id: generateUUID() },
    ]);
  }

  removeAlert(idx: string) {
    this.alerts.next(this.alerts.getValue().filter((a) => a.id !== idx));
  }

  showDialog() {}

  private getInjector(
    data: AlertData,
    alertRef: AlertRef,
    parentInjector: Injector
  ) {
    const tokens = new WeakMap();

    tokens.set(AlertData, data);
    tokens.set(AlertRef, alertRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
