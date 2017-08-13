// prettier-ignore
const quotes = [
  ["The man who is always waving the flag usually waives what it stands for.", "Laurence J. Peter"],
  ["Now I see the secret of the making of the best persons. It is to grow in the open air and to eat and sleep with the earth.", "Walt Whitman"],
  [`"Don't think of it as dying," said Death. "Just think of it as leaving early to avoid the rush."`, "Terry Pratchett"],
  ["Education's purpose is to replace an empty mind with an open one.", "Malcolm S. Forbes"],
  ["The butterfly flitting from flower to flower ever remains mine, I lose the one that is netted by me.", "Rabindranath Tagore"],
  ["The squirrel that you kill in jest, dies in earnest.", "Henry David Thoreau"],
  ["In a completely rational society, the best of us would be teachers and the rest of us would have to settle for something less, because passing civilization along from one generation to the next ought to be the highest honor and the highest responsibility anyone could have.", "Lee Iacocca"],
  ["Men have become the tools of their tools.", "Henry David Thoreau"],
  ["It is kindness immediately to refuse what you intend to deny.", "Publilius Syrus"],
  ["When old words die out on the tongue, new melodies break forth from the heart; and where the old tracks are lost, new country is revealed with its wonders.", "Rabindranath Tagore"],
  ["We are not retreating - we are advancing in another direction.", "Douglas MacArthur"],
  ["When one guy sees an invisible man, he's a nut case; ten people see him, it's a cult; ten million people see him, it's a respected religion.", "Richard Jeni"],
  ["There is as much difference between us and ourselves as between us and others.", "Michel de Montaigne"],
  ["You can't do anything with anybody's body to make it dirty to me. Six people, eight people, one person - you can do only one thing to make it dirty: kill it. Hiroshima was dirty.", "Lenny Bruce"],
  ["Democracy, to me, is liberty plus economic security.", "Maury Maverick"],
  ["Let your capital be simplicity and contentment.", "Henry David Thoreau"],
  ["I believe there are more instances of the abridgment of the rights of the people by the gradual and silent encroachments of those in power than by violent and sudden usurpations.", "James Madison"],
  ["A poet should be of the / old-fashioned meaningless brand: / obscure, esoteric, symbolic, -- / the critics demand it; / so if there's a poem of mine / that you do understand / I'll gladly explain what it means / till you don't understand it.", "Piet Hein"],
  ["Be very circumspect in the choice of thy company. In the society of thine equals thou shalt enjoy more pleasure; in the society of thine superiors thou shalt find more profit. To be the best in the company is the way to grow worse; the best means to grow better is to be the worst there.", "Francis Quarles"],
  ["Every child comes with the message that God is not yet tired of the man.", "Rabindranath Tagore"],
  ["Pride, like laudanum and other poisonous medicines, is beneficial in small, though injurious in large, quantities. No man who is not pleased with himself, even in a personal sense, can please others.", "Frederick Saunders"],
  ["In an earlier stage of our development most human groups held to a tribal ethic. Members of the tribe were protected, but people of other tribes could be robbed or killed as one pleased. Gradually the circle of protection expanded, but as recently as 150 years ago we did not include blacks. So African human beings could be captured, shipped to America, and sold. In Australia white settlers regarded Aborigines as a pest and hunted them down, much as kangaroos are hunted down today. Just as we have progressed beyond the blatantly racist ethic of the era of slavery and colonialism, so we must now progress beyond the speciesist ethic of the era of factory farming, of the use of animals as mere research tools, of whaling, seal hunting, kangaroo slaughter, and the destruction of wilderness. We must take the final step in expanding the circle of ethics.", "Peter Singer"],
  ["Laws too gentle are seldom obeyed; too severe, seldom executed.", "Benjamin Franklin"],
  ["He who opens a school door, closes a prison.", "Victor Hugo"],
  ["Simplicity doesn't mean to live in misery and poverty. You have what you need, and you don't want to have what you don't need.", "Charan Singh"],
  ["There are many people who reach their conclusions about life like schoolboys; they cheat their master by copying the answer out of a book without having worked out the sum for themselves.", "Søren Kierkegaard"],
  ["The tragedy of life is what dies inside a man while he lives.", "Albert Schweitzer"],
  ["Everyone is kneaded out of the same dough but not baked in the same oven.", "Yiddish proverb"],
  ["Barricades of ideas are worth more than barricades of stones.", "José Martí"],
  ["It is of interest to note that while some dolphins are reported to have learned English - up to fifty words used in correct context - no human being has been reported to have learned dolphinese.", "Carl Sagan"],
  ["In the ordinary business of life, industry can do anything which genius can do, and very many things which it cannot.", "Henry Ward Beecher"],
  ["It is a capital mistake to theorize before one has data. Insensibly one begins to twist facts to suit theories, instead of theories to suit facts.", "Arthur Conan Doyle"],
  ["The most important scientific revolutions all include, as their only common feature, the dethronement of human arrogance from one pedestal after another of previous convictions about our centrality in the cosmos.", "Stephen Jay Gould"],
  ["A few minutes ago every tree was excited, bowing to the roaring storm, waving, swirling, tossing their branches in glorious enthusiasm like worship. But though to the outer ear these trees are now silent, their songs never cease. Every hidden cell is throbbing with music and life, every fiber thrilling like harp strings, while incense is ever flowing from the balsam bells and leaves. No wonder the hills and groves were God's first temples, and the more they are cut down and hewn into cathedrals and churches, the farther off and dimmer seems the Lord himself.", "John Muir"],
  ["Though I have been trained as a soldier, and participated in many battles, there never was a time when, in my opinion, some way could not be found to prevent the drawing of the sword. I look forward to an epoch when a court, recognized by all nations, will settle international differences.", "Ulysses S. Grant"],
  ["How far you go in life depends on your being tender with the young, compassionate with the aged, sympathetic with the striving and tolerant of the weak and strong. Because someday in life you will have been all of these.", "George Washington Carver"],
  ["A man has to live with himself, and he should see to it that he always has good company.", "Charles Evans Hughes"],
  ["As I have not worried to be born, I do not worry to die.", "Federico García Lorca"],
  ["Whenever morality is based on theology, whenever right is made dependent on divine authority, the most immoral, unjust, infamous things can be justified and established.", "Ludwig Feuerbach"],
  ["A decent provision for the poor is the true test of civilisation.", "Samuel Johnson"],
  ["Every new opinion, at its starting, is precisely in a minority of one.", "Thomas Carlyle"],
  ["The knife disappears with sharpening.", "James Richardson"],
  ["It is necessary to the happiness of man that he be mentally faithful to himself. Infidelity does not consist in believing, or in disbelieving; it consists in professing to believe what he does not believe.", "Thomas Paine"],
  ["Shelved rows of books warm and brighten the starkest room, and scattered single volumes reveal mental processes in progress - books in the act of consumption, abandoned but readily resumable, tomorrow or next year.", "John Updike"],
  ["A youth is to be regarded with respect. How do you know that his future will not be equal to our present?", "Confucius"],
  ["You've got to do your own growing, no matter how tall your grandfather was.", "Irish Proverb"],
  ["The real secret is why love starts out with claws like a cat and then fades with time like a half-eaten mouse.", "Herta Müller"],
  ["Men rarely (if ever) managed to dream up a god superior to themselves. Most gods have the manners and morals of a spoiled child.", "Robert A. Heinlein"],
  ["In the republic of mediocrity genius is dangerous.", "Robert G. Ingersoll"],
  ["To own a bit of ground, to scratch it with a hoe, to plant seeds and watch their renewal of life - this is the commonest delight of the race, the most satisfactory thing a man can do.", "Charles Dudley Warner"],
  ["We are for the most part more lonely when we go abroad among men than when we stay in our chambers. A man thinking or working is always alone, let him be where he will.", "Henry David Thoreau"],
  ["Adopt the pace of nature: her secret is patience.", "Ralph Waldo Emerson"],
  ["I own that I cannot see as plainly as others do, and as I should wish to do, evidence of design and beneficence on all sides of us. There seems to me too much misery in the world. I cannot persuade myself that a beneficent and omnipotent God would have designedly created the Ichneumonidae with the express intention of their feeding within the living bodies of caterpillars, or that a cat should play with mice.", "Charles Darwin"],
  ["There are two kinds of truth: the truth that lights the way and the truth that warms the heart. The first of these is science, and the second is art. Neither is independent of the other or more important than the other. Without art science would be as useless as a pair of high forceps in the hands of a plumber. Without science art would become a crude mess of folklore and emotional quackery. The truth of art keeps science from becoming inhuman, and the truth of science keeps art from becoming ridiculous.", "Raymond Thornton Chandler"],
  ["I am so convinced of the advantages of looking at mankind instead of reading about them, and of the bitter effects of staying at home with all the narrow prejudices of an Islander, that I think there should be a law amongst us to set our young men abroad for a term among the few allies our wars have left us.", "Lord Byron"],
  ["Millions long for immortality who do not know what to do with themselves on a rainy Sunday afternoon.", "Susan Ertz"],
  ['I used to think that people who regarded everyone benignly were a mite simple or oblivious or just plain lax - until I tried it myself. Then I realized that they made it only look easy. Even the Berditchever Rebbe, revered as a man who could strike a rock and bring forth a stream, was continually honing his intentions. "Until I remove the thread of hatred from my heart," he said of his daily meditations, "I am, in my own eyes, as if I did not exist."', "Marc Barasch"],
  ["The most exhausting thing in life is being insincere.", "Anne Morrow Lindbergh"],
  ["When you want to fool the world, tell the truth.", "Otto von Bismarck"],
  ["Pedantry and mastery are opposite attitudes toward rules. To apply a rule to the letter, rigidly, unquestioningly, in cases where it fits and in cases where it does not fit, is pedantry. ... To apply a rule with natural ease, with judgment, noticing the cases where it fits, and without ever letting the words of the rule obscure the purpose of the action or the opportunities of the situation, is mastery.", "George Polya"],
  ["How can you sing if your mouth be filled with food? How shall your hand be raised in blessing if it is filled with gold?", "Kahlil Gibran"],
  ["All ideas are already in the brain, just as all statues are in the marble.", "Carlo Dossi"],
  ["If you've got a religious belief that withers in the face of observations of the natural world, you ought to rethink your beliefs - rethinking the world isn't an option.", "PZ Myers"],
  ["Access to power must be confined to those who are not in love with it.", "Plato"],
  ["As a general truth, communities prosper and flourish, or droop and decline, in just the degree that they practise or neglect to practise the primary duties of justice and humanity.", "William Henry Seward"],
  ["You can discover what your enemy fears most by observing the means he uses to frighten you.", "Eric Hoffer"],
  ["A myth is a religion in which no one any longer believes.", "James Kern Feibleman"],
  ["If you write to impress it will always be bad, but if you write to express it will be good.", "Thornton Wilder"],
  ["We should be careful to get out of an experience only the wisdom that is in it - and stop there - lest we be like the cat that sits down on a hot stove-lid. She will never sit down on a hot stove-lid again, and that is well; but also she will never sit down on a cold one any more.", "Mark Twain"],
  ["How far should one accept the rules of the society in which one lives? To put it another way: at what point does conformity become corruption? Only by answering such questions does the conscience truly define itself.", "Kenneth Tynan"],
  ["I want to stay as close to the edge as I can without going over. Out on the edge you see all kinds of things you can't see from the center.", "Kurt Vonnegut, Jr"],
  ["I wasn't disturbing the peace, I was disturbing the war.", "Ammon Hennacy"],
  ["Always, Sir, set a high value on spontaneous kindness. He whose inclination prompts him to cultivate your friendship of his own accord, will love you more than one whom you have been at pains to attach to you.", "Samuel Johnson"],
  ["A physician is not angry at the intemperance of a mad patient; nor does he take it ill to be railed at by a man in a fever. Just so should a wise man treat all mankind, as a physician does his patient; and looking upon them only as sick and extravagant.", "Lucius Annaeus Seneca"],
  ["Of life's two chief prizes, beauty and truth, I found the first in a loving heart and the second in a laborer's hand.", "Kahlil Gibran"],
  ["Happiness is not a goal; it is a by-product.", "Eleanor Roosevelt"],
  ["It's best to give while your hand is still warm.", "Philip Roth"],
  ["Whenever books are burned men also in the end are burned.", "Heinrich Heine"],
  ["Creative activity could be described as a type of learning process where teacher and pupil are located in the same individual.", "Arthur Koestler"],
  ["That which can be destroyed by the truth, should be.", "P.C. Hodgell"],
  ["Students who acquire large debts putting themselves through school are unlikely to think about changing society. When you trap people in a system of debt, they can't afford the time to think.", "Noam Chomsky"],
  ["Conscience is a dog that does not stop us from passing but that we cannot prevent from barking.", "Nicolas de Chamfort"],
  ["He who does not bellow the truth when he knows the truth makes himself the accomplice of liars and forgers.", "Charles Peguy"],
  ["We don't need to eat anyone who would run, swim, or fly away if he could.", "James Cromwell"],
];

// prettier-ignore
const authors = {
  "James Cromwell": ["actor", "1940-"],
  "Charles Peguy": ["poet and essayist", "1873-1914"],
  "Nicolas de Chamfort": ["writer", "1741-1794"],
  "Noam Chomsky": ["linguistics professor and political activist", "1928-"],
  "P.C. Hodgell": ["writer and professor", "1951-"],
  "Arthur Koestler": ["novelist and journalist", "1905-1983"],
  "Heinrich Heine": ["poet, journalist and essayist", "1797-1856"],
  "Philip Roth": ["novelist", "1933-"],
  "Eleanor Roosevelt": ["diplomat and author", "1884-1962"],
  "Lucius Annaeus Seneca": ["philosopher", "BCE 3-65 CE"],
  "Ammon Hennacy": ["activist", "1893-1970"],
  "Kurt Vonnegut, Jr": ["writer", "1922-2007"],
  "Kenneth Tynan": ["critic and writer", "1927-1980"],
  "Mark Twain": ["author and humorist", "1835-1910"],
  "Thornton Wilder": ["writer", "1897-1975"],
  "James Kern Feibleman": ["philosopher and psychiatrist", "1904-1987"],
  "Albert Schweitzer": ["philosopher, physician and musician", "1875-1965"],
  "Anne Morrow Lindbergh": ["writer", "1906-2001"],
  "Arthur Conan Doyle": ["physician and writer", "1859-1930"],
  "Benjamin Franklin": ["statesman, author and inventor", "1706-1790"],
  "Carl Sagan": ["astronomer and writer", "1934-1996"],
  "Carlo Dossi": ["author and diplomat", "1849-1910"],
  "Charan Singh": ["mystic", "1916-1990"],
  "Charles Darwin": ["naturalist and author", "1809-1882 "],
  "Charles Dudley Warner": ["author, editor and publisher", "1829-1900"],
  "Charles Evans Hughes": ["jurist", "1862-1948"],
  "Confucius": ["philosopher and teacher", "551-497 BC"],
  "Douglas MacArthur": ["general", "1880-1964"],
  "Eric Hoffer": ["philosopher and author", "1902-1983"],
  "Federico García Lorca": ["poet, playwright and painter", "1898-1936"],
  "Francis Quarles": ["poet", "1592-1644"],
  "Frederick Saunders": ["librarian and essayist", "1807-1902"],
  "George Polya": ["mathematician", "1887-1985"],
  "George Washington Carver": ["botanist", "1864?-1943"],
  "Henry David Thoreau": ["naturalist and author", "1817-1862"],
  "Henry Ward Beecher": ["clergyman", "1813-1887"],
  "Herta Müller": ["novelist, poet and Nobel laureate", "1953-"],
  "James Madison": ["fourth US president", "1751-1836"],
  "James Richardson": ["poet and professor", "1950-"],
  "John Muir": ["naturalist, explorer and writer", "1838-1914"],
  "John Updike": ["writer", "1932-2009"],
  "José Martí": ["revolutionary and poet", "1853-1895"],
  "Kahlil Gibran": ["mystic, poet, dramatist and artist", "1883-1931"],
  "Laurence J. Peter": ["educator and author", "1919-1990"],
  "Lee Iacocca": ["automobile executive", "1924-"],
  "Lenny Bruce": ["comedian and social critic", "1925-1966"],
  "Lord Byron": ["poet", "1788-1824"],
  "Ludwig Feuerbach": ["philosopher", "1804-1872"],
  "Malcolm S. Forbes": ["entrepreneur", "1919-1990"],
  "Marc Barasch": ["author, editor and activist", "1949-"],
  "Maury Maverick": ["attorney and congressman", "1895-1954"],
  "Michel de Montaigne": ["essayist", "1533-1592"],
  "Otto von Bismarck": ["statesman", "1815-1898"],
  "Peter Singer": ["philosopher and professor of bioethics", "1946-"],
  "Piet Hein": ["poet and scientist", "1905-1996"],
  "Plato": ["philosopher", "427?-347? BC"],
  "PZ Myers": ["biology professor", "1957-"],
  "Publilius Syrus": ["writer", "c. 1st century BCE"],
  "Rabindranath Tagore": ["poet, philosopher, author, songwriter, painter, educator, composer, Nobel laureate", "1861-1941"],
  "Ralph Waldo Emerson": ["essayist, lecturer and poet", "1803-1882"],
  "Raymond Thornton Chandler": ["writer", "1888-1959"],
  "Richard Jeni": ["comedian and actor", "1957-2007"],
  "Robert A. Heinlein": ["science-fiction author", "1907-1988"],
  "Robert G. Ingersoll": ["lawyer and orator", "1833-1899"],
  "Samuel Johnson": ["lexicographer", "1709-1784"],
  "Søren Kierkegaard": ["philosopher", ""],
  "Stephen Jay Gould": ["paleontologist, biologist and author", "1941-2002"],
  "Susan Ertz": ["author", "1894-1985"],
  "Terry Pratchett": ["novelist", "1948-2015"],
  "Thomas Carlyle": ["philosopher", "1795-1881"],
  "Thomas Paine": ["philosopher and writer", "1737-1809"],
  "Ulysses S. Grant": ["military commander, 18th US President", "1822-1885"],
  "Victor Hugo": ["poet, novelist and dramatist", "1802-1885"],
  "Walt Whitman": ["poet", "1819-1892"],
  "William Henry Seward": ["Secretary of State, Governor and Senator", "1801-1872"],
};

export default quotes.map(([quote, name]) => ({
  quote,
  author: {
    name,
    position: authors[name] ? authors[name][0] : null,
    time: authors[name] ? authors[name][1] : null
  }
}));
