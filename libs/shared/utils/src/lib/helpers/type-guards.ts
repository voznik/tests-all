/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-unnecessary-type-constraint */

/**
 * Determine if an item is a function
 *
 * NOTE: While this isn't the fastest performing test in every browser, it is the faster when averaged across the browsers we care about.
 *
 * @param x - The item to test
 * @returns The result
 * @example
 * isFunction(() => {}); // Returns: true
 * isFunction('foo');    // Returns: false
 */

export const isFunction = (x: any): x is Function =>
  !!(x && x.constructor && x.call && x.apply);

/**
 * Helper function to determine if input is undefined.
 *
 * @param input - the input being tested
 * @returns boolean
 * @example
 * isUndefined(undefined) // Returns: true
 * isUndefined(null)      // Returns: false
 * isUndefined('foo')     // Returns: false
 */

export const isUndefined = (input: any): input is undefined =>
  input === undefined;

/**
 * Determine if an item is an object
 *
 * @param x - The item to test
 * @returns The result
 * @example
 * isObject({});    // Returns: true
 * isObject('foo'); // Returns: false
 */
export const isObject = (x: any): x is object =>
  Object.prototype.toString.call(x) === '[object Object]';

/**
 * Determine if a value is a string
 *
 * @param x - The value to test
 * @returns The result
 * @example
 * isString('foo'); // Returns: true
 * isString({});    // Returns: false
 */

export const isString = (x: any): x is string =>
  !!(typeof x === 'string' || x instanceof String);

export const isDate = (x: any): x is Date =>
  !!(
    typeof x.getMonth === 'function' ||
    Object.prototype.toString.call(x) === '[object Date]'
  );

/**
 * Checks if `value` has a `then()` function, indicating that it is probably promise-like.
 *
 * ```ts
 * isPromiseLike(Promise.resolve('hi')); // true
 * isPromiseLike(Promise.reject('bye')); // true
 * isPromiseLike({}); // false
 * isPromiseLike(null); // false
 * ```
 *
 * @param value
 */

export function isPromiseLike(value: any): value is PromiseLike<unknown> {
  return typeof value?.then === 'function';
}

/**
 * Determine if a value is a boolean
 *
 * @param value - The value to test
 * @returns The result
 * @example
 * isBoolean(true);  // Returns: true
 * isBoolean('foo'); // Returns: false
 */
export const isBoolean = (value: any): value is boolean =>
  value === true ||
  value === false ||
  Object.prototype.toString.call(value) === '[object Boolean]';

/**
 * Determine if an item is null
 *
 * @param x - The value to test
 * @returns The result
 * @example
 * isNull(null) // Returns: true
 * isNull(1)    // Returns: false
 */

export const isNull = (x: any): x is null => x === null;

/**
 * Determine if an item is null or undefined
 *
 * @param value
 */
export function isNullOrUndefined(value: unknown): value is Nil {
  return (
    value === undefined ||
    value === null ||
    value === 'undefined' ||
    value === 'null'
  );
}
/**
 * Determine if an item is not null or undefined
 *
 * @param value any
 * @example
 * type NullableNumber = number | null | undefined;
 * const nullableNumbers: ReadonlyArray<NullableNumber> = [1, 2, 3, null, undefined];
 * const nonNullableNumbers: ReadonlyArray<number> = nullableNumbers.filter(isNonNullable);
 * // [1, 2, 3]
 * @returns boolean
 */
export function isNonNullable<T extends unknown>(
  value: T
): value is NonNullable<T> {
  return (
    value !== undefined &&
    value !== null &&
    value !== 'undefined' &&
    value !== 'null'
  );
}

/**
 * Checks if `value` is an empty object or collection.
 *
 * Objects are considered empty if they have no own enumerable string keyed properties.
 *
 * Arrays are considered empty if they have a `length` of `0`.
 *
 * @param value
 */

export function isEmpty(value: any): boolean {
  return (
    // null or undefined
    isNullOrUndefined(value) ||
    // has length and it's zero
    value?.length === 0 ||
    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}
/**
 * Is empty string
 *
 * @param  value s
 */
export function isEmptyString(value: unknown): boolean {
  return isString(value) && !value.length;
}

/**
 * Checks if `obj` is an empty object or collection.
 *
 * @param obj
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
  const foundValue =
    obj &&
    Object.values(obj).find(
      (val) => !isNullOrUndefined(val) && !isEmptyString(val)
    );
  return isEmpty(obj) || (!foundValue && !isNumber(foundValue));
}

/**
 * Test if a given value is type number.
 *
 * @param value The given value
 * @returns Whether the given value is a number
 */

export function isNumber(value: any): value is number {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Whether or not the given value is a Native Element.
 *
 * @param value The given value
 * @returns Whether or not the value is a Native Element
 */
export function isNativeElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}
