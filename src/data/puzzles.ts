export type { Difficulty } from '../lib/difficulty';
import type { Difficulty } from '../lib/difficulty';

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

  // --- medium ---------------------------------------------------------
  {
    id: 'form-missing-label',
    title: 'A field nobody can name',
    difficulty: 'medium',
    prompt: 'This input has no label connected to it — a screen reader has no way to say what it\'s for. Fix it.',
    broken: '<form>\n  <input type="text" id="name">\n</form>',
    hints: [
      'An <input> needs a <label> pointing at it — how do the two get linked?',
      'A <label> uses a for attribute that matches the input\'s id.',
      'Add: <label for="name">Name</label> before the input.',
    ],
    check: (code) => {
      const idMatch = code.match(/<input\b[^>]*\bid\s*=\s*"([^"]+)"[^>]*>/i);
      if (!idMatch) return false;
      const id = idMatch[1];
      const labelRe = new RegExp(`<label[^>]*\\bfor\\s*=\\s*"${id}"[^>]*>[\\s\\S]*?<\\/label>`, 'i');
      return labelRe.test(code);
    },
  },
  {
    id: 'table-td-header',
    title: 'A header row of plain cells',
    difficulty: 'medium',
    prompt: 'This table\'s header row is built from regular cells, not header cells. Find it and fix it.',
    broken: '<table>\n  <tr>\n    <td>Name</td>\n    <td>Age</td>\n  </tr>\n  <tr>\n    <td>Sam</td>\n    <td>30</td>\n  </tr>\n</table>',
    hints: [
      'One of these rows is a header row — should it really use the same tag as the data rows?',
      'Header cells use <th> instead of <td>.',
      'Change the first row\'s <td>Name</td> and <td>Age</td> to <th>Name</th> and <th>Age</th>.',
    ],
    check: (code) => /<th[^>]*>[\s\S]*?<\/th>/i.test(code),
  },
  {
    id: 'target-blank-unsafe',
    title: 'A link that leaves a door open',
    difficulty: 'medium',
    prompt: 'This link opens in a new tab, but it\'s missing an attribute that keeps that new tab from being able to mess with this page. Find it and fix it.',
    broken: '<a href="https://example.com" target="_blank">Visit</a>',
    hints: [
      'target="_blank" on its own leaves the new tab with a risky kind of access back to this page.',
      'Adding rel="noopener" closes that off.',
      'Fix it to: <a href="https://example.com" target="_blank" rel="noopener">Visit</a>',
    ],
    check: (code) => {
      const m = code.match(/<a\b[^>]*>/i);
      if (!m) return false;
      const tag = m[0];
      if (!/target\s*=\s*"_blank"/i.test(tag)) return true;
      return /\brel\s*=\s*"[^"]*\b(noopener|noreferrer)\b[^"]*"/i.test(tag);
    },
  },
  {
    id: 'empty-select',
    title: 'A dropdown with nothing to drop down',
    difficulty: 'medium',
    prompt: 'This dropdown has no choices in it. Give it at least one.',
    broken: '<select>\n</select>',
    hints: [
      'A <select> needs something inside it for the user to actually pick.',
      '<option> tags go inside <select>, one per choice.',
      'Add: <option>Red</option> inside the <select>.',
    ],
    check: (code) => /<select[^>]*>[\s\S]*?<option[^>]*>[\s\S]*?<\/option>[\s\S]*?<\/select>/i.test(code),
  },
  {
    id: 'block-in-paragraph',
    title: 'A block stuck inside a line of text',
    difficulty: 'medium',
    prompt: 'This paragraph has a block-level element trapped inside it, which browsers don\'t handle the way you\'d expect. Find it and fix it.',
    broken: '<p>\n  Some intro text.\n  <div>A block element stuck inside a paragraph.</div>\n</p>',
    hints: [
      '<p> is only supposed to hold text-level content — what\'s hiding inside this one?',
      '<div> is a block element and can\'t legally nest inside <p>.',
      'Move the <div> outside the <p>, or change it to a <span>.',
    ],
    check: (code) => {
      const pMatches = code.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
      return pMatches.length > 0 && !pMatches.some((p) => /<(div|section|article|ul|ol|table|form|h[1-6])\b/i.test(p));
    },
  },
  {
    id: 'missing-viewport',
    title: 'A page that ignores small screens',
    difficulty: 'medium',
    prompt: 'This page is missing the one meta tag that tells mobile browsers how to size it. Find it and add it.',
    broken: '<head>\n  <title>My Page</title>\n</head>',
    hints: [
      'Without a specific meta tag, phones render the page zoomed out as if it were a desktop site.',
      'It\'s a <meta> tag with name="viewport".',
      'Add: <meta name="viewport" content="width=device-width, initial-scale=1"> inside <head>.',
    ],
    check: (code) => /<meta\b[^>]*\bname\s*=\s*"viewport"[^>]*>/i.test(code),
  },
  {
    id: 'boolean-attribute-value',
    title: 'A checkbox that\'s checked either way',
    difficulty: 'medium',
    prompt: 'This checkbox is supposed to start unchecked, but the way it\'s written doesn\'t do that. Find it and fix it.',
    broken: '<input type="checkbox" checked="false">',
    hints: [
      'HTML boolean attributes like checked don\'t read their value — just being present means "on," no matter what\'s written after the =.',
      'checked="false" is still checked. To leave it unchecked, the attribute can\'t be there at all.',
      'Fix it to: <input type="checkbox">',
    ],
    check: (code) => {
      const m = code.match(/<input\b[^>]*>/i);
      if (!m) return false;
      return !/\bchecked\b/i.test(m[0]);
    },
  },
  {
    id: 'unescaped-entities',
    title: 'Symbols the browser tries to read as tags',
    difficulty: 'medium',
    prompt: 'This text has raw < and & characters in it, which HTML tries to interpret instead of showing as text. Find them and fix them.',
    broken: "<p>Use x < y and a & b in your code.</p>",
    hints: [
      'The browser sees a bare < and starts looking for a tag name — that\'s not what\'s meant here.',
      '< and & need to be written as entities to show up as literal symbols: &lt; and &amp;.',
      'Fix it to: <p>Use x &lt; y and a &amp; b in your code.</p>',
    ],
    check: (code) => /&lt;/.test(code) && /&amp;/.test(code),
  },

  // --- hard -------------------------------------------------------------
  {
    id: 'image-needs-figure',
    title: 'A photo and its caption, unrelated',
    difficulty: 'hard',
    prompt: 'This image has a caption sitting next to it, but nothing ties the two together as a unit. Fix it.',
    broken: '<img src="cat.jpg" alt="A cat">\n<p>A cat mid-yawn.</p>',
    hints: [
      'There\'s a tag pair made exactly for "an image plus its caption."',
      '<figure> wraps both; <figcaption> marks the caption text.',
      'Fix it to: <figure>\n  <img src="cat.jpg" alt="A cat">\n  <figcaption>A cat mid-yawn.</figcaption>\n</figure>',
    ],
    check: (code) =>
      /<figure[^>]*>[\s\S]*?<img\b[^>]*>[\s\S]*?<figcaption[^>]*>[\s\S]*?<\/figcaption>[\s\S]*?<\/figure>/i.test(
        code,
      ),
  },
  {
    id: 'radios-need-fieldset',
    title: 'A group of choices with no group',
    difficulty: 'hard',
    prompt: 'These radio buttons are related, but nothing marks them as one group with a shared label. Fix it.',
    broken:
      '<form>\n  <input type="radio" name="size" id="s"> <label for="s">Small</label>\n  <input type="radio" name="size" id="m"> <label for="m">Medium</label>\n</form>',
    hints: [
      'A set of related fields can be grouped with a tag pair that also gives the whole group a title.',
      '<fieldset> wraps the group; <legend> is the group\'s title, as its first child.',
      'Wrap both radios in <fieldset><legend>Size</legend>...</fieldset>.',
    ],
    check: (code) =>
      /<fieldset[^>]*>\s*<legend[^>]*>[\s\S]*?<\/legend>[\s\S]*?<\/fieldset>/i.test(code),
  },
  {
    id: 'picture-missing-source',
    title: 'A "responsive" image with only one option',
    difficulty: 'hard',
    prompt: 'This is supposed to serve a different image on small screens, but it only ever loads one file. Fix it.',
    broken: '<picture>\n  <img src="photo-large.jpg" alt="A mountain view">\n</picture>',
    hints: [
      '<picture> needs at least one <source> before the fallback <img> to actually offer alternatives.',
      '<source> takes a srcset and usually a media condition, and comes before <img>.',
      'Add: <source srcset="photo-small.jpg" media="(max-width: 600px)"> right before the <img>.',
    ],
    check: (code) => /<picture[^>]*>\s*<source\b[^>]*>[\s\S]*?<img\b[^>]*>[\s\S]*?<\/picture>/i.test(code),
  },
  {
    id: 'div-toggle-needs-details',
    title: 'A hand-built dropdown that already exists',
    difficulty: 'hard',
    prompt: 'This "click to expand" box is built entirely from divs, but HTML already has a built-in tag pair for exactly this. Rebuild it with that instead.',
    broken:
      '<div class="dropdown">\n  <div class="dropdown-title">More info</div>\n  <div class="dropdown-content">Here are the details.</div>\n</div>',
    hints: [
      'HTML has a native, no-JavaScript-needed collapsible element — what might it be called?',
      '<details> is the collapsible container; <summary> is its always-visible clickable heading.',
      'Fix it to: <details>\n  <summary>More info</summary>\n  Here are the details.\n</details>',
    ],
    check: (code) => /<details[^>]*>\s*<summary[^>]*>[\s\S]*?<\/summary>[\s\S]*?<\/details>/i.test(code),
  },
  {
    id: 'table-header-scope',
    title: 'A header cell that doesn\'t say what it heads',
    difficulty: 'hard',
    prompt: 'This table has header cells, but nothing states which column each one describes — a screen reader can\'t tell. Fix it.',
    broken:
      '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Sam</td>\n    <td>30</td>\n  </tr>\n</table>',
    hints: [
      '<th> can take an attribute that says exactly what it\'s the header for.',
      'scope="col" means "this heads the column below it"; scope="row" means "this heads the row beside it."',
      'Add scope="col" to both <th> tags: <th scope="col">Name</th>',
    ],
    check: (code) => {
      const ths = code.match(/<th\b[^>]*>/gi) || [];
      return ths.length > 0 && ths.every((t) => /\bscope\s*=\s*"(col|row)"/i.test(t));
    },
  },
  {
    id: 'icon-button-needs-label',
    title: 'A button that only makes sense if you can see it',
    difficulty: 'hard',
    prompt: 'This button only has a symbol in it — nothing tells a screen reader what it does. Fix it.',
    broken: '<button>✕</button>',
    hints: [
      'An icon-only button needs an accessible name that doesn\'t depend on seeing the icon.',
      'aria-label gives an element a name a screen reader will read instead of its visible content.',
      'Fix it to: <button aria-label="Close">✕</button>',
    ],
    check: (code) => {
      const m = code.match(/<button\b[^>]*>/i);
      if (!m) return false;
      return /\baria-label\s*=\s*"[^"]+"/i.test(m[0]);
    },
  },
];
