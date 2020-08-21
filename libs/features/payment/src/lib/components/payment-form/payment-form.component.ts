import { Logger } from '@workspace/shared/core';
import {
  creditCardExpiryValidator,
  creditCardValidator,
  emailValidator,
  isUndefined,
  lettersValidator,
} from '@workspace/shared/shared';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { PaymentCard } from '../../models';

@Component({
  selector: 'test-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaymentFormComponent implements OnInit {
  @Input() cardsList: any[] = [];
  @Input() set submission(v: { loading: boolean; error: boolean }) {
    if (!isUndefined(this.paymentForm) && !isUndefined(v.loading)) {
      if (this.paymentForm.dirty && v.loading) {
        this.submitBtnState = ClrLoadingState.LOADING;
      } else if (v.error) {
        this.submitBtnState = ClrLoadingState.ERROR;
      } else {
        this.submitBtnState = ClrLoadingState.SUCCESS;
        this.reset();
      }
    }
  }

  @Output() submitted = new EventEmitter<PaymentCard>();
  @ViewChild(ClrForm) private clrForm: ClrForm;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  paymentForm = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private logger: Logger) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    if (this.paymentForm.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const payload = this.paymentForm.getRawValue();
      this.submitted.emit(payload);
    }
  }

  reset() {
    this.paymentForm.reset();
    this.paymentForm.markAsPristine();
  }

  private initForm() {
    this.paymentForm = this.formBuilder.group({
      cardType: [null, [Validators.required]],
      cardNumber: ['', [Validators.required, creditCardValidator()]],
      cardExpiry: ['', [Validators.required, creditCardExpiryValidator()]],
      cardHolder: [
        '',
        [Validators.required, Validators.maxLength(50), lettersValidator()],
      ],
      email: ['', [emailValidator()]],
    });
  }
}
