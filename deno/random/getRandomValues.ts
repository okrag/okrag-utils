/**
 * @argument length Uint32Array length
 * @returns Uint32Array with random values
 */
const getRandomValues = (function () {
  // Browsers
  const QUOTA = 65536;
  return function (length: number) {
    var a = new Uint32Array(length);
    for (var i = 0; i < length; i += QUOTA) {
      crypto.getRandomValues(a.subarray(i, i + Math.min(length - i, QUOTA)));
    }
    return a;
  };
})();

export default getRandomValues;
