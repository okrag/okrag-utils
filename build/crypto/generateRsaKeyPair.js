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
exports.generateRsaKeyPair = void 0;
const _1 = require(".");
const pollyfills_1 = require("../pollyfills");
const generateRsaKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
    const native = yield pollyfills_1.crypto.subtle.generateKey(Object.assign(Object.assign({}, _1.RSA_ALGORITHM), { modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]) }), true, _1.getUsage("secret"));
    if (!native.privateKey || !native.publicKey)
        throw new Error(`Error while generating rsa keypair: ${!native.privateKey ? "privateKey" : "publicKey"} doesn't exist`);
    return {
        privateKey: new _1.Key(native.privateKey),
        publicKey: new _1.Key(native.publicKey),
    };
});
exports.generateRsaKeyPair = generateRsaKeyPair;
//# sourceMappingURL=generateRsaKeyPair.js.map