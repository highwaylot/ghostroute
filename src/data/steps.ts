import { hasAnyAttribute, hasImgWithSrcAndAlt } from '../lib/htmlCheck';

export type Step = {
  tag: string;
  chapter: string;
  why: string;
  hints: string[];
  check: (code: string) => boolean;
};

const has = (code: string, re: RegExp) => re.test(code);

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
    tag: '<head></head>',
    chapter: 'foundations',
    why: "Holds information about the page that visitors don't see directly, like its title.",
    hints: [
      'Add a section inside <html> for page info that is not shown directly.',
      'It has an opening and closing form: <head> ... </head>.',
      'Type an opening <head> tag and a closing </head> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<head[^>]*>/i) && has(code, /<\/head>/i),
  },
  {
    tag: '<title></title>',
    chapter: 'foundations',
    why: 'The text shown in the browser tab. Goes inside <head>.',
    hints: [
      'Add a tag inside <head> that names the browser tab.',
      'It has an opening and closing form: <title> ... </title>.',
      'Type: <title>My First Page</title>',
    ],
    check: (code) => has(code, /<title[^>]*>[^<]*<\/title>/i),
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
    tag: '<h1></h1>',
    chapter: 'text',
    why: 'A big heading, the most important line of text on the page. Goes inside <body>.',
    hints: [
      'Add the biggest heading tag inside <body>.',
      'It has an opening and closing form: <h1> ... </h1>.',
      'Type: <h1>Hello, world.</h1>',
    ],
    check: (code) => has(code, /<h1[^>]*>[^<]*<\/h1>/i),
  },
  {
    tag: '<p></p>',
    chapter: 'text',
    why: 'A normal paragraph of text. Sits right alongside your heading.',
    hints: [
      'Add a paragraph tag inside <body>, near your heading.',
      'It has an opening and closing form: <p> ... </p>.',
      'Type: <p>This is my first paragraph.</p>',
    ],
    check: (code) => has(code, /<p[^>]*>[^<]*<\/p>/i),
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
    tag: '<strong></strong>',
    chapter: 'text',
    why: 'Marks text as important — browsers show it bold, and screen readers announce it differently.',
    hints: [
      'Add a tag around a word or phrase to mark it as important.',
      'It has an opening and closing form: <strong> ... </strong>.',
      'Type: <strong>important</strong> somewhere inside a paragraph.',
    ],
    check: (code) => has(code, /<strong[^>]*>[^<]*<\/strong>/i),
  },
  {
    tag: '<em></em>',
    chapter: 'text',
    why: 'Marks text as emphasized — browsers show it italic. Different purpose than "bold," even if it also changes how text looks.',
    hints: [
      'Add a tag around a word or phrase to give it emphasis.',
      'It has an opening and closing form: <em> ... </em>.',
      'Type: <em>emphasis</em> somewhere inside a paragraph.',
    ],
    check: (code) => has(code, /<em[^>]*>[^<]*<\/em>/i),
  },
  {
    tag: '<br>',
    chapter: 'text',
    why: 'Forces a line break inside text — one of the few tags with no closing tag, since it marks a single point, not a wrapped section.',
    hints: [
      'This tag never wraps anything, so it has no closing tag at all.',
      'It just marks a spot where the line should break: <br>.',
      'Type <br> somewhere inside a paragraph, between two bits of text.',
    ],
    check: (code) => has(code, /<br\s*\/?>/i),
  },
  {
    tag: '<hr>',
    chapter: 'text',
    why: 'Draws a horizontal line — a visual break between sections. Also has no closing tag.',
    hints: [
      'Like <br>, this tag has no closing tag — it marks a divider, not a wrapped section.',
      'It just marks where a horizontal line should appear: <hr>.',
      'Type <hr> on its own line inside <body>.',
    ],
    check: (code) => has(code, /<hr\s*\/?>/i),
  },

  // --- lists ---
  {
    tag: '<ul><li></li></ul>',
    chapter: 'lists',
    why: 'An unordered (bulleted) list. <li> items go inside a <ul> wrapper.',
    hints: [
      'You need two tags together: a list wrapper, and at least one item inside it.',
      '<ul> wraps the whole list; each <li> is one bullet point.',
      'Type:\n<ul>\n  <li>First item</li>\n</ul>',
    ],
    check: (code) => has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ul>/i),
  },
  {
    tag: '<ol><li></li></ol>',
    chapter: 'lists',
    why: 'An ordered (numbered) list. Same idea as <ul>, but the browser numbers the items for you.',
    hints: [
      'Same pattern as before, but the wrapper tag is different.',
      '<ol> wraps the whole list; each <li> is one numbered step.',
      'Type:\n<ol>\n  <li>Step one</li>\n</ol>',
    ],
    check: (code) => has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ol>/i),
  },

  // --- links & media ---
  {
    tag: '<a href=""></a>',
    chapter: 'links-media',
    why: 'A clickable link. The href attribute says where it goes.',
    hints: [
      'Add a tag that wraps clickable text, with a destination attribute.',
      'The attribute is called href, and its value goes in quotes.',
      'Type: <a href="https://example.com">Visit</a>',
    ],
    check: (code) => has(code, /<a\s+href="[^"]+"[^>]*>[^<]*<\/a>/i),
  },
  {
    tag: '<img src="" alt="">',
    chapter: 'links-media',
    why: 'Shows an image. src is the file or URL; alt is a text description shown if the image fails to load, and read aloud by screen readers.',
    hints: [
      'This tag has no closing tag — it needs two attributes instead.',
      'It needs both src (the image location) and alt (a text description).',
      'Type: <img src="https://placekitten.com/200/200" alt="A kitten">',
    ],
    check: (code) => hasImgWithSrcAndAlt(code),
  },

  // --- grouping & attributes ---
  {
    tag: '<div></div>',
    chapter: 'grouping',
    why: 'An invisible box used to group other elements together, usually so CSS can style or position the group as one unit.',
    hints: [
      'Add a tag that wraps a few other elements, purely to group them.',
      'It has an opening and closing form: <div> ... </div>, and shows nothing on its own.',
      'Type:\n<div>\n  <p>Grouped text</p>\n</div>',
    ],
    check: (code) => has(code, /<div[^>]*>[\s\S]*?<\/div>/i),
  },
  {
    tag: '<span></span>',
    chapter: 'grouping',
    why: "Like <div>, but for a small chunk of text inline, not a whole block — you couldn't wrap a <div> around three words in the middle of a sentence, but a <span> works fine.",
    hints: [
      'Add a tag around just a few words inside a paragraph.',
      'It has an opening and closing form: <span> ... </span>.',
      'Type: <span>a few words</span> inside one of your paragraphs.',
    ],
    check: (code) => has(code, /<span[^>]*>[^<]*<\/span>/i),
  },
  {
    tag: 'class=""',
    chapter: 'grouping',
    why: 'Labels an element so it can be targeted later (by CSS or JavaScript). The same class name can be reused on many elements.',
    hints: [
      'Add an attribute to any existing tag to give it a reusable label.',
      'The attribute is called class, and its value goes in quotes.',
      'Add class="highlight" to any tag you\'ve already written, like your <div> or a <p>.',
    ],
    check: (code) => hasAnyAttribute(code, 'class'),
  },
  {
    tag: 'id=""',
    chapter: 'grouping',
    why: "Like class, but for one specific element — an id should only ever be used once per page, unlike class which can repeat.",
    hints: [
      'Add an attribute to any existing tag to give it a one-of-a-kind label.',
      'The attribute is called id, and its value goes in quotes.',
      'Add id="main-heading" to your <h1> tag, or any other tag you\'ve written.',
    ],
    check: (code) => hasAnyAttribute(code, 'id'),
  },

  // --- semantic layout ---
  {
    tag: '<header></header>',
    chapter: 'semantic',
    why: "Marks the top introductory section of a page — usually a logo, title, or top navigation. Looks like nothing on its own, but tells tools what this section is.",
    hints: [
      'Add a tag around whatever sits at the very top of your visible content.',
      'It has an opening and closing form: <header> ... </header>.',
      'Wrap your <h1> in a <header> tag.',
    ],
    check: (code) => has(code, /<header[^>]*>[\s\S]*?<\/header>/i),
  },
  {
    tag: '<nav></nav>',
    chapter: 'semantic',
    why: 'Marks a block of navigation links — a menu bar, for example — so tools know this group of links is for getting around the site.',
    hints: [
      'Add a tag that wraps a group of links meant for navigation.',
      'It has an opening and closing form: <nav> ... </nav>.',
      'Type:\n<nav>\n  <a href="#">Home</a>\n</nav>',
    ],
    check: (code) => has(code, /<nav[^>]*>[\s\S]*?<\/nav>/i),
  },
  {
    tag: '<main></main>',
    chapter: 'semantic',
    why: 'Marks the primary content of the page — the stuff that makes this page different from every other page on the site. Only one per page.',
    hints: [
      'Add a tag around the central content of your page — not the header, nav, or footer.',
      'It has an opening and closing form: <main> ... </main>.',
      'Wrap your <p> tags in a <main> tag.',
    ],
    check: (code) => has(code, /<main[^>]*>[\s\S]*?<\/main>/i),
  },
  {
    tag: '<footer></footer>',
    chapter: 'semantic',
    why: 'Marks the bottom section of a page — usually credits, copyright, or secondary links.',
    hints: [
      'Add a tag around whatever sits at the very bottom of your visible content.',
      'It has an opening and closing form: <footer> ... </footer>.',
      'Type:\n<footer>\n  <p>Made by me.</p>\n</footer>',
    ],
    check: (code) => has(code, /<footer[^>]*>[\s\S]*?<\/footer>/i),
  },
];
