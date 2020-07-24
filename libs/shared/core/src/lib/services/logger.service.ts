// tslint:disable:no-unused-expression no-console only-arrow-functions max-line-length prefer-conditional-expression
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

const noop = (): void => undefined;
/**
 * The available log levels.
 */
export enum LoggerLevel {
  OFF = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  LOG = 5,
}

/**
 * The token to provide the log {@link Level}.
 */
export const LOGGER_LEVEL = new InjectionToken<LoggerLevel>('LoggerLevel');

/**
 * A logger service that provide the same functions as {@link console}.
 * The logger is binded to the console, so the Web Console shows the correct file and line number of the original call.
 */
@Injectable()
export class Logger {
  /**
   * Outputs a message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output OR JavaScript objects with which to replace substitution strings within message.
   */
  log: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs a debugging message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output OR JavaScript objects with which to replace substitution strings within message.
   */
  debug: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs an informational message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output OR JavaScript objects with which to replace substitution strings within message.
   */
  info: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs a warning message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output OR JavaScript objects with which to replace substitution strings within message.
   */
  warn: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs an error message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output OR JavaScript objects with which to replace substitution strings within message.
   */
  error: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Creates a new inline group in the Web Console log.
   * @param groupTitle An optional title for the group.
   */
  group: (groupTitle?: string) => void;

  /**
   * Creates a new inline group in the Web Console log that is initially collapsed.
   * @param groupTitle An optional title for the group.
   */
  groupCollapsed: (groupTitle?: string) => void;

  /**
   * Exits the current inline group in the Web Console.
   */
  groupEnd: () => void;

  /**
   * Starts a timer you can use to track how long an operation takes. It works only with log {@link Level} equal or higher than DEBUG.
   * @param timerName The name to give the new timer. This will identify the timer.
   */
  time: (timerName?: string) => void;

  /**
   * Stops a timer that was previously started by calling {@link Logger.time}. It works only with log {@link Level} equal or higher than DEBUG.
   * @param timerName The name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the Web Console.
   */
  timeEnd: (timerName?: string) => void;

  /**
   * The log level.
   */
  private _level: LoggerLevel;
  private _clientLogLevel: LoggerLevel;

  /**
   * Returns the log level.
   */
  get level(): LoggerLevel {
    return this._level;
  }

  constructor(@Inject(LOGGER_LEVEL) level: LoggerLevel) {
    this._level = level;

    // console.log
    if (this._level >= LoggerLevel.LOG && console && console.log) {
      this.log = console.log.bind(console);
    } else {
      this.log = noop;
    }

    // console.debug
    if (this._level >= LoggerLevel.DEBUG && console && console.debug) {
      this.debug = console.debug.bind(console);
    } else {
      this.debug = noop;
    }

    // console.info
    if (this._level >= LoggerLevel.INFO && console && console.info) {
      this.info = console.info.bind(console);
    } else {
      this.info = noop;
    }

    // console.warn
    if (this._level >= LoggerLevel.WARN && console && console.warn) {
      this.warn = console.warn.bind(console);
    } else {
      this.warn = noop;
    }

    // console.error
    if (this._level >= LoggerLevel.ERROR && console && console.error) {
      this.error = console.error.bind(console);
    } else {
      this.error = noop;
    }

    // console.group
    if (this._level > LoggerLevel.OFF && console && console.group) {
      this.group = console.group.bind(console);
    } else {
      this.group = noop;
    }

    // console.groupCollapsed
    if (this._level > LoggerLevel.OFF && console && console.groupCollapsed) {
      this.groupCollapsed = console.groupCollapsed.bind(console);
    } else {
      this.groupCollapsed = noop;
    }

    // console.groupEnd
    if (this._level > LoggerLevel.OFF && console && console.groupEnd) {
      this.groupEnd = console.groupEnd.bind(console);
    } else {
      this.groupEnd = noop;
    }

    // console.time
    if (this._level >= LoggerLevel.DEBUG && console && console.time) {
      this.time = console.time.bind(console);
    } else {
      this.time = noop;
    }

    // console.timeEnd
    if (this._level >= LoggerLevel.DEBUG && console && console.timeEnd) {
      this.timeEnd = console.timeEnd.bind(console);
    } else {
      this.timeEnd = noop;
    }
  }

  // custom method that skips _log, to log group only debug level
  logGroup(
    method: keyof Console = 'log',
    args: any,
    groupName = 'ℹ️ Debug:'
  ): void {
    // if no message or the log level is less than the environ
    if (LoggerLevel.DEBUG < this._clientLogLevel) {
      return;
    }
    console.groupCollapsed(groupName);
    for (const argName in args) {
      if (args[argName] !== undefined) {
        this[method](
          `%c${argName} =`,
          'color: #D91468; font-weight: bold',
          args[argName]
        );
      } else {
        this[method](
          `%c${argName} =`,
          'color: #80746D; font-weight: bold',
          args[argName]
        );
      }
    }
    console.groupEnd();
  }
}
