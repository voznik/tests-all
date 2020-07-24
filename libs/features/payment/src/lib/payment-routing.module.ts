import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PaymentComponent, PaymentListComponent } from './containers';
import { PaymentDetailService } from './services';

const routes: Route[] = [
  {
    // path: 'payments/list',
    path: 'list',
    component: PaymentListComponent,
  },
  {
    // path: 'payments/5a104834-8e80-4d61-b315-250da78b2c83',
    path: ':id',
    component: PaymentComponent,
    resolve: {
      payment: PaymentDetailService,
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
export class PaymentRoutingModule {}
