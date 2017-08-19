import forOwn from "lodash/forOwn"

const isValidTime = (time, author) => {
  if (time.toLowerCase().indexOf("circa") > -1) {
    console.log("Should use c. instead of circa for " + author);
    return false;
  }

  return true;
};

const isSimilar = (q1, q2) => q1.toLowerCase().trim().slice(0, 30) === q2.toLowerCase().trim().slice(0, 30);

export const isValid = ({ authors, quotes }) => {
  let valid = true;

  forOwn(authors, (bio, author) => {
    const [ occupation, time ] = bio;

    if (time) {
      valid = valid && isValidTime(time, author);
    }
  });

  quotes.forEach(([quote, author, context], index) => {
    if (!authors[author] && author.indexOf(" proverb") === -1) {
      console.log("No entry for " + author);
      valid = false;
    }

    if (quotes.slice(index + 1).some(([q]) => isSimilar(q, quote))) {
      console.log("Duplicate found", quote, author);
      valid = false;
    }
  });

  return valid;
};

