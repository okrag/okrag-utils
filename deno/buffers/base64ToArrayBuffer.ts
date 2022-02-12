import { ASCIIStringToArrayBuffer } from "./index.ts";

export const base64ToArrayBuffer = (base64: string) => {
  const dataString = atob(base64);
  return ASCIIStringToArrayBuffer(dataString);
};
