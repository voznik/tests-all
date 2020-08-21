import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  RouterLinkDirectiveStub,
  TestingModule,
  createComponent,
  activateRouteMockFactory,
} from '@workspace/shared/testing';
import { of } from 'rxjs';
import { PaymentService, PaymentDetailService } from '../../services';
import { PaymentComponent } from './payment.component';
import { PaymentInfoComponent } from '../../components/payment-info/payment-info.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { PAYMENTS, PAYMENT_CARD } from '../../mocks';

let component: PaymentComponent;
let fixture: ComponentFixture<PaymentComponent>;
let el: DebugElement;
let service;
let route;

const providers = [
  {
    provide: PaymentDetailService,
    useValue: {
      resolve: jest.fn(),
    } /*  as Partial<PaymentDetailService> */,
  },
  {
    provide: PaymentService,
    useValue: {
      getCardsList: jest.fn(() => of([])),
      submitPayment: jest.fn(() => of(null)),
    } /*  as Partial<PaymentService> */,
  },
  {
    provide: ActivatedRoute,
    useFactory: activateRouteMockFactory({
      snapshot: {},
      data: {
        payment: PAYMENTS[0],
      },
    }),
  },
];

describe('Test: PaymentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentComponent,
        PaymentInfoComponent,
        PaymentFormComponent,
      ],
      imports: [TestingModule],
      providers,
    }).compileComponents();
    service = TestBed.inject(PaymentService);
    route = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render components inside', () => {
    const pForm = el.query(By.css('test-payment-form'));
    expect(pForm).toBeTruthy();
  });

  /* it('should have correct product name and amount', () => {
    const product = component.payment.product;
    const htmlElementProduct = el
      .query(By.css('.payment-info>dl>dt'))
      .nativeElement.textContent.trim();
    // const subTitle = component.subTitle.trim();
    // const htmlElementSubTitle = el
    //   .query(By.css('.page-header-subtitle'))
    //   .nativeElement.textContent.trim();
    expect(product).toBe(PAYMENTS[0].product);
    expect(htmlElementProduct).toBe(PAYMENTS[0].product);
  }); */

  it('should submit payment when submit method triggered', () => {
    const spy = jest.spyOn(service, 'submitPayment');
    // const payload = { payment: PAYMENTS[0], card: PAYMENT_CARD };
    component.submitPayment(PAYMENT_CARD);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
