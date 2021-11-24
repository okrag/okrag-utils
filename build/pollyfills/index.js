"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypto = exports.btoa = exports.atob = void 0;
const isNode = typeof module !== "undefined" && module.exports;
const nodeCrypto = isNode ? require("crypto") : null;
const nodePollyfill = (name, property) => {
    var _a, _b, _c, _d;
    if (typeof window === "undefined" || typeof self === "undefined")
        return property;
    const windowOrSelf = (_d = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a[name]) !== null && _b !== void 0 ? _b : (_c = self) === null || _c === void 0 ? void 0 : _c[name]) !== null && _d !== void 0 ? _d : property;
    if (typeof windowOrSelf === "function") {
        return windowOrSelf.bind(window !== null && window !== void 0 ? window : self);
    }
    return windowOrSelf;
};
const nodePollyfillFactory = (name, property) => {
    var _a, _b, _c, _d;
    return typeof window === "undefined" || typeof self === "undefined"
        ? property()
        : (_d = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a[name]) !== null && _b !== void 0 ? _b : (_c = self) === null || _c === void 0 ? void 0 : _c[name]) !== null && _d !== void 0 ? _d : property();
};
exports.atob = nodePollyfill("atob", (data) => Buffer.from(data, "base64").toString("binary"));
exports.btoa = nodePollyfill("btoa", (data) => Buffer.from(data, "binary").toString("base64"));
exports.crypto = nodePollyfillFactory("crypto", () => nodeCrypto.webcrypto);
//# sourceMappingURL=index.js.map