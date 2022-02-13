import {
  arrayBufferToBase64,
  arrayBufferToUtf8,
  base64ToArrayBuffer,
  utf8ToArrayBuffer,
} from "../mod.ts";

export const getExportType = (keyType: KeyType) =>
  keyType === "public" ? "spki" : keyType === "secret" ? "raw" : "pkcs8";

export type ExtendedKeyType = `${KeyType}Key`;

export const privateUsage: KeyUsage[] = ["decrypt", "unwrapKey"];
export const publicUsage: KeyUsage[] = ["encrypt", "wrapKey"];

export const getUsage = (keyType: KeyType) =>
  keyType === "private"
    ? privateUsage
    : keyType === "secret"
    ? [...privateUsage, ...publicUsage]
    : publicUsage;

export const RSA_ALGORITHM = {
  name: "RSA-OAEP",
  hash: "SHA-256",
};
export const AES_ALGORITHM = {
  name: "AES-GCM",
  length: 256,
};

export class Key {
  type: KeyType;

  constructor(public native: CryptoKey) {
    this.type = this.native.type;
    if (!this.native.extractable) throw Error("Key must be extractable");
  }

  async export() {
    try {
      const exported = await crypto.subtle.exportKey(getExportType(this.type), this.native);
      return arrayBufferToBase64(exported);
    } catch (e) {
      throw new Error("Error while exporting a key");
    }
  }
  async wrap(key: Key) {
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const wrapped = await crypto.subtle.wrapKey(
        getExportType(key.type),
        key.native,
        this.native,
        {
          ...this.native.algorithm,
          iv,
        },
      );
      return arrayBufferToBase64(wrapped) + "." + arrayBufferToBase64(iv);
    } catch (e) {
      throw new Error("Error while wrapping a key");
    }
  }
  async unwrap(wrapped: string, type: KeyType, algorithm: Algorithm) {
    try {
      const [key, iv64] = wrapped.split(".");
      const buffer = base64ToArrayBuffer(key);
      const iv = base64ToArrayBuffer(iv64);

      return new Key(
        await crypto.subtle.unwrapKey(
          getExportType(type),
          buffer,
          this.native,
          {
            ...this.native.algorithm,
            iv,
          },
          algorithm,
          true,
          getUsage(type),
        ),
      );
    } catch (e) {
      throw new Error("Error while unwrapping a key");
    }
  }
  async encrypt(message: string) {
    if (!this.native.usages.includes("encrypt")) throw Error("Can't encrypt with that key");
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encrypted = await crypto.subtle.encrypt(
        { ...this.native.algorithm, iv },
        this.native,
        utf8ToArrayBuffer(message),
      );
      return arrayBufferToBase64(encrypted) + "." + arrayBufferToBase64(iv);
    } catch (e) {
      throw new Error("Error while encrypting a message");
    }
  }

  async encryptRaw(data: Uint8Array) {
    if (!this.native.usages.includes("encrypt")) throw Error("Can't encrypt with that key");
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encrypted = await crypto.subtle.encrypt(
        { ...this.native.algorithm, iv },
        this.native,
        data,
      );
      return { encrypted, iv };
    } catch (e) {
      throw new Error("Error while encrypting a message");
    }
  }

  async decrypt(message: string) {
    if (!this.native.usages.includes("decrypt")) throw Error("Can't decrypt with that key");
    try {
      const [data, iv64] = message.split(".");
      const buffer = base64ToArrayBuffer(data);
      const iv = base64ToArrayBuffer(iv64);
      const decrypted = await crypto.subtle.decrypt(
        { ...this.native.algorithm, iv: iv },
        this.native,
        buffer,
      );
      return arrayBufferToUtf8(decrypted as any);
    } catch (e) {
      throw new Error("Error while decrypting a message");
    }
  }

  async decryptRaw({ encrypted, iv }: { encrypted: Uint8Array; iv: Uint8Array }) {
    if (!this.native.usages.includes("decrypt")) throw Error("Can't decrypt with that key");
    try {
      const decrypted = await crypto.subtle.decrypt(
        { ...this.native.algorithm, iv: iv },
        this.native,
        encrypted,
      );
      return decrypted as Uint8Array;
    } catch (e) {
      throw new Error("Error while decrypting a message");
    }
  }
}
