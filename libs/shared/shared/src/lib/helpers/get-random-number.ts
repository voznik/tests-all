/**
 * The Math.random() function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range. The implementation selects the initial seed to the random number generation algorithm; it cannot be chosen or reset by the user.
 *
 * @returns number
 *
 * @example
 * getRandomNumber(1) // Returns 1
 */
export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}
