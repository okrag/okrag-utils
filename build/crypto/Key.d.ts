export declare const getExportType: (keyType: KeyType) => "spki" | "raw" | "pkcs8";
export declare type ExtendedKeyType = `${KeyType}Key`;
export declare const privateUsage: KeyUsage[];
export declare const publicUsage: KeyUsage[];
export declare const getUsage: (keyType: KeyType) => KeyUsage[];
export declare const RSA_ALGORITHM: {
    name: string;
    hash: string;
};
export declare const AES_ALGORITHM: {
    name: string;
    length: number;
};
export declare class Key {
    native: CryptoKey;
    type: KeyType;
    constructor(native: CryptoKey);
    export(): Promise<string>;
    wrap(key: Key): Promise<string>;
    unwrap(wrapped: string, type: KeyType, algorithm: Algorithm): Promise<Key>;
    encrypt(message: string): Promise<string>;
    decrypt(message: string): Promise<string>;
}
