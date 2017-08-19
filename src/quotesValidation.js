import forOwn from "lodash/forOwn"

const isValidTime = (time, author) => {
  if (time.toLowerCase().indexOf("circa") > -1) {
    console.log("Should use c. instead of circa for " + author);
    return false;
  }

  return true;
};

export const isValid = ({ authors, quotes }) => {
  let valid = true;

  forOwn(authors, (bio, author) => {
    const [ occupation, time ] = bio;

    if (time) {
      valid = valid && isValidTime(time, author);
    }
  });

  quotes.forEach(([quote, author, context]) => {
    if (!authors[author] && author.indexOf(" proverb") === -1) {
      console.log("No entry for " + author);
      valid = false;
    }
  });

  return valid;
};

