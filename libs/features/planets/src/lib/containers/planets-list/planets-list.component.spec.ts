import { createComponent, TestingModule } from '@workspace/shared/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PlanetsService } from '../../services';
import { PlanetsListComponent } from './planet-list.component';

let el: DebugElement;
let component: PlanetsListComponent;
let fixture: ComponentFixture<PlanetsListComponent>;
let service;
const imports = [TestingModule];
const providers = [
  {
    provide: PlanetsService,
    useValue: {
      getPlanetssList: jest.fn(() => of([])),
    } as Partial<PlanetsService>,
  },
];

describe('Test: PlanetsListComponent', () => {
  beforeEach(() => {
    fixture = createComponent<PlanetsListComponent>(
      PlanetsListComponent,
      providers,
      imports
    );
    el = fixture.debugElement;
    component = fixture.componentInstance;
    service = TestBed.inject(PlanetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have correct default data', () => {
    const planets$ = component.planets$;
    const p$ = service.getPlanetssList();
    expect(planets$).toBe(p$);
  }); */
});
