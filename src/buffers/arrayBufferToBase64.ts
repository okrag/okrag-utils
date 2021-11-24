import { arrayBufferToASCIIString } from ".";
import { btoa } from "../pollyfills";

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const string = arrayBufferToASCIIString(buffer);
  return btoa(string);
};
