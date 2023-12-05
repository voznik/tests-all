import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ghv/ui';
import { STORAGE, tokenStorageFactory, AUTH_REDIRECT } from './services';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
})
export class AuthModule {
  static forRoot(
    options: Record<string, unknown> = {}
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: STORAGE, useFactory: tokenStorageFactory },
        { provide: AUTH_REDIRECT, useValue: options.redirectLink || '/' },
      ],
    };
  }
}
