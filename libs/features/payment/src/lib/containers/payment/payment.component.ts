import { environment, Logger } from '@2p2c/shared/core';
import { UiDialogService } from '@2p2c/shared/ui';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import {
  PaymentCard,
  PaymentProduct,
  PaymentResponse,
  PaymentCardType,
} from '../../models';
import { PaymentService } from '../../services';

@Component({
  selector: 'test-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild(PaymentFormComponent) private paymentForm: PaymentFormComponent;

  cardsList$: Observable<PaymentCardType[]>;
  payment: PaymentProduct = {} as PaymentProduct;
  paymentResponse: PaymentResponse = null;
  modalOpened = false;
  isDev = !environment.production;
  private submission = new BehaviorSubject<{
    loading: boolean;
    error?: boolean;
  }>({ loading: false });
  submission$ = this.submission.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private dialogService: UiDialogService,
    private logger: Logger
  ) {}

  ngOnInit(): void {
    this.cardsList$ = this.paymentService.getCardsList({ excludeId: '3' });
    this.route.data.subscribe((data: { payment: PaymentProduct }) => {
      this.payment = data.payment;
    });
  }

  submitPayment(card: PaymentCard) {
    this.submission.next({ loading: true });
    const payload = { payment: this.payment, card };
    this.paymentService.submitPayment(payload).subscribe(
      (res) => {
        this.paymentResponse = res;
        this.modalOpened = true;
        this.dialogService.showAlert({
          id: '',
          type: 'info',
          text: 'Payment Succeeded',
        });
        this.submission.next({ loading: false });
        this.paymentForm.reset();
      },
      (err) => {
        this.paymentResponse = err;
        this.submission.next({ loading: false, error: err });
        this.dialogService.showAlert({
          id: '',
          type: 'danger',
          text: 'Payment Failed',
        });
      }
    );
  }

  onModalClose(event) {
    this.router.navigate(['..', 'list'], { relativeTo: this.route });
  }
}
