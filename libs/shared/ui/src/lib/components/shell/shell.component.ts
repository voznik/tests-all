import { environment, Logger } from '@wokspace/shared/core';
import { Component, OnInit } from '@angular/core';
import { UiDialogService } from '../../services/dialog.service';

@Component({
  selector: 'ui-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class UiShellComponent implements OnInit {
  alerts$ = this.dialogService.alerts$;

  constructor(private logger: Logger, private dialogService: UiDialogService) {}

  ngOnInit(): void {}

  onAlertChange(event) {
    this.logger.log(event);
  }

  onAlertClosedChange(idx, event) {
    this.dialogService.removeAlert(idx);
  }
}
