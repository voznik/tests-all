import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Planet } from '../../models';

@Component({
  selector: 'test-planet-info',
  templateUrl: './planets-info.component.html',
  styleUrls: ['./planets-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsInfoComponent {
  @Input() planet: Planet = {} as Planet;
}
