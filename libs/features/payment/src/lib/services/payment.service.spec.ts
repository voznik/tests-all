import { HttpService } from '@wokspace/shared/core';
import { TestingModule } from '@wokspace/shared/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { PAYMENTS, PAYMENT_CARD } from '../mocks';

const dummyCards = [
  {
    id: 1,
    value: 'Visa',
  },
];
const dummyResponseSuccess = {
  responseCode: '00',
  responseMessage: 'Payment Success',
  invoiceNo: '0123456789',
  approvalCode: 'ABC0301',
};
const dummyResponseError = {
  responseCode: '01',
  responseMessage: 'Payment Error',
  // invoiceNo: '0123456789',
  // approvalCode: 'ABC0301',
};

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [PaymentService, HttpService],
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cards list', () => {
    service.getCardsList(null).subscribe((cards) => {
      expect(cards.length).toBe(1);
      expect(cards).toEqual(dummyCards);
    });

    const request = httpMock.expectOne(
      `http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030`
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyCards);
  });

  it('should submit payment', () => {
    const payload = { payment: PAYMENTS[0], card: PAYMENT_CARD };
    service.submitPayment(payload).subscribe((response) => {
      expect(response.responseCode).toBe('00');
      expect(response.approvalCode).toBeDefined();
    });

    const request = httpMock.expectOne(
      (req) =>
        req.method === 'POST' &&
        req.url === `http://www.mocky.io/v2/5d8de422310000b19d2b517a`
    );
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponseSuccess);
  });

  it('should fail payment submission', () => {
    const payload = { payment: PAYMENTS[1], card: PAYMENT_CARD };
    service.submitPayment(payload).subscribe(
      (res) => {},
      (err) => {
        expect(err.responseCode).toBe('01');
        expect(err.approvalCode).toBeUndefined();
      }
    );

    const request = httpMock.expectOne(
      `http://www.mocky.io/v2/5d8de441310000a2612b517c`
    );
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponseSuccess);
  });

  afterEach(() => {
    // flushMicrotasks();
    httpMock.verify();
  });
});
