"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToBase64 = void 0;
const _1 = require(".");
const pollyfills_1 = require("../pollyfills");
const arrayBufferToBase64 = (buffer) => {
    const string = _1.arrayBufferToASCIIString(buffer);
    return pollyfills_1.btoa(string);
};
exports.arrayBufferToBase64 = arrayBufferToBase64;
//# sourceMappingURL=arrayBufferToBase64.js.map