"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAesKey = void 0;
const _1 = require(".");
const pollyfills_1 = require("../pollyfills");
const buffers_1 = require("../buffers");
const generateAesKey = (passphrase) => __awaiter(void 0, void 0, void 0, function* () {
    if (!passphrase)
        return new _1.Key(yield pollyfills_1.crypto.subtle.generateKey(_1.AES_ALGORITHM, true, _1.getUsage("secret")));
    const passphreaseDigest = yield pollyfills_1.crypto.subtle.digest("SHA-" + _1.AES_ALGORITHM.length, buffers_1.utf8ToArrayBuffer(passphrase));
    return new _1.Key(yield pollyfills_1.crypto.subtle.importKey("raw", passphreaseDigest, { name: "AES-GCM" }, true, _1.getUsage("secret")));
});
exports.generateAesKey = generateAesKey;
//# sourceMappingURL=generateAesKey.js.map