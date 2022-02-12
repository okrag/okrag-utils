import { arrayBufferToASCIIString } from "./index.ts";

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const string = arrayBufferToASCIIString(buffer);
  return btoa(string);
};
