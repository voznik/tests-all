import { NgModule } from '@angular/core';
import { BASE_URL, Logger } from '@workspace/shared/core';
import { SharedModule } from '@workspace/shared/shared';
import { UiModule } from '@workspace/shared/ui';
import { PaymentFormComponent, PaymentInfoComponent } from './components';
import { PaymentComponent, PaymentListComponent } from './containers';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentDetailService, PaymentService } from './services';

@NgModule({
  imports: [SharedModule, UiModule, PaymentRoutingModule],
  declarations: [
    PaymentComponent,
    PaymentFormComponent,
    PaymentListComponent,
    PaymentInfoComponent,
  ],
  providers: [
    { provide: BASE_URL, useValue: 'https://www.mocky.io/v2' },
    PaymentService,
    PaymentDetailService,
  ],
})
export class PaymentModule {
  constructor(private logger: Logger) {
    this.logger.log('Payment Lib initialised');
  }
}
