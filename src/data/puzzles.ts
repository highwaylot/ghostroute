export type Puzzle = {
  id: string;
  title: string;
  prompt: string;
  broken: string;
  hints: string[];
  check: (code: string) => boolean;
};

export const PUZZLES: Puzzle[] = [
  {
    id: 'unclosed-h1',
    title: 'The heading that never ends',
    prompt: 'This page has one heading, but something about it is broken. Find it and fix it.',
    broken: '<body>\n  <h1>Welcome to my site\n</body>',
    hints: [
      'Look closely at the <h1> tag. Does it have a matching partner?',
      'Every opening tag needs a closing tag with a slash, like </h1>.',
      'Add </h1> right after "Welcome to my site".',
    ],
    check: (code) => /<h1[^>]*>[^<]*<\/h1>/i.test(code),
  },
  {
    id: 'wrong-nesting',
    title: 'Tags out of order',
    prompt: 'This paragraph and link are tangled up. The closing tags are in the wrong order — fix the nesting.',
    broken: '<p>Check out <a href="#">this link</p></a>',
    hints: [
      'Tags have to close in the reverse order they opened, like nested boxes.',
      '<a> opened after <p>, so </a> must close before </p>.',
      'Fix it to: <p>Check out <a href="#">this link</a></p>',
    ],
    check: (code) => /<p[^>]*>[^<]*<a[^>]*>[^<]*<\/a>\s*<\/p>/i.test(code),
  },
  {
    id: 'missing-quotes',
    title: 'A link that goes nowhere',
    prompt: 'This link is written oddly and the browser can’t read it correctly. Spot the mistake.',
    broken: '<a href=https://example.com>Visit</a>',
    hints: [
      'Attribute values, like the one after href=, need something wrapped around them.',
      'HTML attribute values should be wrapped in quotes.',
      'Fix it to: <a href="https://example.com">Visit</a>',
    ],
    check: (code) => /<a\s+href="https?:\/\/[^"]+"[^>]*>[^<]*<\/a>/i.test(code),
  },
];
