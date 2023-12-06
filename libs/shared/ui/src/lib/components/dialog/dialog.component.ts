import { Component, EventEmitter, Output } from '@angular/core';
import { AlertData } from '../../models';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class UiDialogComponent {
  opened = true;
  @Output() openedChange = new EventEmitter<boolean>();

  data: AlertData = {};
}
