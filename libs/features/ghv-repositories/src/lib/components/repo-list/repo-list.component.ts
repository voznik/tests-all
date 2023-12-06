import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface as PaginationState } from '@clr/angular/data';
import { UiDialogService } from '@ghv/ui';
import { ClrDatagridStateInterface } from '@clr/angular/data';
import { TopRepo } from '@ghv/viewer-data-access';
import { Logger } from '@ghv/core';

@Component({
  selector: 'ghv-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  @Input() items?: TopRepo[];
  @Input() loading?: boolean = false;
  @Input() login = '';
  @Input() page = 1;
  @Input() total = 0;
  @Input() pageSize = 20;

  @Output() pageChange = new EventEmitter<number>();
  @Output() paginationStateChange = new EventEmitter<PaginationState>();

  constructor(private logger: Logger, private dialogService: UiDialogService) {}

  gridRefresh(state: ClrDatagridStateInterface) {
    this.logger.log('gridRefresh', state);
    this.paginationStateChange.emit(state);
  }

  showDialog() {
    this.dialogService.showDialog({
      title: 'Dialog Title',
      message: 'Dialog Message',
    });
  }
}
