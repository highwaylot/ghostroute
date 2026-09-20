import { hasAnyAttribute, hasImgWithSrcAndAlt } from '../lib/htmlCheck';

export type Step = {
  tag: string;
  chapter: string;
  why: string;
  hints: string[];
  check: (code: string) => boolean;
};

const has = (code: string, re: RegExp) => re.test(code);

// Condensed from an earlier 24-step version that drilled one tag per step —
// that's the weakest form of retention (pure recognition-and-typing, never
// asking you to combine anything). This groups closely-related tags into
// single steps so you're applying more than one idea at a time, and gets
// you into Project sooner rather than exhaustively drilling every tag first.
export const STEPS: Step[] = [
  // --- foundations ---
  {
    tag: '<!DOCTYPE html>',
    chapter: 'foundations',
    why: 'Every page starts by telling the browser "this is modern HTML." Nothing renders correctly without it.',
    hints: [
      'Every HTML page starts with one special line, before any tags.',
      'It starts with <!DOCTYPE and ends with a closing >.',
      'Type exactly: <!DOCTYPE html>',
    ],
    check: (code) => has(code, /<!DOCTYPE\s+html\s*>/i),
  },
  {
    tag: '<html></html>',
    chapter: 'foundations',
    why: 'The root container. Everything else on the page lives inside these two tags.',
    hints: [
      'Add a tag that wraps the entire rest of the page.',
      'It has an opening and closing form: <html> ... </html>.',
      'Type an opening <html> tag and a closing </html> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<html[^>]*>/i) && has(code, /<\/html>/i),
  },
  {
    tag: '<head><title></title></head>',
    chapter: 'foundations',
    why: 'A page and its title always go together — <head> holds info visitors don\'t see directly, and <title> (the browser-tab text) is the one thing inside it every page needs.',
    hints: [
      'Add a section for page info, and put a browser-tab title inside it.',
      '<head> wraps it; <title> goes inside <head> with text inside that.',
      'Type:\n<head>\n  <title>My First Page</title>\n</head>',
    ],
    check: (code) =>
      has(code, /<head[^>]*>/i) &&
      has(code, /<\/head>/i) &&
      has(code, /<title[^>]*>[^<]*<\/title>/i),
  },
  {
    tag: '<body></body>',
    chapter: 'foundations',
    why: 'Everything visitors actually see and click goes inside here.',
    hints: [
      'Add a section, as a sibling of <head>, for everything visible.',
      'It has an opening and closing form: <body> ... </body>.',
      'Type an opening <body> tag and a closing </body> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<body[^>]*>/i) && has(code, /<\/body>/i),
  },

  // --- text basics ---
  {
    tag: '<h1></h1> + <p></p>',
    chapter: 'text',
    why: 'A heading and a paragraph are the two most common tags on any page — a title, and the text underneath it.',
    hints: [
      'Add two tags inside <body>: a big heading, and a normal paragraph.',
      '<h1> is the heading; <p> is the paragraph. Both need opening and closing tags.',
      'Type:\n<h1>Hello, world.</h1>\n<p>This is my first paragraph.</p>',
    ],
    check: (code) =>
      has(code, /<h1[^>]*>[^<]*<\/h1>/i) && has(code, /<p[^>]*>[^<]*<\/p>/i),
  },
  {
    tag: '<h2></h2>',
    chapter: 'text',
    why: 'A smaller heading, one step down from <h1> — used for section titles under the main heading.',
    hints: [
      'Headings come in sizes: <h1> through <h6>. Try the second-biggest.',
      'It has an opening and closing form: <h2> ... </h2>.',
      'Type: <h2>About this page</h2>',
    ],
    check: (code) => has(code, /<h2[^>]*>[^<]*<\/h2>/i),
  },
  {
    tag: '<strong></strong> + <em></em>',
    chapter: 'text',
    why: '<strong> marks text as important (bold); <em> marks emphasis (italic). Different purposes, similar look — worth learning together so you don\'t mix them up.',
    hints: [
      'Add two tags around different words or phrases, inside a paragraph.',
      '<strong> for important text, <em> for emphasized text — both need closing tags.',
      'Type: This is <strong>important</strong> and this is <em>emphasized</em>.',
    ],
    check: (code) =>
      has(code, /<strong[^>]*>[^<]*<\/strong>/i) && has(code, /<em[^>]*>[^<]*<\/em>/i),
  },
  {
    tag: '<br> + <hr>',
    chapter: 'text',
    why: 'Two of the few tags with no closing tag, since they each mark a single point rather than wrapping content: <br> breaks a line, <hr> draws a divider.',
    hints: [
      'Add both: a line break inside some text, and a divider on its own line.',
      'Neither has a closing tag — <br> and <hr> just mark a spot.',
      'Type:\nFirst line<br>\nSecond line\n<hr>',
    ],
    check: (code) => has(code, /<br\s*\/?>/i) && has(code, /<hr\s*\/?>/i),
  },

  // --- lists ---
  {
    tag: '<ul><li> + <ol><li>',
    chapter: 'lists',
    why: '<ul> is a bulleted list, <ol> is numbered — same <li> item pattern, different wrapper, so it\'s worth writing both once to see how they compare.',
    hints: [
      'Add two lists: one bulleted, one numbered, each with at least one item.',
      '<ul> and <ol> both wrap <li> items the same way — only the wrapper differs.',
      'Type:\n<ul>\n  <li>Bullet item</li>\n</ul>\n<ol>\n  <li>Numbered item</li>\n</ol>',
    ],
    check: (code) =>
      has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ul>/i) &&
      has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ol>/i),
  },

  // --- links & media ---
  {
    tag: '<a href=""> + <img src="" alt="">',
    chapter: 'links-media',
    why: 'The web is pages linking to other pages, plus images that aren\'t just text — the two tags that make a page more than words.',
    hints: [
      'Add a clickable link and an image, each with the right attributes.',
      '<a> needs href="..."; <img> needs both src="..." and alt="...".',
      'Type:\n<a href="https://example.com">Visit</a>\n<img src="https://placekitten.com/200/200" alt="A kitten">',
    ],
    check: (code) =>
      has(code, /<a\s+href\s*=\s*"[^"]+"[^>]*>[^<]*<\/a>/i) && hasImgWithSrcAndAlt(code),
  },

  // --- grouping & attributes ---
  {
    tag: '<div></div> + <span></span>',
    chapter: 'grouping',
    why: 'Both exist purely to group things with no meaning of their own — <div> for a whole block, <span> for a few words inline where a <div> wouldn\'t fit.',
    hints: [
      'Add a <div> wrapping a block of content, and a <span> around a few words inline.',
      'Neither shows anything on its own — they exist to be grouped and later targeted.',
      'Type:\n<div>\n  <p>Some <span>highlighted</span> text.</p>\n</div>',
    ],
    check: (code) =>
      has(code, /<div[^>]*>[\s\S]*?<\/div>/i) && has(code, /<span[^>]*>[^<]*<\/span>/i),
  },
  {
    tag: 'class="" + id=""',
    chapter: 'grouping',
    why: 'class labels an element for reuse across many tags; id names exactly one. Worth learning side by side since people mix them up constantly.',
    hints: [
      'Add a class attribute to one tag, and an id attribute to a different tag.',
      'Both attributes take a name in quotes: class="..." and id="...".',
      'Add class="highlight" to one tag and id="main-heading" to another, like your <h1>.',
    ],
    check: (code) => hasAnyAttribute(code, 'class') && hasAnyAttribute(code, 'id'),
  },

  // --- semantic layout ---
  {
    tag: '<header></header> + <nav></nav>',
    chapter: 'semantic',
    why: 'Two tags that usually sit together at the top of a page — <header> for the intro/title area, <nav> for the menu of links inside or near it.',
    hints: [
      'Wrap your top content in <header>, and add a <nav> with a link inside it.',
      'Both need opening and closing tags; <nav> should contain at least one <a>.',
      'Type:\n<header>\n  <h1>Site Name</h1>\n</header>\n<nav>\n  <a href="#">Home</a>\n</nav>',
    ],
    check: (code) =>
      has(code, /<header[^>]*>[\s\S]*?<\/header>/i) && has(code, /<nav[^>]*>[\s\S]*?<\/nav>/i),
  },
  {
    tag: '<main></main> + <footer></footer>',
    chapter: 'semantic',
    why: '<main> marks the one central section that makes this page different from any other; <footer> marks the bottom, usually credits or links. Together they finish the layout.',
    hints: [
      'Wrap your central content in <main>, and add a <footer> below it.',
      'Both need opening and closing tags — <main> should hold your paragraphs.',
      'Type:\n<main>\n  <p>Page content</p>\n</main>\n<footer>\n  <p>Made by me.</p>\n</footer>',
    ],
    check: (code) =>
      has(code, /<main[^>]*>[\s\S]*?<\/main>/i) && has(code, /<footer[^>]*>[\s\S]*?<\/footer>/i),
  },
];
