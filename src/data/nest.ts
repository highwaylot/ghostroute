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
    related: ['<header>', '<nav>', '<footer>', '<body>', '<section> / <article>', '<aside>'],
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
    related: ['<span>', 'class=""', 'id=""', '<section> / <article>'],
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
    related: ['id=""', '<div>', '<span>', 'data-*=""', 'style=""'],
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
    related: ['<header>', '<a href="">', '<aside>'],
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
    mistakes: [
      'Nesting it inside <main> — the footer is not "main" content, so it sits outside it.',
      'Confusing it with a page-level-only tag — a <footer> can also close an <article> or <section>, holding that section\'s own byline or links.',
      'Stuffing primary content into it because it\'s "at the bottom" — if visitors need it to use the page, it belongs in <main>.',
    ],
    example: '<footer>\n  <p>&copy; 2025 My Site</p>\n</footer>',
    related: ['<header>', '<main>', '<address>'],
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
    related: ['<nav>', '<img src="" alt="">', 'target="_blank" / rel=""'],
  },
  {
    tag: 'target="_blank" / rel=""',
    category: 'links & media',
    stats: {
      type: 'attributes, on <a>',
      appliesTo: 'a link that should open somewhere new',
      livesInside: 'the opening <a> tag',
      commonValues: 'target="_blank" rel="noopener"',
    },
    whatItDoes:
      'target="_blank" opens the link in a brand new tab instead of navigating the current page away. On its own, that new tab gets a handle back to the page that opened it (window.opener) — enough that a malicious destination could redirect your original tab to a phishing page while you\'re looking at the new one. rel="noopener" (or "noreferrer", which also strips the referrer) cuts that link off.',
    whereItGoes: 'Both attributes go directly on the <a> tag, alongside href.',
    mistakes: [
      'Adding target="_blank" without rel="noopener" — the link works fine and looks correct, so this one is easy to ship without ever noticing the gap.',
      'Assuming rel="noopener" is only needed for links to "untrusted" sites — it\'s a blanket best practice for every target="_blank" link, trusted destination or not.',
    ],
    example: '<a href="https://example.com" target="_blank" rel="noopener">Visit</a>',
    related: ['<a href="">'],
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
    related: ['<a href="">', '<picture> / <source>', '<figure> / <figcaption>'],
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
    related: ['<head>', '<body>', '<!DOCTYPE html>'],
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
    whatItDoes: 'Holds every visible piece of content on the page — text, images, links, forms, all of it. If the user can see it or click it, it lives somewhere inside <body>.',
    whereItGoes: 'The second and last child of <html>, right after </head>.',
    mistakes: [
      'Trying to put <head>-only tags (like <title> or <meta>) inside <body> — they belong exclusively in <head>.',
      'Dropping loose text or tags after </body> — anything after the closing tag is outside the document and browsers quietly relocate it, usually not where you meant.',
      'Treating <body> as the place for layout styling by stacking attributes on it — it takes a class like anything else; the old bgcolor/text attributes are long dead.',
    ],
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
    mistakes: [
      'Leaving it out — usually harmless for plain English text, but it\'s the first thing to check when special characters show up broken.',
      'Placing it after <title> or other content in <head> — the browser may have already guessed an encoding and read the title with it; it belongs first.',
      'Writing it as a closed tag, </meta> — it\'s a void element with nothing to close.',
    ],
    example: '<head>\n  <meta charset="utf-8">\n</head>',
    related: ['<head>', 'lang=""', '<meta name="viewport">'],
  },
  {
    tag: 'lang=""',
    category: 'document',
    stats: {
      type: 'attribute, on <html>',
      appliesTo: 'the whole page',
      livesInside: 'the opening <html> tag',
      commonValues: 'en, en-US, es, fr, ja',
    },
    whatItDoes:
      "Declares what language the page's text is written in. Screen readers use it to pick the right pronunciation rules — without it, English text read by a screen reader set to another language can come out with the wrong accent or cadence entirely. Browsers and translation tools (like an auto-translate prompt) also rely on it to know what they're looking at.",
    whereItGoes: 'On the opening <html> tag — it applies to the entire document by default, and any element can override it locally with its own lang if a portion of the page is genuinely in a different language.',
    mistakes: [
      'Leaving it off entirely — it\'s easy to forget since the page still renders and looks completely normal without it; the effects only show up in tools that actually read the attribute.',
      'Using a language name instead of its code — it\'s lang="en", not lang="English".',
    ],
    example: '<html lang="en">\n  ...\n</html>',
    related: ['<html>'],
  },
  {
    tag: '<meta name="viewport">',
    category: 'document',
    stats: {
      type: 'HTML tag, lives in <head>',
      appliesTo: 'how mobile browsers scale the page',
      livesInside: '<head>',
      commonValues: 'content="width=device-width, initial-scale=1"',
    },
    whatItDoes:
      "Without it, mobile browsers render the page at a fake desktop-sized viewport (often 980px wide) and then zoom the whole thing out to fit the screen — tiny, unreadable text, and any @media (max-width: ...) query written for a phone never actually triggers, because the browser never admits the screen is narrow. This tag tells it to use the device's real width instead.",
    whereItGoes: 'Inside <head>, alongside charset and title.',
    mistakes: [
      'Skipping it and then not understanding why responsive CSS media queries never seem to kick in on an actual phone — this tag is what makes a "narrow screen" query true in the first place.',
      'Adding user-scalable=no to block pinch-zoom — this actively hurts accessibility for low-vision users and is rarely worth the tradeoff.',
    ],
    example: '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>',
    related: ['<meta charset="utf-8">'],
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
    whatItDoes: 'Marks a paragraph — the standard block for a chunk of running text. Browsers add space above and below it so paragraphs read as separate thoughts.',
    whereItGoes: 'Anywhere in <body> you have a paragraph of text. It\'s a block element, so it always starts on its own line.',
    mistakes: [
      'Using <br> repeatedly to fake paragraph spacing instead of just starting a new <p> — <p> already has its own spacing, and multiple <br>s is a workaround for not using the right tag.',
      'Nesting a block element like <div>, <ul>, or another <p> inside a <p> — a paragraph can only hold text-level content, and the browser silently closes the first <p> the moment it sees the block, scrambling your structure.',
      'Forgetting to close it before the next <p> opens — browsers recover, but the page outline and any CSS targeting the paragraph get unpredictable.',
    ],
    example: '<p>This is the first paragraph.</p>\n<p>This is the second.</p>',
    related: ['<h1> – <h6>', '<br>', '<abbr>', '<time>', '<blockquote>'],
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
    mistakes: [
      'Using it purely to make text bold for looks — if there\'s no real "this is important" meaning, that\'s a job for CSS (font-weight), not <strong>.',
      'Reaching for <b> instead — <b> is bold with no meaning attached; <strong> is what screen readers can actually convey as important.',
      'Wrapping a whole paragraph in it — if everything is important, nothing is; it\'s for the specific words that carry the weight.',
    ],
    example: 'This step is <strong>required</strong> before continuing.',
    related: ['<em>', '<mark>'],
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
    mistakes: [
      'Using it purely to italicize text with no real emphasis meaning — that\'s a CSS job (font-style), not <em>.',
      'Using it for titles of works, foreign words, or technical terms — those are italic by convention but not emphasized; <i> (or <cite> for titles) is the right tag there.',
      'Mixing it up with <strong> — <em> changes how a sentence is read ("I *really* mean it"); <strong> flags that the content itself matters.',
    ],
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
    whatItDoes: 'Draws a horizontal divider line, marking a thematic break between two chunks of content — a scene change, a new topic, the end of one idea before the next.',
    whereItGoes: 'Between two sections of content, on its own — not inside a sentence.',
    mistakes: [
      'Writing </hr> — like <br>, it has no closing tag.',
      'Using it as a decorative line between every element — it means "the topic changes here," so a page full of them says nothing. A border in CSS is the tool for pure decoration.',
      'Putting it inside a <p> — it\'s a block element, so the browser closes the paragraph around it and you end up with two half-paragraphs.',
    ],
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
    mistakes: [
      'Using it just to make text visually smaller with no "fine print" meaning behind it — that\'s a CSS job.',
      'Wrapping whole paragraphs or sections in it — it\'s inline, meant for a short side note, not a block of secondary content.',
      'Hiding something important in it because it "looks like a footnote" — the tag lowers emphasis; it doesn\'t make text any less binding.',
    ],
    example: '<p>$10/month. <small>Cancel anytime.</small></p>',
    related: ['<p>', '<sub> / <sup>'],
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
    mistakes: [
      'Using it as a general-purpose "yellow background" styling tool unrelated to actually highlighting relevant text.',
      'Confusing it with <strong> — <mark> says "this is relevant to what you were looking for right now"; <strong> says "this matters in general."',
      'Marking up so much of a passage that the highlight stops meaning anything — it works because it\'s rare.',
    ],
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
    mistakes: [
      'Using it just for indentation with no actual quote — that\'s a CSS job, not <blockquote>.',
      'Using it for a short quote inside a sentence — that\'s <q>, which adds the quotation marks for you; <blockquote> is for a passage that stands on its own as a block.',
      'Putting the attribution inside the <blockquote> as if it were part of the quote — the source goes outside it (or in a <cite>), since it isn\'t something the quoted person said.',
    ],
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
    mistakes: [
      'Using <pre> alone for a multi-line block without <code> inside it — it\'ll preserve formatting fine, but loses the "this is code" semantic meaning.',
      'Writing raw < and > inside the code block — the browser reads them as tags. Code that shows HTML needs &lt; and &gt; entities, even inside <pre>.',
      'Indenting the contents of <pre> to match the surrounding HTML — every one of those spaces renders, since <pre> keeps whitespace exactly. The content starts at column one.',
    ],
    example: 'Use the <code>let</code> keyword.\n\n<pre><code>let x = 5;\nconsole.log(x);</code></pre>',
    related: ['<p>', '<kbd>'],
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
    mistakes: [
      'Using <figure> without ever including a <figcaption> — if there\'s no caption, a plain <img> is simpler and just as correct.',
      'Putting <figcaption> somewhere other than first or last inside the <figure> — it has to be one or the other, not sandwiched between two images.',
      'Repeating the alt text as the caption — alt describes what\'s in the image for someone who can\'t see it; the caption adds context for someone who can. They do different jobs.',
    ],
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
    whatItDoes: 'A bulleted (unordered) list — used when the order of items doesn\'t matter. Shopping lists, feature lists, navigation menus: anything that is a set of things, not a sequence.',
    whereItGoes: 'Wrapping each <li> item. Every direct child of <ul> should be an <li> — nothing else goes straight inside it.',
    mistakes: [
      'Putting text or other tags directly inside <ul> instead of wrapping each item in its own <li>.',
      'Nesting a sub-list as a sibling of the <li> items instead of inside one — a nested <ul> goes inside the <li> it belongs to, after that item\'s text.',
      'Using a list for things that aren\'t a list, just to get bullets or indentation — a nav menu is a list; a decorative arrow before a heading is CSS.',
    ],
    example: '<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>',
    related: ['<ol> / <li>', '<dl> / <dt> / <dd>'],
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
    mistakes: [
      'Using <ol> when order doesn\'t actually matter (that\'s what <ul> is for), or vice versa.',
      'Typing the numbers into the items yourself ("1. Preheat…") — the browser numbers an <ol> for you, so you end up with "1. 1. Preheat".',
      'Breaking one list into several <ol>s with text in between — the numbering restarts at 1 each time. Keep it one list, or use the start attribute to continue the count.',
    ],
    example: '<ol>\n  <li>Preheat the oven.</li>\n  <li>Mix the batter.</li>\n</ol>',
    related: ['<ul> / <li>', '<dl> / <dt> / <dd>'],
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
    related: ['<th scope="">', '<thead> / <tbody>'],
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
    mistakes: [
      'Using an <a> tag styled to look like a button when the action isn\'t actually navigation — a real action belongs on a real <button>.',
      'Forgetting that inside a <form> it submits by default — a "cancel" or "show more" button needs type="button", or every click sends the form.',
      'Making it icon-only with no text — a screen reader announces an empty button. Give it visible text or an aria-label.',
    ],
    example: '<button>Click me</button>',
    related: ['<form>', 'aria-label=""'],
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
    whatItDoes: 'A box the user can type into or interact with. The type attribute changes its whole behavior — text, email, checkbox, radio, date, and more all use the same tag. Its name attribute is what actually labels the value when the form submits — a field with no name is invisible to whatever receives the submission, even though it displays and works fine on screen.',
    whereItGoes: 'Inside a <form>, usually paired with a <label>.',
    mistakes: [
      'Writing </input> — there\'s nothing to close.',
      'Leaving off type entirely — it defaults to a plain text box, which may not be what\'s intended.',
      'Skipping a paired <label> — makes the field much harder to use for screen reader users and anyone clicking to focus it.',
      'Forgetting name — the field still renders and the user can still type into it, but its value is silently dropped from the submitted data since there\'s no key to attach it to.',
    ],
    example: '<label for="email">Email</label>\n<input type="email" id="email" name="email">',
    related: ['<label>', '<form>', '<textarea>', 'checked / required / disabled', '<input type="">'],
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
    mistakes: [
      'Leaving out the for/id link entirely — the label then just looks right but doesn\'t actually connect to the field for clicking or screen readers.',
      'Pointing for at the input\'s name instead of its id — the link is strictly for → id; name is for form submission and the browser won\'t connect them.',
      'Using placeholder text as the only label — it disappears the moment you start typing, and screen readers don\'t treat it as a label.',
    ],
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
    whatItDoes: 'A dropdown menu. Each <option> inside it is one choice the user can pick, and the chosen option\'s value is what gets submitted with the form.',
    whereItGoes: 'Inside a <form>, wrapping each available <option>.',
    mistakes: [
      'Putting anything other than <option> (or <optgroup>) directly inside <select>.',
      'Forgetting the name attribute on the <select> — just like <input>, without it the chosen value is never submitted.',
      'Leaving out value on each <option> — then the submitted value is the visible text, which breaks the moment you reword a choice.',
    ],
    example: '<select name="color">\n  <option value="red">Red</option>\n  <option value="blue">Blue</option>\n</select>',
    related: ['<form>', '<input>'],
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
    whatItDoes: 'Groups form controls together so they can all be submitted at once as a single request. action says where that request goes; method says how — get appends the data to the URL (fine for a search box, wrong for a password), post sends it in the request body instead, which is what most real forms want.',
    whereItGoes: 'Wrapping every <input>, <label>, <select>, and <button> that belong to that one submission.',
    mistakes: [
      'Scattering inputs outside of any <form> — they\'ll render fine but won\'t submit anywhere as a group.',
      'Leaving off action — the form then submits back to the current page\'s own URL, which is sometimes intentional but often just forgotten.',
      'Using the default method (get) for a form that submits sensitive data — a get submission puts every field\'s value directly in the URL, visible in browser history and server logs.',
    ],
    example: '<form action="/submit" method="post">\n  <input type="text" name="query">\n  <button>Submit</button>\n</form>',
    related: ['<input>', '<button>', '<label>', '<fieldset> / <legend>', '<select> / <option>'],
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
    mistakes: [
      'Putting sensitive information in a comment — it\'s still visible to anyone who views the page source.',
      'Writing -- inside the comment text — a double hyphen can end the comment early in some parsers, and it\'s invalid in all of them.',
      'Leaving large blocks of dead code "commented out" in production — it still downloads with the page and confuses the next person. Delete it; version control remembers.',
    ],
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
    mistakes: [
      'Loading it too early in <head> for a script that needs the page\'s elements to already exist — it\'ll run before those elements are there.',
      'Writing it as a self-closing tag, <script src="app.js" />, — it isn\'t a void element. Without an explicit </script>, the browser treats everything after it as script.',
      'Putting code inside a <script> that also has a src — the inline code is ignored; it\'s one or the other.',
    ],
    example: '<script src="app.js"></script>',
    related: ['<style>', '<link rel="stylesheet">', '<!-- comment -->'],
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
    whatItDoes: 'Connects an external CSS file to the page so its styles apply. Keeping styles in their own file means one stylesheet can dress every page on the site.',
    whereItGoes: 'Inside <head>. rel="stylesheet" and href="path/to/file.css" are both required.',
    mistakes: [
      'Writing </link> — like other void elements, there\'s nothing to close.',
      'Confusing it with <a> — <link> never makes anything clickable. It connects resources (stylesheets, icons) to the document; <a> is the hyperlink.',
      'Getting the path wrong — the browser fails silently, so an unstyled page with no error message almost always means the href doesn\'t resolve.',
    ],
    example: '<link rel="stylesheet" href="style.css">',
    related: ['<head>', '<style>'],
  },
  {
    tag: '<style>',
    category: 'other',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<head>',
      typicallyHolds: 'CSS rules — selectors and declaration blocks',
    },
    whatItDoes:
      'A block of CSS written straight into the HTML page. Everything between <style> and </style> is read as CSS, not HTML, so a rule like h1 { color: teal; } works exactly as it would in a separate .css file. It is the quickest way to style a single page, and the reason most practice exercises here start with one.',
    whereItGoes:
      'Inside <head>, before the content it styles. A stylesheet file linked with <link rel="stylesheet"> is the better home once styles are shared across pages; <style> is for one-page or one-off rules.',
    mistakes: [
      'Writing HTML tags inside it — <style> switches the browser into CSS mode, so <h1> inside it is a syntax error. Select the element with a plain h1 selector instead.',
      'Forgetting the closing </style> — the browser keeps treating everything after it as CSS, so the rest of the page simply vanishes.',
      'Mixing it up with the style="" attribute — <style> is a block of rules in <head>; style="color: red" is a single inline declaration on one element. Inline wins over the block, which is usually not what you want.',
    ],
    example: '<head>\n  <style>\n    h1 { color: teal; }\n    p { line-height: 1.6; }\n  </style>\n</head>',
    related: ['<link rel="stylesheet">', '<head>', '<script>', 'style=""'],
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
    related: ['<script>', '<details> / <summary>'],
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
    related: ['<video>', '<a href="">', '<img src="" alt="">'],
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
    related: ['<audio>', '<iframe>'],
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
      'Setting autoplay — browsers block audio that starts on its own without a user interaction, so it won\'t play, and where it does it\'s an unwelcome surprise.',
      'Offering only one format — not every browser plays every codec. Nested <source> tags with an mp3 and an ogg cover nearly everyone.',
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
    related: ['aria-label=""', '<img src="" alt="">'],
  },
  {
    tag: '<details> / <summary>',
    category: 'grouping',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'a <summary> first, then the content it reveals',
    },
    whatItDoes:
      'A built-in collapsible section — click the <summary> and the rest of the <details> shows or hides. No JavaScript, no CSS, and keyboard and screen-reader support come free. It\'s the right tool for an FAQ item, a "show more," or a spoiler.',
    whereItGoes:
      'Anywhere a chunk of content should be hidden until asked for. <summary> must be the very first child — it\'s the always-visible clickable heading — and everything after it is the hidden part.',
    mistakes: [
      'Rebuilding this with <div>s and a click handler — a hand-made version has to recreate the keyboard support, the focus handling, and the open/closed state that <details> already gives you.',
      'Putting <summary> anywhere but first — if it isn\'t the first child, the browser invents a default "Details" label and your summary renders as hidden content instead.',
      'Using it for content that should be visible by default — add the open attribute (<details open>) if it should start expanded; don\'t hide the thing most visitors came for.',
    ],
    example: '<details>\n  <summary>Does this work offline?</summary>\n  <p>Yes — everything runs in the browser.</p>\n</details>',
    related: ['<template>', '<div>'],
  },
  {
    tag: '<fieldset> / <legend>',
    category: 'forms',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<form>',
      typicallyHolds: 'a <legend>, then a group of related fields',
    },
    whatItDoes:
      'Groups related form controls under one shared title. <legend> is that title. A screen reader reads the legend before each field inside the group, so "Small" becomes "Size: Small" — which is exactly what a set of radio buttons needs to make sense.',
    whereItGoes:
      'Inside a <form>, wrapped around any set of fields that belong together — a group of radio buttons, a shipping address block, a "notification preferences" cluster. <legend> goes first, as its first child.',
    mistakes: [
      'Grouping radio buttons with nothing but a nearby heading — a heading isn\'t attached to the fields. Only <legend> inside <fieldset> gets announced with each option.',
      'Putting <legend> somewhere other than first inside the <fieldset> — it only works as the first child.',
      'Wrapping an entire form in one <fieldset> — it\'s for a subgroup; one giant group adds a border and a label but no useful structure.',
    ],
    example: '<fieldset>\n  <legend>Size</legend>\n  <input type="radio" name="size" id="s"> <label for="s">Small</label>\n  <input type="radio" name="size" id="m"> <label for="m">Medium</label>\n</fieldset>',
    related: ['<form>', '<input>', '<label>'],
  },
  {
    tag: '<textarea>',
    category: 'forms',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: '<form>',
      typicallyHolds: 'the default text, if any (usually empty)',
    },
    whatItDoes:
      'A multi-line text box — for a message, a comment, a bio, anything longer than a single line. It\'s the <input type="text"> of paragraphs, with a resize handle the visitor can drag.',
    whereItGoes:
      'Inside a <form>, paired with a <label> like any other field. rows sets how many lines tall it starts; the visitor can usually drag it bigger.',
    mistakes: [
      'Writing it like <input> with a value attribute — a <textarea> has no value attribute. Its starting text goes between the opening and closing tags.',
      'Writing it self-closed, <textarea /> — it needs a real closing tag, and without one the browser swallows the rest of the page into the box.',
      'Forgetting name — same as <input>: without it, whatever the visitor types is never submitted.',
    ],
    example: '<label for="msg">Message</label>\n<textarea id="msg" name="message" rows="4"></textarea>',
    related: ['<input>', '<label>', '<form>'],
  },
  {
    tag: 'checked / required / disabled',
    category: 'forms',
    stats: {
      type: 'boolean attributes',
      appliesTo: 'form controls — <input>, <select>, <textarea>, <button>',
      livesInside: 'the opening tag',
      commonValues: 'just the bare word — no ="…" needed',
    },
    whatItDoes:
      'A family of attributes that are on/off switches rather than values. Just being present turns them on: checked starts a checkbox or radio ticked, required blocks the form from submitting while the field is empty, disabled greys the control out and leaves it out of the submission entirely.',
    whereItGoes: 'On the control\'s opening tag, as the bare word — <input type="checkbox" checked>. No equals sign, no quotes.',
    mistakes: [
      'Writing checked="false" to turn it off — the browser only looks at whether the attribute exists, not what it says, so checked="false" is still checked. To turn it off, remove the attribute.',
      'Using disabled on a field you still want submitted — disabled fields are dropped from the form data. readonly keeps the value and still submits it.',
      'Relying on required alone for validation — it\'s a helpful first check in the browser, but anything that matters still has to be checked again wherever the form is received.',
    ],
    example: '<input type="checkbox" name="agree" required>\n<input type="radio" name="plan" value="pro" checked>\n<button disabled>Saving…</button>',
    related: ['<input>', '<button>', '<form>'],
  },
  {
    tag: '<picture> / <source>',
    category: 'links & media',
    stats: {
      closingTag: '<picture> required; <source> is void',
      voidElement: '<source> only',
      livesInside: 'anywhere in <body>',
      typicallyHolds: 'one or more <source> tags, then one fallback <img>',
    },
    whatItDoes:
      'Lets the browser choose between several versions of an image — a small file for phones, a wide crop for desktops, a modern format for browsers that support it. Each <source> is one option with a condition; the <img> at the end is both the fallback and the thing that actually renders.',
    whereItGoes:
      'Wrapped around an <img>. The <source> tags come first, in order of preference — the browser takes the first one whose media condition or format it can use — and the <img> comes last.',
    mistakes: [
      'Leaving out the <img> — <picture> renders nothing on its own. The <img> is what displays; <source> tags only tell it which file to use.',
      'Putting the <img> before the <source> tags — once the browser hits the <img> it stops looking, so anything after it is ignored.',
      'Forgetting that alt lives on the <img>, not on <picture> or <source> — the description belongs to the image that renders.',
    ],
    example: '<picture>\n  <source srcset="photo-small.jpg" media="(max-width: 600px)">\n  <img src="photo-large.jpg" alt="A mountain view">\n</picture>',
    related: ['<img src="" alt="">', '<figure> / <figcaption>'],
  },
  {
    tag: '<th scope="">',
    category: 'layout',
    stats: {
      closingTag: 'required',
      voidElement: 'no',
      livesInside: 'a <tr>',
      typicallyHolds: 'a short header label',
    },
    whatItDoes:
      'A header cell. It looks like a bold, centered <td>, but its job is to say what the cells in its column (or row) mean. scope makes that explicit: scope="col" heads the column below it, scope="row" heads the row beside it — and a screen reader then reads "Age: 30" instead of just "30". colspan and rowspan let any cell stretch across several columns or rows.',
    whereItGoes:
      'In the first row for column headers, or as the first cell of a row for row headers. Inside a <tr> like any cell — <th> and <td> can mix in the same row.',
    mistakes: [
      'Using <td> with bold text for headers — it looks the same but tells assistive tech nothing about which data each header describes.',
      'Leaving off scope on a table that has both column and row headers — the browser has to guess which direction each <th> applies to, and often guesses wrong.',
      'Setting colspan to a number that doesn\'t match the real column count — the row ends up wider or narrower than the others and the grid falls out of alignment.',
    ],
    example: '<tr>\n  <th scope="col">Item</th>\n  <th scope="col">Price</th>\n</tr>\n<tr>\n  <td colspan="2">Total: $12</td>\n</tr>',
    related: ['<table> / <tr> / <td>', '<thead> / <tbody>'],
  },
  {
    tag: '<thead> / <tbody>',
    category: 'layout',
    stats: {
      closingTag: 'required (both)',
      voidElement: 'no',
      livesInside: '<table>',
      typicallyHolds: '<tr> rows',
    },
    whatItDoes:
      'Splits a table into its header rows and its data rows. The browser already infers this split for simple tables, but naming it lets a long table keep its header visible while the body scrolls, lets CSS style the two parts separately, and lets a <tfoot> hold a totals row that prints on every page.',
    whereItGoes:
      'Directly inside <table>: <thead> holding the header <tr>(s), then <tbody> holding everything else. An optional <tfoot> can hold a summary row.',
    mistakes: [
      'Putting rows directly in <table> alongside a <tbody> — the browser wraps the stray rows in their own implied <tbody>, so you silently end up with two bodies.',
      'Using <thead> for the table\'s title — the header section is for column labels. A title goes in a <caption>, right after the opening <table> tag.',
      'Forgetting these exist and then fighting CSS to make the header row look different — <thead> gives you a selector for exactly that.',
    ],
    example: '<table>\n  <thead>\n    <tr><th scope="col">Name</th><th scope="col">Age</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Ann</td><td>30</td></tr>\n  </tbody>\n</table>',
    related: ['<table> / <tr> / <td>', '<th scope="">'],
  },
  {
    tag: 'aria-label=""',
    category: 'other',
    stats: {
      type: 'attribute',
      appliesTo: 'any element that needs a spoken name it doesn\'t already have',
      livesInside: 'the opening tag',
      commonValues: 'a short phrase: "Close", "Search", "Main navigation"',
    },
    whatItDoes:
      'Gives an element a name that a screen reader will read out, in place of its visible content. An icon-only button is announced as just "button" — aria-label="Close" makes it "Close, button." Its sibling role tells assistive tech what kind of thing an element is when the tag alone doesn\'t say (role="img" on an <svg>, role="presentation" on a layout table).',
    whereItGoes:
      'On the element that needs the name — the <button> with only an icon in it, the <nav> among several navs, the <svg> that carries meaning. It replaces the visible text as the name, so it isn\'t needed where there\'s already real text.',
    mistakes: [
      'Adding it to an element that already has visible text — the label replaces that text for screen readers, so a mismatch ("Submit" on screen, aria-label="Go") is confusing rather than helpful.',
      'Using it on a <div> or <span> to make it "accessible" — those have no role to attach the name to, so most screen readers ignore the label. Use a real <button>, <a>, or add a role.',
      'Reaching for aria-* when a native attribute already does the job — alt on an image and <label> on a field do the same work with less to maintain.',
    ],
    example: '<button aria-label="Close">✕</button>\n<nav aria-label="Main">…</nav>',
    related: ['<button>', '<svg>', '<nav>'],
  },
  {
    tag: 'data-*=""',
    category: 'grouping',
    stats: {
      type: 'attribute (any name starting with data-)',
      appliesTo: 'any element',
      livesInside: 'the opening tag',
      commonValues: 'data-id="42", data-state="open", data-color="red"',
    },
    whatItDoes:
      'Attaches your own custom information to an element without inventing attributes HTML doesn\'t know about. Anything starting with data- is valid, ignored by the browser\'s rendering, and readable from JavaScript (element.dataset.state) and CSS ([data-state="open"]). It\'s how a page remembers which item is which.',
    whereItGoes:
      'On whichever element the information describes — a data-id on a list item, a data-state on a toggle, a data-track on a button.',
    mistakes: [
      'Using it for content that should be visible — data-* is for machine-readable facts about an element, not a place to hide text the visitor needs.',
      'Skipping the data- prefix (<li id="42" state="open">) — unknown attributes still work in most browsers, but they\'re invalid, and a future HTML attribute with the same name will silently change the meaning.',
      'Stuffing a whole JSON object into one — it works, but a few small, clearly-named attributes are easier to read and to target from CSS.',
    ],
    example: '<li data-id="42" data-state="done">Buy milk</li>',
    related: ['class=""', 'id=""'],
  },
  {
    tag: "<section> / <article>",
    category: "layout",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "<body>, usually inside <main>",
      typicallyHolds: "a heading plus the content that belongs under it",
    },
    whatItDoes:
      "The two workhorse grouping tags for page structure. <section> is a thematic chunk of a page that would make sense with its own heading \u2014 Features, Pricing, About. <article> is a self-contained piece that would still make sense lifted out and published on its own \u2014 a blog post, a news story, a product card, a comment. Both are block boxes that look exactly like <div> until you style them; the difference is the meaning they carry for screen readers, search engines, and the next person reading your code.",
    whereItGoes:
      "Inside <main> (or inside each other \u2014 an <article> can hold <section>s, and a <section> can list <article>s). Each one should start with a heading (<h2> or lower); if you can't think of a heading for it, it's probably a <div>, not a <section>.",
    mistakes: [
      "Using <section> as a generic wrapper for styling \u2014 if it has no heading and no theme of its own, it's a <div>. Sectioning tags without headings confuse outline tools and screen readers.",
      "Picking <article> for anything 'important' \u2014 the test is 'would this still make sense on its own page?'. A pricing block wouldn't; a blog post or a product card would.",
      "Nesting a new <h1> inside every section \u2014 keep one <h1> per page and use <h2>/<h3> inside sections so the heading levels still describe the structure.",
    ],
    example: "<main>\n  <section>\n    <h2>Latest posts</h2>\n    <article>\n      <h3>Why I switched to Linux</h3>\n      <p>It started with a broken update...</p>\n    </article>\n  </section>\n</main>",
    related: ["<main>", "<div>", "<h1> \u2013 <h6>", "<aside>"],
  },
  {
    tag: "<aside>",
    category: "layout",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "<body> or <main>, beside the main content",
      typicallyHolds: "related links, a sidebar, a pull quote, an ad",
    },
    whatItDoes:
      "Content that is related to what's around it but not part of the main flow \u2014 a sidebar of related links, an author bio next to an article, a 'did you know' box, a pull quote. Screen readers announce it as complementary content, which lets a listener skip it to get to the point. Visually it's just a block box; the sidebar look comes from your CSS, not from the tag.",
    whereItGoes:
      "Inside <main> when it relates to the page's content, or directly in <body> as a site-wide sidebar. Rarely more than one or two per page \u2014 if everything is an aside, nothing is.",
    mistakes: [
      "Using it for the main navigation \u2014 that's <nav>. An <aside> is for content that's tangential, not for the way around the site.",
      "Assuming it floats to the side on its own \u2014 <aside> says nothing about layout. It stacks like any block until flexbox or grid puts it beside the main column.",
      "Putting the most important content in it because it 'looks like a sidebar' in the design \u2014 if the page wouldn't make sense without it, it belongs in <main>, not <aside>.",
    ],
    example: "<main>\n  <article>\n    <h1>Baking sourdough</h1>\n    <p>...</p>\n  </article>\n  <aside>\n    <h2>Related</h2>\n    <ul><li><a href=\"/starter\">Keeping a starter alive</a></li></ul>\n  </aside>\n</main>",
    related: ["<section> / <article>", "<nav>", "<main>"],
  },
  {
    tag: "<address>",
    category: "layout",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "usually <footer>, or inside an <article>",
      typicallyHolds: "contact details for the page or article author",
    },
    whatItDoes:
      "Marks contact information for the nearest <article> or, in a <footer>, for the whole page \u2014 an email link, a street address, a phone number, a social handle. Browsers render it in italics by default, which you'll usually reset. The win is semantic: machines and assistive tech can find 'how to contact the author' without guessing.",
    whereItGoes:
      "In the site <footer> for the organisation's contact details, or inside an <article> for that article's author. Not for every street address on the page \u2014 a venue's address in the body text is just a <p>.",
    mistakes: [
      "Wrapping any postal address in it \u2014 it means 'contact info for this content's author', not 'this text is an address'. A list of store locations is ordinary content.",
      "Putting headings or whole sections inside it \u2014 it holds contact lines only, typically <a href=\"mailto:\">, <a href=\"tel:\">, and line breaks.",
      "Forgetting to reset the italic default with font-style: normal when it clashes with the design.",
    ],
    example: "<footer>\n  <address>\n    Questions? <a href=\"mailto:hi@tagsmiths.com\">hi@tagsmiths.com</a><br>\n    Tagsmiths, 12 Forge Lane\n  </address>\n</footer>",
    related: ["<footer>", "<a href=\"\">", "<section> / <article>"],
  },
  {
    tag: "<input type=\"\">",
    category: "forms",
    stats: {
      closingTag: "none \u2014 void element",
      voidElement: "yes",
      livesInside: "<form>, next to its <label>",
      typicallyHolds: "n/a (self-contained)",
    },
    whatItDoes:
      "One tag, many controls. The type attribute decides what an <input> actually is: text (the default), email, password, number, tel, url, search, date, checkbox, radio, file, range, color, hidden, and submit. The type changes the keyboard a phone shows, the built-in validation the browser runs, and how the control looks. Picking the right type is free user experience: type=\"email\" gets the @ key on mobile and rejects 'bob' before the form ever submits.",
    whereItGoes:
      "On every <input>, even though text is the default \u2014 being explicit makes the form easier to read. Pair with a <label> whose for matches the input's id; checkbox and radio inputs also want the label's text so the user has something to click.",
    mistakes: [
      "Using type=\"text\" for everything \u2014 you lose the mobile keyboard switch, the free validation, and the native date/colour pickers.",
      "Using type=\"number\" for things that aren't quantities (phone numbers, zip codes, card numbers) \u2014 it strips leading zeros and shows a spinner. Use type=\"tel\" or text with inputmode=\"numeric\".",
      "Giving radio buttons in one group different name values \u2014 the browser only treats inputs with the same name as one group, so they stop being mutually exclusive.",
    ],
    example: "<label for=\"e\">Email</label>\n<input type=\"email\" id=\"e\" name=\"email\" required>\n\n<label><input type=\"checkbox\" name=\"tos\"> I agree</label>\n\n<input type=\"radio\" name=\"size\" value=\"s\" id=\"s\"> <label for=\"s\">Small</label>\n<input type=\"radio\" name=\"size\" value=\"l\" id=\"l\"> <label for=\"l\">Large</label>",
    related: ["<input>", "<label>", "checked / required / disabled", "<form>"],
  },
  {
    tag: "style=\"\"",
    category: "grouping",
    stats: {
      closingTag: "n/a \u2014 attribute",
      voidElement: "n/a",
      livesInside: "any tag",
      typicallyHolds: "CSS declarations, separated by semicolons",
    },
    whatItDoes:
      "An inline style: CSS written directly on one element. style=\"color: red; margin-top: 8px\" applies those two declarations to that element and nothing else. It's the quickest way to test an idea and the worst way to style a site \u2014 the rules can't be reused, can't respond to :hover or a media query, and outrank nearly everything in your stylesheet, so they're hard to override later.",
    whereItGoes:
      "On a single element, in the opening tag, as a last resort: quick experiments, one-off values that genuinely come from data (a chart bar's width, a user-chosen colour), or emails where stylesheets get stripped. Everything else belongs in a <style> block or a .css file.",
    mistakes: [
      "Writing HTML-style attributes inside it \u2014 style=\"color=red\" does nothing. Inside the quotes it's CSS: property, colon, value, semicolon.",
      "Using it to fix a layout problem on one element and then wondering why the .css rule for it stops working \u2014 inline beats class and id selectors. Only !important beats inline.",
      "Trying to put :hover or @media in it \u2014 pseudo-classes and media queries can't live inline. The moment you need them, move the rule to a stylesheet.",
    ],
    example: "<p style=\"color: crimson; font-weight: bold;\">Sold out</p>\n\n<!-- same thing, the reusable way -->\n<p class=\"warning\">Sold out</p>",
    related: ["class=\"\"", "id=\"\"", "<style>"],
  },
  {
    tag: "<dl> / <dt> / <dd>",
    category: "lists",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "<body>, like any list",
      typicallyHolds: "<dt> terms, each followed by one or more <dd> descriptions",
    },
    whatItDoes:
      "A description list: pairs of a term (<dt>) and its description (<dd>). It's the right list for a glossary, an FAQ, product specs (Weight: 1.2 kg), or metadata (Author: ..., Published: ...). Where <ul> says 'these are items' and <ol> says 'in this order', <dl> says 'this goes with that'. Browsers indent the <dd> a little by default.",
    whereItGoes:
      "Wrapping alternating <dt> and <dd> elements. One <dt> can have several <dd>s (a word with two meanings), and several <dt>s can share one <dd> (synonyms). You may wrap each pair in a <div> for styling.",
    mistakes: [
      "Using it for layout because the indent looks nice \u2014 if the items aren't term/description pairs, it's the wrong list.",
      "Putting <li> inside it \u2014 <dl> holds <dt> and <dd> only. <li> belongs to <ul> and <ol>.",
      "Reaching for a <table> for simple key/value specs \u2014 two-column data with no real rows to compare is a <dl>; <table> is for data that needs rows and columns.",
    ],
    example: "<dl>\n  <dt>HTML</dt>\n  <dd>The structure of a page: what things are.</dd>\n  <dt>CSS</dt>\n  <dd>The look of a page: how things appear.</dd>\n</dl>",
    related: ["<ul> / <li>", "<ol> / <li>", "<table> / <tr> / <td>"],
  },
  {
    tag: "<sub> / <sup>",
    category: "text",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "inline, inside running text",
      typicallyHolds: "a character or two",
    },
    whatItDoes:
      "Subscript and superscript. <sub> drops text below the baseline and shrinks it (H<sub>2</sub>O, CO<sub>2</sub>); <sup> raises it (x<sup>2</sup>, 1<sup>st</sup>, a footnote marker<sup>3</sup>). They're meaning tags for typographical conventions, so chemistry, maths and footnotes read correctly even without CSS.",
    whereItGoes:
      "Inline, around just the characters that go up or down. Keep them short \u2014 a word, a number, a symbol.",
    mistakes: [
      "Using them to make text small \u2014 that's <small> or CSS font-size. <sub>/<sup> also shift the baseline, which looks wrong on ordinary text.",
      "Wrapping a whole sentence or paragraph in them \u2014 they're for a few characters inside a line.",
      "Letting them push the line taller \u2014 browsers often bump line-height around a <sup>; a line-height: 0 or position: relative tweak in CSS fixes the jitter.",
    ],
    example: "<p>Water is H<sub>2</sub>O. The area of a square is x<sup>2</sup>.<sup><a href=\"#note1\">1</a></sup></p>",
    related: ["<small>", "<code> / <pre>", "<p>"],
  },
  {
    tag: "<abbr>",
    category: "text",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "inline, inside running text",
      typicallyHolds: "an abbreviation or acronym",
    },
    whatItDoes:
      "Marks an abbreviation or acronym and, through its title attribute, spells it out: <abbr title=\"Cascading Style Sheets\">CSS</abbr>. Hovering shows the expansion as a tooltip, and assistive tech can read it out. Browsers draw a dotted underline by default as a hint that there's more to see.",
    whereItGoes:
      "Inline, around the abbreviation itself, with title holding the full form. Convention: expand it on first use in the page, either with <abbr> or in plain text, then use the short form freely.",
    mistakes: [
      "Leaving off title \u2014 then the tag adds nothing the reader can use.",
      "Wrapping every occurrence on the page \u2014 once per page (the first) is enough; a dotted underline on every 'HTML' is noise.",
      "Relying on the tooltip for essential information \u2014 touch screens have no hover. If the expansion matters, write it in the text as well.",
    ],
    example: "<p>Pages are built with <abbr title=\"HyperText Markup Language\">HTML</abbr> and styled with <abbr title=\"Cascading Style Sheets\">CSS</abbr>.</p>",
    related: ["<em>", "<strong>", "<p>"],
  },
  {
    tag: "<time>",
    category: "text",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "inline, inside running text",
      typicallyHolds: "a human-readable date or time",
    },
    whatItDoes:
      "Marks a date, time, or duration and gives machines the exact value through datetime. The visible text can be friendly ('last Tuesday', 'March 3rd'); datetime carries the unambiguous ISO form (2026-03-03, 14:30, PT2H). Search engines use it for event dates and article publish dates, and scripts can read it without parsing prose.",
    whereItGoes:
      "Inline, around the date as the reader sees it, with datetime in a machine format: YYYY-MM-DD for dates, HH:MM for times, YYYY-MM-DDTHH:MM for both, P\u2026T\u2026 for durations.",
    mistakes: [
      "Skipping datetime when the visible text isn't already machine-readable \u2014 'next Friday' inside <time> with no datetime helps no one.",
      "Writing datetime in a local format like 03/04/2026 \u2014 it must be ISO order (year-month-day) or browsers and crawlers ignore it.",
      "Using it for anything time-flavoured, like 'a long time ago' \u2014 it's for a specific point or span that can be written as a datetime.",
    ],
    example: "<p>Published <time datetime=\"2026-03-03\">March 3rd</time>. Doors open at <time datetime=\"19:30\">7:30 pm</time>.</p>",
    related: ["<p>", "<small>", "<abbr>"],
  },
  {
    tag: "<kbd>",
    category: "text",
    stats: {
      closingTag: "required",
      voidElement: "no",
      livesInside: "inline, inside running text",
      typicallyHolds: "a key name or short typed input",
    },
    whatItDoes:
      "Marks keyboard input: a key the reader should press or text they should type. Press <kbd>Ctrl</kbd> + <kbd>S</kbd>. It's the cousin of <code> \u2014 <code> is for code the computer runs, <kbd> is for what the human types. Browsers render it in a monospace font; a border and a little shadow in CSS makes it look like a keycap.",
    whereItGoes:
      "Inline, around each key name or the typed text. Nest a <kbd> per key inside an outer <kbd> for a combination if you want to style keys and the whole shortcut differently.",
    mistakes: [
      "Using <code> for keys and shortcuts \u2014 it reads as source code to assistive tech, and the keycap styling has nowhere to attach.",
      "Writing the + inside the <kbd> \u2014 'Ctrl + S' as one chunk means you can't style the keys as keys. Put each key in its own <kbd>.",
      "Marking up program output with it \u2014 what the computer prints back is <samp>, not <kbd>.",
    ],
    example: "<p>Save with <kbd>Ctrl</kbd> + <kbd>S</kbd>, or type <kbd>:wq</kbd> and press <kbd>Enter</kbd>.</p>",
    related: ["<code> / <pre>", "<p>"],
  },
];

export function getNestEntry(tag: string): NestEntry | undefined {
  return NEST.find((e) => e.tag === tag);
}
