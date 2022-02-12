const encoder = new TextEncoder();

export const utf8ToArrayBuffer = (string: string) => encoder.encode(string);
