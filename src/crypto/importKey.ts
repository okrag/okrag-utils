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
  } catch (e) {
    throw new Error("Error while importing a key");
  }
};
