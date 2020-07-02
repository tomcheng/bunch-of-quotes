import type { Quote } from "./components/types";
import compact from "lodash/compact";
import keyBy from "lodash/keyBy";
import omit from "lodash/omit";
import sample from "lodash/sample";
import uniq from "lodash/uniq";
import values from "lodash/values";
import { hash } from "./utils/hash";
import { quotes as quotesList, authors } from "./quotes";

const LOCAL_STORAGE_KEY = "__solved_quotes__";

const quotes = keyBy(
  quotesList.map(([text, name, context]) => ({
    text,
    context,
    name,
    occupation: authors[name] ? authors[name][0] : null,
    time: authors[name] ? authors[name][1] : null,
    hash: hash(text),
  })),
  (quote) => quote.hash
);

const getSolvedHashes = (): string[] => {
  const solvedStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  return solvedStr ? uniq(JSON.parse(solvedStr)) : [];
};

export const markQuoteAsSolved = ({ hash }: { hash: string }) => {
  const solvedHashes = getSolvedHashes();
  solvedHashes.push(hash);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(solvedHashes));
};

export const getUnsolvedQuote = (): Quote =>
  sample(values(omit(quotes, getSolvedHashes()))) as Quote;

export const getSolvedQuotes = () =>
  compact(
    getSolvedHashes()
      .reverse()
      .map((hash) => quotes[hash])
  );
