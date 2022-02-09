import { NodeRequire } from "..";

/**
 * @argument length Uint32Array length
 * @returns Uint32Array with random values
 */
const getRandomValues = (
  typeof self !== "undefined" && (self.crypto || (self as any).msCrypto)
    ? function () {
        // Browsers
        const crypto = self.crypto || (self as any).msCrypto,
          QUOTA = 65536;
        return function (length: number) {
          var a = new Uint32Array(length);
          for (var i = 0; i < length; i += QUOTA) {
            crypto.getRandomValues(a.subarray(i, i + Math.min(length - i, QUOTA)));
          }
          return a;
        };
      }
    : function () {
        // Node
        const crypto = NodeRequire("crypto");
        return function (length: number) {
          return new Uint32Array(
            Array(length)
              .fill(0)
              .map(() => crypto.randomBytes(4).readUInt32BE(0, true)),
          );
        };
      }
)();

export default getRandomValues;
