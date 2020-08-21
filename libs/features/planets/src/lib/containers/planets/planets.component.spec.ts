import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  RouterLinkDirectiveStub,
  TestingModule,
  createComponent,
  activateRouteMockFactory,
} from '@workspace/shared/testing';
import { of } from 'rxjs';
import { PlanetsService, PlanetsDetailService } from '../../services';
import { PlanetsComponent } from './planet.component';
import { PlanetsInfoComponent } from '../../components/planet-info/planet-info.component';
import { PlanetsFormComponent } from '../../components/planet-form/planet-form.component';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { PLANETS, PAYMENT_CARD } from '../../mocks';

let component: PlanetsComponent;
let fixture: ComponentFixture<PlanetsComponent>;
let el: DebugElement;
let service;
let route;

const providers = [
  {
    provide: PlanetsDetailService,
    useValue: {
      resolve: jest.fn(),
    } /*  as Partial<PlanetsDetailService> */,
  },
  {
    provide: PlanetsService,
    useValue: {
      getCardsList: jest.fn(() => of([])),
      submitPlanets: jest.fn(() => of(null)),
    } /*  as Partial<PlanetsService> */,
  },
  {
    provide: ActivatedRoute,
    useFactory: activateRouteMockFactory({
      snapshot: {},
      data: {
        planet: PLANETS[0],
      },
    }),
  },
];

describe('Test: PlanetsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlanetsComponent,
        PlanetsInfoComponent,
        PlanetsFormComponent,
      ],
      imports: [TestingModule],
      providers,
    }).compileComponents();
    service = TestBed.inject(PlanetsService);
    route = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render components inside', () => {
    const pForm = el.query(By.css('test-planet-form'));
    expect(pForm).toBeTruthy();
  });

  /* it('should have correct product name and amount', () => {
    const product = component.planet.product;
    const htmlElementProduct = el
      .query(By.css('.planet-info>dl>dt'))
      .nativeElement.textContent.trim();
    // const subTitle = component.subTitle.trim();
    // const htmlElementSubTitle = el
    //   .query(By.css('.page-header-subtitle'))
    //   .nativeElement.textContent.trim();
    expect(product).toBe(PLANETS[0].product);
    expect(htmlElementProduct).toBe(PLANETS[0].product);
  }); */

  it('should submit planet when submit method triggered', () => {
    const spy = jest.spyOn(service, 'submitPlanets');
    // const payload = { planet: PLANETS[0], card: PAYMENT_CARD };
    component.submitPlanets(PAYMENT_CARD);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
