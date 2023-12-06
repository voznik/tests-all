import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Logger } from '@ghv/core';
import { UiDialogService } from '@ghv/ui';
import { Issue } from '@ghv/viewer-models/repo-issues';
import { ClrDatagridStateInterface as PaginationState } from '@clr/angular';

const DEFAULT_PAGE_SIZE = 20;

@Component({
  selector: 'ghv-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css'],
})
export class IssuesListComponent {
  @Input() issues: Issue[] | null | undefined = [];
  @Input() loading?: boolean = false;
  @Input() login = '';
  @Input() page = 1;
  @Input() total = 0;
  @Input() pageSize = DEFAULT_PAGE_SIZE;

  @Output() pageChange = new EventEmitter<number>();
  @Output() paginationStateChange = new EventEmitter<PaginationState>();
  readonly baseDate = new Date();

  constructor(private logger: Logger, private dialogService: UiDialogService) {}

  getColor(color: string) {
    return { 'background-color': `#${color}` };
  }

  colorMap(color: string): string {
    switch (color) {
      case 'D4C5F9': // violet
        return '#ddd6fe';
      case '310D85': // dark purple
        return '#c084fc';
      case '6ED842': // bright yellow green
        return '#bef264';
      case 'ED1DB5': // hot pink
        return '#f9a8d4';
      default:
        return `#${color}`;
    }
  }

  getBadgeClass(color: string): string {
    switch (color) {
      case 'D4C5F9': // violet
        return 'badge-light-purple';
      case '310D85': // dark purple
        return 'badge-purple';
      case '6ED842': // bright yellow green
        return 'badge-success';
      case 'ED1DB5': // hot pink
        return 'badge-pink';
      default:
        return `badge-warning`;
    }
  }

  gridRefresh(state: PaginationState) {
    this.logger.log('gridRefresh', state);
    this.paginationStateChange.emit(state);
  }
}
