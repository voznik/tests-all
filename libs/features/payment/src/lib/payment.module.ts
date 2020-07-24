import { NgModule } from '@angular/core';
import { Logger } from '@2p2c/shared/core';
import { SharedModule } from '@2p2c/shared/shared';
import { UiModule } from '@2p2c/shared/ui';
import { PaymentComponent } from './containers';
import { PaymentFormComponent } from './components';
import { PaymentService, PaymentDetailService } from './services';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './containers/payment-list/payment-list.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';

@NgModule({
  imports: [SharedModule, UiModule, PaymentRoutingModule],
  declarations: [
    PaymentComponent,
    PaymentFormComponent,
    PaymentListComponent,
    PaymentInfoComponent,
  ],
  providers: [PaymentService, PaymentDetailService],
})
export class PaymentModule {
  constructor(private logger: Logger) {
    this.logger.log('Payment Lib initialised');
  }
}
