const decoder = new TextDecoder();

export const arrayBufferToUtf8 = (string: Uint8Array) => decoder.decode(string);
