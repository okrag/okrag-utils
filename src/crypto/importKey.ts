import {
  base64ToArrayBuffer,
  crypto,
  getUsage,
  getExportType,
  Key,
  AES_ALGORITHM,
  RSA_ALGORITHM,
} from "..";

export const importKey = async (pem: string, type: KeyType) => {
  try {
    const buffer = base64ToArrayBuffer(pem);
    const native = await crypto.subtle.importKey(
      getExportType(type),
      buffer,
      type === "secret" ? AES_ALGORITHM : RSA_ALGORITHM,
      true,
      getUsage(type),
    );
    return new Key(native);
  } catch (_e) {
    const e = _e as Error;
    const error = new Error("Error while importing a key: ");
    error.stack = e.stack;
    error.message += `${e.name}: ${e.message}`;
    throw error;
  }
};
