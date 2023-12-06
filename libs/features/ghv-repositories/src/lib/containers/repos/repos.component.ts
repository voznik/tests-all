import { Component, inject } from '@angular/core';
import { compareDeepEqual } from '@ghv/utils';
import {
  PaginationState,
  TopRepo,
  TopStarredReposGQL,
  getPaginationVariables,
} from '@ghv/viewer-data-access';
import {
  BehaviorSubject,
  Observable,
  map,
  pairwise,
  startWith,
  switchMap,
} from 'rxjs';
import { parseTopRepos } from '../../helpers';

const DEFAULT_PAGE_SIZE = 20;

@Component({
  selector: 'ghv-repos',
  templateUrl: './repos.component.html',
})
export class ReposComponent {
  private topReposGQL = inject(TopStarredReposGQL);
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
  loading = true;

  query$: Observable<TopRepo[]> = this.paginationState$.pipe(
    pairwise(),
    startWith([{} as PaginationState, this.paginationState$.value]),
    switchMap(([prevState, currState]) => {
      this.loading = true;
      const variables = getPaginationVariables(
        prevState,
        currState,
        this.startCursor,
        this.endCursor
      );
      return this.topReposGQL.watch(variables).valueChanges;
    }),
    map(({ data, loading }) => {
      this.loading = loading;
      const { startCursor, endCursor, total, items } = parseTopRepos(data);
      this.total = total;
      this.startCursor = startCursor!;
      this.endCursor = endCursor!;
      return items;
    })
  );

  /**
   * Updates the pagination state on Clarity DataGrid event
   *
   * NOTE: Because of how this event works (always), we compare equality to not trigger unnecessary queries
   */
  paginationStateChange(state: PaginationState) {
    if (compareDeepEqual(state, this.paginationState$.value)) {
      return;
    }
    this.paginationState$.next(state);
  }
}
