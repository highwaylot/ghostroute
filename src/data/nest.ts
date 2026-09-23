export type NestEntry = {
  tag: string;
  category: string;
  // Freeform label/value pairs instead of four fixed fields — HTML's
  // stats (closing tag, void element, lives inside, typically holds)
  // don't mean anything for a CSS property or an email pattern, and
  // this way every domain can pick the stats that actually apply to it
  // without a separate NestEntry type per track. Existing entries below
  // already satisfy this shape as-is; nothing here needed rewriting.
  stats: Record<string, string>;
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
  {
    tag: '<!DOCTYPE html>',
    category: 'document',
    stats: {
      closingTag: 'n/a — declaration',
      voidElement: 'n/a',
      livesInside: 'nowhere — comes before <html>',
      typicallyHolds: 'n/a',
    },
    whatItDoes:
      'Tells the browser to render the page using modern HTML rules instead of an old compatibility mode from the 1990s. Without it, browsers guess, and the guess is usually wrong.',
    whereItGoes: 'The very first line of the file. Nothing — not even whitespace — goes before it.',
    mistakes: [
      'Leaving it out entirely — the page may still show something, but spacing and sizing can behave inconsistently across browsers ("quirks mode").',
      'Adding old-style version info like the HTML 4 doctype — modern HTML only needs the plain <!DOCTYPE html>.',
    ],
    example: '<!DOCTYPE html>\n<html>\n  ...\n</html>',
    related: ['<html>'],
  },
  {
    tag: '<html>',
    category: 'document',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'nothing — it is the root',
      typicallyHolds: '<head> and <body>',
    },
    whatItDoes: 'The root element. Every other tag on the page is nested inside it, directly or indirectly.',
    whereItGoes: 'Right after <!DOCTYPE html>. It holds exactly two children: one <head>, then one <body>.',
    mistakes: [
      'Putting content directly inside <html> instead of inside <head> or <body> — everything visible belongs in <body>, everything meta belongs in <head>.',
      'Having more than one <html>, <head>, or <body> — there\'s only ever one of each.',
    ],
    example: '<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>',
    related: ['<head>', '<body>'],
  },
  {
    tag: '<head>',
    category: 'document',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<html>, before <body>',
      typicallyHolds: '<title>, <meta>, <link>, <script>',
    },
    whatItDoes: 'Holds information about the page that visitors don\'t see directly — the tab title, character encoding, linked stylesheets, and scripts.',
    whereItGoes: 'The first child of <html>, before <body>.',
    mistakes: [
      'Putting visible content (text, images, headings) inside <head> — nothing in here renders on the page itself.',
      'Forgetting <title> inside it — every page needs one.',
    ],
    example: '<head>\n  <meta charset="utf-8">\n  <title>My Page</title>\n</head>',
    related: ['<title>', '<meta charset="utf-8">', '<body>'],
  },
  {
    tag: '<title>',
    category: 'document',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<head>',
      typicallyHolds: 'plain text',
    },
    whatItDoes: 'Sets the text shown in the browser tab, in bookmarks, and as the default headline in search results and shared links.',
    whereItGoes: 'Inside <head>, nowhere else. There\'s only ever one per page.',
    mistakes: [
      'Putting it inside <body> — it has no effect there and won\'t show as tab text.',
      'Leaving it generic ("Untitled Document") — every real page should have a specific, descriptive title.',
    ],
    example: '<head>\n  <title>About Me</title>\n</head>',
    related: ['<head>'],
  },
  {
    tag: '<body>',
    category: 'document',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<html>, after <head>',
      typicallyHolds: 'everything visible on the page',
    },
    whatItDoes: 'Holds every visible piece of content on the page — text, images, links, all of it.',
    whereItGoes: 'The second and last child of <html>, right after </head>.',
    mistakes: ['Trying to put <head>-only tags (like <title> or <meta>) inside <body> — they belong exclusively in <head>.'],
    example: '<body>\n  <h1>Hello</h1>\n  <p>Welcome to my page.</p>\n</body>',
    related: ['<head>', '<html>', '<main>'],
  },
  {
    tag: '<meta charset="utf-8">',
    category: 'document',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: '<head>',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes: 'Tells the browser which character set the page\'s text uses, so accented letters, emoji, and non-English text display correctly instead of turning into garbled symbols.',
    whereItGoes: 'As early as possible inside <head> — ideally the very first line inside it, since the browser needs this before it can safely read the rest of the page\'s text.',
    mistakes: ['Leaving it out — usually harmless for plain English text, but it\'s the first thing to check when special characters show up broken.'],
    example: '<head>\n  <meta charset="utf-8">\n</head>',
    related: ['<head>'],
  },
  {
    tag: '<h1> – <h6>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'a short line of heading text',
    },
    whatItDoes:
      'Marks a heading. <h1> is the biggest and most important, <h6> the smallest. They also build the page\'s outline — screen readers can jump heading-to-heading the way you\'d skim a table of contents.',
    whereItGoes: 'Wherever a new section starts. Nest them in order — an <h1> for the page, <h2>s for its main sections, <h3>s for subsections within those. Don\'t skip levels just to get a smaller size; that\'s what CSS is for.',
    mistakes: [
      'Using more than one <h1> per page, or using headings purely for size instead of structure (an <h3> because it "looks right," when it should be an <h2>).',
      'Skipping straight from <h1> to <h4> — breaks the outline for anyone navigating by heading.',
    ],
    example: '<h1>Page Title</h1>\n<h2>A Section</h2>\n<h3>A Subsection</h3>',
    related: ['<p>'],
  },
  {
    tag: '<p>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'a paragraph of text',
    },
    whatItDoes: 'Marks a paragraph — the standard block for a chunk of running text.',
    whereItGoes: 'Anywhere in <body> you have a paragraph of text. It\'s a block element, so it always starts on its own line.',
    mistakes: [
      'Using <br> repeatedly to fake paragraph spacing instead of just starting a new <p> — <p> already has its own spacing, and multiple <br>s is a workaround for not using the right tag.',
    ],
    example: '<p>This is the first paragraph.</p>\n<p>This is the second.</p>',
    related: ['<h1> – <h6>', '<br>'],
  },
  {
    tag: '<strong>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'inline, inside text',
      typicallyHolds: 'a word or phrase',
    },
    whatItDoes: 'Marks text as important — browsers show it bold by default, but the meaning ("this matters") is the actual point, not just the look.',
    whereItGoes: 'Around whichever specific words are actually important, inside a sentence.',
    mistakes: ['Using it purely to make text bold for looks — if there\'s no real "this is important" meaning, that\'s a job for CSS (font-weight), not <strong>.'],
    example: 'This step is <strong>required</strong> before continuing.',
    related: ['<em>'],
  },
  {
    tag: '<em>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'inline, inside text',
      typicallyHolds: 'a word or phrase',
    },
    whatItDoes: 'Marks text with emphasis — browsers show it italic, meant for words you\'d actually stress if reading the sentence aloud.',
    whereItGoes: 'Around the specific word or phrase being emphasized, inside a sentence.',
    mistakes: ['Using it purely to italicize text with no real emphasis meaning — that\'s a CSS job (font-style), not <em>.'],
    example: 'I <em>really</em> mean it.',
    related: ['<strong>'],
  },
  {
    tag: '<br>',
    category: 'text',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: 'inline, inside text',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes: 'Forces a single line break within a block of text — like pressing Enter mid-paragraph, for things like an address or a poem where the line breaks actually matter.',
    whereItGoes: 'Inside running text, at the exact point the line should break.',
    mistakes: [
      'Stacking several in a row to create paragraph spacing — start a new <p> instead.',
      'Writing </br> — it has no closing tag.',
    ],
    example: '123 Main St<br>\nSpringfield, USA',
    related: ['<p>', '<hr>'],
  },
  {
    tag: '<hr>',
    category: 'text',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: '<body>',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes: 'Draws a horizontal divider line, marking a thematic break between two chunks of content.',
    whereItGoes: 'Between two sections of content, on its own — not inside a sentence.',
    mistakes: ['Writing </hr> — like <br>, it has no closing tag.'],
    example: '<p>End of section one.</p>\n<hr>\n<p>Start of section two.</p>',
    related: ['<br>'],
  },
  {
    tag: '<small>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'inline, inside text',
      typicallyHolds: 'fine print',
    },
    whatItDoes: 'Marks side-comment text — legal disclaimers, fine print, attribution — content that\'s secondary to the main point.',
    whereItGoes: 'Around the fine-print text itself, usually near the bottom of a section.',
    mistakes: ['Using it just to make text visually smaller with no "fine print" meaning behind it — that\'s a CSS job.'],
    example: '<p>$10/month. <small>Cancel anytime.</small></p>',
    related: ['<p>'],
  },
  {
    tag: '<mark>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'inline, inside text',
      typicallyHolds: 'highlighted text',
    },
    whatItDoes: 'Highlights text for reference — like a search result match or a key term — browsers show a yellow background by default.',
    whereItGoes: 'Around the specific highlighted phrase, inline.',
    mistakes: ['Using it as a general-purpose "yellow background" styling tool unrelated to actually highlighting relevant text.'],
    example: 'Results for "cat": a sleeping <mark>cat</mark> photo.',
    related: ['<strong>'],
  },
  {
    tag: '<blockquote>',
    category: 'text',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'a quoted block of text',
    },
    whatItDoes: 'Marks an extended quotation from another source — browsers usually indent it to set it apart from surrounding text.',
    whereItGoes: 'Wrapping a full quoted passage, as its own block.',
    mistakes: ['Using it just for indentation with no actual quote — that\'s a CSS job, not <blockquote>.'],
    example: '<blockquote>\n  To be, or not to be, that is the question.\n</blockquote>',
    related: ['<p>'],
  },
  {
    tag: '<code> / <pre>',
    category: 'text',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: 'inline (<code>) or block (<pre>)',
      typicallyHolds: 'source code',
    },
    whatItDoes: '<code> marks a short inline snippet of code within a sentence. <pre> preserves whitespace and line breaks exactly as typed — combine them for a proper multi-line code block.',
    whereItGoes: '<code> alone for something like a variable name mid-sentence. <pre><code>...</code></pre> together for a whole block of code that needs its formatting kept intact.',
    mistakes: ['Using <pre> alone for a multi-line block without <code> inside it — it\'ll preserve formatting fine, but loses the "this is code" semantic meaning.'],
    example: 'Use the <code>let</code> keyword.\n\n<pre><code>let x = 5;\nconsole.log(x);</code></pre>',
    related: ['<p>'],
  },
  {
    tag: '<figure> / <figcaption>',
    category: 'links & media',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'an <img> plus a <figcaption>',
    },
    whatItDoes: 'Groups an image (or other media) together with a caption that describes it, so the two are understood as one unit.',
    whereItGoes: 'Wrapping the <img> and its <figcaption> together, wherever the image appears.',
    mistakes: ['Using <figure> without ever including a <figcaption> — if there\'s no caption, a plain <img> is simpler and just as correct.'],
    example: '<figure>\n  <img src="cat.jpg" alt="A cat">\n  <figcaption>My cat, Whiskers.</figcaption>\n</figure>',
    related: ['<img src="" alt="">'],
  },
  {
    tag: '<ul> / <li>',
    category: 'lists',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'one or more <li> items',
    },
    whatItDoes: 'A bulleted (unordered) list — used when the order of items doesn\'t matter.',
    whereItGoes: 'Wrapping each <li> item. Every direct child of <ul> should be an <li> — nothing else goes straight inside it.',
    mistakes: ['Putting text or other tags directly inside <ul> instead of wrapping each item in its own <li>.'],
    example: '<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>',
    related: ['<ol> / <li>'],
  },
  {
    tag: '<ol> / <li>',
    category: 'lists',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'one or more <li> items',
    },
    whatItDoes: 'A numbered (ordered) list — used when the sequence of items actually matters, like steps in a process.',
    whereItGoes: 'Same pattern as <ul>: wraps <li> items, in the order they should appear.',
    mistakes: ['Using <ol> when order doesn\'t actually matter (that\'s what <ul> is for), or vice versa.'],
    example: '<ol>\n  <li>Preheat the oven.</li>\n  <li>Mix the batter.</li>\n</ol>',
    related: ['<ul> / <li>'],
  },
  {
    tag: '<table> / <tr> / <td>',
    category: 'layout',
    stats: {
      closingTag: 'required (all)',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: '<tr> rows, each holding <td>/<th> cells',
    },
    whatItDoes: 'Displays actual tabular data — rows and columns of related values, like a spreadsheet. <tr> is one row, <td> is one data cell, <th> is a header cell.',
    whereItGoes: '<table> wraps everything; each <tr> inside it is one row; each <td>/<th> inside a <tr> is one cell in that row.',
    mistakes: [
      'Using a <table> purely for page layout (positioning boxes on the page) instead of actual data — that\'s what CSS layout tools are for.',
      'Forgetting <th> for header cells, which hurts both meaning and accessibility.',
    ],
    example: '<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Ann</td><td>30</td></tr>\n</table>',
    related: [],
  },
  {
    tag: '<button>',
    category: 'forms',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>, often inside <form>',
      typicallyHolds: 'button label text',
    },
    whatItDoes: 'A clickable button that can trigger an action — submitting a form, running JavaScript, or just being interactive.',
    whereItGoes: 'Anywhere something needs to be clicked. Inside a <form>, it defaults to submitting that form unless told otherwise.',
    mistakes: ['Using an <a> tag styled to look like a button when the action isn\'t actually navigation — a real action belongs on a real <button>.'],
    example: '<button>Click me</button>',
    related: ['<form>'],
  },
  {
    tag: '<input>',
    category: 'forms',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: '<form>',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes: 'A box the user can type into or interact with. The type attribute changes its whole behavior — text, email, checkbox, radio, date, and more all use the same tag.',
    whereItGoes: 'Inside a <form>, usually paired with a <label>.',
    mistakes: [
      'Writing </input> — there\'s nothing to close.',
      'Leaving off type entirely — it defaults to a plain text box, which may not be what\'s intended.',
      'Skipping a paired <label> — makes the field much harder to use for screen reader users and anyone clicking to focus it.',
    ],
    example: '<label for="email">Email</label>\n<input type="email" id="email">',
    related: ['<label>', '<form>'],
  },
  {
    tag: '<label>',
    category: 'forms',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<form>',
      typicallyHolds: 'the field\'s name/description',
    },
    whatItDoes: 'Text tied to a specific form control — clicking the label focuses (or checks) the input it\'s linked to. A major, easy accessibility win.',
    whereItGoes: 'Right next to the <input> it describes, linked by matching for and id values.',
    mistakes: ['Leaving out the for/id link entirely — the label then just looks right but doesn\'t actually connect to the field for clicking or screen readers.'],
    example: '<label for="name">Name</label>\n<input id="name">',
    related: ['<input>'],
  },
  {
    tag: '<select> / <option>',
    category: 'forms',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<form>',
      typicallyHolds: 'one or more <option> choices',
    },
    whatItDoes: 'A dropdown menu. Each <option> inside it is one choice the user can pick.',
    whereItGoes: 'Inside a <form>, wrapping each available <option>.',
    mistakes: ['Putting anything other than <option> (or <optgroup>) directly inside <select>.'],
    example: '<select>\n  <option>Red</option>\n  <option>Blue</option>\n</select>',
    related: ['<form>'],
  },
  {
    tag: '<form>',
    category: 'forms',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<body>',
      typicallyHolds: 'inputs, labels, and a submit button',
    },
    whatItDoes: 'Groups form controls together so they can all be submitted at once as a single request.',
    whereItGoes: 'Wrapping every <input>, <label>, <select>, and <button> that belong to that one submission.',
    mistakes: ['Scattering inputs outside of any <form> — they\'ll render fine but won\'t submit anywhere as a group.'],
    example: '<form>\n  <input type="text">\n  <button>Submit</button>\n</form>',
    related: ['<input>', '<button>', '<label>'],
  },
  {
    tag: '<!-- comment -->',
    category: 'other',
    stats: {
      closingTag: 'n/a — self-contained syntax',
      voidElement: 'n/a',
      livesInside: 'anywhere',
      typicallyHolds: 'notes for humans',
    },
    whatItDoes: 'A note for anyone reading the code later (including future you). The browser completely ignores it — it never renders or affects the page.',
    whereItGoes: 'Anywhere, to explain something that isn\'t obvious from the code itself.',
    mistakes: ['Putting sensitive information in a comment — it\'s still visible to anyone who views the page source.'],
    example: '<!-- TODO: replace this placeholder image -->',
    related: [],
  },
  {
    tag: '<script>',
    category: 'other',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<head> or <body>',
      typicallyHolds: 'JavaScript code, or nothing if src is set',
    },
    whatItDoes: 'Runs JavaScript — either written directly inside the tag, or loaded from a separate file via src.',
    whereItGoes: 'Often placed right before </body> so the page\'s content loads first and the script doesn\'t block rendering while it downloads.',
    mistakes: ['Loading it too early in <head> for a script that needs the page\'s elements to already exist — it\'ll run before those elements are there.'],
    example: '<script src="app.js"></script>',
    related: [],
  },
  {
    tag: '<link rel="stylesheet">',
    category: 'other',
    stats: {
      closingTag: 'none — void element',
      voidElement: 'yes',
      livesInside: '<head>',
      typicallyHolds: 'n/a (self-contained)',
    },
    whatItDoes: 'Connects an external CSS file to the page so its styles apply.',
    whereItGoes: 'Inside <head>. rel="stylesheet" and href="path/to/file.css" are both required.',
    mistakes: ['Writing </link> — like other void elements, there\'s nothing to close.'],
    example: '<link rel="stylesheet" href="style.css">',
    related: ['<head>'],
  },
  {
    tag: '<template>',
    category: 'other',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<head> or <body>',
      typicallyHolds: 'markup meant to be cloned by JavaScript later',
    },
    whatItDoes:
      "Holds a chunk of HTML that the browser parses but never renders and never runs — no images load, no scripts inside it execute. It just sits there, inert, until JavaScript reaches in, clones its contents, and inserts the clone somewhere else in the page.",
    whereItGoes:
      "Anywhere — it's invisible either way. Usually near the top of <body> or in <head>, out of the way of the content that's actually showing.",
    mistakes: [
      "Expecting it to show up on the page on its own — it won't, ever, without JavaScript actively cloning it in.",
      "Using it as a substitute for hiding content with CSS (display: none) — that content still renders and runs scripts, just invisibly; <template> content does neither until cloned.",
    ],
    example: '<template id="row-template">\n  <li class="row"></li>\n</template>',
    related: ['<script>'],
  },
  {
    tag: '<iframe>',
    category: 'links & media',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'nothing — src loads a whole separate document',
    },
    whatItDoes:
      "Embeds an entire separate web page inside this one, in its own little sandboxed window — a map, a video, a payment form from another site, anything with its own URL.",
    whereItGoes:
      "Anywhere in <body>. Needs a src pointing at the page to embed, and width/height (or CSS) so it isn't a tiny sliver.",
    mistakes: [
      "Leaving off title — without it, a screen reader has no way to say what the embedded content even is.",
      "Assuming you can style or read the content inside it with your own CSS/JS — a same-origin iframe sometimes allows this, but a cross-origin one (a different site) never does, by design.",
    ],
    example: '<iframe src="https://example.com/map" title="Location map"></iframe>',
    related: ['<embed>', '<object>'],
  },
  {
    tag: '<video>',
    category: 'links & media',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'fallback text, or one or more <source> tags',
    },
    whatItDoes: 'Embeds a video using the browser\'s own built-in player — no plugin, no external library required.',
    whereItGoes:
      'Anywhere in <body>. src (or nested <source> tags for multiple formats) points at the file.',
    mistakes: [
      'Forgetting controls — without it, there\'s no play/pause/volume bar and the video is effectively unusable.',
      'Relying on autoplay with sound — most browsers block autoplaying video with audio outright; muted autoplay is the only version that reliably works.',
    ],
    example: '<video src="clip.mp4" controls></video>',
    related: ['<audio>'],
  },
  {
    tag: '<audio>',
    category: 'links & media',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'fallback text, or one or more <source> tags',
    },
    whatItDoes: 'The audio-only sibling of <video> — embeds a sound clip with the browser\'s built-in controls.',
    whereItGoes: 'Anywhere in <body>. Same src/controls pattern as <video>.',
    mistakes: [
      'Forgetting controls, same as <video> — without it, there\'s no way to play, pause, or adjust the volume.',
    ],
    example: '<audio src="clip.mp3" controls></audio>',
    related: ['<video>'],
  },
  {
    tag: '<svg>',
    category: 'links & media',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'shape elements like <circle>, <path>, <rect>',
    },
    whatItDoes:
      'Draws vector graphics directly in the HTML — shapes described with math instead of pixels, so they stay crisp at any size, unlike a raster <img>.',
    whereItGoes:
      "Anywhere in <body>. Needs a viewBox to define its coordinate system, then shape elements inside it drawing the actual graphic.",
    mistakes: [
      "Adding role=\"img\" (marking it as a meaningful graphic) without a <title> inside it — that combination promises an accessible name and then doesn't deliver one.",
      "Forgetting viewBox — without it, the shapes inside are positioned in raw pixel coordinates with no relationship to the element's actual displayed size, and scaling gets unpredictable.",
    ],
    example: '<svg role="img" viewBox="0 0 20 20">\n  <title>Warning</title>\n  <circle cx="10" cy="10" r="8" />\n</svg>',
    related: [],
  },
];

export function getNestEntry(tag: string): NestEntry | undefined {
  return NEST.find((e) => e.tag === tag);
}
