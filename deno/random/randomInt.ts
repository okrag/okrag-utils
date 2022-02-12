export default (random: () => number) => (min: number, max: number) =>
  Math.floor(random() * (max - min + 1)) + min;
