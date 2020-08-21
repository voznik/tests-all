import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthModule } from '@workspace/shared/auth';
import { CoreModule, environment } from '@workspace/shared/core';
import { SharedModule } from '@workspace/shared/shared';
import { UiModule } from '@workspace/shared/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    SharedModule,
    CoreModule.forRoot({
      baseUrl: '/api',
      loggerLevel: environment.production ? 1 : 5,
    }),
    UiModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
