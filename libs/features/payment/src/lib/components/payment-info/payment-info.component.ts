import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { PaymentProduct } from '../../models';

@Component({
  selector: 'test-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInfoComponent {
  @Input() payment: PaymentProduct = {} as PaymentProduct;
}
