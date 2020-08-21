import { Component, Inject, OnInit, SkipSelf } from '@angular/core';
import { AuthServiceIntf } from '@workspace/shared/auth/models';
import { AUTH_SERVICE } from '@workspace/shared/auth/tokens';
import { Logger } from '@workspace/shared/core';
import { NavItem, TOP_LEVEL_MENU } from '../../models';
import { UiDialogService } from '../../services/dialog.service';

@Component({
  selector: 'ui-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class UiShellComponent implements OnInit {
  alerts$ = this.dialogService.alerts$;
  currentUser$ = this.authService.currentUser;

  constructor(
    @Inject(TOP_LEVEL_MENU) public topLevelMenu: NavItem[],
    @Inject(AUTH_SERVICE) private authService: AuthServiceIntf,
    private logger: Logger,
    private dialogService: UiDialogService
  ) {}

  ngOnInit(): void {
    this.logger.log(this.topLevelMenu);
  }

  logout() {
    this.authService.logout();
  }

  onAlertChange(event) {
    this.logger.log(event);
  }

  onAlertClosedChange(idx, event) {
    this.dialogService.removeAlert(idx);
  }
}
