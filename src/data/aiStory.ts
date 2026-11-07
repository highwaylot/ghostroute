import type { Story } from './storyTypes';

// Facts checked against the sources listed at the bottom. Where sources
// disagree (XCON's savings, ChatGPT's first users) the text says "about"
// or "by one estimate" and uses the more cautious number.
export const AI_STORY: Story = {
  id: 'ai',
  path: '/ai',
  label: 'ai',
  eyebrow: 'ai · the whole story',
  title: 'From bronze giants to chatbots.',
  intro:
    'People have dreamed of thinking machines for almost 3,000 years. This is how the dream turned into the AI on your phone. You can try three of the old machines yourself along the way.',
  bigIdea: {
    title: 'The one idea to hold on to',
    text: 'There are two ways to make a machine act smart. You can write the rules yourself, or you can show it examples and let it find the rules. For 70 years these two ideas took turns winning. Right now, learning from examples is far ahead.',
  },
  eras: [
    {
      id: 'dreams',
      title: 'Dreams of thinking machines',
      years: 'before 1936',
      blurb: 'Long before computers, people told stories about machines that think. A few tried to turn thinking into steps a machine could follow.',
      entries: [
        {
          year: 'c. 700 BC',
          title: 'Talos, the bronze guard',
          text: 'Greek myths told of Talos, a giant bronze man who walked around the island of Crete and threw rocks at ships. It is one of the oldest stories about a made thing that acts on its own.',
        },
        {
          year: 'c. 1305',
          title: "Llull's paper wheels",
          text: 'Ramon Llull, a thinker from Majorca, made paper wheels with words written around them. Turning the wheels lined up new statements. He hoped a method like this could settle arguments for good.',
        },
        {
          year: '1670s',
          title: '"Let us calculate"',
          text: 'Gottfried Leibniz built a machine that could multiply. He dreamed of a language so exact that two people who disagreed could just sit down and say: let us calculate.',
        },
        {
          year: '1843',
          title: "Ada Lovelace's notes",
          text: "Ada Lovelace wrote notes on Charles Babbage's planned Analytical Engine. She saw that it could work with symbols and even music, not just numbers. She also wrote that it could never come up with anything truly new. People still argue about that.",
        },
        {
          year: '1854',
          title: 'Logic becomes math',
          text: 'George Boole showed that true-or-false thinking can be written as simple math. Every computer today runs on his idea, in the form of ones and zeros.',
        },
        {
          year: '1921',
          title: 'The word "robot"',
          text: "Karel Čapek's play R.U.R. opened in Prague and gave the world the word robot. It comes from a Czech word for forced work. The robots in the play rise up against people, a story told many times since.",
        },
      ],
    },
    {
      id: 'foundations',
      title: 'The first electronic brains',
      years: '1936–1955',
      blurb: 'Math, war and the first computers gave people a real question to test: can a machine think?',
      entries: [
        {
          year: '1936',
          title: 'A machine on paper',
          text: 'Alan Turing imagined a simple machine that reads and writes symbols on a long tape. He showed it could carry out any step-by-step method at all. Every computer since is a real version of that idea.',
        },
        {
          year: '1943',
          title: 'A brain cell in math',
          text: 'Warren McCulloch and Walter Pitts wrote down a simple model of a brain cell. It switches on when enough of its inputs push it. Wire enough of them together and they can do logic. Today\'s neural networks grew from this.',
        },
        {
          year: '1949',
          title: 'Cells that fire together',
          text: 'Donald Hebb suggested that the brain learns by making a link stronger each time two cells fire together. It was one of the first clear ideas of how a machine might learn.',
        },
        {
          year: '1950',
          title: 'The imitation game',
          text: 'Turing asked "can machines think?" and then swapped it for a question he could test. Can a machine chat by typing so well that a judge cannot tell it from a person? We now call this the Turing test.',
        },
        {
          year: '1951',
          title: 'Games become the test',
          text: 'Christopher Strachey wrote a checkers program, and Dietrich Prinz a chess puzzle solver, on early British computers. Games have clear rules and a clear winner. That made them the favorite test for AI for the next 65 years.',
        },
        {
          year: '1952–59',
          title: 'A program that practiced',
          text: "Arthur Samuel's checkers program at IBM got better by playing against copies of itself. In 1959 he gave this a name: machine learning.",
        },
      ],
    },
    {
      id: 'golden-years',
      title: 'AI gets its name',
      years: '1956–1973',
      blurb: 'A summer workshop named the field. Early wins made experts promise human-level AI within 20 years.',
      entries: [
        {
          year: '1956',
          title: 'The Dartmouth workshop',
          text: 'John McCarthy, Marvin Minsky, Claude Shannon and Nathaniel Rochester asked for money for a summer study. In the request, McCarthy used the words artificial intelligence. Their workshop at Dartmouth College is seen as the birth of the field.',
        },
        {
          year: '1956',
          title: 'Logic Theorist',
          text: 'Allen Newell, Herbert Simon and Cliff Shaw wrote a program that proved theorems from a famous math book. For one of them, it found a shorter proof than the book had.',
        },
        {
          year: '1958',
          title: 'The perceptron',
          text: 'Frank Rosenblatt built a machine that learned to sort shapes by seeing examples. The New York Times reported that the Navy expected it to walk, talk and know it exists. It could not. Try the idea yourself below.',
          demo: 'perceptron',
        },
        {
          year: '1958',
          title: 'Lisp',
          text: 'McCarthy created Lisp, a programming language built for AI work. Many ideas that started in Lisp are now in the languages people use every day.',
        },
        {
          year: '1966',
          title: 'ELIZA, the first chatbot',
          text: 'Joseph Weizenbaum wrote ELIZA, a program that chatted like a therapist. It understood nothing. It spotted key words and turned your own words back into questions. Many people still felt understood, which worried Weizenbaum for the rest of his life.',
          demo: 'eliza',
        },
        {
          year: '1966–72',
          title: 'Shakey the robot',
          text: 'Shakey, built at SRI in California, was the first robot that could plan its own actions. It took pictures, worked out a plan and rolled from room to room to carry it out. The A* search method, still used in maps and games, came from this project.',
        },
        {
          year: '1969',
          title: 'The book that froze neural networks',
          text: 'Minsky and Seymour Papert published Perceptrons. It proved that a single-layer perceptron cannot learn some simple patterns, like "one or the other, but not both." Money for neural network research mostly dried up for over a decade.',
        },
        {
          year: '1970',
          title: 'SHRDLU and the block world',
          text: 'Terry Winograd\'s program moved blocks around a pretend table when you typed plain English, like "put the red block on the blue one." It was amazing inside its tiny world. Outside it, the tricks fell apart.',
        },
      ],
    },
    {
      id: 'first-winter',
      title: 'The first AI winter',
      years: '1974–1980',
      blurb: 'The promises ran far ahead of the results. The people paying for the research lost patience.',
      entries: [
        {
          year: '1966',
          title: 'Translation falls short',
          text: 'A US report found that machine translation was slower, less accurate and more expensive than human translators. Government money for it was cut.',
        },
        {
          year: '1973',
          title: 'The Lighthill report',
          text: 'James Lighthill told the UK government that AI had not come close to its grand goals. Britain cut most of its AI research money soon after.',
        },
        {
          year: '1970s',
          title: 'Too many choices',
          text: 'Programs that solved toy problems choked on real ones. Each extra step multiplied the number of choices to check, until no computer could keep up. This wall still shapes how AI is built.',
        },
        {
          year: '1974',
          title: 'The money runs out',
          text: 'DARPA, the US military research agency, sharply cut its money for open-ended AI research. The lean years that followed became known as the first AI winter.',
        },
      ],
    },
    {
      id: 'expert-systems',
      title: 'The expert systems boom',
      years: '1980–1987',
      blurb: 'AI came back as a business: programs packed with rules written down by human experts.',
      entries: [
        {
          year: '1980',
          title: 'XCON earns its keep',
          text: 'At the computer company DEC, a program called XCON worked out the parts for each customer order. It used thousands of if-then rules taken from experts. By the mid-1980s it was said to save DEC about $25 million a year.',
        },
        {
          year: '1982',
          title: "Japan's big bet",
          text: 'Japan started a ten-year plan to build computers that reason, called the Fifth Generation project. The US and Britain rushed to start AI projects of their own.',
        },
        {
          year: '1982',
          title: 'Networks that remember',
          text: 'John Hopfield showed a network that stores memories and can rebuild a whole pattern from a small piece of it. In 2024 he shared the Nobel Prize in Physics for this kind of work.',
        },
        {
          year: '1984',
          title: 'Cyc, common sense by hand',
          text: 'Doug Lenat began typing everyday knowledge into a computer, one fact at a time. Facts like "water makes things wet." The project ran for decades and showed how much people know without noticing.',
        },
        {
          year: '1986',
          title: 'Backpropagation',
          text: 'David Rumelhart, Geoffrey Hinton and Ronald Williams made famous a way for networks with many layers to learn. Each mistake is sent backward through the network, and every link gets nudged a little. This got past the wall from the Perceptrons book.',
        },
      ],
    },
    {
      id: 'second-winter',
      title: 'The second AI winter',
      years: '1987–1993',
      blurb: 'The rule-based systems turned out to be costly to keep running, and the boom ended again.',
      entries: [
        {
          year: '1987',
          title: 'Special AI computers lose',
          text: 'Companies had built costly computers made just for running Lisp. Cheaper desktop computers from Apple and IBM caught up with them. That whole market fell apart in about a year.',
        },
        {
          year: 'early 1990s',
          title: 'Brittle rules',
          text: 'Expert systems broke on unusual cases, and keeping thousands of rules up to date was slow and costly. Many companies quietly stopped using them.',
        },
        {
          year: '1992',
          title: 'The Fifth Generation ends',
          text: "Japan's project closed without reaching its goals. For a while, AI was a word that scared away investors. Researchers called their work other names to get it paid for.",
        },
      ],
    },
    {
      id: 'quiet-progress',
      title: 'Quiet progress',
      years: '1989–2011',
      blurb: 'AI kept improving under other names: search, speech, spam filters, recommendations. Then it beat the world champions.',
      entries: [
        {
          year: '1989–98',
          title: 'Networks learn to read',
          text: 'Yann LeCun trained networks that look at small patches of a picture at a time. By the late 1990s, systems like his read the handwritten amounts on millions of US bank checks.',
        },
        {
          year: '1992',
          title: 'TD-Gammon',
          text: "Gerald Tesauro's backgammon program taught itself by playing against itself. It reached the level of the best human players, and even changed how experts play some moves.",
        },
        {
          year: '1997',
          title: 'Deep Blue beats Kasparov',
          text: "IBM's Deep Blue beat world chess champion Garry Kasparov in a six-game match. It did not think like a person. It checked about 200 million positions every second.",
        },
        {
          year: '1997',
          title: 'Networks with memory',
          text: 'Sepp Hochreiter and Jürgen Schmidhuber designed a network that can remember things over long sequences, called LSTM. Years later it powered speech recognition and translation on phones.',
        },
        {
          year: '2005',
          title: 'A car drives itself across the desert',
          text: "In 2004, no robot car finished DARPA's desert race. In 2005, Stanford's car Stanley won it, driving 212 km (132 miles) with no one at the wheel.",
        },
        {
          year: '2009',
          title: 'ImageNet',
          text: "Fei-Fei Li's team built ImageNet, millions of photos each labeled with what is in them. Its yearly contest gave researchers a fair way to compare their methods. It set up the next big leap.",
        },
        {
          year: '2011',
          title: 'Watson wins Jeopardy!',
          text: "IBM's Watson beat the two greatest champions of the TV quiz show Jeopardy!. It had to untangle puns and tricky clues, then buzz in faster than the humans.",
        },
        {
          year: '2011',
          title: 'Siri',
          text: 'Apple put Siri, a voice assistant, in the iPhone 4S. Talking to your phone went from science fiction to normal in a few years.',
        },
      ],
    },
    {
      id: 'deep-learning',
      title: 'Deep learning takes off',
      years: '2012–2017',
      blurb: 'Three things met at last. There was lots of data, fast chips made for games, and an old idea: networks that work a bit like a brain.',
      entries: [
        {
          year: '2012',
          title: 'AlexNet',
          text: 'Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton entered a deep neural network in the ImageNet contest. It got about 15% of its answers wrong, while the next best got 26% wrong. The chips that draw video game graphics made it fast enough to train.',
        },
        {
          year: '2012',
          title: 'The cat detector',
          text: "A Google network watched millions of frames from YouTube videos. Without being told what a cat was, it ended up with a part that reacted to cats. Nobody wrote a cat rule.",
        },
        {
          year: '2014',
          title: 'Two networks in a contest',
          text: 'Ian Goodfellow set two networks against each other. One makes fake pictures, and the other tries to catch the fakes. Both keep getting better, which led to the first AI-made faces that looked real.',
        },
        {
          year: '2016',
          title: 'AlphaGo',
          text: "DeepMind's AlphaGo beat Lee Sedol, one of the best Go players alive, four games to one. Go has more possible board positions than there are atoms in the universe. Its move 37 in game two surprised every expert watching.",
        },
        {
          year: '2017',
          title: 'Attention is all you need',
          text: 'Google researchers described the transformer. It reads all the words of a text at once and works out which words matter to each other. Nearly every chatbot today is built on it.',
        },
        {
          year: '2017',
          title: 'AlphaZero',
          text: 'Given only the rules, AlphaZero taught itself chess, shogi and Go by playing against itself. It then beat the strongest programs in all three games.',
        },
      ],
    },
    {
      id: 'language-models',
      title: 'Machines that write',
      years: '2018–2022',
      blurb: 'Feed a transformer a huge share of the internet and teach it to guess the next word. Surprising things happen.',
      entries: [
        {
          year: '2018',
          title: 'GPT and BERT',
          text: "OpenAI's GPT and Google's BERT learned language by reading huge amounts of text. GPT practiced guessing the next word. BERT practiced filling in missing words. Try a tiny next-word guesser below.",
          demo: 'nextword',
        },
        {
          year: '2019',
          title: 'Too risky to share?',
          text: 'OpenAI first held back the full GPT-2, worried it could flood the web with fake news. It released the model in stages over the year. The fight over how open AI should be had begun.',
        },
        {
          year: '2020',
          title: 'GPT-3',
          text: 'GPT-3 had 175 billion adjustable numbers inside it. Shown just a few examples, it could write essays, simple code and poems, with no extra training.',
        },
        {
          year: '2020',
          title: 'AlphaFold',
          text: "DeepMind's AlphaFold 2 predicted the 3D shapes of proteins almost as well as lab experiments. Biologists had worked on that problem for 50 years. Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for it.",
        },
        {
          year: '2021–22',
          title: 'Pictures from words',
          text: 'DALL·E, Midjourney and Stable Diffusion made pictures from a typed description. Stable Diffusion was free to download and run. Artists asked hard questions about their work being used to train these models without asking them.',
        },
        {
          year: '2022',
          title: 'ChatGPT',
          text: 'OpenAI released ChatGPT on 30 November 2022. By one estimate it had 100 million users two months later, faster than any app before it. Suddenly everyone was talking to AI.',
        },
      ],
    },
    {
      id: 'everywhere',
      title: 'AI everywhere',
      years: '2023–today',
      blurb: 'Chatbots became tools millions use at work and school. The questions got bigger too.',
      entries: [
        {
          year: '2023',
          title: 'A year of chatbots',
          text: "OpenAI's GPT-4 scored well on hard exams like the bar exam. Anthropic released Claude, and Google released Bard, later renamed Gemini. Chatbots learned to read pictures as well as text.",
        },
        {
          year: '2023',
          title: 'Models you can run yourself',
          text: "Meta shared its Llama models so others could run and change them. Many open models followed, from France's Mistral to China's DeepSeek. AI was no longer only in the hands of a few companies.",
        },
        {
          year: '2024',
          title: 'Nobel Prizes for AI',
          text: 'The physics prize went to Hopfield and Hinton for neural networks. The chemistry prize went partly to Hassabis and Jumper for AlphaFold. Ideas once seen as a dead end now had the top prize in science.',
        },
        {
          year: '2024',
          title: 'The first big AI law',
          text: 'The European Union passed the AI Act. It sorts AI uses by risk, bans a few outright and sets rules for the rest. Its rules come in step by step over several years.',
        },
        {
          year: '2024–25',
          title: 'Models that think first',
          text: 'New models learned to work through a problem in steps before answering. They got much better at math, science and code. DeepSeek showed in 2025 that this could be done for far less money than people thought.',
        },
        {
          year: '2025',
          title: 'From answering to doing',
          text: 'AI agents began to take on whole tasks. They search, write and run code, use other tools and check their own work. For many programmers, an agent that works across a whole project became normal.',
        },
        {
          year: 'today',
          title: 'The open questions',
          text: 'How do we make AI honest and safe? Who owns the work it learned from? What happens to jobs, and to the energy it uses? Nobody has settled these yet. The rules-versus-examples story is still being written.',
        },
      ],
    },
  ],
  sources: [
    { label: 'Nils J. Nilsson, The Quest for Artificial Intelligence (2009)', url: 'https://ai.stanford.edu/~nilsson/QAI/qai.pdf' },
    { label: 'Alan Turing, "Computing Machinery and Intelligence" (1950)', url: 'https://academic.oup.com/mind/article/LIX/236/433/986238' },
    { label: 'The Dartmouth proposal (1955)', url: 'http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf' },
    { label: 'Joseph Weizenbaum, "ELIZA" (1966)', url: 'https://dl.acm.org/doi/10.1145/365153.365168' },
    { label: 'The Lighthill report (1973)', url: 'http://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm' },
    { label: 'Krizhevsky, Sutskever and Hinton, the AlexNet paper (2012)', url: 'https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks' },
    { label: 'Vaswani et al., "Attention Is All You Need" (2017)', url: 'https://arxiv.org/abs/1706.03762' },
    { label: 'Reuters on the UBS estimate of ChatGPT users (2023)', url: 'https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/' },
    { label: 'Nobel Prize in Physics 2024', url: 'https://www.nobelprize.org/prizes/physics/2024/summary/' },
    { label: 'Nobel Prize in Chemistry 2024', url: 'https://www.nobelprize.org/prizes/chemistry/2024/summary/' },
    { label: 'The EU AI Act, Regulation (EU) 2024/1689', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
    { label: 'Wikipedia, History of artificial intelligence', url: 'https://en.wikipedia.org/wiki/History_of_artificial_intelligence' },
  ],
  meta: {
    title: 'The history of AI, from myth to chatbots · tagsmiths',
    description:
      'The whole story of artificial intelligence in plain words, from Talos and Ada Lovelace to ChatGPT. Chat with ELIZA, train a perceptron and try a next-word guesser in your browser.',
  },
};
