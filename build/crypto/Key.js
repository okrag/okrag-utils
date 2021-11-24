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
exports.Key = exports.AES_ALGORITHM = exports.RSA_ALGORITHM = exports.getUsage = exports.publicUsage = exports.privateUsage = exports.getExportType = void 0;
const __1 = require("..");
const getExportType = (keyType) => keyType === "public" ? "spki" : keyType === "secret" ? "raw" : "pkcs8";
exports.getExportType = getExportType;
exports.privateUsage = ["decrypt", "unwrapKey"];
exports.publicUsage = ["encrypt", "wrapKey"];
const getUsage = (keyType) => keyType === "private"
    ? exports.privateUsage
    : keyType === "secret"
        ? [...exports.privateUsage, ...exports.publicUsage]
        : exports.publicUsage;
exports.getUsage = getUsage;
exports.RSA_ALGORITHM = {
    name: "RSA-OAEP",
    hash: "SHA-256",
};
exports.AES_ALGORITHM = {
    name: "AES-GCM",
    length: 256,
};
class Key {
    constructor(native) {
        this.native = native;
        this.type = this.native.type;
        if (!this.native.extractable)
            throw Error("Key must be extractable");
    }
    export() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exported = yield __1.crypto.subtle.exportKey(exports.getExportType(this.type), this.native);
                return __1.arrayBufferToBase64(exported);
            }
            catch (e) {
                throw new Error("Error while exporting a key");
            }
        });
    }
    wrap(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const iv = __1.crypto.getRandomValues(new Uint8Array(12));
                const wrapped = yield __1.crypto.subtle.wrapKey(exports.getExportType(key.type), key.native, this.native, Object.assign(Object.assign({}, this.native.algorithm), { iv }));
                return __1.arrayBufferToBase64(wrapped) + "." + __1.arrayBufferToBase64(iv);
            }
            catch (e) {
                throw new Error("Error while wrapping a key");
            }
        });
    }
    unwrap(wrapped, type, algorithm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [key, iv64] = wrapped.split(".");
                const buffer = __1.base64ToArrayBuffer(key);
                const iv = __1.base64ToArrayBuffer(iv64);
                return new Key(yield __1.crypto.subtle.unwrapKey(exports.getExportType(type), buffer, this.native, Object.assign(Object.assign({}, this.native.algorithm), { iv }), algorithm, true, exports.getUsage(type)));
            }
            catch (e) {
                throw new Error("Error while unwrapping a key");
            }
        });
    }
    encrypt(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.native.usages.includes("encrypt"))
                throw Error("Can't encrypt with that key");
            try {
                const iv = __1.crypto.getRandomValues(new Uint8Array(12));
                const encrypted = yield __1.crypto.subtle.encrypt(Object.assign(Object.assign({}, this.native.algorithm), { iv }), this.native, __1.utf8ToArrayBuffer(message));
                return __1.arrayBufferToBase64(encrypted) + "." + __1.arrayBufferToBase64(iv);
            }
            catch (e) {
                throw new Error("Error while encrypting a message");
            }
        });
    }
    decrypt(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.native.usages.includes("decrypt"))
                throw Error("Can't decrypt with that key");
            try {
                const [data, iv64] = message.split(".");
                const buffer = __1.base64ToArrayBuffer(data);
                const iv = __1.base64ToArrayBuffer(iv64);
                const decrypted = yield __1.crypto.subtle.decrypt(Object.assign(Object.assign({}, this.native.algorithm), { iv: iv }), this.native, buffer);
                return __1.arrayBufferToUtf8(decrypted);
            }
            catch (e) {
                throw new Error("Error while decrypting a message");
            }
        });
    }
}
exports.Key = Key;
//# sourceMappingURL=Key.js.map