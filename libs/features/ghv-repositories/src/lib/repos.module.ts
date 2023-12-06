import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasAuthGuard } from '@ghv/auth';
import { UiModule } from '@ghv/ui';
import { LetDirective, PushPipe } from '@ngrx/component';
import { RepoHeaderComponent, RepoListComponent } from './components';
import { RepoPageResolver } from './repo-page.resolver';
import { ReposComponent, RepoDetailsComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ReposComponent,
    canActivate: [hasAuthGuard],
  },
  {
    path: ':owner/:repo',
    component: RepoDetailsComponent,
    canActivate: [hasAuthGuard],
    resolve: {
      repoPageData: RepoPageResolver,
    },
    // runGuardsAndResolvers: 'paramsChange',
    children: [
      {
        path: 'issues',
        loadChildren: () =>
          import('@ghv/viewer-issues').then((m) => m.IssuesModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues',
      },
    ],
  },
];

@NgModule({
  declarations: [
    ReposComponent,
    RepoListComponent,
    RepoDetailsComponent,
    RepoHeaderComponent,
  ],
  imports: [PushPipe, LetDirective, UiModule, RouterModule.forChild(routes)],
})
export class ReposModule {}
