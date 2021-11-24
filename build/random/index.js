"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = exports.randomInt = exports.choice = exports.random = exports.CryptoRandom = void 0;
const choice_1 = __importDefault(require("./choice"));
const getRandomValues_1 = __importDefault(require("./getRandomValues"));
const randomInt_1 = __importDefault(require("./randomInt"));
const randomString_1 = __importDefault(require("./randomString"));
var CryptoRandom;
(function (CryptoRandom) {
    /**
     * @argument Uint32Array length
     * @returns Uint32Array with random values
     */
    CryptoRandom.getRandomValues = getRandomValues_1.default;
    /**
     * @returns Pseudorandom cryptographic number between 0 and 1.
     */
    CryptoRandom.random = () => CryptoRandom.getRandomValues(1)[0] / (0xffffffff + 1);
    /**
     * @returns Random int
     */
    CryptoRandom.randomInt = randomInt_1.default(CryptoRandom.random);
    /**
     * @returns random choice from array
     */
    CryptoRandom.choice = choice_1.default(CryptoRandom.random);
    /**
     * @argument characters list
     * @argument length of the string
     * @returns Random string from given characters
     */
    CryptoRandom.randomString = randomString_1.default(CryptoRandom.random);
})(CryptoRandom = exports.CryptoRandom || (exports.CryptoRandom = {}));
/**
 * @returns Pseudorandom number between 0 and 1.
 */
exports.random = Math.random;
/**
 * @returns random choice from array
 */
exports.choice = choice_1.default(exports.random);
/**
 * @returns Random int
 */
exports.randomInt = randomInt_1.default(exports.random);
/**
 * @argument characters list
 * @argument length of the string
 * @returns Random string from given characters
 */
exports.randomString = randomString_1.default(exports.random);
//# sourceMappingURL=index.js.map