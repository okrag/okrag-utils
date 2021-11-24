"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToArrayBuffer = void 0;
const pollyfills_1 = require("../pollyfills");
const _1 = require(".");
const base64ToArrayBuffer = (base64) => {
    const dataString = pollyfills_1.atob(base64);
    return _1.ASCIIStringToArrayBuffer(dataString);
};
exports.base64ToArrayBuffer = base64ToArrayBuffer;
//# sourceMappingURL=base64ToArrayBuffer.js.map