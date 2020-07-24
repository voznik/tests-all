import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { PaymentService } from './payment.service';
import { PaymentProduct } from '../models';

@Injectable()
export class PaymentDetailService implements Resolve<PaymentProduct> {
  constructor(private ps: PaymentService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PaymentProduct> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.ps.getPayment(id).pipe(
      take(1),
      mergeMap((payment) => {
        if (payment) {
          return of(payment);
        } else {
          // id not found
          this.router.navigate(['/payments/list']);
          return EMPTY;
        }
      })
    );
  }
}
