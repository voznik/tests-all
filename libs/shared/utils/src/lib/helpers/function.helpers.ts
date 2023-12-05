/**
 * This method returns the first argument it receives.
 *
 * @param value
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Creates a function that returns `value`.
 *
 * @param value
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Placeholder function.
 *
 * @returns Undefined
 */
export const noop = (): undefined => void 0;
