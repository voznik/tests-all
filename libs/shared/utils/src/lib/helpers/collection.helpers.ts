/* eslint-disable @typescript-eslint/no-explicit-any */
import fastDeepEqual from 'fast-deep-equal';

/**
 * Compare deep equeal usin `fast-deep-equal`
 *
 * @param a
 * @param b
 */
export const compareDeepEqual = (a: any, b: any) => fastDeepEqual(a, b);
