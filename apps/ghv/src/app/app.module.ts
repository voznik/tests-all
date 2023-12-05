import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@ghv/auth';
import { CoreModule } from '@ghv/core';
import { UiModule } from '@ghv/ui';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot({
      baseUrl: '/api',
      loggerLevel: isDevMode() ? 5 : 3,
    }),
    UiModule.forRoot(),
    AuthModule.forRoot({
      redirectLink: '/repositories',
    }),
  ],
  providers: appConfig.providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
