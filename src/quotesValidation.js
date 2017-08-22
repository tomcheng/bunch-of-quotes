import forOwn from "lodash/forOwn"
import sortBy from "lodash/sortBy";

const isValidTime = time => {
  if (time.match(/^(c\. )?\d\d\d\d\??-\d\d\d\d$/)) {
    return true;
  }

  if (time.match(/^\d\d\d\d-$/)) {
    return true;
  }

  if (time.match(/^(c\. )?\d{1,3}( BCE)?\??(-\d{1,3}\??)?( B?CE)?$/)) {
    return true;
  }

  if (time.match(/^(c\. |\d\w\w\/|late )?\d{1,2}\w\w century( BCE)?$/)) {
    return true;
  }

  return false;
};

const isValidOccupation = occ => {
  if (occ.match(/^[\w-]*( \w*)*$/)) {
    return true;
  }

  if (occ.match(/^\w+( \w+){0,5} and( [\w-"]+){1,6}$/)) {
    return true;
  }

  if (occ.match(/^\w+( \w+){0,5}, [\w-]+( [\w-]+){0,3} and( [\w-']+){1,7}$/)) {
    return true;
  }

  if (occ.match(/^[\w-]+( [\w-]+){0,3}(,( (?!and)\w+){1,11}){3,10}$/)) {
    return true;
  }

  return false;
};

const normalize = text => text.toLowerCase().replace(/[^a-z]/g,"").slice(0, 25);

const isSimilar = (q1, q2) => normalize(q1) === normalize(q2);

export const isValid = ({ authors, quotes: unsortedQuotes }) => {
  const quotes = sortBy(unsortedQuotes, q => normalize(q[0]));
  let valid = true;

  forOwn(authors, (bio, author) => {
    const [ occupation, time ] = bio;

    if (!isValidTime(time)) {
      console.log("Not valid time format:", time, author);
      valid = false;
    }

    if (!isValidOccupation(occupation)) {
      console.log("Not valid occupation format:", occupation, author);
      valid = false;
    }

    if (author !== author.trim()) {
      console.log("Not trimmed:", author);
      valid = false;
    }

    if (occupation !== occupation.trim()) {
      console.log("Not trimmed:", occupation);
      valid = false;
    }
  });

  quotes.forEach(([quote, author, context], index) => {
    if (!authors[author] && author.indexOf(" proverb") === -1) {
      console.log("Missing author:" + author);
      valid = false;
    }

    const nextQuote = quotes[index + 1];
    if (nextQuote && isSimilar(quote, nextQuote[0])) {
      console.log("Duplicate:", quote, nextQuote[0]);
      valid = false;
    }

    if (quote !== quote.trim()) {
      console.log("Not trimmed:", quote);
      valid = false;
    }

    if (author !== author.trim()) {
      console.log("Not trimmed:", author);
      valid = false;
    }

    if (context && context !== context.trim()) {
      console.log("Not trimmed:", context);
      valid = false;
    }
  });

  return valid;
};

