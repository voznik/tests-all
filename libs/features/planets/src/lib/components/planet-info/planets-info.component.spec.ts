import { createComponent, TestingModule } from '@workspace/shared/testing';
import { ComponentFixture } from '@angular/core/testing';
import { PlanetsInfoComponent } from './planet-info.component';

let component: PlanetsInfoComponent;
let fixture: ComponentFixture<PlanetsInfoComponent>;
const imports = [TestingModule];

describe('Test: PlanetsInfoComponent', () => {
  beforeEach(() => {
    fixture = createComponent<PlanetsInfoComponent>(
      PlanetsInfoComponent,
      imports
    );
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
