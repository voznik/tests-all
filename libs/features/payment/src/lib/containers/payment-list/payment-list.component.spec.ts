import { createComponent, TestingModule } from '@workspace/shared/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaymentService } from '../../services';
import { PaymentListComponent } from './payment-list.component';

let el: DebugElement;
let component: PaymentListComponent;
let fixture: ComponentFixture<PaymentListComponent>;
let service;
const imports = [TestingModule];
const providers = [
  {
    provide: PaymentService,
    useValue: {
      getPaymentsList: jest.fn(() => of([])),
    } as Partial<PaymentService>,
  },
];

describe('Test: PaymentListComponent', () => {
  beforeEach(() => {
    fixture = createComponent<PaymentListComponent>(
      PaymentListComponent,
      providers,
      imports
    );
    el = fixture.debugElement;
    component = fixture.componentInstance;
    service = TestBed.inject(PaymentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have correct default data', () => {
    const payments$ = component.payments$;
    const p$ = service.getPaymentsList();
    expect(payments$).toBe(p$);
  }); */
});
