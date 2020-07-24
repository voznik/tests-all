// tslint:disable:prefer-const no-console deprecation
import { ErrorHandler, ReflectiveInjector } from '@angular/core';
import { Logger, LOGGER_LEVEL, LoggerLevel } from './logger.service';

describe('logger service', () => {
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let logger: Logger;
  let injector: ReflectiveInjector;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    warnSpy = jest.spyOn(console, 'warn');
    errorSpy = jest.spyOn(console, 'error');
  });

  describe('LoggerLevel == ERROR', () => {
    beforeEach(() => {
      injector = ReflectiveInjector.resolveAndCreate([
        { provide: LOGGER_LEVEL, useValue: LoggerLevel.ERROR },
        Logger,
      ]);
      logger = injector.get(Logger);
    });

    it('should not delegate to console.log if level is ERROR', () => {
      logger.log('param1');
      logger.warn('param1');
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should delegate to console.error', () => {
      logger.error('error1');
      expect(errorSpy).toHaveBeenCalledWith('error1');
    });
  });

  describe('LoggerLevel == DEBUG', () => {
    beforeEach(() => {
      injector = ReflectiveInjector.resolveAndCreate([
        { provide: LOGGER_LEVEL, useValue: LoggerLevel.DEBUG },
        Logger,
      ]);
      logger = injector.get(Logger);
    });

    it('should not delegate to console.log if level not LOG', () => {
      logger.log('param1');
      expect(logSpy).not.toHaveBeenCalled();
    });

    it('should delegate to console.warn', () => {
      logger.warn('param1', 'param2', 'param3');
      expect(warnSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    });
  });

  describe('LoggerLevel == LOG', () => {
    beforeEach(() => {
      injector = ReflectiveInjector.resolveAndCreate([
        { provide: LOGGER_LEVEL, useValue: LoggerLevel.LOG },
        Logger,
      ]);
      logger = injector.get(Logger);
    });

    it('should delegate to console.log', () => {
      logger.log('param1', 'param2', 'param3');
      expect(logSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
      logSpy.mockClear();
    });

    it('should delegate to console.warn', () => {
      logger.warn('param1', 'param2', 'param3');
      expect(warnSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    });
  });
});
