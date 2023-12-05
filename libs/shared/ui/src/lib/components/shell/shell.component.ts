import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Logger } from '@ghv/core';
import { of } from 'rxjs';
import { NavItem, TOP_LEVEL_MENU } from '../../models';
import { UiDialogService } from '../../services';

@Component({
  selector: 'ui-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class UiShellComponent implements OnInit {
  alerts$ = this.dialogService.alerts$;
  currentUser$ = of({});
  authEvent = new EventEmitter<{ type: string }>();

  constructor(
    @Inject(TOP_LEVEL_MENU) public topLevelMenu: NavItem[],
    private logger: Logger,
    private dialogService: UiDialogService
  ) {}

  ngOnInit(): void {
    this.logger.log(this.topLevelMenu);
  }

  logout() {
    this.authEvent.emit({ type: 'logout' });
  }

  onAlertChange(event: unknown) {
    this.logger.log(event);
  }

  onAlertClosedChange(idx: string, event: boolean) {
    if (event) {
      this.dialogService.removeAlert(idx);
    }
  }
}
