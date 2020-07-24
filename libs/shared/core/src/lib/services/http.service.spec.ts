// tslint:disable:prefer-const
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { TestingModule } from '@2p2c/shared/shared';
import { skipWhile, filter } from 'rxjs/operators';
import { HttpService } from './http.service';

const url = '/api/test';

describe('Core :: HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpServiceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#should create an instance successfully', () => {
    expect(service).toBeDefined();
  });

  const testObj = { a: 11, b: false, c: 232.3, d: [1, 2, 3] };

  it('#should convert object params to strings', () => {
    const httpParams = service.buildUrlParams(testObj);
    expect(httpParams.keys().length).toEqual(Object.keys(testObj).length);
  });

  it('#should not add any params', () => {
    const httpParams = service.buildUrlParams({});
    expect(httpParams.keys().length).toEqual(0);
  });

  it('#should add default options to request', fakeAsync(() => {
    service.get<string>(url).subscribe();
    service.post<string>(url, '').subscribe();
    service.put<string>(url, '').subscribe();
    service.patch<string>(url, '').subscribe();
    service.delete<string>(url).subscribe();

    const req = httpTestingController.match(url);
    expect(req.length).toEqual(5);
    for (const r of req) {
      if (r.request.method !== 'PATCH') {
        expect(r.request.headers.get('Content-Type')).toEqual(
          'application/json'
        );
      } else {
        expect(r.request.headers.get('Content-Type')).toBeNull();
      }
      r.flush('');
    }

    flushMicrotasks();
    httpTestingController.verify();
  }));
});
