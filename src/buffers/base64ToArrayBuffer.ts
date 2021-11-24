import { atob } from "../pollyfills";
import { ASCIIStringToArrayBuffer } from ".";

export const base64ToArrayBuffer = (base64: string) => {
  const dataString = atob(base64);
  return ASCIIStringToArrayBuffer(dataString);
};
