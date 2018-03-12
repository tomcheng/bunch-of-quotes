import shuffle from "lodash/shuffle";
import { alphabet } from "./constants";
import { simpleMemoize } from "./functionUtils";

const letters = alphabet.split("");

export const generateCipher = () => {
  const shuffledLetters = shuffle(letters);
  return letters.reduce(
    (cipher, letter, index) => ({
      ...cipher,
      [letter]: shuffledLetters[index]
    }),
    {}
  );
};

export const applyCipher = simpleMemoize((text, cipher) =>
  text
    .toUpperCase()
    .split("")
    .map(letter => cipher[letter] || letter)
    .join("")
);
