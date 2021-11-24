"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASCIIStringToArrayBuffer = void 0;
const ASCIIStringToArrayBuffer = (string) => {
    const buf = new ArrayBuffer(string.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = string.length; i < strLen; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
};
exports.ASCIIStringToArrayBuffer = ASCIIStringToArrayBuffer;
//# sourceMappingURL=ASCIIStringToArrayBuffer.js.map