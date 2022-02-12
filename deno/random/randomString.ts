import _choice from "./choice.ts";

export default (random: () => number) => (characters: string, length: number) => {
  const randomChoice = _choice(random);

  let string = "";
  const charactersArray = characters.split("");
  for (let i = 0; i < length; i++) {
    string += randomChoice(charactersArray);
  }
  return string;
};
