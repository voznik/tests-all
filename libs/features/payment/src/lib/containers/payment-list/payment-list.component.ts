import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services';

@Component({
  selector: 'test-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  payments$ = this.paymentService.getPaymentsList();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {}
}
