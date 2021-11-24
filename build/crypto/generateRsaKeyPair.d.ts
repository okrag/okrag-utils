import { Key } from ".";
export declare const generateRsaKeyPair: () => Promise<{
    privateKey: Key;
    publicKey: Key;
}>;
