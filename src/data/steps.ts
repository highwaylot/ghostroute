import { hasAnyAttribute, hasImgWithSrcAndAlt } from '../lib/htmlCheck';

export type Step = {
  tag: string;
  chapter: string;
  why: string;
  hints: string[];
  check: (code: string) => boolean;
  fact?: {
    text: string;
    source: string;
  };
};

const has = (code: string, re: RegExp) => re.test(code);

// Condensed from an earlier 24-step version that drilled one tag per step —
// that's the weakest form of retention (pure recognition-and-typing, never
// asking you to combine anything). This groups closely-related tags into
// single steps so you're applying more than one idea at a time, and gets
// you into Project sooner rather than exhaustively drilling every tag first.
export const STEPS: Step[] = [
  // --- start: one line, one win, under a minute. This exists so that a
  // person who has never written code sees something they typed appear
  // on screen before they meet the word "doctype". Every term it uses is
  // defined in the chapter blurb beside it.
  {
    tag: '<h1>hello</h1>',
    chapter: 'start',
    why:
      "Click in the coding window and type <h1>hello</h1>. The first part, <h1>, is an opening tag: it says a big heading starts here. The word hello is your text. The last part, </h1>, is the closing tag. The slash means the heading ends here. Press Check my work and look at the output panel. The browser draws your line as a heading.",
    hints: [
      "Type an opening tag, then some text, then a closing tag. The closing tag is the same word with a slash in front: </h1>.",
      "Angle brackets go around the tag name: < then h1 then >. Then the word hello. Then < then /h1 then >.",
      "Type exactly: <h1>hello</h1>",
    ],
    check: (code) => has(code, /<h1[^>]*>\s*\S[\s\S]*?<\/h1>/i),
  },

  // --- foundations ---
  {
    tag: '<!DOCTYPE html>',
    chapter: 'foundations',
    why:
      "Every page starts with this one line: <!DOCTYPE html>. It is a note to the browser that says \"this is a modern web page.\" It goes on the very first line, above your heading. Without it, the browser guesses how to draw your page, and it guesses wrong.",
    hints: [
      "Every web page starts with one special line, before any tags.",
      "It starts with <!DOCTYPE and ends with a closing >.",
      "Type exactly: <!DOCTYPE html>",
    ],
    check: (code) => has(code, /<!DOCTYPE\s+html\s*>/i),
  },
  {
    tag: '<html></html>',
    chapter: 'foundations',
    why:
      "<html> and </html> wrap your whole page. Every other tag you write goes between them, like everything in a house goes inside its walls. Put <html> on the line after your doctype, and </html> at the very bottom.",
    hints: [
      "Add a tag that wraps everything on the page except the doctype line.",
      "It has an opening and a closing form: <html> ... </html>.",
      "Type an opening <html> tag and a closing </html> tag, with a blank line between them.",
    ],
    check: (code) => has(code, /<html[^>]*>/i) && has(code, /<\/html>/i),
  },
  {
    tag: '<head><title></title></head>',
    chapter: 'foundations',
    why:
      "Inside <html>, a page has two parts. The first is <head>: information about the page that visitors do not see on it. The one thing every <head> needs is a <title>. That is the text in the browser tab. Write <head>, then <title>My First Page</title> inside it, then </head>.",
    hints: [
      "Add a part for page information, and put a browser-tab title inside it.",
      "<head> wraps it. <title> goes inside <head>, with your text inside that.",
      "Type:\n<head>\n  <title>My First Page</title>\n</head>",
    ],
    check: (code) =>
      has(code, /<head[^>]*>/i) &&
      has(code, /<\/head>/i) &&
      has(code, /<title[^>]*>[\s\S]*?<\/title>/i),
  },
  {
    tag: '<body></body>',
    chapter: 'foundations',
    why:
      "The second part of a page is <body>. Everything visitors see and click goes inside it: your headings, text, pictures, links. It goes right after </head>, not inside it. Move your <h1>hello</h1> line inside the body.",
    hints: [
      "Add the part that holds everything visible. It comes right after </head>.",
      "It has an opening and a closing form: <body> ... </body>.",
      "Type an opening <body> tag and a closing </body> tag, with your heading between them.",
    ],
    check: (code) => has(code, /<body[^>]*>/i) && has(code, /<\/body>/i),
  },

  // --- text basics ---
  {
    tag: '<h1></h1> + <p></p>',
    chapter: 'text',
    why:
      "A heading and a paragraph are the two most common tags on any page. <h1> is the main title. <p> is a paragraph of normal text. Put a <p> under your <h1>, inside <body>.",
    hints: [
      "Add two tags inside <body>: a big heading and a normal paragraph.",
      "<h1> is the heading. <p> is the paragraph. Both need an opening and a closing tag.",
      "Type:\n<h1>Hello, world.</h1>\n<p>This is my first paragraph.</p>",
    ],
    check: (code) =>
      has(code, /<h1[^>]*>[\s\S]*?<\/h1>/i) && has(code, /<p[^>]*>[\s\S]*?<\/p>/i),
  },
  {
    tag: '<h2></h2>',
    chapter: 'text',
    why:
      "Headings come in six sizes, <h1> down to <h6>. <h1> is the page title, so use it once. <h2> is the next size down. Use it for the title of a section.",
    hints: [
      "Headings come in sizes: <h1> through <h6>. Try the second-biggest.",
      "It has an opening and a closing form: <h2> ... </h2>.",
      "Type: <h2>About this page</h2>",
    ],
    check: (code) => has(code, /<h2[^>]*>[\s\S]*?<\/h2>/i),
  },
  {
    tag: '<strong></strong> + <em></em>',
    chapter: 'text',
    why:
      "Two tags for a few words inside a paragraph. <strong> means this is important, and the browser shows it bold. <em> means say this with stress, and the browser shows it italic. Wrap one word in each.",
    hints: [
      "Add two tags around different words or phrases, inside a paragraph.",
      "<strong> for important text, <em> for stressed text. Both need closing tags.",
      "Type: This is <strong>important</strong> and this is <em>emphasized</em>.",
    ],
    check: (code) =>
      has(code, /<strong[^>]*>[\s\S]*?<\/strong>/i) && has(code, /<em[^>]*>[\s\S]*?<\/em>/i),
  },
  {
    tag: '<br> + <hr>',
    chapter: 'text',
    why:
      "Most tags wrap something, so they need a closing tag. A few mark a single spot instead, so they have none. <br> is a line break: the text after it starts on a new line. <hr> is a horizontal line across the page. Neither has a closing tag.",
    hints: [
      "Add both: a line break inside some text, and a divider on its own line.",
      "Neither has a closing tag. <br> and <hr> just mark a spot.",
      "Type:\nFirst line<br>\nSecond line\n<hr>",
    ],
    check: (code) => has(code, /<br\s*\/?>/i) && has(code, /<hr\s*\/?>/i),
  },

  // --- lists ---
  {
    tag: '<ul><li> + <ol><li>',
    chapter: 'lists',
    why:
      "A list has two kinds of tag. The outer tag says what kind of list it is: <ul> for bullets, <ol> for numbers. Inside it, every item gets its own <li> tag. Write one of each list, with one item in each.",
    hints: [
      "Add two lists: one bulleted, one numbered, each with at least one item.",
      "<ul> and <ol> both wrap <li> items the same way. Only the outer tag differs.",
      "Type:\n<ul>\n  <li>Bullet item</li>\n</ul>\n<ol>\n  <li>Numbered item</li>\n</ol>",
    ],
    check: (code) =>
      has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ul>/i) &&
      has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ol>/i),
  },

  // --- links & media ---
  {
    tag: '<a href=""> + <img src="" alt="">',
    chapter: 'links-media',
    why:
      "Some tags need extra settings. A setting written inside the opening tag is called an attribute. It looks like name=\"value\". A link is <a href=\"...\">: href is the address it goes to. An image is <img src=\"...\" alt=\"...\">: src is the picture file, and alt is a few words describing it for people who cannot see it.",
    hints: [
      "Add a clickable link and an image, each with the right attributes.",
      "<a> needs href=\"...\". <img> needs both src=\"...\" and alt=\"...\". Leave a space between the tag name and the attribute (<a href=, not <ahref=). Wrap every value in matching quotes.",
      "Type:\n<a href=\"https://example.com\">Visit</a>\n<img src=\"https://placekitten.com/200/200\" alt=\"A kitten\">",
    ],
    check: (code) =>
      has(code, /<a\s+href\s*=\s*"[^"]+"[^>]*>[\s\S]*?<\/a>/i) && hasImgWithSrcAndAlt(code),
    fact: {
      text: 'Target got sued in 2006 because their website didn\'t work with screen readers — missing alt text was part of it. They settled for $6 million.',
      source: 'Nat\'l Fed\'n of the Blind v. Target Corp., 2006',
    },
  },

  // --- grouping & attributes ---
  {
    tag: '<div></div> + <span></span>',
    chapter: 'grouping',
    why:
      "Two tags that mean nothing on their own. They exist to group things, so you can style the group later. <div> groups whole blocks, like a few paragraphs. <span> groups a few words inside a line of text. Nothing changes on the page yet. Wrap a paragraph in a <div>, and a word inside it in a <span>.",
    hints: [
      "Add a <div> around a block of content (like a paragraph), and a <span> around a few words inside it.",
      "Both need a real closing tag: <div>...</div> and <span>...</span>.",
      "Type:\n<div>\n  <p>Some <span>highlighted</span> text.</p>\n</div>",
    ],
    check: (code) =>
      has(code, /<div[^>]*>[\s\S]*?<\/div>/i) && has(code, /<span[^>]*>[\s\S]*?<\/span>/i),
  },
  {
    tag: 'class="" + id=""',
    chapter: 'grouping',
    why:
      "Two attributes that give a tag a name. class is a name you can give to many tags, like a group label. id is a name for exactly one tag on the page. Add class=\"highlight\" to one tag and id=\"main-heading\" to another.",
    hints: [
      "Add a class attribute to one tag, and an id attribute to a different tag.",
      "Both take a name in quotes: class=\"...\" and id=\"...\". They go inside the tag's own brackets, right after the tag name: <div class=\"highlight\">.",
      "Add class=\"highlight\" to one tag and id=\"main-heading\" to another, like your <h1>.",
    ],
    check: (code) => hasAnyAttribute(code, 'class') && hasAnyAttribute(code, 'id'),
  },

  // --- semantic layout ---
  {
    tag: '<header></header> + <nav></nav>',
    chapter: 'semantic',
    why:
      "Two tags for the top of a page. <header> holds the intro: usually the site name and a tagline. <nav> holds the menu of links. Both go inside <body>, near the top. Not inside <head>: that part never holds anything visitors see.",
    hints: [
      "Inside <body>, near the top, wrap your intro content in <header>, and add a <nav> with a link inside it.",
      "Both need opening and closing tags. <nav> should contain at least one <a>. Neither goes in <head>.",
      "Type, inside <body>:\n<header>\n  <h1>Site Name</h1>\n</header>\n<nav>\n  <a href=\"#\">Home</a>\n</nav>",
    ],
    check: (code) =>
      has(code, /<header[^>]*>[\s\S]*?<\/header>/i) && has(code, /<nav[^>]*>[\s\S]*?<\/nav>/i),
  },
  {
    tag: '<main></main> + <footer></footer>',
    chapter: 'semantic',
    why:
      "Two tags that finish the layout. <main> holds the one thing this page is about: the article, the product, the form. <footer> holds the bottom of the page: credits, small links, a copyright line. Wrap your paragraphs in <main>, and add a <footer> below it.",
    hints: [
      "Wrap your central content in <main>, and add a <footer> below it.",
      "Both need opening and closing tags. <main> should hold your paragraphs.",
      "Type:\n<main>\n  <p>Page content</p>\n</main>\n<footer>\n  <p>Made by me.</p>\n</footer>",
    ],
    check: (code) =>
      has(code, /<main[^>]*>[\s\S]*?<\/main>/i) && has(code, /<footer[^>]*>[\s\S]*?<\/footer>/i),
  },
];
