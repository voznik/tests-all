import { TestingModule } from '@wokspace/shared/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrForm } from '@clr/angular';
import { PaymentFormComponent } from './payment-form.component';

let component: PaymentFormComponent;
let fixture: ComponentFixture<PaymentFormComponent>;
let directive;

const imports = [TestingModule];

describe('Test: PaymentFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentFormComponent],
      imports,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(ClrForm));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
