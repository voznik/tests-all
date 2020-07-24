import { HttpService, Logger } from '@2p2c/shared/core';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { PAYMENTS } from '../mocks';
import {
  PaymentCardType,
  PaymentPayload,
  PaymentProduct,
  PaymentResponse,
} from '../models';

@Injectable()
export class PaymentService {
  baseUrl = 'https://www.mocky.io/v2';

  submitUrlSuccess = '5d8de422310000b19d2b517a';
  submitUrlError = '5d8de441310000a2612b517c';

  constructor(private http: HttpService, private logger: Logger) {}

  getPayment(id: string): Observable<PaymentProduct> {
    return of(PAYMENTS.find((p) => p.id === id));
  }

  getPaymentsList(): Observable<PaymentProduct[]> {
    return of(PAYMENTS);
  }

  getCardsList({
    excludeId,
  }: {
    excludeId: string;
  }): Observable<PaymentCardType[]> {
    const url = `${this.baseUrl}/5d145fa22f0000ff3ec4f030`;
    return this.http.get(url).pipe(
      map((res: any) => this.newMethod(res, excludeId)),
      catchError((e) => {
        this.logger.error(e);
        return [];
      })
    );
  }

  private newMethod(
    res: { cardTypes: PaymentCardType[] },
    excludeId: string
  ): PaymentCardType[] {
    return excludeId
      ? res.cardTypes.filter((c) => c.id !== excludeId)
      : res.cardTypes;
  }

  submitPayment(payload: PaymentPayload): Observable<PaymentResponse> {
    const url = `${this.baseUrl}/${
      payload.payment.id === PAYMENTS[1].id
        ? this.submitUrlError
        : this.submitUrlSuccess
    }`;
    return this.http.post<PaymentResponse>(url, payload).pipe(delay(1000));
  }
}
