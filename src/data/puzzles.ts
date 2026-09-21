export type Difficulty = 'basic' | 'medium' | 'hard';

export type Puzzle = {
  id: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  broken: string;
  hints: string[];
  check: (code: string) => boolean;
};

export const PUZZLES: Puzzle[] = [
  {
    id: 'unclosed-h1',
    title: 'The heading that never ends',
    difficulty: 'basic',
    prompt: 'This page has one heading, but something about it is broken. Find it and fix it.',
    broken: '<body>\n  <h1>Welcome to my site\n</body>',
    hints: [
      'Look closely at the <h1> tag. Does it have a matching partner?',
      'Every opening tag needs a closing tag with a slash, like </h1>.',
      'Add </h1> right after "Welcome to my site".',
    ],
    check: (code) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(code),
  },
  {
    id: 'wrong-nesting',
    title: 'Tags out of order',
    difficulty: 'basic',
    prompt: 'This paragraph and link are tangled up. The closing tags are in the wrong order — fix the nesting.',
    broken: '<p>Check out <a href="#">this link</p></a>',
    hints: [
      'Tags have to close in the reverse order they opened, like nested boxes.',
      '<a> opened after <p>, so </a> must close before </p>.',
      'Fix it to: <p>Check out <a href="#">this link</a></p>',
    ],
    check: (code) => /<p[^>]*>[\s\S]*?<a[^>]*>[\s\S]*?<\/a>\s*<\/p>/i.test(code),
  },
  {
    id: 'missing-quotes',
    title: 'A link that goes nowhere',
    difficulty: 'basic',
    prompt: 'This link is written oddly and the browser can’t read it correctly. Spot the mistake.',
    broken: '<a href=https://example.com>Visit</a>',
    hints: [
      'Attribute values, like the one after href=, need something wrapped around them.',
      'HTML attribute values should be wrapped in quotes.',
      'Fix it to: <a href="https://example.com">Visit</a>',
    ],
    check: (code) => /<a\s+href\s*=\s*"https?:\/\/[^"]+"[^>]*>[\s\S]*?<\/a>/i.test(code),
  },
  {
    id: 'missing-alt',
    title: 'A photo with no backup plan',
    difficulty: 'basic',
    prompt: 'This image is missing something screen readers and broken-image fallbacks both depend on. Find it and fix it.',
    broken: '<img src="cat.jpg">',
    hints: [
      'Every <img> needs two attributes. One of them is missing here.',
      'Images need both src (the file) and alt (a text description).',
      'Fix it to: <img src="cat.jpg" alt="A cat">',
    ],
    check: (code) => {
      const m = code.match(/<img\b[^>]*>/i);
      if (!m) return false;
      const tag = m[0];
      return /\bsrc\s*=\s*"[^"]+"/i.test(tag) && /\balt\s*=\s*"[^"]*"/i.test(tag);
    },
  },
  {
    id: 'void-tag-closed',
    title: 'A divider that closes itself twice',
    difficulty: 'basic',
    prompt: 'This divider has a closing tag it doesn\'t need. Find it and fix it.',
    broken: '<p>Above</p>\n<hr></hr>\n<p>Below</p>',
    hints: [
      '<hr> is one of a handful of tags that never gets a closing tag.',
      'Void elements like <hr>, <br>, and <img> stand alone — there\'s no </hr>.',
      'Fix it to just: <hr>',
    ],
    check: (code) => /<hr\s*\/?>/i.test(code) && !/<\/hr>/i.test(code),
  },
  {
    id: 'mismatched-tag',
    title: "A box that closes as something else",
    difficulty: 'basic',
    prompt: "This box's closing tag doesn't match its opening tag. Find the mismatch and fix it.",
    broken: '<div class="card">\n  <p>Some text</p>\n</span>',
    hints: [
      'Check the very first tag and the very last tag here — do their names match?',
      'A <div> has to be closed with </div>, not a different tag name.',
      'Fix it to close with </div> instead of </span>.',
    ],
    check: (code) => /<div\b[^>]*>[\s\S]*<\/div>\s*$/i.test(code.trim()) && !/<\/span>/i.test(code),
  },
  {
    id: 'missing-doctype',
    title: 'The line that has to come first',
    difficulty: 'basic',
    prompt: 'This page is missing the one line that always comes before everything else. Find it and add it.',
    broken: '<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
    hints: [
      'Every HTML page needs a special declaration before <html> even starts.',
      'It tells the browser to use modern rules — the line is <!DOCTYPE html>.',
      'Add <!DOCTYPE html> as the very first line, before <html>.',
    ],
    check: (code) => /^\s*<!DOCTYPE\s+html\s*>/i.test(code),
  },
  {
    id: 'title-in-body',
    title: 'A title in the wrong room',
    difficulty: 'basic',
    prompt: 'The browser-tab title is sitting somewhere it can\'t work from. Find it and move it.',
    broken: '<head>\n</head>\n<body>\n  <title>My Page</title>\n  <h1>Hello</h1>\n</body>',
    hints: [
      'Where does <title> actually belong — <head> or <body>?',
      '<title> only works inside <head>. It does nothing sitting in <body>.',
      'Move <title>My Page</title> so it\'s inside <head>...</head>.',
    ],
    check: (code) => {
      const headMatch = code.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const inHead = Boolean(headMatch && /<title[^>]*>[\s\S]*?<\/title>/i.test(headMatch[1]));
      const inBody = Boolean(bodyMatch && /<title[^>]*>[\s\S]*?<\/title>/i.test(bodyMatch[1]));
      return inHead && !inBody;
    },
  },
  {
    id: 'duplicate-id',
    title: 'Two tags, one name',
    difficulty: 'basic',
    prompt: 'Two different elements here share the same id — ids have to be unique. Fix one of them.',
    broken: '<h1 id="title">Welcome</h1>\n<p id="title">This is my page.</p>',
    hints: [
      'id should name exactly one element on the page. Look closely — is that true here?',
      'Both tags currently have id="title". Give one of them a different id.',
      'For example, change the <p> to id="subtitle".',
    ],
    check: (code) => {
      const ids = [...code.matchAll(/\bid\s*=\s*"([^"]+)"/gi)].map((m) => m[1]);
      if (ids.length === 0) return false;
      return new Set(ids).size === ids.length;
    },
  },
  {
    id: 'unclosed-p',
    title: 'A paragraph that runs into the next',
    difficulty: 'basic',
    prompt: 'This paragraph never closes before the next one starts. Find it and fix it.',
    broken: '<p>First paragraph\n<p>Second paragraph</p>',
    hints: [
      'Count the <p> tags and the </p> tags here — do the numbers match?',
      'The first <p> never got its closing tag before the second one opened.',
      'Fix it to: <p>First paragraph</p>\n<p>Second paragraph</p>',
    ],
    check: (code) => {
      const opens = (code.match(/<p[^>]*>/gi) || []).length;
      const closes = (code.match(/<\/p>/gi) || []).length;
      return opens >= 2 && opens === closes;
    },
  },
];
