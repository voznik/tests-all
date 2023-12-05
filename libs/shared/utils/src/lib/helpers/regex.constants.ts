/* eslint-disable no-useless-escape */
export const REGEXPS = {
  mac: /^([0-9a-f]{1,2}[\.:-]){5}([0-9a-f]{1,2})$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  host: /(((http|ws)([s]){0,1}:\/\/){0,1}(localhost|127.0.0.1){1}(([:]){0,1}[\0-9]{4}){0,1}\/{0,1}){1}/i,
  accessToken: /^[a-f0-9]{40}$/i,
};
