import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { PlanetsService } from './planets.service';
import { Planet } from '../models';

@Injectable()
export class PlanetsDetailService implements Resolve<Planet> {
  constructor(private ps: PlanetsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Planet> | Observable<never> {
    const name = route.paramMap.get('name');

    return this.ps.getPlanetByName(name.toLowerCase());
  }
}
