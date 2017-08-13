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
  [10, 5, "When old words die out on the tongue, new melodies break forth from the heart; and where the old tracks are lost, new country is revealed with its wonders."],
  [11, 9, "We are not retreating - we are advancing in another direction."],
  [12, 10, "When one guy sees an invisible man, he's a nut case; ten people see him, it's a cult; ten million people see him, it's a respected religion."],
  [13, 11, "There is as much difference between us and ourselves as between us and others."],
  [14, 12, "You can't do anything with anybody's body to make it dirty to me. Six people, eight people, one person - you can do only one thing to make it dirty: kill it. Hiroshima was dirty."],
  [15, 13, "Democracy, to me, is liberty plus economic security."],
  [16, 6, "Let your capital be simplicity and contentment."],
  [17, 14, "I believe there are more instances of the abridgment of the rights of the people by the gradual and silent encroachments of those in power than by violent and sudden usurpations."],
  [18, 15, "A poet should be of the / old-fashioned meaningless brand: / obscure, esoteric, symbolic, -- / the critics demand it; / so if there's a poem of mine / that you do understand / I'll gladly explain what it means / till you don't understand it."],
  [19, 16, "Be very circumspect in the choice of thy company. In the society of thine equals thou shalt enjoy more pleasure; in the society of thine superiors thou shalt find more profit. To be the best in the company is the way to grow worse; the best means to grow better is to be the worst there."],
  [20, 5, "Every child comes with the message that God is not yet tired of the man."],
  [21, 17, "Pride, like laudanum and other poisonous medicines, is beneficial in small, though injurious in large, quantities. No man who is not pleased with himself, even in a personal sense, can please others."],
];

// prettier-ignore
const authors = [
  [1, "Laurence J. Peter", "educator and author", "1919-1990"],
  [2, "Walt Whitman", "poet", "1819-1892"],
  [3, "Terry Pratchett", "novelist", "1948-2015"],
  [4, "Malcolm S. Forbes", "entrepreneur", "1919-1990"],
  [5, "Rabindranath Tagore", "poet, philosopher, author, songwriter, painter, educator, composer, Nobel laureate", "1861-1941"],
  [6, "Henry David Thoreau", "naturalist and author", "1817-1862"],
  [7, "Lee Iacocca", "automobile executive", "1924-"],
  [8, "Publilius Syrus", "writer", "c. 1st century BCE"],
  [9, "Douglas MacArthur", "general", "1880-1964"],
  [10, "Richard Jeni", "comedian and actor", "1957-2007"],
  [11, "Michel de Montaigne", "essayist", "1533-1592"],
  [12, "Lenny Bruce", "comedian and social critic", "1925-1966"],
  [13, "Maury Maverick", "attorney and congressman", "1895-1954"],
  [14, "James Madison", "fourth US president", "1751-1836"],
  [15, "Piet Hein", "poet and scientist", "1905-1996"],
  [16, "Francis Quarles", "poet", "1592-1644"],
  [17, "Frederick Saunders", "librarian and essayist", "1807-1902"],
];

const authorsById = keyBy(authors.map(([id, name, position, time]) => ({ id, name, position, time })), a => a.id);

export default quotes.map(([id, authorId, quote]) => ({
  id,
  quote,
  author: authorsById[authorId]
}));
