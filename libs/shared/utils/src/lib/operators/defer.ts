import { Observable, defer } from 'rxjs';

/**
 * Operator to act as a tap, but only once
 *
 * @param callback AnyFn
 */
export const tapOnce = <T>(callback: () => void) => {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
};
