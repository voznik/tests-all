import { NgModule } from '@angular/core';
import { IssuesFiltersComponent } from './components/issues-filters/issues-filters.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssuesComponent } from './issues.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@ghv/ui';
import { FilterDropdownComponent } from '@ghv/viewer-common';
import { LetDirective, PushPipe } from '@ngrx/component';

const routes: Routes = [
  {
    path: '',
    component: IssuesComponent,
  },
];

@NgModule({
  declarations: [IssuesComponent, IssuesListComponent, IssuesFiltersComponent],
  imports: [
    LetDirective,
    PushPipe,
    UiModule,
    RouterModule.forChild(routes),
    FilterDropdownComponent,
  ],
  exports: [IssuesComponent],
})
export class IssuesModule {}
