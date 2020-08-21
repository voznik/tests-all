import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@workspace/shared/shared';
import { UiModule } from '@workspace/shared/ui';
import { SimpleGuard } from './services';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule,
    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
})
export class AuthModule {
  static forRoot(options?): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [SimpleGuard],
    };
  }
}
