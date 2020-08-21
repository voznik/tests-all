import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  RouterLinkDirectiveStub,
  TestingModule,
  createComponent,
  activateRouteMockFactory,
} from '@wokspace/shared/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render components inside', () => {
    const shell = el.query(By.css('ui-shell'));
    expect(shell).toBeTruthy();
  });

  it('should render title', () => {
    expect(
      el.query(By.css('.logo-and-title')).nativeElement.textContent
    ).toContain('2P2C TEST');
  });
});
