import keyBy from "lodash/keyBy";
import omit from "lodash/omit";
import sample from "lodash/sample";
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
    hash: hash(text)
  })),
  quote => quote.hash
);

const getSolvedHashes = () => {
  const solvedStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  return solvedStr ? JSON.parse(solvedStr) : [];
};

export const markQuoteAsSolved = ({ hash }) => {
  const solvedHashes = getSolvedHashes();
  solvedHashes.push(hash);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(solvedHashes));
};

export const getUnsolvedQuote = () =>
  sample(values(omit(quotes, getSolvedHashes())));

export const getSolvedQuotes = () =>
  getSolvedHashes().map(hash => quotes[hash]);
