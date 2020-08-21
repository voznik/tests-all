import { createComponent, TestingModule } from '@wokspace/shared/testing';
import { ComponentFixture } from '@angular/core/testing';
import { PaymentInfoComponent } from './payment-info.component';

let component: PaymentInfoComponent;
let fixture: ComponentFixture<PaymentInfoComponent>;
const imports = [TestingModule];

describe('Test: PaymentInfoComponent', () => {
  beforeEach(() => {
    fixture = createComponent<PaymentInfoComponent>(
      PaymentInfoComponent,
      imports
    );
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
