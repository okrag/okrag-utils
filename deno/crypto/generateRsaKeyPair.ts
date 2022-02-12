import { getUsage, Key, RSA_ALGORITHM } from "./index.ts";

export const generateRsaKeyPair = async () => {
  const native = await crypto.subtle.generateKey(
    {
      ...RSA_ALGORITHM,
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    getUsage("secret"),
  );

  if (!native.privateKey || !native.publicKey)
    throw new Error(
      `Error while generating rsa keypair: ${
        !native.privateKey ? "privateKey" : "publicKey"
      } doesn't exist`,
    );

  return {
    privateKey: new Key(native.privateKey),
    publicKey: new Key(native.publicKey),
  };
};
