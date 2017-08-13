import keyBy from "lodash/keyBy";

// prettier-ignore
const quotes = [
  [1, 1, "The man who is always waving the flag usually waives what it stands for."],
  [2, 2, "Now I see the secret of the making of the best persons. It is to grow in the open air and to eat and sleep with the earth."],
  [3, 3, `"Don't think of it as dying," said Death. "Just think of it as leaving early to avoid the rush."`],
  [4, 4, "Education's purpose is to replace an empty mind with an open one."],
  [5, 5, "The butterfly flitting from flower to flower ever remains mine, I lose the one that is netted by me."],
  [6, 6, "The squirrel that you kill in jest, dies in earnest."],
  [7, 7, "In a completely rational society, the best of us would be teachers and the rest of us would have to settle for something less, because passing civilization along from one generation to the next ought to be the highest honor and the highest responsibility anyone could have."],
  [8, 6, "Men have become the tools of their tools."],
  [9, 8, "It is kindness immediately to refuse what you intend to deny."],
];

// prettier-ignore
const authors = [
  [1, "1919-1990", "Laurence J. Peter", "educator and author"],
  [2, "1819-1892", "Walt Whitman", "poet"],
  [3, "1948-2015", "Terry Pratchett", "novelist"],
  [4, "1919-1990", "Malcolm S. Forbes", "entrepreneur"],
  [5, "1861-1941", "Rabindranath Tagore", "philosopher, author, songwriter, painter, educator, composer, Nobel laureate"],
  [6, "1817-1862", "Henry David Thoreau", "naturalist and author"],
  [7, "1924-", "Lee Iacocca", "automobile executive"],
  [8, "c. 1st century BCE", "Publilius Syrus", "writer"]
];

const authorsById = keyBy(authors.map(([id, time, name, position]) => ({ id, time, name, position })), a => a.id);

export default quotes.map(([id, authorId, quote]) => ({
  id,
  quote,
  author: authorsById[authorId]
}));
