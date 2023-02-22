import _choice from "./choice.ts";
import _getRandomValues from "./getRandomValues.ts";
import _randomInt from "./randomInt.ts";
import _randomString from "./randomString.ts";

export namespace CryptoRandom {
  /**
   * @argument Uint32Array length
   * @returns Uint32Array with random values
   */
  export const getRandomValues = _getRandomValues;
  /**
   * @returns Pseudorandom cryptographic number between 0 and 1.
   */
  export const random = () => getRandomValues(1)[0] / (0xffffffff + 1);
  /**
   * @returns Random int
   */
  export const randomInt = _randomInt(random);
  /**
   * @returns random choice from array
   */
  export const choice = _choice(random);

  /**
   * @argument characters list
   * @argument length of the string
   * @returns Random string from given characters
   */
  export const randomString = _randomString(random);
}
/**
 * @returns Pseudorandom number between 0 and 1.
 */
export const random = Math.random;
/**
 * @returns random choice from array
 */
export const choice = _choice(random);
/**
 * @returns Random int
 */
export const randomInt = _randomInt(random);

/**
 * @argument characters list
 * @argument length of the string
 * @returns Random string from given characters
 */
export const randomString = _randomString(random);
