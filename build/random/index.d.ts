export declare namespace CryptoRandom {
    /**
     * @argument Uint32Array length
     * @returns Uint32Array with random values
     */
    const getRandomValues: (length: number) => Uint32Array;
    /**
     * @returns Pseudorandom cryptographic number between 0 and 1.
     */
    const random: () => number;
    /**
     * @returns Random int
     */
    const randomInt: (min: number, max: number) => number;
    /**
     * @returns random choice from array
     */
    const choice: <Type>(array: readonly Type[]) => Type;
    /**
     * @argument characters list
     * @argument length of the string
     * @returns Random string from given characters
     */
    const randomString: (characters: string, length: number) => string;
}
/**
 * @returns Pseudorandom number between 0 and 1.
 */
export declare const random: () => number;
/**
 * @returns random choice from array
 */
export declare const choice: <Type>(array: readonly Type[]) => Type;
/**
 * @returns Random int
 */
export declare const randomInt: (min: number, max: number) => number;
/**
 * @argument characters list
 * @argument length of the string
 * @returns Random string from given characters
 */
export declare const randomString: (characters: string, length: number) => string;
