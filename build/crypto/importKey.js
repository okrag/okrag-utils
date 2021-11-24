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
exports.importKey = void 0;
const __1 = require("..");
const importKey = (pem, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buffer = __1.base64ToArrayBuffer(pem);
        const native = yield __1.crypto.subtle.importKey(__1.getExportType(type), buffer, type === "secret" ? __1.AES_ALGORITHM : __1.RSA_ALGORITHM, true, __1.getUsage(type));
        return new __1.Key(native);
    }
    catch (e) {
        throw new Error("Error while importing a key");
    }
});
exports.importKey = importKey;
//# sourceMappingURL=importKey.js.map