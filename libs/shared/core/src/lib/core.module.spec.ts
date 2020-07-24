import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from './core.module';
import { HttpService, AppErrorHandler } from './services';

describe('CoreModule', () => {
  describe('CoreModule:init', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule],
      }).compileComponents();
    }));

    it('should create', () => {
      expect(CoreModule).toBeDefined();
    });

    it(`should not provide 'CustomHttp' service`, () => {
      expect(() => TestBed.inject(HttpService)).toThrowError(/No provider for/);
    });
  });

  describe(`CoreModule.forRoot()`, () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, CoreModule.forRoot({})],
      });
    });

    it(`should provide services`, () => {
      expect(TestBed.inject(HttpService)).toBeTruthy();
    });

    it(`should provide a single instance for 'AppErrorHandler' as 'ErrorHandler' injection token`, () => {
      const errorHandler: ErrorHandler = TestBed.inject(ErrorHandler);
      // both should be same instance
      expect(errorHandler).toBeInstanceOf(AppErrorHandler);
      expect(errorHandler).toEqual(expect.any(AppErrorHandler));
    });
  });
});
