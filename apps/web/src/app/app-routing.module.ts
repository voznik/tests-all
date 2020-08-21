import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SimpleGuard } from '@workspace/shared/auth';
import { TOP_LEVEL_MENU } from '@workspace/shared/ui';
import { WelcomeComponent } from './welcome.component';

export const ROUTES: Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment-wrapper.module').then((m) => m.PaymentWrapperModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./planets-wrapper.module').then((m) => m.PlanetsWrapperModule),
    // canLoad: [SimpleGuard],
    canActivateChild: [SimpleGuard],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];

const PAYMENT_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'payment',
    icon: 'credit-card',
    label: 'Payments (2P2C)',
    route: '/payment',
  },
  multi: true,
};

export const PLANETS_MENU = {
  provide: TOP_LEVEL_MENU,
  useValue: {
    id: 'planets',
    icon: 'network-globe',
    label: 'Planets (TeamInternational)',
    route: '/planets',
  },
  multi: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      enableTracing: true,
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [PAYMENT_MENU, PLANETS_MENU],
})
export class AppRoutingModule {}
