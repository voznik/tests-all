import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment-wrapper.module').then((m) => m.PaymentWrapperModule),
  },
  {
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full',
  },
];
