import { TestBed } from '@angular/core/testing';

import { SimpleGuard } from './simple.guard';

describe('SimpleGuard', () => {
  let guard: SimpleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SimpleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
