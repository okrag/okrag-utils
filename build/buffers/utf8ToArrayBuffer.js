"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8ToArrayBuffer = void 0;
const encoder = new TextEncoder();
const utf8ToArrayBuffer = (string) => encoder.encode(string);
exports.utf8ToArrayBuffer = utf8ToArrayBuffer;
//# sourceMappingURL=utf8ToArrayBuffer.js.map