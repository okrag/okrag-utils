"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToASCIIString = void 0;
const arrayBufferToASCIIString = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
};
exports.arrayBufferToASCIIString = arrayBufferToASCIIString;
//# sourceMappingURL=arrayBufferToASCIIString.js.map