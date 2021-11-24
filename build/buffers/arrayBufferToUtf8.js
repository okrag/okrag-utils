"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToUtf8 = void 0;
const decoder = new TextDecoder();
const arrayBufferToUtf8 = (string) => decoder.decode(string);
exports.arrayBufferToUtf8 = arrayBufferToUtf8;
//# sourceMappingURL=arrayBufferToUtf8.js.map