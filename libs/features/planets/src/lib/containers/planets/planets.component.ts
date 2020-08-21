import { environment, Logger } from '@workspace/shared/core';
import { UiDialogService } from '@workspace/shared/ui';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Planet } from '../../models';
import { PlanetsService } from '../../services';

@Component({
  selector: 'test-planet',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  planet: Planet = {} as Planet;
  modalOpened = false;
  isDev = !environment.production;
  private submission = new BehaviorSubject<{
    loading: boolean;
    error?: boolean;
  }>({ loading: false });
  submission$ = this.submission.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planetService: PlanetsService,
    private dialogService: UiDialogService,
    private logger: Logger
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { planet: Planet }) => {
      this.planet = data.planet;
    });
  }

  /* submitPlanets(card: PlanetsCard) {
    this.submission.next({ loading: true });
    const payload = { planet: this.planet, card };
    this.planetService.submitPlanets(payload).subscribe(
      (res) => {
        this.planetResponse = res;
        this.modalOpened = true;
        this.dialogService.showAlert({
          id: '',
          type: 'info',
          text: 'Planets Succeeded',
        });
        this.submission.next({ loading: false });
        this.planetForm.reset();
      },
      (err) => {
        this.planetResponse = err;
        this.submission.next({ loading: false, error: err });
        this.dialogService.showAlert({
          id: '',
          type: 'danger',
          text: 'Planets Failed',
        });
      }
    );
  } */

  onModalClose(event) {
    this.router.navigate(['..', 'list'], { relativeTo: this.route });
  }
}
