import { NgModule } from '@angular/core';
import { BASE_URL, Logger } from '@workspace/shared/core';
import { SharedModule } from '@workspace/shared/shared';
import { UiModule } from '@workspace/shared/ui';
import { PlanetsInfoComponent } from './components/planet-info/planets-info.component';
import { PlanetsComponent, PlanetsListComponent } from './containers';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsDetailService, PlanetsService } from './services';

// why not https://www.swapi.co/api ?
const API_URL = 'http://private-anon-5b2bae4500-starhub.apiary-mock.com/api';

@NgModule({
  imports: [SharedModule, UiModule, PlanetsRoutingModule],
  declarations: [PlanetsInfoComponent, PlanetsComponent, PlanetsListComponent],
  providers: [
    { provide: BASE_URL, useValue: API_URL },
    PlanetsService,
    PlanetsDetailService,
  ],
})
export class PlanetsModule {
  constructor(private logger: Logger) {
    this.logger.log('Planets Lib initialised');
  }
}
