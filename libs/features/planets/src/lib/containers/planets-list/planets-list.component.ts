import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../../services';
import { Observable } from 'rxjs';
import { Planet } from '../../models';

@Component({
  selector: 'test-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss'],
})
export class PlanetsListComponent {
  planets$: Observable<Planet[]> = this.planetService.getPlanets();

  constructor(private planetService: PlanetsService) {}
}
