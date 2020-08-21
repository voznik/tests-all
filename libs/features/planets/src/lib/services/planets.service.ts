import { HttpService, Logger } from '@workspace/shared/core';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { PLANETS } from '../mocks';
import { Planet } from '../models';

const API_URL = 'http://private-anon-5b2bae4500-starhub.apiary-mock.com/api';

@Injectable()
export class PlanetsService {
  constructor(private http: HttpService, private logger: Logger) {}

  getPlanetByName(name: string): Observable<Planet> {
    // return of(PLANETS.find((p) => p.name === name));
    const url = `${API_URL}/planets/${name}`;
    return this.http.get(url).pipe(
      catchError((e) => {
        this.logger.error(e);
        return [];
      })
    );
  }

  getPlanets(): Observable<Planet[]> {
    // return of(PLANETS);
    const url = `${API_URL}/planets`;
    return this.http.get(url).pipe(
      catchError((e) => {
        this.logger.error(e);
        return [];
      })
    );
  }
}
