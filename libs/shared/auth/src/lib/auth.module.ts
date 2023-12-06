import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ghv/ui';
import { LoginComponent } from './components/login/login.component';
import { AuthTokenInterceptor } from './services/token.interceptor';

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
    options?: Record<string, unknown>
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthTokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
