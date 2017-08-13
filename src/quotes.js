// prettier-ignore
const quotes = [
  [1, "The man who is always waving the flag usually waives what it stands for.", "Laurence J. Peter"],
  [2, "Now I see the secret of the making of the best persons. It is to grow in the open air and to eat and sleep with the earth.", "Walt Whitman"],
  [3, `"Don't think of it as dying," said Death. "Just think of it as leaving early to avoid the rush."`, "Terry Pratchett"],
  [4, "Education's purpose is to replace an empty mind with an open one.", "Malcolm S. Forbes"],
  [5, "The butterfly flitting from flower to flower ever remains mine, I lose the one that is netted by me.", "Rabindranath Tagore"],
  [6, "The squirrel that you kill in jest, dies in earnest.", "Henry David Thoreau"],
  [7, "In a completely rational society, the best of us would be teachers and the rest of us would have to settle for something less, because passing civilization along from one generation to the next ought to be the highest honor and the highest responsibility anyone could have.", "Lee Iacocca"],
  [8, "Men have become the tools of their tools.", "Henry David Thoreau"],
  [9, "It is kindness immediately to refuse what you intend to deny.", "Publilius Syrus"],
  [10, "When old words die out on the tongue, new melodies break forth from the heart; and where the old tracks are lost, new country is revealed with its wonders.", "Rabindranath Tagore"],
  [11, "We are not retreating - we are advancing in another direction.", "Douglas MacArthur"],
  [12, "When one guy sees an invisible man, he's a nut case; ten people see him, it's a cult; ten million people see him, it's a respected religion.", "Richard Jeni"],
  [13, "There is as much difference between us and ourselves as between us and others.", "Michel de Montaigne"],
  [14, "You can't do anything with anybody's body to make it dirty to me. Six people, eight people, one person - you can do only one thing to make it dirty: kill it. Hiroshima was dirty.", "Lenny Bruce"],
  [15, "Democracy, to me, is liberty plus economic security.", "Maury Maverick"],
  [16, "Let your capital be simplicity and contentment.", "Henry David Thoreau"],
  [17, "I believe there are more instances of the abridgment of the rights of the people by the gradual and silent encroachments of those in power than by violent and sudden usurpations.", "James Madison"],
  [18, "A poet should be of the / old-fashioned meaningless brand: / obscure, esoteric, symbolic, -- / the critics demand it; / so if there's a poem of mine / that you do understand / I'll gladly explain what it means / till you don't understand it.", "Piet Hein"],
  [19, "Be very circumspect in the choice of thy company. In the society of thine equals thou shalt enjoy more pleasure; in the society of thine superiors thou shalt find more profit. To be the best in the company is the way to grow worse; the best means to grow better is to be the worst there.", "Francis Quarles"],
  [20, "Every child comes with the message that God is not yet tired of the man.", "Rabindranath Tagore"],
  [21, "Pride, like laudanum and other poisonous medicines, is beneficial in small, though injurious in large, quantities. No man who is not pleased with himself, even in a personal sense, can please others.", "Frederick Saunders"],
  [22, "In an earlier stage of our development most human groups held to a tribal ethic. Members of the tribe were protected, but people of other tribes could be robbed or killed as one pleased. Gradually the circle of protection expanded, but as recently as 150 years ago we did not include blacks. So African human beings could be captured, shipped to America, and sold. In Australia white settlers regarded Aborigines as a pest and hunted them down, much as kangaroos are hunted down today. Just as we have progressed beyond the blatantly racist ethic of the era of slavery and colonialism, so we must now progress beyond the speciesist ethic of the era of factory farming, of the use of animals as mere research tools, of whaling, seal hunting, kangaroo slaughter, and the destruction of wilderness. We must take the final step in expanding the circle of ethics.", "Peter Singer"],
  [23, "Laws too gentle are seldom obeyed; too severe, seldom executed.", "Benjamin Franklin"],
  [24, "He who opens a school door, closes a prison.", "Victor Hugo"],
];

// prettier-ignore
const authors = {
  "Benjamin Franklin": ["statesman, author and inventor", "1706-1790"],
  "Douglas MacArthur": ["general", "1880-1964"],
  "Francis Quarles": ["poet", "1592-1644"],
  "Frederick Saunders": ["librarian and essayist", "1807-1902"],
  "Henry David Thoreau": ["naturalist and author", "1817-1862"],
  "James Madison": ["fourth US president", "1751-1836"],
  "Laurence J. Peter": ["educator and author", "1919-1990"],
  "Lee Iacocca": ["automobile executive", "1924-"],
  "Lenny Bruce": ["comedian and social critic", "1925-1966"],
  "Malcolm S. Forbes": ["entrepreneur", "1919-1990"],
  "Maury Maverick": ["attorney and congressman", "1895-1954"],
  "Michel de Montaigne": ["essayist", "1533-1592"],
  "Peter Singer": ["philosopher and professor of bioethics", "1946-"],
  "Piet Hein": ["poet and scientist", "1905-1996"],
  "Publilius Syrus": ["writer", "c. 1st century BCE"],
  "Rabindranath Tagore": ["poet, philosopher, author, songwriter, painter, educator, composer, Nobel laureate", "1861-1941"],
  "Richard Jeni": ["comedian and actor", "1957-2007"],
  "Terry Pratchett": ["novelist", "1948-2015"],
  "Victor Hugo": ["poet, novelist and dramatist", "1802-1885"],
  "Walt Whitman": ["poet", "1819-1892"],
};

export default quotes.map(([id, quote, name]) => ({
  id,
  quote,
  author: {
    name,
    position: authors[name] ? authors[name][0] : null,
    time: authors[name] ? authors[name][1] : null
  }
}));
