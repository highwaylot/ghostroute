import type { Story } from './storyTypes';

// Two parts: the history of games, then the ideas designers use to make
// them. Each idea is dated by when it was first put into words, so the
// toolbox reads as a timeline too.
export const GAME_STORY: Story = {
  id: 'game-design',
  path: '/game-design',
  label: 'game design',
  eyebrow: 'game design · the whole story',
  title: 'From dice in a tomb to worlds you build.',
  intro:
    'People have made games for at least 5,000 years. This is how board games became video games, and the ideas designers use to make a game fun. At the end there is a small game you can tune yourself.',
  bigIdea: {
    title: 'The one idea to hold on to',
    text: 'A game is a set of rules that makes a goal harder to reach, on purpose. Every game in this story, from senet to Minecraft, is someone choosing which obstacles are fun to beat.',
  },
  eras: [
    {
      id: 'before-screens',
      part: 'history',
      title: 'Games before screens',
      years: 'c. 3100 BC–1974',
      blurb: 'Every big idea in game design started on a table: luck, turns, races, battles and stories.',
      entries: [
        {
          year: 'c. 3100 BC',
          title: 'Senet',
          text: 'In Egypt, people played senet on a board of 30 squares, throwing sticks instead of dice. Boards were buried with the dead, including the pharaoh Tutankhamun. It is one of the oldest board games we know.',
        },
        {
          year: 'c. 2600 BC',
          title: 'The Royal Game of Ur',
          text: 'This race game was found in royal tombs in what is now Iraq. Its rules were lost for thousands of years. Then a museum expert read them from an old clay tablet, so people can play it again today.',
        },
        {
          year: 'c. 500 BC',
          title: 'Go',
          text: 'Go comes from China and is first written about around 500 BC. The rules fit on a card, yet the game is so deep that no computer beat a top player until 2016. Simple rules that lead to deep play is a goal designers still chase.',
        },
        {
          year: 'c. 600',
          title: 'Chess',
          text: 'Chess began in India and changed as it traveled through Persia to Europe. The queen only got her big moves around 1475, which made games much faster. Players have always changed the rules of games they love.',
        },
        {
          year: '1824',
          title: 'Kriegsspiel',
          text: 'A Prussian army officer published a war game played on real maps, with dice for luck and a referee to judge each move. Armies trained with it. It is an ancestor of both strategy games and role-playing games.',
        },
        {
          year: '1904',
          title: "The Landlord's Game",
          text: 'Lizzie Magie patented a board game to show how landlords get rich while renters get poor. Players changed it over the years, and it became Monopoly in 1935. A game can carry a message.',
        },
        {
          year: '1974',
          title: 'Dungeons & Dragons',
          text: 'Gary Gygax and Dave Arneson published Dungeons & Dragons. One player runs the world, and each of the others plays a single hero. Hit points, levels and experience points, now in countless video games, come from here.',
        },
      ],
    },
    {
      id: 'lab-games',
      part: 'history',
      title: 'Games in the lab',
      years: '1950–1969',
      blurb: 'The first computer games were made to show off machines. Visitors just wanted to play.',
      entries: [
        {
          year: '1950',
          title: 'Bertie the Brain',
          text: 'Josef Kates built a 4-meter-tall machine that played tic-tac-toe at a fair in Toronto. It used light bulbs, not a screen. People lined up to try to beat it.',
        },
        {
          year: '1951',
          title: 'Nimrod',
          text: 'The company Ferranti built a computer to play the old game of Nim at the Festival of Britain. It was meant to show off the math. Visitors cared much more about winning.',
        },
        {
          year: '1952',
          title: 'OXO',
          text: 'Sandy Douglas made tic-tac-toe for the EDSAC computer at Cambridge, drawn on a tiny round screen. It is one of the first games ever shown on a screen.',
        },
        {
          year: '1958',
          title: 'Tennis for Two',
          text: 'William Higinbotham built a tennis game for visitors\' day at a US science lab. It showed a side view of a court on a small screen, and the ball bounced like a real one. The lines to play were longer than for any other exhibit.',
        },
        {
          year: '1962',
          title: 'Spacewar!',
          text: 'Steve Russell and friends at MIT made Spacewar! Two ships fight around a star whose gravity pulls them in. Copies spread to computers at other schools, and players kept adding new features.',
        },
      ],
    },
    {
      id: 'arcades',
      part: 'history',
      title: 'Arcades and the first consoles',
      years: '1971–1979',
      blurb: 'Games left the labs and went into bars, arcades and living rooms.',
      entries: [
        {
          year: '1971',
          title: 'Computer Space',
          text: 'Nolan Bushnell and Ted Dabney made the first coin-operated video game, a space shooter. Most people found it too hard to figure out, and it sold poorly. The lesson stuck with Bushnell.',
        },
        {
          year: '1972',
          title: 'The Magnavox Odyssey',
          text: "Ralph Baer's \"Brown Box\" became the first home video game console. It could only draw a few dots and a line. Plastic sheets stuck on the TV screen added the scenery.",
        },
        {
          year: '1972',
          title: 'Pong',
          text: 'At Atari, Allan Alcorn built Pong as a practice project. Its only instruction was "avoid missing ball for high score." Anyone could understand it in seconds, and it was a huge hit.',
        },
        {
          year: '1976',
          title: 'Colossal Cave Adventure',
          text: 'Will Crowther wrote a game about exploring a cave in words alone. You typed short commands like GO NORTH. Don Woods added much more the next year, and the adventure game was born.',
        },
        {
          year: '1978',
          title: 'Space Invaders',
          text: "Tomohiro Nishikado's aliens march faster as you shoot them down. That happened because the hardware could move fewer aliens faster. A limit of the machine turned into rising tension, and designers have copied it ever since.",
        },
        {
          year: '1979',
          title: 'The first Easter egg',
          text: "Atari did not put designers' names on its games. So Warren Robinett hid his name in a secret room in Adventure. Players found it, and hidden surprises in games have been called Easter eggs ever since.",
        },
      ],
    },
    {
      id: 'golden-age',
      part: 'history',
      title: 'The golden age of arcades',
      years: '1978–1983',
      blurb: 'Games got heroes, ghosts with moods and simple stories. Then sales in America fell off a cliff.',
      entries: [
        {
          year: '1978',
          title: 'MUD',
          text: 'Roy Trubshaw and Richard Bartle made MUD, a world described in text that many players shared over a network. Every online world since, from World of Warcraft to Roblox, comes from this idea.',
        },
        {
          year: '1980',
          title: 'Pac-Man',
          text: 'Toru Iwatani wanted a game about eating, not shooting, that anyone could enjoy. Each ghost chases in its own way: one hunts you directly, another tries to get ahead of you. Four simple rules made the ghosts feel alive.',
        },
        {
          year: '1980',
          title: 'Rogue',
          text: 'Two students made Rogue, where the computer builds a new dungeon every time you play. When you die, you start over. Games built on that idea are still called roguelikes.',
        },
        {
          year: '1981',
          title: 'Donkey Kong',
          text: "Shigeru Miyamoto's first hit told a story with no words: a carpenter climbs a building to save a woman from a giant ape. The carpenter later became Mario. Jumping became the heart of a whole kind of game.",
        },
        {
          year: '1983',
          title: 'The crash',
          text: 'In North America, too many rushed games filled the stores, and players stopped buying. Sales fell by more than 90% in two years. Many people said video games had been a fad.',
        },
      ],
    },
    {
      id: 'nintendo-era',
      part: 'history',
      title: 'Nintendo, Tetris and the home console',
      years: '1984–1991',
      blurb: 'Careful design brought games back, with worlds you could explore and save.',
      entries: [
        {
          year: '1984',
          title: 'Tetris',
          text: 'Alexey Pajitnov made Tetris at a computer center in Moscow. Lines you fill disappear, and the pieces fall faster as you go. Your mistakes stack up where you can see them.',
        },
        {
          year: '1985',
          title: 'Super Mario Bros.',
          text: 'The first level teaches you without a single word. A slow enemy walks toward you, so you learn to jump. Mushrooms, pipes and pits each appear first where they are safe to learn. Teaching through the level itself became a rule of good design.',
        },
        {
          year: '1986',
          title: 'The Legend of Zelda',
          text: 'Miyamoto drew on exploring woods and caves as a boy. You could wander the world and find secrets in almost any order. You could also save your progress, so a game could be bigger than one sitting.',
        },
        {
          year: '1986',
          title: 'Dragon Quest',
          text: 'Yuji Horii, with art by Akira Toriyama, made a role-playing game that was easy for new players to pick up. Dragon Quest and then Final Fantasy made this kind of game a giant in Japan.',
        },
        {
          year: '1989',
          title: 'SimCity',
          text: "Will Wright's SimCity has no way to win. You build a city and watch what happens. He called it a software toy. It showed that a game does not need a goal set by the designer.",
        },
        {
          year: '1991',
          title: 'Civilization',
          text: "Sid Meier's Civilization lets you guide a people from the stone age to space flight. Its pull is famous: just one more turn. Every turn hands you a few choices that all matter.",
        },
      ],
    },
    {
      id: 'going-3d',
      part: 'history',
      title: 'Going 3D',
      years: '1992–1999',
      blurb: 'Faster machines opened up a third dimension. Designers had to work out moving and looking around all over again.',
      entries: [
        {
          year: '1993',
          title: 'Doom',
          text: 'Doom by id Software was fast, scary and could be played with friends over a network. Its level files could be changed by anyone, so players began making their own levels. That habit, called modding, became a road into the industry.',
        },
        {
          year: '1993',
          title: 'Myst',
          text: 'Myst had no enemies and no way to die, just a quiet island full of puzzles. It sold for years and proved that games could be calm and still gripping.',
        },
        {
          year: '1996',
          title: 'Pokémon',
          text: 'Satoshi Tajiri loved collecting bugs as a child. Pokémon came in two versions, each missing some creatures, so you had to trade with friends to catch them all. The design pushed players to talk to each other.',
        },
        {
          year: '1996',
          title: 'Super Mario 64',
          text: 'Mario 64 worked out how to run and jump in 3D using a new analog stick and a camera you could turn. Most 3D games since have learned from it.',
        },
        {
          year: '1998',
          title: 'Ocarina of Time',
          text: 'Zelda\'s 3D sword fights were hard to aim, so the designers added a button that locks onto an enemy. Lock-on targeting is still in most 3D action games.',
        },
        {
          year: '1998',
          title: 'Half-Life',
          text: 'Half-Life told its story without taking control away from you. Events happen around you while you keep playing, and you are never stuck watching a movie.',
        },
        {
          year: '1998',
          title: 'StarCraft',
          text: 'StarCraft had three sides that play in very different ways, yet none is better than the others. Keeping that balance took years of patches. In South Korea, it became a sport played in front of crowds.',
        },
      ],
    },
    {
      id: 'online',
      part: 'history',
      title: 'Everyone plays',
      years: '2000–2008',
      blurb: 'Games went online and into open cities. They also reached homes where nobody had played before.',
      entries: [
        {
          year: '2000',
          title: 'The Sims',
          text: "Will Wright's next toy was a dollhouse of tiny people with needs and moods. It became the best-selling PC game of its time, and many of its players were new to games.",
        },
        {
          year: '2001',
          title: 'Grand Theft Auto III',
          text: 'GTA III put players in a whole 3D city where they could go almost anywhere and ignore the story. Open worlds became one of the biggest kinds of games.',
        },
        {
          year: '2001',
          title: 'Halo and "30 seconds of fun"',
          text: "Halo's designers described its fights as 30 seconds of fun, repeated again and again in new places. If that small loop feels great, the whole game can be built on it.",
        },
        {
          year: '2004',
          title: 'World of Warcraft',
          text: 'World of Warcraft made online role-playing games friendly for newcomers, with clear goals and little punishment for dying. At its peak about 12 million people paid to play each month.',
        },
        {
          year: '2006',
          title: 'Wii Sports',
          text: "Nintendo's Wii used a remote you swing like a tennis racket or a bowling ball. Grandparents who had never touched a game joined in. The controller itself was the design.",
        },
        {
          year: '2007',
          title: 'Portal',
          text: 'Portal gives you one tool, a gun that makes two linked holes in walls. Every puzzle explores a new use for that single idea. It is short, and that is part of why it is loved.',
        },
        {
          year: '2008',
          title: 'Braid and the indie wave',
          text: 'Jonathan Blow made Braid, a puzzle game about turning back time, mostly on his own. Online stores let small teams sell games without a publisher. Indie games became a real force.',
        },
      ],
    },
    {
      id: 'indie-mobile',
      part: 'history',
      title: 'Indie, phones and free-to-play',
      years: '2009–2016',
      blurb: 'Anyone could make a game, and anyone with a phone could play one.',
      entries: [
        {
          year: '2009',
          title: 'Minecraft',
          text: 'Markus Persson\'s Minecraft gives you a world of blocks and almost no instructions. Players taught each other online. It became the best-selling video game of all time.',
        },
        {
          year: '2009',
          title: 'Angry Birds',
          text: 'Angry Birds needed one finger and a few seconds to understand. Games on phones turned hundreds of millions of people into players.',
        },
        {
          year: '2011',
          title: 'Watching games',
          text: 'Twitch launched, and watching other people play became entertainment of its own. Designers started thinking about whether their games were fun to watch.',
        },
        {
          year: '2012',
          title: 'Free-to-play',
          text: 'Games like Candy Crush were free to download, with small things to buy inside. It reached huge numbers of players. It also raised hard questions about designs that push people to keep paying.',
        },
        {
          year: '2012',
          title: 'Journey',
          text: 'In Journey you sometimes meet a stranger online, but you cannot talk or type. You can only chirp. Players formed real bonds anyway, which showed how much a designer can say with very little.',
        },
        {
          year: '2015',
          title: 'Undertale',
          text: 'Toby Fox made Undertale, a role-playing game you can finish without hurting anyone. The game remembers your choices, even across restarts. It made players feel their actions mattered.',
        },
        {
          year: '2016',
          title: 'Pokémon Go',
          text: 'Pokémon Go put creatures on a map of the real world, so you played by walking around outside. Within months it had been downloaded hundreds of millions of times.',
        },
      ],
    },
    {
      id: 'worlds',
      part: 'history',
      title: 'Games as places',
      years: '2017–today',
      blurb: 'Games became places to hang out, to make things and to see shows, and the tools to make them became free.',
      entries: [
        {
          year: '2017',
          title: 'Breath of the Wild',
          text: 'In this Zelda, fire burns grass, metal draws lightning and wind pushes sails. Because the rules work together, players invent solutions the designers never planned.',
        },
        {
          year: '2017',
          title: 'Fortnite',
          text: "Fortnite's battle royale mode drops 100 players on an island that keeps shrinking. It is free and changes every season. Millions have watched concerts held inside it.",
        },
        {
          year: '2020',
          title: 'Roblox and Among Us',
          text: 'On Roblox, players make the games for each other, and many learned to code that way. Among Us, a game about finding the liar on a spaceship, came out in 2018 and blew up in 2020 when streamers played it.',
        },
        {
          year: 'today',
          title: 'Anyone can make a game',
          text: 'Tools like Unreal, Unity and the free, open-source Godot let one person build what once took a whole studio. Making a game is easier than ever. Making one people love is still the hard part.',
        },
      ],
    },
    {
      id: 'what-is-a-game',
      part: 'ideas',
      title: 'What is a game?',
      years: '1978–2011',
      blurb: 'Before you design a game, it helps to know what one is. These are the answers designers use most.',
      entries: [
        {
          year: '1978',
          title: 'Unnecessary obstacles',
          text: 'The thinker Bernard Suits wrote that playing a game is choosing to overcome obstacles you do not need to face. Golf would be easier if you carried the ball to the hole. The rules are the fun.',
        },
        {
          year: '1989',
          title: 'Interesting decisions',
          text: 'Sid Meier is often quoted as saying a game is a series of interesting decisions. A choice is interesting when there is no single right answer and each option costs you something.',
        },
        {
          year: '2004',
          title: 'Fun is learning',
          text: 'In A Theory of Fun, Raph Koster argued that games are fun while your brain is learning their patterns. Once you have mastered a game completely, it gets boring.',
        },
        {
          year: '2011',
          title: 'Four parts of every game',
          text: 'Jane McGonigal listed four things that every game has. There is a goal and there are rules. Feedback shows how you are doing. And the players chose to be there.',
        },
      ],
    },
    {
      id: 'toolbox',
      part: 'ideas',
      title: "The designer's toolbox",
      years: '1990–today',
      blurb: 'Ideas designers reach for every day, from difficulty to how a jump should feel. Tune a game with them at the end.',
      entries: [
        {
          year: '1990',
          title: 'Flow',
          text: 'Psychologist Mihaly Csikszentmihalyi described flow, the feeling of being lost in a task. It happens when the challenge matches your skill. Too hard feels stressful and too easy feels dull, so good games get harder as you get better.',
        },
        {
          year: '1996',
          title: 'Player types',
          text: 'Richard Bartle, co-creator of MUD, noticed four kinds of players. Some want to win, some want to explore, some want to chat and some want to compete with others. A game that serves more than one keeps more people.',
        },
        {
          year: '2004',
          title: 'Rules, play and feelings',
          text: 'Robin Hunicke, Marc LeBlanc and Robert Zubek split a game into three layers. Designers write the rules. The rules create what happens in play. What happens in play creates feelings. Players meet it in the opposite order.',
        },
        {
          year: '2000s',
          title: 'The core loop',
          text: 'The core loop is what you do again and again: aim, shoot, take cover, or plant, grow, sell. Designers try to make that loop feel good first, before they build anything around it.',
        },
        {
          year: '2008',
          title: 'Game feel',
          text: 'In his book Game Feel, Steve Swink looked at why some controls feel great and others feel stiff. Small things matter: how fast you speed up, how high you jump, how long you hang in the air.',
        },
        {
          year: '2012',
          title: 'Teach with the level',
          text: 'Nintendo designer Koichi Hayashida described planning levels in four steps. Introduce an idea safely, develop it, add a twist, then finish. You learn the rule by using it, without a single line of text.',
        },
        {
          year: '2010s',
          title: 'Forgive the player',
          text: 'Good controls quietly help. Coyote time lets you still jump a split second after running off a ledge. A jump buffer remembers a button pressed just before you land. Players feel skilled, not cheated.',
        },
        {
          year: '2012',
          title: 'Juice it or lose it',
          text: 'Martin Jonasson and Petri Purho took a plain game and added effects one at a time. A squash on landing, a shake on a hit, dust as you move. Same rules, but it felt alive. Try it below.',
          demo: 'gamefeel',
        },
        {
          year: 'always',
          title: 'Watch people play',
          text: 'Hand your game to someone and watch without helping. If they get stuck, the design needs fixing, not the player. Every studio in this story learned that the hard way.',
        },
      ],
    },
  ],
  sources: [
    { label: 'Wikipedia, Royal Game of Ur', url: 'https://en.wikipedia.org/wiki/Royal_Game_of_Ur' },
    { label: 'Britannica, Go', url: 'https://www.britannica.com/topic/go-game' },
    { label: 'Wikipedia, Nimrod (computer)', url: 'https://en.wikipedia.org/wiki/Nimrod_(computer)' },
    { label: 'Brookhaven National Laboratory, Tennis for Two', url: 'https://www.bnl.gov/about/history/firstvideo.php' },
    { label: 'Wikipedia, Adventure (1980 video game)', url: 'https://en.wikipedia.org/wiki/Adventure_(1980_video_game)' },
    { label: 'Bernard Suits, The Grasshopper: Games, Life and Utopia (1978)', url: 'https://en.wikipedia.org/wiki/The_Grasshopper:_Games,_Life_and_Utopia' },
    { label: 'Game Developer on Sid Meier, "Interesting Decisions" (GDC 2012)', url: 'https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions' },
    { label: 'Raph Koster, A Theory of Fun for Game Design (2004)', url: 'https://www.theoryoffun.com/' },
    { label: 'Hunicke, LeBlanc and Zubek, "MDA" (2004)', url: 'https://users.cs.northwestern.edu/~hunicke/MDA.pdf' },
    { label: 'Richard Bartle, "Hearts, Clubs, Diamonds, Spades" (1996)', url: 'https://mud.co.uk/richard/hcds.htm' },
    { label: 'Jonasson and Purho, "Juice it or lose it" (2012)', url: 'https://www.youtube.com/watch?v=Fy0aCDmgnxg' },
    { label: 'Wikipedia, History of video games', url: 'https://en.wikipedia.org/wiki/History_of_video_games' },
  ],
  meta: {
    title: 'The history of games and game design · tagsmiths',
    description:
      'The whole story of games in plain words, from senet and Pong to Minecraft, plus the ideas designers use to make games fun. Tune a tiny game yourself in your browser.',
  },
};
