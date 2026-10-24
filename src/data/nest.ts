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
      "<main> wraps the one part of the page that this page is about. Not the top bar, not the menu, not the bottom. The article, the product, the form. Every page has exactly one.",
    whereItGoes:
      "Inside <body>. Open it after <header> and <nav> if you have them, and close it before <footer>. It never wraps <head>, and it never wraps the header, nav or footer.",
    mistakes: [
      "Putting <header> or <footer> inside <main>. They sit next to it, not inside it.",
      "Using more than one <main> on a page. There is only ever one.",
      "Opening <main> before <body> starts. It belongs inside <body> like all visible content.",
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
      "A plain box with no meaning and no look of its own. No bold, no border, no space. It exists so you can group a chunk of the page and give that group a name with class or id. Then CSS can style the group.",
    whereItGoes:
      "Anywhere you want to treat several tags as one thing. It is a block, so it starts on its own line and stretches across the page. You will not see any of that until you add CSS.",
    mistakes: [
      "Writing the attribute after the tag, like <div> class=\"x\">. It goes inside the brackets: <div class=\"x\">.",
      "Expecting a <div> to look like something on its own. It will not, until you style it.",
      "Using <div> where a named tag fits. If the box is the main content, the header or the menu, use <main>, <header> or <nav>. Then the structure means something.",
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
      "The small version of <div>. Same idea: no meaning, no look, just a way to group something and name it. <span> is for a few words inside a line of text, not a whole block.",
    whereItGoes:
      "Around a few words in the middle of a sentence, inside a <p>, an <li>, anywhere text lives. It never starts a new line.",
    mistakes: [
      "Using <span> around a whole paragraph or section. That is a job for <div>.",
      "Expecting it to change how the words look. It will not, until you add a class and style it.",
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
      "A name you give a tag, so CSS can find it later. The same class name can go on as many tags as you like. That is the point: style it once, and every tag with that class changes.",
    whereItGoes:
      "Inside the tag's own opening brackets, right after the tag name: <div class=\"card\">. Never as loose text after the tag.",
    mistakes: [
      "Writing <div> class=\"card\">. The attribute has to come before the closing >, not after it.",
      "Leaving off the quotes: class=card. Browsers often forgive it. It is still not correct HTML.",
      "Using class for something there is only one of. That is what id is for.",
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
      "A name for exactly one tag on the page. Unlike class, an id must never be used twice. It points at one specific thing: a spot a link can jump to, or a tag that JavaScript needs to find.",
    whereItGoes:
      "Same place as class: inside the tag's opening brackets, like <h1 id=\"main-title\">.",
    mistakes: [
      "Using the same id on two tags. That breaks anything (CSS, JavaScript, links) that expects it to be unique.",
      "Writing the attribute in the closing tag, like </h1 id=\"main-title\">. Closing tags never carry attributes. It is just </h1>.",
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
      "<header> wraps the intro at the top of a page: the logo, the site name, the main heading. A section or an article can have its own <header> too.",
    whereItGoes:
      "At the start of <body>, before <main>. It sits next to <main>, <nav> and <footer>, not inside them.",
    mistakes: [
      "Mixing it up with <head>. They are different tags. <head> is invisible information about the page. <header> is content people see.",
      "Putting it inside <main>. It usually sits beside <main>, not inside it.",
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
      "<nav> wraps a set of links for getting around: a menu bar, a sidebar of links, a breadcrumb trail. A screen reader (software that reads the page aloud) announces it as navigation. A listener can jump straight to it.",
    whereItGoes:
      "Usually inside or right after <header>, near the top of <body>. Not every group of links needs <nav>. Save it for the real site menu or a section's menu.",
    mistakes: [
      "Wrapping every link on the page in <nav>. It is for a menu, not for links in general.",
      "Forgetting that the links inside still need real href values to go anywhere.",
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
      "<footer> wraps the bottom of a page: a copyright line, contact details, small links. It is for the things that are not the point of the page. A section or article can have its own <footer> too.",
    whereItGoes:
      "Right before </body>, next to <header> and <main>. Not inside <main>.",
    mistakes: [
      "Putting it inside <main>. The footer is not main content, so it sits outside.",
      "Thinking it is only for the bottom of the whole page. A <footer> inside an <article> can hold that article's author and date.",
      "Burying important content in it because it is \"at the bottom.\" If visitors need it to use the page, it belongs in <main>.",
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
    whatItDoes:
      "<a> makes something clickable and sends the visitor somewhere else. href is the address it goes to: another page, another site, or a spot on this page. Example: <a href=\"https://example.com\">Visit</a>.",
    whereItGoes:
      "Around whatever should be clickable: a word, a phrase, even an image. It sits inside a line of text and does not start a new line.",
    mistakes: [
      "Writing <ahref=> with no space. The browser reads that as a tag named \"ahref\", not an <a> with an href.",
      "Closing it with anything but </a>. A closing tag never repeats the attribute.",
      "Leaving href empty or missing. Then it is not a link to anywhere.",
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
      "target=\"_blank\" opens the link in a new tab instead of leaving this page. On its own, that new tab can reach back and control the tab that opened it. A bad site could use that to swap your original tab for a fake login page. rel=\"noopener\" cuts that connection. rel=\"noreferrer\" does the same and also hides where the visitor came from.",
    whereItGoes:
      "Both go on the <a> tag, next to href: <a href=\"...\" target=\"_blank\" rel=\"noopener\">.",
    mistakes: [
      "Adding target=\"_blank\" without rel=\"noopener\". The link works and looks fine, so the gap is easy to ship without noticing.",
      "Thinking rel=\"noopener\" is only for links to sites you do not trust. Use it on every target=\"_blank\" link.",
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
      "<img> puts a picture on the page. src is the picture file. alt is a few words that describe the picture. The alt text shows if the picture fails to load, and a screen reader (software that reads the page aloud) reads it out. Example: <img src=\"cat.jpg\" alt=\"A sleeping cat\">.",
    whereItGoes:
      "Wherever the picture should appear. It has no closing tag. <img> is complete on its own, like <br> and <hr>.",
    mistakes: [
      "Leaving off the quotes: src=cat.jpg. Browsers often show the picture anyway. It is still not valid, and this site's checks will not count it.",
      "Skipping alt. It is required, not decoration. People who cannot see the picture get nothing without it.",
      "Writing </img>. There is nothing to close.",
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
      "The first line of every page: <!DOCTYPE html>. It tells the browser to use modern rules to draw the page. Without it, the browser falls back to an old mode from the 1990s and guesses, and it guesses wrong.",
    whereItGoes:
      "The very first line of the file. Nothing goes before it, not even a blank line.",
    mistakes: [
      "Leaving it out. The page still shows, but spacing and sizes can behave differently in each browser. That old behavior is called quirks mode.",
      "Using an old long version from HTML 4. Modern HTML only needs the short <!DOCTYPE html>.",
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
    whatItDoes:
      "<html> wraps the whole page. Every other tag goes inside it. It holds exactly two things: one <head>, then one <body>.",
    whereItGoes:
      "Right after <!DOCTYPE html>, and it closes at the very end of the file.",
    mistakes: [
      "Putting content directly inside <html>. Everything visible goes in <body>. Everything about the page goes in <head>.",
      "Having more than one <html>, <head> or <body>. There is only ever one of each.",
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
    whatItDoes:
      "<head> holds information about the page that visitors do not see on it: the tab title, the character set, linked CSS files, scripts.",
    whereItGoes:
      "The first thing inside <html>, before <body>.",
    mistakes: [
      "Putting visible content (text, images, headings) inside <head>. Nothing in here shows on the page.",
      "Forgetting <title> inside it. Every page needs one.",
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
    whatItDoes:
      "<title> sets the text in the browser tab. The same text shows in bookmarks, and search engines use it as the headline for your page.",
    whereItGoes:
      "Inside <head>, nowhere else. One per page.",
    mistakes: [
      "Putting it inside <body>. It does nothing there and will not show in the tab.",
      "Leaving it generic, like \"Untitled Document.\" Every real page deserves a specific title.",
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
    whatItDoes:
      "<body> holds everything visitors see: text, images, links, forms, all of it. If you can see it or click it, it lives somewhere inside <body>.",
    whereItGoes:
      "The second thing inside <html>, right after </head>.",
    mistakes: [
      "Putting <head>-only tags like <title> or <meta> inside <body>. They belong only in <head>.",
      "Leaving text or tags after </body>. Anything after the closing tag is outside the page. The browser moves it somewhere, usually not where you meant.",
      "Styling the page with old attributes on <body> like bgcolor. Those are long dead. Give <body> a rule in CSS like any other tag.",
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
    whatItDoes:
      "This tag tells the browser which character set your text uses. utf-8 covers every language, accents and emoji. Without it, some letters can show up as garbled symbols.",
    whereItGoes:
      "The very first line inside <head>. The browser needs it before it reads any other text on the page.",
    mistakes: [
      "Leaving it out. Plain English usually survives. It is the first thing to check when accents or emoji show up broken.",
      "Putting it after <title>. The browser may have already guessed the wrong character set and read the title with it. It belongs first.",
      "Writing </meta>. There is nothing to close.",
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
      "lang says what language the page is written in, like lang=\"en\" for English. A screen reader (software that reads the page aloud) uses it to pick the right pronunciation. Browsers use it to offer the right translation.",
    whereItGoes:
      "On the opening <html> tag, so it covers the whole page. A single tag can have its own lang if part of the page is in another language.",
    mistakes: [
      "Leaving it off. The page looks exactly the same without it, so it is easy to forget. The difference only shows up in tools that read it.",
      "Writing the language name instead of its code. It is lang=\"en\", not lang=\"English\".",
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
      "This tag tells a phone to show your page at the phone's real width. Without it, the phone pretends to be a wide desktop screen (about 980 pixels) and shrinks the whole page to fit. The text becomes tiny. Worse, your CSS rules for small screens never turn on, because the phone never admits it is small.",
    whereItGoes:
      "Inside <head>, next to the charset and the title. The usual form is <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.",
    mistakes: [
      "Leaving it out, then wondering why your small-screen CSS never kicks in on a real phone. This tag is what makes \"narrow screen\" true.",
      "Adding user-scalable=no to stop pinch-zoom. That hurts people with low vision and is rarely worth it.",
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
      "Six sizes of heading. <h1> is the biggest and the page title. <h6> is the smallest. Together they form the page's outline, like a table of contents. A screen reader (software that reads the page aloud) can jump from heading to heading, the way you skim one.",
    whereItGoes:
      "Wherever a new section starts. Keep them in order: one <h1> for the page, <h2> for its sections, <h3> for parts inside those. Do not skip a level just to get a smaller size. Size is a job for CSS.",
    mistakes: [
      "Using more than one <h1> on a page, or picking a heading for its size instead of its place in the outline.",
      "Jumping from <h1> straight to <h4>. That breaks the outline for anyone moving through the page by heading.",
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
    whatItDoes:
      "<p> marks a paragraph, the normal block of running text. The browser adds space above and below it, so paragraphs read as separate thoughts.",
    whereItGoes:
      "Anywhere in <body> you have a paragraph of text. It is a block, so it always starts on its own line.",
    mistakes: [
      "Using several <br> tags to fake the space between paragraphs. Start a new <p> instead. It already has that space.",
      "Putting a block like <div>, <ul> or another <p> inside a <p>. A paragraph only holds text and small inline tags. The browser quietly closes the <p> the moment a block appears, and your structure scrambles.",
      "Forgetting to close a <p> before the next one opens. The browser recovers, but your CSS and outline become unpredictable.",
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
    whatItDoes:
      "<strong> marks a few words as important. The browser shows them bold, but the meaning is the point: \"this matters.\"",
    whereItGoes:
      "Around the exact words that matter, inside a sentence.",
    mistakes: [
      "Using it just to make text bold for looks. If the words are not important, use CSS (font-weight) instead.",
      "Using <b> instead. <b> is bold with no meaning. <strong> is what a screen reader (software that reads the page aloud) can treat as important.",
      "Wrapping a whole paragraph in it. If everything is important, nothing is.",
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
    whatItDoes:
      "<em> marks words you would stress if you read the sentence out loud. The browser shows them italic. \"I really mean it.\"",
    whereItGoes:
      "Around the stressed word or phrase, inside a sentence.",
    mistakes: [
      "Using it just to get italics with no stress meant. That is a CSS job (font-style).",
      "Using it for book titles, foreign words or technical terms. Those are italic by convention, not stressed. Use <i>, or <cite> for titles.",
      "Mixing it up with <strong>. <em> changes how a sentence sounds. <strong> says the content itself matters.",
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
    whatItDoes:
      "<br> forces a line break inside text, like pressing Enter in the middle of a paragraph. Use it where the breaks are part of the content: a postal address, a poem.",
    whereItGoes:
      "Inside running text, at the exact spot the line should break.",
    mistakes: [
      "Stacking several in a row to make space between paragraphs. Start a new <p> instead.",
      "Writing </br>. It has no closing tag.",
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
    whatItDoes:
      "<hr> draws a horizontal line across the page. It means the topic changes here: a scene break, a new subject, the end of one idea.",
    whereItGoes:
      "Between two chunks of content, on its own line. Not inside a sentence.",
    mistakes: [
      "Writing </hr>. Like <br>, it has no closing tag.",
      "Using it as decoration between every item. It means \"the topic changes,\" so a page full of them says nothing. A border in CSS is the tool for decoration.",
      "Putting it inside a <p>. It is a block, so the browser closes the paragraph around it and you get two half paragraphs.",
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
    whatItDoes:
      "<small> marks fine print: a legal note, a disclaimer, a credit. Text that is beside the point, not the point.",
    whereItGoes:
      "Around the fine print itself, usually near the bottom of a section.",
    mistakes: [
      "Using it just to make text smaller with no fine-print meaning. That is a CSS job.",
      "Wrapping whole paragraphs in it. It is for a short note inside a line, not a block.",
      "Hiding something important in it because it looks like a footnote. Smaller text is still binding.",
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
    whatItDoes:
      "<mark> highlights text, like a yellow highlighter pen. Use it for a search match or a key phrase the reader is looking for. The browser shows a yellow background by default.",
    whereItGoes:
      "Around the highlighted phrase, inside a line.",
    mistakes: [
      "Using it as a general yellow-background tool with nothing actually being highlighted.",
      "Mixing it up with <strong>. <mark> says \"this is what you were looking for right now.\" <strong> says \"this matters in general.\"",
      "Highlighting so much that the highlight stops meaning anything. It works because it is rare.",
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
    whatItDoes:
      "<blockquote> holds a long quote from somewhere else, as its own block. Browsers usually indent it so it stands apart from your own text.",
    whereItGoes:
      "Around the whole quoted passage, as a block of its own.",
    mistakes: [
      "Using it just to indent text that is not a quote. Indenting is a CSS job.",
      "Using it for a short quote inside a sentence. That is <q>, which adds the quotation marks for you.",
      "Putting the author's name inside the <blockquote> as if they said it. The source goes outside it, or in a <cite>.",
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
    whatItDoes:
      "<code> marks a short bit of code inside a sentence, like a variable name. <pre> keeps spaces and line breaks exactly as you typed them. Put <code> inside <pre> for a proper block of code.",
    whereItGoes:
      "<code> on its own for a word of code mid-sentence. <pre><code>...</code></pre> for a whole block that must keep its formatting.",
    mistakes: [
      "Using <pre> alone for a block of code. The formatting survives, but nothing says \"this is code.\"",
      "Typing a raw < or > inside the code. The browser reads it as a tag. Write &lt; and &gt; instead, even inside <pre>.",
      "Indenting the inside of <pre> to match your other HTML. Every one of those spaces shows on the page. Start the content at the left edge.",
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
    whatItDoes:
      "<figure> groups a picture with its caption, so the two are understood as one thing. <figcaption> is the caption.",
    whereItGoes:
      "Around the <img> and its <figcaption>, wherever the picture appears.",
    mistakes: [
      "Using <figure> with no <figcaption>. If there is no caption, a plain <img> is simpler and just as correct.",
      "Putting <figcaption> in the middle. It has to be first or last inside the <figure>.",
      "Repeating the alt text as the caption. alt describes the picture for someone who cannot see it. The caption adds context for someone who can. Different jobs.",
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
    whatItDoes:
      "<ul> is a bulleted list, for a set of things where order does not matter. A shopping list, a list of features, a menu of links. Each item inside it gets its own <li>.",
    whereItGoes:
      "<ul> wraps the items. Every tag directly inside <ul> must be an <li>. Nothing else goes straight inside it.",
    mistakes: [
      "Putting text or other tags straight inside <ul> instead of wrapping each item in <li>.",
      "Putting a sub-list next to the items instead of inside one. A nested <ul> goes inside the <li> it belongs to, after that item's text.",
      "Using a list just to get bullets or indent. A menu is a list. A decorative arrow before a heading is CSS.",
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
    whatItDoes:
      "<ol> is a numbered list, for things where the order matters: steps in a recipe, places in a race. The browser numbers the items for you.",
    whereItGoes:
      "Same shape as <ul>: <ol> wraps the <li> items, in the order they should appear.",
    mistakes: [
      "Using <ol> when order does not matter. That is <ul>.",
      "Typing the numbers yourself, like \"1. Preheat.\" The browser adds its own, so you get \"1. 1. Preheat.\"",
      "Splitting one list into several <ol>s with text between. The numbering restarts at 1 each time. Keep it one list, or use the start attribute.",
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
    whatItDoes:
      "<table> shows data in rows and columns, like a spreadsheet. <tr> is one row. <td> is one cell in that row. <th> is a header cell that names a column or row.",
    whereItGoes:
      "<table> wraps everything. Each <tr> inside it is a row. Each <td> or <th> inside a <tr> is a cell.",
    mistakes: [
      "Using a table to lay out a page. Tables are for data. Page layout is a job for CSS.",
      "Using <td> for the header cells. Use <th>, so the headers mean something. Then a screen reader (software that reads the page aloud) can read them out with each value.",
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
    whatItDoes:
      "<button> is a clickable button. It can send a form, run JavaScript, or just be something to press. Example: <button>Save</button>.",
    whereItGoes:
      "Anywhere something needs to be clicked. Inside a <form>, a button sends the form when clicked, unless you tell it not to.",
    mistakes: [
      "Styling an <a> to look like a button when it does not go anywhere. A real action belongs on a real <button>.",
      "Forgetting that inside a <form> it sends the form by default. A \"cancel\" or \"show more\" button needs type=\"button\", or every click submits.",
      "Making it an icon with no text. A screen reader (software that reads the page aloud) announces an empty button. Give it text, or an aria-label.",
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
    whatItDoes:
      "<input> is a box the visitor types into or clicks. The type attribute decides what kind: a text box, an email box, a checkbox, a date picker. The name attribute labels the value when the form is sent. A field with no name shows on screen but its value is thrown away.",
    whereItGoes:
      "Inside a <form>, usually next to a <label>.",
    mistakes: [
      "Writing </input>. There is nothing to close.",
      "Leaving off type. You get a plain text box, which may not be what you meant.",
      "Skipping the <label>. The field is much harder to use with a screen reader (software that reads the page aloud). It is also harder for anyone clicking to focus it.",
      "Forgetting name. The visitor can type, but the value is never sent, because there is nothing to attach it to.",
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
    whatItDoes:
      "<label> is the text next to a form field that says what the field is for. Link it to the field, and clicking the label puts the cursor in the field. A screen reader (software that reads the page aloud) reads the label when the field is focused.",
    whereItGoes:
      "Next to the <input> it describes. Give the input an id, and give the label a for with the same value: <label for=\"email\"> and <input id=\"email\">.",
    mistakes: [
      "Leaving out the for and id link. The label looks right but is not connected to the field.",
      "Pointing for at the input's name instead of its id. The link is for to id only. name is for sending the form.",
      "Using placeholder text as the only label. It disappears when you start typing. A screen reader (software that reads the page aloud) does not treat it as a label.",
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
    whatItDoes:
      "<select> is a dropdown menu. Each <option> inside it is one choice. The value of the chosen option is what gets sent with the form.",
    whereItGoes:
      "Inside a <form>, with the <option> tags inside the <select>.",
    mistakes: [
      "Putting anything other than <option> (or <optgroup>) directly inside <select>.",
      "Forgetting name on the <select>. Like <input>, without it the choice is never sent.",
      "Leaving out value on each <option>. Then the visible text is sent instead, and it breaks the moment you reword a choice.",
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
    whatItDoes:
      "<form> groups fields so they are all sent together when the visitor presses the button. action is the address the data goes to. method is how. get puts the data in the address bar, which is fine for a search box. post sends it hidden, which is right for anything private.",
    whereItGoes:
      "Around every <input>, <label>, <select> and <button> that belong to that one submission.",
    mistakes: [
      "Leaving fields outside any <form>. They show on screen but are never sent anywhere.",
      "Leaving off action. The form then sends to the current page's own address, which is sometimes intended and often just forgotten.",
      "Using get for a form with a password. get puts every value in the address bar, where browser history and server logs can see it.",
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
    whatItDoes:
      "A note for anyone reading the code later, including you. The browser ignores it completely. It never shows on the page.",
    whereItGoes:
      "Anywhere, to explain something the code does not make obvious.",
    mistakes: [
      "Putting private information in a comment. Anyone can see it by viewing the page source.",
      "Writing two hyphens in a row inside the comment. A -- can end the comment early in some browsers.",
      "Leaving big blocks of old code commented out. It still downloads with the page and confuses the next reader. Delete it.",
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
    whatItDoes:
      "<script> runs JavaScript. Either write the code between the tags, or point src at a separate file.",
    whereItGoes:
      "Usually right before </body>. Then the page content shows first, and the script does not hold up the drawing while it downloads.",
    mistakes: [
      "Putting it in <head> when the script needs tags that come later in the page. It runs before those tags exist.",
      "Writing it self-closed, like <script src=\"app.js\" />. It needs a real </script>. Without one, the browser treats the rest of the page as script.",
      "Writing code inside a <script> that also has a src. The inside code is ignored. It is one or the other.",
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
    whatItDoes:
      "<link rel=\"stylesheet\"> attaches a separate CSS file to the page. Keeping styles in their own file means one file can style every page on the site.",
    whereItGoes:
      "Inside <head>. It needs both rel=\"stylesheet\" and href=\"path/to/file.css\".",
    mistakes: [
      "Writing </link>. There is nothing to close.",
      "Mixing it up with <a>. <link> never makes anything clickable. It attaches files like stylesheets. <a> is the link people click.",
      "Getting the path wrong. The browser says nothing. An unstyled page with no error almost always means the href points at nothing.",
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
      "<style> holds CSS written straight into the page. Everything between <style> and </style> is read as CSS, not HTML. A rule like h1 { color: teal; } works exactly as it would in a separate file. It is the quickest way to style one page, and why the exercises here start with one.",
    whereItGoes:
      "Inside <head>, before the content it styles. Once styles are shared across pages, move them to a .css file and attach it with <link>.",
    mistakes: [
      "Writing HTML tags inside it. <style> switches the browser into CSS mode, so <h1> in there is an error. Write a plain h1 selector instead.",
      "Forgetting the closing </style>. The browser keeps reading the rest of the page as CSS, and the page goes blank.",
      "Mixing it up with the style=\"\" attribute. <style> is a block of rules in <head>. style=\"color: red\" is one rule on one tag, and it beats the block.",
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
      "<template> holds HTML that the browser reads but never shows and never runs. No images load, no scripts run. It waits until JavaScript copies its contents and puts the copy somewhere on the page.",
    whereItGoes:
      "Anywhere, since it is invisible. Usually near the top of <body>, out of the way.",
    mistakes: [
      "Expecting it to show up on its own. It never will without JavaScript copying it in.",
      "Using it as a way to hide content instead of CSS display: none. Hidden content still loads and runs. Template content does neither until copied.",
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
      "<iframe> puts a whole other web page inside this one, in its own little window. A map, a video player, a payment form from another site.",
    whereItGoes:
      "Anywhere in <body>. It needs a src pointing at the page to show, and a width and height so it is not a tiny sliver.",
    mistakes: [
      "Leaving off title. Without it, a screen reader (software that reads the page aloud) cannot say what the embedded page is.",
      "Expecting to style or read what is inside it with your own CSS or JavaScript. If the page comes from another site, the browser blocks that on purpose.",
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
    whatItDoes:
      "<video> plays a video with the browser's own built-in player. No plugin, no extra library.",
    whereItGoes:
      "Anywhere in <body>. src points at the file, or nested <source> tags offer more than one format.",
    mistakes: [
      "Forgetting controls. Without it there is no play, pause or volume, and the video cannot be used.",
      "Expecting autoplay with sound to work. Browsers block it. Only muted autoplay works reliably.",
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
    whatItDoes:
      "<audio> plays a sound clip with the browser's built-in controls. The sound-only version of <video>.",
    whereItGoes:
      "Anywhere in <body>. Same src and controls pattern as <video>.",
    mistakes: [
      "Forgetting controls. Without it there is no way to play, pause or change the volume.",
      "Setting autoplay. Browsers block sound that starts on its own, and where it works it is an unwelcome surprise.",
      "Offering only one format. Not every browser plays every one. Nested <source> tags with an mp3 and an ogg cover nearly everyone.",
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
      "<svg> draws a graphic with shapes described by math instead of pixels. It stays sharp at any size, unlike a photo in <img>. Icons and logos are the usual use.",
    whereItGoes:
      "Anywhere in <body>. It needs a viewBox to set its coordinate system, and shape tags inside it (like <circle> and <path>) to draw the picture.",
    mistakes: [
      "Adding role=\"img\" without a <title> inside. That promises a name for a screen reader (software that reads the page aloud) and then gives none.",
      "Forgetting viewBox. Without it, the shapes sit at raw pixel positions with no link to the drawn size, and scaling goes wrong.",
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
      "<details> is a built-in show and hide section. The <summary> is the line you click. The rest shows or hides. No JavaScript needed, and keyboard and a screen reader (software that reads the page aloud) support come for free. Right for an FAQ answer, a \"show more\", a spoiler.",
    whereItGoes:
      "Anywhere content should stay hidden until asked for. <summary> must be the first thing inside <details>. Everything after it is the hidden part.",
    mistakes: [
      "Rebuilding this with <div>s and a click handler. A hand-made version has to recreate the keyboard support and open or closed state that <details> already gives you.",
      "Putting <summary> anywhere but first. If it is not first, the browser invents a default \"Details\" label and your summary ends up hidden.",
      "Hiding the thing most visitors came for. If it should start open, add the open attribute: <details open>.",
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
      "<fieldset> groups related form fields under one title. <legend> is that title. A screen reader (software that reads the page aloud) reads the legend before each field in the group. So \"Small\" becomes \"Size: Small.\" A set of radio buttons needs exactly that.",
    whereItGoes:
      "Inside a <form>, around fields that belong together: a group of radio buttons, a shipping address. <legend> goes first inside it.",
    mistakes: [
      "Grouping radio buttons with just a heading above them. A heading is not attached to the fields. Only <legend> inside <fieldset> is read with each option.",
      "Putting <legend> anywhere but first inside the <fieldset>. It only works as the first thing.",
      "Wrapping the whole form in one <fieldset>. It is for a subgroup. One giant group adds a border and a title but no useful structure.",
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
      "<textarea> is a text box with more than one line: a message, a comment, a bio. The visitor can usually drag its corner to make it bigger.",
    whereItGoes:
      "Inside a <form>, with a <label> like any other field. rows sets how many lines tall it starts.",
    mistakes: [
      "Giving it a value attribute like <input>. It has none. Its starting text goes between the opening and closing tags.",
      "Writing it self-closed, like <textarea />. It needs a real closing tag. Without one, the browser swallows the rest of the page into the box.",
      "Forgetting name. Like <input>, without it whatever the visitor types is never sent.",
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
      "Three attributes that are switches, not values. Just being there turns them on. checked starts a checkbox or radio ticked. required stops the form sending while the field is empty. disabled greys the field out and leaves its value out of the submission.",
    whereItGoes:
      "On the field's opening tag, as the bare word: <input type=\"checkbox\" checked>. No equals sign, no quotes.",
    mistakes: [
      "Writing checked=\"false\" to turn it off. The browser only checks whether the word is there, so that is still checked. Remove the attribute instead.",
      "Using disabled on a field you still want sent. Disabled fields are dropped. readonly keeps the value and still sends it.",
      "Trusting required on its own. It is a helpful first check in the browser. Anything that matters must be checked again where the form is received.",
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
      "<picture> lets the browser pick between several versions of one image. A small file for phones, a wide crop for desktops, a newer format for browsers that support it. Each <source> is one option with a condition. The <img> at the end is the fallback, and the thing that actually shows.",
    whereItGoes:
      "Around an <img>. The <source> tags come first, best option first. The browser takes the first one it can use. The <img> comes last.",
    mistakes: [
      "Leaving out the <img>. <picture> shows nothing on its own. The <img> is what displays. <source> only says which file to use.",
      "Putting the <img> before the <source> tags. The browser stops looking when it reaches the <img>, so anything after it is ignored.",
      "Putting alt on <picture> or <source>. It belongs on the <img>, the image that actually shows.",
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
      "<th> is a header cell. It names what the cells in its column or row mean. scope says which way. scope=\"col\" heads the column below. scope=\"row\" heads the row beside it. With that, a screen reader (software that reads the page aloud) reads \"Age: 30\" instead of just \"30.\" colspan and rowspan let a cell stretch across several columns or rows.",
    whereItGoes:
      "In the first row for column headers, or as the first cell of a row for row headers. <th> and <td> can mix in the same row.",
    mistakes: [
      "Using bold <td> cells for headers. They look the same but say nothing about which values they describe.",
      "Leaving off scope on a table with both column and row headers. The browser has to guess which way each header applies, and often guesses wrong.",
      "Setting colspan to a number that does not match the real column count. The row ends up a different width and the grid falls apart.",
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
      "<thead> holds a table's header rows. <tbody> holds its data rows. Naming the two parts lets a long table keep its headers in view while the rows scroll, and lets CSS style the parts separately. <tfoot> can hold a totals row.",
    whereItGoes:
      "Directly inside <table>: <thead> with the header row, then <tbody> with everything else.",
    mistakes: [
      "Putting rows directly in <table> next to a <tbody>. The browser wraps the loose rows in a second, invisible <tbody>.",
      "Using <thead> for the table's title. The header is for column names. A title goes in <caption>, right after the opening <table> tag.",
      "Fighting CSS to make the header row look different. <thead> gives you a selector for exactly that.",
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
      "aria-label gives a tag a name for a screen reader (software that reads the page aloud). It is read out instead of the visible content. A button holding only an icon is announced as just \"button.\" With aria-label=\"Close\" it becomes \"Close, button.\" Its sibling attribute role says what kind of thing a tag is. Use it when the tag alone does not say, like role=\"img\" on an <svg>.",
    whereItGoes:
      "On the tag that needs a name: the icon-only <button>, the <nav> when there are several, the <svg> that carries meaning. Not needed where there is already visible text.",
    mistakes: [
      "Adding it to a tag that already has visible text. The label replaces that text for a screen reader (software that reads the page aloud). \"Submit\" on screen and aria-label=\"Go\" is confusing.",
      "Putting it on a <div> or <span> to make it \"accessible.\" Those have no role to attach the name to, so most readers ignore it. Use a real <button> or <a>.",
      "Reaching for aria when a plain attribute already does the job. alt on an image and <label> on a field do the same work with less to maintain.",
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
      "data- attributes let you attach your own information to a tag. Anything starting with data- is valid. The browser ignores it when drawing, and JavaScript and CSS can read it. Example: <li data-id=\"42\">. It is how a page remembers which item is which.",
    whereItGoes:
      "On the tag the information is about: data-id on a list item, data-state on a toggle, data-track on a button.",
    mistakes: [
      "Using it for text the visitor should see. It is for facts about a tag that code reads, not a place to hide content.",
      "Skipping the data- prefix, like <li state=\"open\">. Made-up attributes mostly work, but they are invalid, and a future HTML attribute with that name would change the meaning.",
      "Stuffing a whole blob of data into one. A few small, clearly named attributes are easier to read and to target from CSS.",
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
      "Two tags for the big parts of a page. <section> is a chunk of the page with its own heading: Features, Pricing, About. <article> is a piece that would still make sense on its own somewhere else: a blog post, a news story, a product card, a comment. Both look exactly like <div> until you style them. The difference is what they tell a screen reader (software that reads the page aloud). Search engines and the next person reading your code get that too.",
    whereItGoes:
      "Inside <main>. They can nest: an <article> can hold <section>s, and a <section> can list <article>s. Each one should start with a heading (<h2> or lower). If you cannot think of a heading for it, it is probably a <div>.",
    mistakes: [
      "Using <section> as a plain wrapper for styling. If it has no heading and no theme, it is a <div>.",
      "Picking <article> because something feels important. The test is: would this still make sense on its own page? A pricing block would not. A blog post would.",
      "Putting a new <h1> inside every section. Keep one <h1> per page, and use <h2> and <h3> inside sections so the levels still describe the structure.",
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
      "<aside> holds content that relates to the page but is not part of its main flow. A sidebar of related links, an author bio next to an article, a pull quote. A screen reader (software that reads the page aloud) announces it as extra, so a listener can skip it. It is just a block on its own. The sidebar look comes from your CSS.",
    whereItGoes:
      "Inside <main> when it relates to that page's content, or directly in <body> as a site-wide sidebar. One or two per page at most.",
    mistakes: [
      "Using it for the site menu. That is <nav>. An <aside> is for side content, not the way around the site.",
      "Expecting it to sit beside the main column on its own. <aside> says nothing about layout. It stacks like any block until flexbox or grid moves it.",
      "Putting the most important content in it because it looks like a sidebar in the design. If the page would not make sense without it, it belongs in <main>.",
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
      "<address> holds contact details for the author of the page or of an article. An email link, a phone number, a street address, a social handle. Browsers show it in italics by default, which you will usually turn off.",
    whereItGoes:
      "In the site <footer> for the site's contact details, or inside an <article> for that article's author. Not for every street address on the page. A venue's address in body text is just a <p>.",
    mistakes: [
      "Wrapping any postal address in it. It means \"how to contact the author,\" not \"this text is an address.\" A list of store locations is ordinary content.",
      "Putting headings or whole sections inside it. It holds contact lines only, usually links and line breaks.",
      "Forgetting to turn off the italics with font-style: normal when they clash with the design.",
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
      "One tag, many kinds of field. The type attribute decides which: text (the default), email, password, number, tel, url, search, date, checkbox, radio, file, range, color, hidden and submit. The type changes the keyboard a phone shows, the checks the browser runs, and how the field looks. type=\"email\" gets the @ key on a phone and rejects \"bob\" before the form is ever sent.",
    whereItGoes:
      "On every <input>, even though text is the default. Pair it with a <label> whose for matches the input's id. Checkbox and radio fields also need the label's text, so the visitor has something to click.",
    mistakes: [
      "Using type=\"text\" for everything. You lose the phone keyboard switch, the free checks and the built-in date and color pickers.",
      "Using type=\"number\" for things that are not amounts, like phone numbers or zip codes. It drops leading zeros and shows a spinner. Use type=\"tel\", or text with inputmode=\"numeric\".",
      "Giving the radio buttons in one group different name values. The browser only treats inputs with the same name as one group, so more than one can be picked.",
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
      "style=\"\" is CSS written on one tag. style=\"color: red; margin-top: 8px\" changes that one tag and nothing else. It is the quickest way to test an idea and the worst way to style a site. The rules cannot be reused. They cannot react to hover or screen size. And they beat nearly every rule in your stylesheet, so they are hard to undo later.",
    whereItGoes:
      "On a single tag, in its opening brackets, as a last resort. A quick experiment, a value that comes from data (a chart bar's width), or an email where stylesheets get removed. Everything else belongs in a <style> block or a .css file.",
    mistakes: [
      "Writing it like an HTML attribute, style=\"color=red\". Inside the quotes it is CSS: property, colon, value, semicolon.",
      "Using it to fix one tag, then wondering why the rule in your .css file stops working. An inline style beats class and id rules. Only !important beats it.",
      "Trying to put :hover or @media inside it. They cannot live on a tag. The moment you need them, move the rule to a stylesheet.",
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
      "<dl> is a list of terms and their descriptions. <dt> is the term, <dd> is its description. Right for a glossary, an FAQ, product specs (Weight: 1.2 kg) or details like Author and Published. <ul> says \"these are items.\" <ol> says \"in this order.\" <dl> says \"this goes with that.\"",
    whereItGoes:
      "<dl> wraps alternating <dt> and <dd> tags. One term can have several descriptions, and several terms can share one description.",
    mistakes: [
      "Using it for layout because the indent looks nice. If the items are not term and description pairs, it is the wrong list.",
      "Putting <li> inside it. <dl> holds <dt> and <dd> only. <li> belongs to <ul> and <ol>.",
      "Using a <table> for simple name and value pairs. Two columns with no rows to compare is a <dl>. A table is for data with real rows and columns.",
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
      "<sub> drops a character below the line and shrinks it: H<sub>2</sub>O. <sup> raises one: x<sup>2</sup>, 1<sup>st</sup>, a footnote number. They carry meaning, so chemistry, maths and footnotes read correctly even without CSS.",
    whereItGoes:
      "Around just the characters that go up or down, inside a line. Keep them short: a letter, a number, a symbol.",
    mistakes: [
      "Using them to make text small. That is <small>, or CSS font-size. These also move the text up or down, which looks wrong on ordinary words.",
      "Wrapping a whole sentence in them. They are for a few characters inside a line.",
      "Letting them push the line taller. Browsers often add height around a <sup>. A line-height tweak in CSS fixes the jitter.",
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
      "<abbr> marks an abbreviation and spells it out in its title attribute: <abbr title=\"Cascading Style Sheets\">CSS</abbr>. Hovering shows the full form in a tooltip. A screen reader (software that reads the page aloud) can read it out. Browsers add a dotted underline as a hint.",
    whereItGoes:
      "Around the abbreviation itself, with title holding the full form. Spell it out on first use in the page, then use the short form freely.",
    mistakes: [
      "Leaving off title. Then the tag gives the reader nothing.",
      "Wrapping every occurrence on the page. The first one is enough. A dotted underline under every \"HTML\" is noise.",
      "Relying on the tooltip for something that matters. Touch screens have no hover. If the full form matters, write it in the text too.",
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
      "<time> marks a date or time and gives machines the exact value in datetime. The visible text can be friendly, like \"March 3rd.\" datetime holds the strict form, like 2026-03-03. Search engines use it for event and publish dates, and code can read it without guessing.",
    whereItGoes:
      "Around the date as the reader sees it, with datetime in the machine form. YYYY-MM-DD for a date. HH:MM for a time. Both joined with a T for date and time.",
    mistakes: [
      "Skipping datetime when the visible text is vague. \"next Friday\" inside <time> with no datetime helps no one.",
      "Writing datetime in a local style like 03/04/2026. It must be year, month, day, or browsers and search engines ignore it.",
      "Using it for anything time-flavored, like \"a long time ago.\" It is for a specific moment or span that can be written as a datetime.",
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
      "<kbd> marks something the reader types or a key they press: Press <kbd>Ctrl</kbd> + <kbd>S</kbd>. <code> is for code the computer runs. <kbd> is for what the human types. Browsers show it in a typewriter font. A border in CSS makes it look like a key.",
    whereItGoes:
      "Around each key name or the typed text, inside a line.",
    mistakes: [
      "Using <code> for keys and shortcuts. It reads as source code to a screen reader (software that reads the page aloud). The key styling also has nowhere to attach.",
      "Writing the + inside the <kbd>. \"Ctrl + S\" as one chunk means you cannot style the keys as keys. Put each key in its own <kbd>.",
      "Using it for what the computer prints back. That is <samp>, not <kbd>.",
    ],
    example: "<p>Save with <kbd>Ctrl</kbd> + <kbd>S</kbd>, or type <kbd>:wq</kbd> and press <kbd>Enter</kbd>.</p>",
    related: ["<code> / <pre>", "<p>"],
  },
];

export function getNestEntry(tag: string): NestEntry | undefined {
  return NEST.find((e) => e.tag === tag);
}
