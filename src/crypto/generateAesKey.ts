import { getUsage, Key, AES_ALGORITHM } from ".";
import { crypto } from "../pollyfills";
import { utf8ToArrayBuffer } from "../buffers";

export const generateAesKey = async (passphrase?: string) => {
  if (!passphrase)
    return new Key(await crypto.subtle.generateKey(AES_ALGORITHM, true, getUsage("secret")));
  const passphreaseDigest = await crypto.subtle.digest(
    "SHA-" + AES_ALGORITHM.length,
    utf8ToArrayBuffer(passphrase),
  );
  return new Key(
    await crypto.subtle.importKey(
      "raw",
      passphreaseDigest,
      { name: "AES-GCM" },
      true,
      getUsage("secret"),
    ),
  );
};
