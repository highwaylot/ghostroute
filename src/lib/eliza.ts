// A small ELIZA, after Joseph Weizenbaum's 1966 DOCTOR script. The real
// one had about 50 keywords; this keeps the same machinery with fewer:
// find the highest-ranked keyword, match the sentence against that
// keyword's patterns, swap I/you in the captured words, and drop them
// into the next reply template (each rule cycles through its replies, as
// ELIZA's did). Sentences with "my" are remembered and brought back
// later when nothing else matches, which was ELIZA's best trick.

type Rule = {
  // Words that trigger the rule (whole words, lowercase).
  keys: string[];
  rank: number;
  // `show` is the pattern as a learner sees it; `re` is how it runs.
  patterns: { re: RegExp; replies: string[]; show?: string }[];
};

export type ElizaReply = {
  text: string;
  // What happened, in words a learner can follow.
  how: string;
};

const REFLECT: Record<string, string> = {
  i: 'you',
  me: 'you',
  my: 'your',
  mine: 'yours',
  myself: 'yourself',
  am: 'are',
  "i'm": 'you are',
  "i've": 'you have',
  "i'll": 'you will',
  "i'd": 'you would',
  was: 'were',
  you: 'I',
  your: 'my',
  yours: 'mine',
  yourself: 'myself',
  "you're": 'I am',
  are: 'am',
};

const reflect = (s: string) =>
  s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => REFLECT[w] ?? w)
    .join(' ');

const FAMILY = 'mother|father|mom|mum|dad|sister|brother|wife|husband|son|daughter|family|parents|grandma|grandpa|boss|friend';

const RULES: Rule[] = [
  {
    keys: ['sorry'],
    rank: 0,
    patterns: [{ re: /.*/, replies: ["Please don't apologize.", 'Apologies are not necessary.', 'What feelings do you have when you apologize?'] }],
  },
  {
    keys: ['remember'],
    rank: 5,
    patterns: [
      { re: /\bi remember (.*)/, replies: ['Do you often think of $1?', 'Why do you remember $1 just now?', 'What else does $1 remind you of?'] },
      { re: /\bdo you remember (.*)/, replies: ['Did you think I would forget $1?', 'Why do you think I should recall $1 now?'] },
    ],
  },
  {
    keys: ['dream', 'dreamed', 'dreamt', 'dreams'],
    rank: 4,
    patterns: [{ re: /.*/, replies: ['What does that dream suggest to you?', 'Do you dream often?', 'Do you believe dreams have something to do with your problem?'] }],
  },
  {
    keys: ['hello', 'hi', 'hey'],
    rank: 0,
    patterns: [{ re: /.*/, replies: ['How do you do. Please tell me your problem.', 'Hi. What would you like to talk about?'] }],
  },
  {
    keys: ['computer', 'computers', 'machine', 'machines', 'robot', 'robots', 'ai', 'program', 'eliza'],
    rank: 50,
    patterns: [
      {
        re: /.*/,
        replies: ['Do computers worry you?', 'Why do you mention computers?', 'What do you think machines have to do with your problem?', "Don't you think computers can help people?"],
      },
    ],
  },
  {
    keys: FAMILY.split('|'),
    rank: 10,
    patterns: [
      { re: new RegExp(`\\bmy (?:\\w+ )?(${FAMILY})\\b(.*)`), replies: ['Tell me more about your $1.', 'How do you feel about your $1?', 'Does anyone else come to mind when you think of your $1?'], show: 'my … (a family word) …' },
      { re: /.*/, replies: ['Tell me more about your family.', 'Does anyone else in your family come to mind?'] },
    ],
  },
  {
    keys: ['feel', 'feeling', 'felt'],
    rank: 6,
    patterns: [
      { re: /\bi (?:feel|felt) (.*)/, replies: ['Do you often feel $1?', 'Tell me more about feeling $1.', 'When did you start feeling $1?'] },
      { re: /.*/, replies: ['Tell me more about such feelings.', 'Do you often have feelings like that?'] },
    ],
  },
  {
    keys: ['want', 'need'],
    rank: 4,
    patterns: [{ re: /\bi (?:want|need) (.*)/, replies: ['What would it mean to you if you got $1?', 'Why do you want $1?', 'Suppose you got $1 soon. What then?'] }],
  },
  {
    keys: ["can't", 'cannot'],
    rank: 4,
    patterns: [{ re: /\bi (?:can't|cannot) (.*)/, replies: ["How do you know you can't $1?", 'Perhaps you could $1 if you tried.', 'Do you want to be able to $1?'] }],
  },
  {
    keys: ['am', "i'm"],
    rank: 2,
    patterns: [
      { re: /\b(?:i am|i'm) (.*)/, replies: ['How long have you been $1?', 'Do you believe it is normal to be $1?', 'Did you come to me because you are $1?', 'Do you enjoy being $1?'] },
      { re: /\bam i (.*)/, replies: ['Do you believe you are $1?', 'Would you want to be $1?'] },
    ],
  },
  {
    keys: ['you'],
    rank: 1,
    patterns: [
      { re: /\byou are (.*)/, replies: ['What makes you think I am $1?', 'Does it please you to believe I am $1?', 'Perhaps you would like to be $1.'] },
      { re: /\byou (.*) me\b/, replies: ['Why do you think I $1 you?', 'What makes you think I $1 you?'] },
      { re: /.*/, replies: ["We were discussing you, not me.", "You're not really talking about me, are you?"] },
    ],
  },
  {
    keys: ['because'],
    rank: 3,
    patterns: [{ re: /.*/, replies: ['Is that the real reason?', 'What other reasons come to mind?', 'Does that reason explain anything else?'] }],
  },
  {
    keys: ['always'],
    rank: 1,
    patterns: [{ re: /.*/, replies: ['Can you think of a specific example?', 'When?', 'Really, always?'] }],
  },
  {
    keys: ['everyone', 'everybody', 'nobody', 'noone'],
    rank: 2,
    patterns: [{ re: /\b(everyone|everybody|nobody|noone)\b/, replies: ['Really, $1?', 'Surely not $1.', 'Can you think of anyone in particular?'] }],
  },
  {
    keys: ['yes'],
    rank: 0,
    patterns: [{ re: /.*/, replies: ['You seem quite sure.', 'I see. Go on.'] }],
  },
  {
    keys: ['no', 'nope'],
    rank: 0,
    patterns: [{ re: /.*/, replies: ['Why not?', 'Are you saying no just to be negative?', 'You are being a bit negative.'] }],
  },
  {
    keys: ['my'],
    rank: 2,
    patterns: [{ re: /\bmy (.*)/, replies: ['Your $1?', 'Why do you say your $1?', 'Does anything else about your $1 bother you?'] }],
  },
];

// "\bi (?:feel|felt) (.*)" reads as "i feel/felt …".
const showPattern = (re: RegExp) =>
  re.source
    .replace(/\\b/g, '')
    .replace(/\(\?:([^)]*)\)/g, (_, alts: string) => alts.replace(/\|/g, '/'))
    .replace(/\(\.\*\)/g, '…')
    .replace(/\(([^)]*)\)/g, (_, alts: string) => alts.replace(/\|/g, '/'));

const FALLBACK = ['Please go on.', 'Tell me more.', 'I see.', 'What does that suggest to you?', 'How does that make you feel?', 'Can you say more about that?'];

export const ELIZA_OPENING = 'How do you do. Please tell me your problem.';

// One conversation's state: which reply each rule is up to, and the
// sentences it has quietly remembered.
export function createEliza() {
  const counters = new Map<string, number>();
  const memory: string[] = [];
  let fallbackN = 0;

  const next = (key: string, replies: string[]) => {
    const n = counters.get(key) ?? 0;
    counters.set(key, n + 1);
    return replies[n % replies.length];
  };

  return function respond(input: string): ElizaReply {
    const clean = input
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[^a-z' ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = new Set(clean.split(' '));
    if (!clean) return { text: 'Please say something.', how: 'Nothing was typed, so ELIZA used a stock reply.' };

    const candidates = RULES.filter((r) => r.keys.some((k) => words.has(k))).sort((a, b) => b.rank - a.rank);

    for (const rule of candidates) {
      for (const [pi, p] of rule.patterns.entries()) {
        const m = clean.match(p.re);
        if (!m) continue;
        const captured = m.slice(1).map((g) => reflect((g ?? '').trim()));
        if (captured.some((c) => c === '') && p.re.source !== '.*') continue;
        const template = next(`${rule.keys[0]}:${pi}`, p.replies);
        const text = template.replace(/\$(\d)/g, (_, d) => captured[Number(d) - 1] ?? '').replace(/\s+([?.!])/g, '$1');
        // ELIZA's memory: anything said about "my ..." is saved for later.
        const mine = clean.match(/\bmy (.*)/);
        if (mine && memory.length < 5) memory.push(reflect(mine[1]));
        const key = rule.keys.find((k) => words.has(k));
        const shown = p.show ?? showPattern(p.re);
        const how =
          p.re.source === '.*'
            ? `Keyword "${key}" found. Its rule has a fixed reply, so ELIZA used the next one in its list.`
            : `Keyword "${key}" found. The pattern "${shown}" matched.` +
              (shown.includes('…') ? ' The words in "…" were flipped (I → you, my → your) and dropped into the reply.' : ' The matched word went into the reply.');
        return { text: text.charAt(0).toUpperCase() + text.slice(1), how };
      }
    }

    if (memory.length && fallbackN % 2 === 1) {
      fallbackN++;
      const m = memory.shift()!;
      return {
        text: `Earlier you mentioned your ${m}. Tell me more about that.`,
        how: 'No keyword matched, so ELIZA brought back something you said earlier about "my ...". It saves those sentences for exactly this moment.',
      };
    }
    fallbackN++;
    return { text: next('fallback', FALLBACK), how: 'No keyword matched, so ELIZA gave a stock reply that fits almost anything.' };
  };
}
