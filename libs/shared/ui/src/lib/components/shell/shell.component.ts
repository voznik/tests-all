import { Component, Inject, Input, OnInit } from '@angular/core';
import { Logger } from '@ghv/core';
import { noop } from '@ghv/utils';
import { NavItem, TOP_LEVEL_MENU } from '../../models';
import { UiDialogService } from '../../services';

@Component({
  selector: 'ui-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class UiShellComponent implements OnInit {
  @Input() privateMode = false;
  alerts$ = this.dialogService.alerts$;
  noop = noop;

  constructor(
    @Inject(TOP_LEVEL_MENU) public topLevelMenu: NavItem[],
    private logger: Logger,
    private dialogService: UiDialogService
  ) {}

  ngOnInit(): void {
    this.logger.log(this.topLevelMenu);
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
