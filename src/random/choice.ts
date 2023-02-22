export default (random: () => number) =>
  <Type>(array: readonly Type[]): Type =>
    array[Math.floor(random() * array.length)];
