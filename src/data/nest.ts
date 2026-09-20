export type NestEntry = {
  tag: string;
  category: string;
  stats: {
    closingTag: string;
    voidElement: string;
    livesInside: string;
    typicallyHolds: string;
  };
  whatItDoes: string;
  whereItGoes: string;
  mistakes: string[];
  example: string;
  related: string[];
};

// Deep-dive reference pages — the stuff a quick-search entry in the key
// index doesn't have room for: placement rules, what goes wrong, why.
// Not every tag has one yet; NestPane falls back to the key index entry
// for tags without a deep page.
export const NEST: NestEntry[] = [
  {
    tag: '<main>',
    category: 'layout',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'the content unique to this page',
    },
    whatItDoes:
      'Marks the one block of content that makes this page different from every other page on the site — not the header, not the nav, not the footer, just the actual point of the page.',
    whereItGoes:
      'Opens right after <body> starts (or after <header>/<nav>, if you have them) and closes right before <body> ends. It never wraps <head> — <head> isn\'t visible content, so it can\'t be "main" anything. And it never wraps <header>, <nav>, or <footer> either, since those aren\'t page-unique content.',
    mistakes: [
      'Opening <main> before <head> instead of after <body> — this also produces invalid HTML, since <main> then straddles two elements it shouldn\'t.',
      'Wrapping <header> or <footer> inside <main> — they\'re siblings of it, not children.',
      'Using more than one <main> on a page — there should only ever be one.',
    ],
    example: '<body>\n  <header>...</header>\n  <nav>...</nav>\n  <main>\n    <h1>Page title</h1>\n    <p>The actual content.</p>\n  </main>\n  <footer>...</footer>\n</body>',
    related: ['<header>', '<nav>', '<footer>', '<body>'],
  },
  {
    tag: '<div>',
    category: 'grouping',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'a block of other elements',
    },
    whatItDoes:
      'A box with zero built-in meaning or appearance — no bold, no border, nothing. It exists purely so you can group a chunk of the page together and target that group with a class or id later.',
    whereItGoes:
      'Anywhere you want to treat several elements as one unit. It\'s a block element, so it always starts on its own line and takes the full width available, whether or not you can see that (nothing visible changes until CSS is added).',
    mistakes: [
      'Writing attributes after the tag closes instead of inside its brackets — class="x" belongs in <div class="x">, not after <div> as separate text.',
      'Expecting a <div> to look like anything on its own. It won\'t, until it\'s styled.',
      'Reaching for <div> when a semantic tag fits better — if the box is your page\'s main content, header, or nav, use <main>/<header>/<nav> instead so the structure actually means something.',
    ],
    example: '<div class="card">\n  <h2>Title</h2>\n  <p>Some text.</p>\n</div>',
    related: ['<span>', 'class=""', 'id=""'],
  },
  {
    tag: '<span>',
    category: 'grouping',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'inline, inside text',
      typicallyHolds: 'a few words',
    },
    whatItDoes:
      'The inline version of <div> — same "no meaning, no look, just a grouping hook" idea, but for a short run of text inside a sentence instead of a whole block.',
    whereItGoes:
      'Wraps a few words in the middle of a line — inside a <p>, a <li>, wherever. It never forces a line break, unlike <div>.',
    mistakes: [
      'Using <span> to wrap something that should be its own block (a whole paragraph, a whole section) — that\'s what <div> is for.',
      'Expecting a visible change with no class attached. Like <div>, it\'s invisible until styled.',
    ],
    example: 'The price is <span class="price">$12</span> today.',
    related: ['<div>', 'class=""'],
  },
  {
    tag: 'class=""',
    category: 'grouping',
    stats: {
      closingTag: 'n/a — attribute',
      voidElement: 'n/a',
      livesInside: 'any opening tag',
      typicallyHolds: 'one or more names, space-separated',
    },
    whatItDoes:
      'Labels an element so CSS or JavaScript can target it later. The same class name can be reused on as many elements as you want — that\'s the whole point.',
    whereItGoes:
      'Inside the tag\'s own opening bracket, right after the tag name: <div class="card">. Never as free-standing text after the tag closes.',
    mistakes: [
      'Writing <div> class="card"> — the attribute has to be before the closing >, not after it.',
      'Leaving off the quotes: class=card instead of class="card". Browsers often forgive it; it\'s still not correct HTML.',
      'Using class for something that should be unique — that\'s what id is for.',
    ],
    example: '<p class="highlight">Styled text</p>\n<p class="highlight">Also styled, same way</p>',
    related: ['id=""', '<div>', '<span>'],
  },
  {
    tag: 'id=""',
    category: 'grouping',
    stats: {
      closingTag: 'n/a — attribute',
      voidElement: 'n/a',
      livesInside: 'any opening tag',
      typicallyHolds: 'exactly one name',
    },
    whatItDoes:
      'Names exactly one element on the entire page. Unlike class, an id should never be reused — it\'s meant to point at a single specific thing (a target for a link, a hook for one specific bit of JS).',
    whereItGoes:
      'Same spot as class: inside the tag\'s own brackets. <h1 id="main-title">, not text tacked on afterward.',
    mistakes: [
      'Reusing the same id on more than one element — defeats the entire purpose, and breaks anything (CSS, JS, links) that expects it to be unique.',
      'Repeating the attribute in the closing tag, like </h1 id="main-title">. Closing tags never carry attributes — just </h1>.',
    ],
    example: '<h1 id="main-heading">Welcome</h1>',
    related: ['class=""', '<div>'],
  },
  {
    tag: '<header>',
    category: 'layout',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'a heading, logo, or intro content',
    },
    whatItDoes:
      'Marks the introductory content at the top of the page (or top of a section) — usually a logo, site name, or a heading.',
    whereItGoes:
      'Right at the start of <body>, before <main>. It\'s a sibling of <main>, <nav>, and <footer> — not nested inside any of them.',
    mistakes: [
      'Confusing it with <head> — completely different tag. <head> is invisible metadata; <header> is visible content.',
      'Putting it inside <main> — it usually sits alongside <main>, not inside it.',
    ],
    example: '<header>\n  <h1>Site Name</h1>\n</header>',
    related: ['<nav>', '<main>', '<footer>'],
  },
  {
    tag: '<nav>',
    category: 'layout',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>, often inside or next to <header>',
      typicallyHolds: 'a list of <a> links',
    },
    whatItDoes:
      'Marks a block of navigation links — a menu bar, a sidebar of links, breadcrumbs. Screen readers announce it specifically as a "navigation" landmark.',
    whereItGoes:
      'Usually right inside or right after <header>, near the top of <body>. Not every group of links needs <nav> — save it for the actual site-wide or section navigation.',
    mistakes: [
      'Wrapping every single link on the page in <nav> — it\'s for a navigation menu specifically, not link groups in general.',
      'Forgetting the links inside still need real href values to go anywhere.',
    ],
    example: '<nav>\n  <a href="/">Home</a>\n  <a href="/about">About</a>\n</nav>',
    related: ['<header>', '<a href="">'],
  },
  {
    tag: '<footer>',
    category: 'layout',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'credits, copyright, secondary links',
    },
    whatItDoes:
      'Marks the closing section of a page (or section) — usually copyright text, contact info, or secondary links that aren\'t the main point.',
    whereItGoes:
      'Right before </body> closes, as a sibling of <header> and <main> — not nested inside <main>.',
    mistakes: ['Nesting it inside <main> — the footer is not "main" content, so it sits outside it.'],
    example: '<footer>\n  <p>&copy; 2025 My Site</p>\n</footer>',
    related: ['<header>', '<main>'],
  },
  {
    tag: '<a href="">',
    category: 'links & media',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>, inline',
      typicallyHolds: 'the clickable text or content',
    },
    whatItDoes: 'Makes something clickable and sends the visitor somewhere else — another page, another site, or another spot on the same page.',
    whereItGoes: 'Wraps whatever should be clickable — a word, a phrase, even an image. It\'s inline, so it doesn\'t force a line break.',
    mistakes: [
      'Writing <ahref=> — missing the space between the tag name and the attribute, and missing quotes around the URL. That gets parsed as one tag named "ahref", not <a> with an href.',
      'Closing it as anything other than </a> — a closing tag never repeats the attribute, so </a href="..."> is wrong; it\'s always just </a>.',
      'Leaving href empty or missing entirely — then it\'s not actually a link to anywhere.',
    ],
    example: '<a href="https://example.com">Visit</a>',
    related: ['<nav>', '<img src="" alt="">'],
  },
  {
    tag: '<img src="" alt="">',
    category: 'links & media',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: 'anywhere in <body>, inline',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes:
      'Displays an image. src points to the file; alt is a text description shown if the image fails to load and read aloud by screen readers.',
    whereItGoes: 'Wherever the image should appear. It never gets a closing tag — <img> is complete on its own, like <br> and <hr>.',
    mistakes: [
      'Leaving out the quotes around src or alt — src=cat.jpg instead of src="cat.jpg". Browsers often render it anyway, but it\'s not valid, and this checker won\'t count it.',
      'Skipping alt entirely — it\'s required for accessibility, not optional decoration (see the fact on the Route step for why this has mattered in the real world).',
      'Writing </img> — there\'s nothing to close.',
    ],
    example: '<img src="cat.jpg" alt="A sleeping cat">',
    related: ['<a href="">'],
  },
];

export function getNestEntry(tag: string): NestEntry | undefined {
  return NEST.find((e) => e.tag === tag);
}
