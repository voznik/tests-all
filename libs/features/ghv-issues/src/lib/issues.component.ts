import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouteConfigService } from '@ghv/core';
import { compareDeepEqual } from '@ghv/utils';
import {
  IssueOrderField,
  OrderDirection,
  PaginationState,
  RepoIssuesGQL,
  RepoPage,
  ReposFilterStore,
  getPaginationVariables,
} from '@ghv/viewer-data-access';
import { Issue } from '@ghv/viewer-models/repo-issues';
import {
  BehaviorSubject,
  Observable,
  map,
  pairwise,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { parseIssuesQuery } from './helpers';

const DEFAULT_PAGE_SIZE = 20;

@Component({
  selector: 'ghv-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ReposFilterStore, IssuesStore],
})
export class IssuesComponent {
  private routeConfigService = inject(
    RouteConfigService<string, 'repoPageData'>
  );
  private repoIssuesGQL = inject(RepoIssuesGQL);
  private startCursor: string | undefined;
  private endCursor: string | undefined;
  private paginationState$ = new BehaviorSubject<PaginationState>({
    page: {
      current: 1,
      from: 0,
      to: DEFAULT_PAGE_SIZE - 1,
      size: DEFAULT_PAGE_SIZE,
    }, // default for test assignment
  });
  pageSize = DEFAULT_PAGE_SIZE;
  total = 0;
  openIssuesCount = 0;
  closedIssuesCount = 0;
  loading = true;

  query$: Observable<Issue[]> = this.paginationState$.pipe(
    pairwise(),
    startWith([{} as PaginationState, this.paginationState$.value]),
    withLatestFrom(
      this.routeConfigService.getLeafConfig<RepoPage>('repoPageData')
    ),
    switchMap(([[prevState, currState], { owner, name }]) => {
      this.loading = true;
      const variables = {
        ...getPaginationVariables(
          prevState,
          currState,
          this.startCursor,
          this.endCursor,
          false
        ),
        owner,
        name,
        orderBy: {
          field: IssueOrderField.CreatedAt,
          direction: OrderDirection.Desc,
        },
      };
      return this.repoIssuesGQL.watch(variables).valueChanges;
    }),
    map(({ data, loading }) => {
      this.loading = loading;
      const { openIssues, closedIssues, milestones, labels } =
        parseIssuesQuery(data);
      const { issues, pageInfo, totalCount: openIssuesCount } = openIssues;
      const { totalCount: closedIssuesCount } = closedIssues;
      this.openIssuesCount = openIssuesCount;
      this.closedIssuesCount = closedIssuesCount;
      this.total = openIssuesCount;
      this.startCursor = pageInfo.startCursor!;
      this.endCursor = pageInfo.endCursor!;
      return issues;
    })
  );

  /**
   * Updates the pagination state on Clarity DataGrid event
   *
   * NOTE: Because of how this event works (always), we compare equality to not trigger unnecessary queries
   */
  paginationStateChange(state: PaginationState) {
    if (
      state.page.from < 0 ||
      compareDeepEqual(state, this.paginationState$.value)
    ) {
      return;
    }
    this.paginationState$.next(state);
  }
}
