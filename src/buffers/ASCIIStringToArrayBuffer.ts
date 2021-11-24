export const ASCIIStringToArrayBuffer = (string: string) => {
  const buf = new ArrayBuffer(string.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = string.length; i < strLen; i++) {
    bufView[i] = string.charCodeAt(i);
  }
  return buf;
};
