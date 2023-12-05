import { REGEXPS } from './regex.constants';

/**
 * Capitalize first letter in a string
 * From: https://stackoverflow.com/a/43237732
 * @param str
 */
export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.toLowerCase().substring(1)}`;

/**
 * Humanize a string
 * From: https://stackoverflow.com/a/28339742/477550
 * @param str
 * @param cap
 */
export const humanize = (str: string, cap = false) => {
  const newStr = str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase());
  return cap
    ? newStr
        .split(' ')
        .map((s) => capitalize(s))
        .join(' ')
    : str;
};

/**
 * Make string into camel case
 * @param str
 */
export const camelize = (str: string) =>
  str
    .toLowerCase()
    // Replaces any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace(/[^\w\s]/g, '')
    // Uppercases the first character in each group immediately following a space
    // (delimited by spaces)
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    })
    // Removes spaces
    .replace(/ /g, '');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
/**
 * Escape regexp
 *
 * @param str
 */
export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

/**
 * Creates Regexp matcher from string
 *
 * @param str
 */
export const stringMatcher = (str: string) =>
  new RegExp(`^${escapeRegExp(str)}$`, 'i');

/**
  Replace number with commas
 *
 * @param x
 */
export function numberWithCommas(x: number | unknown) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Generate a canonically formatted UUID that is Version 1 through 5 and is the appropriate Variant as per RFC4122.
 *
 * @returns The UUID
 * @example
 * generateUUID() // Returns a UUID such as: `f4ee5eed-ed19-3681-713e-907a23ed7858`
 */
export function generateUUID(): string {
  const buf = new Uint16Array(8);
  window.crypto.getRandomValues(buf);

  const S4 = function (num: number) {
    let ret = num.toString(16);
    while (ret.length < 4) {
      ret = `0${ret}`;
    }
    return ret;
  };

  return `${S4(buf[0]) + S4(buf[1])}-${S4(buf[2])}-${S4(buf[3])}-${S4(
    buf[4]
  )}-${S4(buf[5])}${S4(buf[6])}${S4(buf[7])}`;
}

/**
 * True if string matches UUID
 *
 * @param str
 */
export const matchUUID = (str: string): boolean => {
  return REGEXPS.uuid.test(str);
};
