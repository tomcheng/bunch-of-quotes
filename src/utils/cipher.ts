import shuffle from "lodash/shuffle";
import { alphabet } from "./constants";
import { simpleMemoize } from "./functionUtils";

export const generateCipher = () => {
  const shuffledLetters = shuffle(alphabet);
  return alphabet.reduce(
    (cipher, letter, index) => ({
      ...cipher,
      [letter]: shuffledLetters[index],
    }),
    {}
  );
};

export const applyCipher = simpleMemoize(
  (text: string, cipher: { [key: string]: string }) =>
    text
      .toUpperCase()
      .split("")
      .map((letter) => cipher[letter] || letter)
      .join("")
);
