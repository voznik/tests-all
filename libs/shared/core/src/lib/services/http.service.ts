// tslint:disable:only-arrow-functions ban-types
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger } from './logger.service';
import { BASE_URL } from '../models';

const defaultOptions: CustomReqOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class HttpService {
  constructor(
    @Inject(BASE_URL) private readonly _baseUrl,
    private http: HttpClient,
    private logger: Logger
  ) {}

  get apiUrl(): string {
    return this._baseUrl;
  }

  /**
   * @description creates HttpParams from key-value pairs
   */
  buildUrlParams(paramsObj: { [key: string]: any }): HttpParams {
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = paramsObj[key].toString();
      }
    }
    return new HttpParams({ fromObject: paramsObj });
  }

  get<T>(url: string, options = defaultOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options = defaultOptions): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  put<T>(url: string, body: any, options = defaultOptions): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

  delete<T>(url: string, options = defaultOptions): Observable<T> {
    return this.http.delete<T>(url, options);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body);
  }
}

export interface CustomReqOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  responseType?;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
}
