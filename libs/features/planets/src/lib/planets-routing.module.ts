import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PlanetsListComponent, PlanetsComponent } from './containers';
import { PlanetsDetailService } from './services';

const routes: Route[] = [
  {
    // path: 'planets/list',
    path: 'list',
    component: PlanetsListComponent,
  },
  {
    // path: 'planets/5a104834-8e80-4d61-b315-250da78b2c83',
    path: ':name',
    component: PlanetsComponent,
    resolve: {
      planet: PlanetsDetailService,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PlanetsRoutingModule {}
