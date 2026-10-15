import type { KeyEntry } from './keyIndex';
import type { NestEntry } from './nest';

// CSS's quick-reference index — same KeyEntry shape HTML uses, but every
// row here is a selector, property, or at-rule instead of a tag. Grouped
// to match CSS_CHAPTERS' own progression (attach -> selectors -> box model
// -> color & type -> display -> flexbox -> responsive -> interaction) so
// the Nest's chapter order lines up with the Route the learner just did.
export const CSS_KEY_INDEX: KeyEntry[] = [
  {
    tag: '<style>',
    category: 'attaching css',
    desc: 'A block of CSS written directly inside the HTML page\'s <head>.',
    example: '<style>\n  h1 { color: teal; }\n</style>',
  },
  {
    tag: '<link rel="stylesheet">',
    category: 'attaching css',
    desc: 'Connects an external .css file to an HTML page so its rules apply.',
    example: '<link rel="stylesheet" href="style.css">',
  },
  {
    tag: 'selector { }',
    category: 'attaching css',
    desc: 'The basic shape of every CSS rule: a selector says what to style, curly braces hold the declarations.',
    example: 'p {\n  color: navy;\n}',
  },
  {
    tag: 'specificity & the cascade',
    category: 'attaching css',
    desc: 'When two rules target the same element, this is what decides which one wins.',
    example: '#nav a { color: red; }   /* beats */\n.nav a { color: blue; }',
  },
  {
    tag: '--custom-property',
    category: 'attaching css',
    desc: 'A reusable value defined once and referenced anywhere with var() — change it in one place, everywhere using it updates.',
    example: ':root {\n  --brand-color: #2563eb;\n}\nbutton {\n  background: var(--brand-color);\n}',
  },
  {
    tag: '.class',
    category: 'selectors',
    desc: 'Selects every element carrying that class attribute. Reusable across the page.',
    example: '.card {\n  border: 1px solid #ccc;\n}',
  },
  {
    tag: '#id',
    category: 'selectors',
    desc: 'Selects the one element with that id. Should only ever match once per page.',
    example: '#header {\n  background: black;\n}',
  },
  {
    tag: 'descendant & child selectors',
    category: 'selectors',
    desc: 'A space means "inside, at any depth"; a > means "direct child only".',
    example: 'nav a { }      /* any <a> inside <nav> */\nnav > a { }    /* only <a> directly in <nav> */',
  },
  {
    tag: ':hover / :first-child',
    category: 'selectors',
    desc: 'Pseudo-classes select an element based on state or position, not on a class or id in the markup.',
    example: 'button:hover {\n  opacity: 0.8;\n}',
  },
  {
    tag: 'box-sizing',
    category: 'the box model',
    desc: 'Controls whether padding and border are added to an element\'s width, or eaten out of it.',
    example: '* {\n  box-sizing: border-box;\n}',
  },
  {
    tag: 'margin',
    category: 'the box model',
    desc: 'Space outside an element\'s border — pushes other elements away.',
    example: '.card {\n  margin: 16px;\n}',
  },
  {
    tag: 'padding',
    category: 'the box model',
    desc: 'Space inside an element\'s border, between the border and the content.',
    example: '.card {\n  padding: 16px;\n}',
  },
  {
    tag: 'border',
    category: 'the box model',
    desc: 'A visible line drawn around an element, between its padding and its margin.',
    example: '.card {\n  border: 1px solid #ccc;\n}',
  },
  {
    tag: 'color & background-color',
    category: 'color & type',
    desc: 'color sets text color; background-color sets the fill behind an element.',
    example: 'p {\n  color: #222;\n  background-color: #fafafa;\n}',
  },
  {
    tag: 'font-family & font-size',
    category: 'color & type',
    desc: 'Which typeface to use, and how big the text renders.',
    example: 'body {\n  font-family: system-ui, sans-serif;\n  font-size: 16px;\n}',
  },
  {
    tag: 'font-weight & line-height',
    category: 'color & type',
    desc: 'How bold text renders, and how much vertical space each line of text takes up.',
    example: 'p {\n  font-weight: 400;\n  line-height: 1.5;\n}',
  },
  {
    tag: 'display',
    category: 'display & flow',
    desc: 'Sets how an element participates in layout — as a block, inline, or something else entirely.',
    example: 'span {\n  display: block;\n}',
  },
  {
    tag: 'position',
    category: 'display & flow',
    desc: 'Takes an element out of (or repositions it within) the normal flow other elements respect.',
    example: '.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
  },
  {
    tag: 'z-index',
    category: 'display & flow',
    desc: 'Decides which positioned element sits on top when two of them overlap. Only does anything on an element that also has a position other than static.',
    example: '.modal {\n  position: fixed;\n  z-index: 100;\n}',
  },
  {
    tag: 'display: flex',
    category: 'flexbox',
    desc: 'Turns an element into a flex container — its direct children line up in a row (or column) instead of stacking.',
    example: '.row {\n  display: flex;\n}',
  },
  {
    tag: 'justify-content & align-items',
    category: 'flexbox',
    desc: 'Position flex children along the row (justify-content) and across it (align-items).',
    example: '.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
  },
  {
    tag: 'flex-wrap & gap',
    category: 'flexbox',
    desc: 'flex-wrap lets items drop to a new line instead of overflowing; gap adds even spacing between them.',
    example: '.row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}',
  },
  {
    tag: 'display: grid',
    category: 'grid',
    desc: 'Turns an element into a grid container — children snap into rows and columns you define, for 2D layouts flexbox struggles with.',
    example: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}',
  },
  {
    tag: 'grid-template-columns',
    category: 'grid',
    desc: 'Defines the columns of a grid. fr units share leftover space; repeat() and auto-fit make it responsive without media queries.',
    example: '.gallery {\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}',
  },
  {
    tag: '@media',
    category: 'responsive basics',
    desc: 'Applies a block of CSS only when the screen matches a condition, usually a width.',
    example: '@media (max-width: 600px) {\n  .row { flex-direction: column; }\n}',
  },
  {
    tag: 'rem / % / vw',
    category: 'responsive basics',
    desc: 'Relative units that scale with something else (the root font size, a parent, the viewport) instead of staying fixed like px.',
    example: '.container {\n  width: 90%;\n  max-width: 60rem;\n}',
  },
  {
    tag: 'transition',
    category: 'interaction & polish',
    desc: 'Animates a property change smoothly over time instead of it jumping instantly.',
    example: 'button {\n  transition: opacity 0.2s ease;\n}\nbutton:hover {\n  opacity: 0.8;\n}',
  },
  {
    tag: '::before / ::after',
    category: 'selectors',
    desc: 'Pseudo-elements that insert a styleable box before or after an element\'s content — decorative icons, quote marks, overlays — with no extra HTML.',
    example: '.quote::before {\n  content: "“";\n  color: gray;\n}',
  },
  {
    tag: 'width / height',
    category: 'the box model',
    desc: 'An element\'s size. min-width/max-width (and the height pair) set limits so it can flex between them.',
    example: '.card {\n  width: 100%;\n  max-width: 480px;\n}',
  },
  {
    tag: 'border-radius',
    category: 'the box model',
    desc: 'Rounds an element\'s corners. 50% on a square makes a circle.',
    example: '.avatar {\n  border-radius: 50%;\n}',
  },
  {
    tag: 'text-align',
    category: 'color & type',
    desc: 'Lines up text (and inline content) inside its container: left, center, right.',
    example: 'h1 {\n  text-align: center;\n}',
  },
  {
    tag: 'text-decoration / font-style',
    category: 'color & type',
    desc: 'Underlines, strikethroughs, and italics. text-decoration: none is how you un-underline a link.',
    example: 'a {\n  text-decoration: none;\n}\n.note {\n  font-style: italic;\n}',
  },
  {
    tag: 'overflow',
    category: 'display & flow',
    desc: 'What happens when content is bigger than its box: spill out (default), clip it, or scroll it.',
    example: '.panel {\n  height: 200px;\n  overflow: auto;\n}',
  },
  {
    tag: 'flex-direction',
    category: 'flexbox',
    desc: 'Which way a flex container lays its items out: row (default) or column. Flips which axis justify-content and align-items control.',
    example: '.stack {\n  display: flex;\n  flex-direction: column;\n}',
  },
  {
    tag: 'flex (grow / shrink / basis)',
    category: 'flexbox',
    desc: 'Set on a flex item: how much it grows into spare space, shrinks when squeezed, and what size it starts from. flex: 1 is the everyday "share the room equally."',
    example: '.sidebar {\n  flex: 0 0 240px;\n}\n.content {\n  flex: 1;\n}',
  },
  {
    tag: 'calc()',
    category: 'responsive basics',
    desc: 'Do math in a value, mixing units: calc(100% - 40px) is "full width minus the padding."',
    example: '.main {\n  width: calc(100% - 240px);\n}',
  },
  {
    tag: "background",
    category: "color & type",
    desc: "Shorthand for background colour, image, gradient, size and position.",
    example: ".hero {\n  background: url(hero.jpg) center / cover;\n}",
  },
  {
    tag: "text-transform / letter-spacing",
    category: "color & type",
    desc: "Display text in UPPERCASE/Capitalised, and loosen or tighten the gap between letters.",
    example: ".eyebrow {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}",
  },
  {
    tag: "max-width / min-height",
    category: "the box model",
    desc: "Limits instead of fixed sizes: never wider than X, never shorter than Y.",
    example: ".wrap {\n  max-width: 1100px;\n  margin: 0 auto;\n}",
  },
  {
    tag: "box-shadow",
    category: "the box model",
    desc: "A shadow around the box: x, y, blur, spread, colour. Lifts cards off the page.",
    example: ".card {\n  box-shadow: 0 4px 12px rgba(0,0,0,.15);\n}",
  },
  {
    tag: "list-style",
    category: "display & flow",
    desc: "Which bullet or number a list shows. none removes bullets for nav bars.",
    example: "nav ul {\n  list-style: none;\n  padding: 0;\n}",
  },
  {
    tag: "object-fit",
    category: "display & flow",
    desc: "How an image fills a box of a different shape: cover crops, contain letterboxes.",
    example: ".avatar {\n  width: 64px; height: 64px;\n  object-fit: cover;\n}",
  },
  {
    tag: "float / clear",
    category: "display & flow",
    desc: "Wrap text around an image. Legacy layout tool: use flex/grid for columns.",
    example: "img.left {\n  float: left;\n  margin-right: 16px;\n}",
  },
  {
    tag: ":focus / :focus-visible",
    category: "selectors",
    desc: "Style the element that has keyboard focus. Restyle the ring, never remove it.",
    example: "a:focus-visible {\n  outline: 2px solid #6366f1;\n}",
  },
  {
    tag: ":nth-child() / :not()",
    category: "selectors",
    desc: "Select by position among siblings (odd, 3n) or exclude a match (:not(.active)).",
    example: "tr:nth-child(odd) { background: #eee; }\nli:not(:last-child) { ... }",
  },
  {
    tag: "!important",
    category: "attaching css",
    desc: "Forces a declaration to win over everything. For utilities and overrides, not for fixing selectors.",
    example: ".hidden {\n  display: none !important;\n}",
  },
  {
    tag: "inherit / initial",
    category: "attaching css",
    desc: "Keyword values: copy the parent's value, or reset to a default.",
    example: "a { color: inherit; }\nbutton { font: inherit; }",
  },
  {
    tag: "@font-face",
    category: "color & type",
    desc: "Load a custom font file and name it for font-family.",
    example: "@font-face {\n  font-family: 'Inter';\n  src: url(inter.woff2);\n}",
  },
  {
    tag: "grid-template-rows",
    category: "grid",
    desc: "Size the rows of a grid. auto 1fr auto makes a sticky-footer page.",
    example: ".page {\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}",
  },
  {
    tag: "grid-column / grid-row / grid-area",
    category: "grid",
    desc: "Place a grid item: which lines it spans, or which named area it fills.",
    example: ".featured { grid-column: 1 / -1; }\nheader { grid-area: header; }",
  },
  {
    tag: "opacity",
    category: "interaction & polish",
    desc: "Fade a whole element, 1 solid to 0 invisible. Still takes space at 0.",
    example: ".btn:disabled {\n  opacity: 0.5;\n}",
  },
  {
    tag: "cursor",
    category: "interaction & polish",
    desc: "Which mouse pointer to show. pointer makes custom buttons feel clickable.",
    example: "button, .card {\n  cursor: pointer;\n}",
  },
  {
    tag: "transform",
    category: "interaction & polish",
    desc: "Move, scale or rotate an element visually without affecting layout. Smooth to animate.",
    example: ".card:hover {\n  transform: translateY(-4px);\n}",
  },
  {
    tag: "animation / @keyframes",
    category: "interaction & polish",
    desc: "Self-running animation: define steps in @keyframes, play them with animation.",
    example: "@keyframes spin { to { transform: rotate(360deg); } }\n.spinner { animation: spin 1s linear infinite; }",
  },
];

export const CSS_KEY_CATEGORIES = Array.from(new Set(CSS_KEY_INDEX.map((e) => e.category)));

// Deep-dive pages, same NestEntry shape HTML's Nest uses — stats just pick
// different keys (type/appliesTo/inherits/commonValues) since "closing tag"
// and "void element" mean nothing for a property. Every CSS_KEY_INDEX row
// above gets one; CSS doesn't need a shallower Nest than HTML's, it just
// needs a differently-shaped one.
export const CSS_NEST: NestEntry[] = [
  {
    tag: '<style>',
    category: 'attaching css',
    stats: {
      type: 'HTML tag, lives in <head>',
      appliesTo: 'the whole document',
      inherits: 'n/a',
      commonValues: 'any CSS rules between the opening and closing tag',
    },
    whatItDoes:
      'An embedded stylesheet: everything between <style> and </style> is parsed as CSS and applied to the page it lives in. It is the simplest way to attach CSS — no second file, no path to get wrong — which is why every puzzle and project in this track starts with one. The rules inside behave exactly like rules in a .css file.',
    whereItGoes:
      'Inside <head>, so the styles are known before the body is painted. For a real site with more than one page, move the rules to a .css file and attach it with <link rel="stylesheet"> so every page shares them.',
    mistakes: [
      'Putting HTML inside it — <style> switches the parser into CSS mode, so writing <h1> { } is an error. Use the bare selector h1 { }.',
      'Leaving off </style> — the browser keeps reading the rest of the document as CSS and the page goes blank below that point.',
      'Reaching for the style="" attribute instead — an inline style on one element beats every rule in the <style> block (and in your .css file), so a stray style="" is the classic reason a rule "doesn\'t work".',
    ],
    example: '<head>\n  <style>\n    body { font-family: system-ui, sans-serif; }\n    h1 { color: teal; }\n  </style>\n</head>',
    related: ['<link rel="stylesheet">', 'selector { }', 'specificity & the cascade', '!important'],
  },
  {
    tag: '<link rel="stylesheet">',
    category: 'attaching css',
    stats: {
      type: 'HTML tag, lives in <head>',
      appliesTo: 'the whole document',
      inherits: 'n/a',
      commonValues: 'rel="stylesheet" href="path/to/file.css"',
    },
    whatItDoes:
      'The bridge between an HTML file and a CSS file — without it, a .css file full of rules just sits there unused, with nothing telling the browser to apply it.',
    whereItGoes:
      'Inside <head>, so the browser loads the styles before it paints the page instead of flashing unstyled content first.',
    mistakes: [
      'A wrong or misspelled href — the browser fails silently, no error in the page itself, just styles that never show up.',
      'Putting it at the bottom of <body> "to make the page load faster" — this usually backfires by causing a visible flash of unstyled content instead.',
    ],
    example: '<head>\n  <link rel="stylesheet" href="style.css">\n</head>',
    related: ['<style>', 'selector { }'],
  },
  {
    tag: 'selector { }',
    category: 'attaching css',
    stats: {
      type: 'syntax',
      appliesTo: 'every CSS rule, no exceptions',
      inherits: 'n/a',
      commonValues: 'property: value; pairs, one or more, semicolon-separated',
    },
    whatItDoes:
      'Every single CSS rule has this exact shape: a selector naming what to target, then curly braces holding one or more declarations (a property, a colon, a value, a semicolon).',
    whereItGoes:
      'In a linked .css file, or inside a <style> tag in <head>. Never directly inside an element like an attribute — that\'s the separate, more limited inline style="" syntax.',
    mistakes: [
      'Forgetting the semicolon after a declaration — the browser usually recovers, but it can silently swallow the next declaration on the same line.',
      'Mismatched braces (one { with no closing }) — everything after it in the file can end up inside that rule by accident.',
    ],
    example: 'p {\n  color: navy;\n  font-size: 18px;\n}',
    related: ['.class', '#id'],
  },
  {
    tag: 'specificity & the cascade',
    category: 'attaching css',
    stats: {
      type: 'concept',
      appliesTo: 'resolving conflicts between rules',
      inherits: 'n/a',
      commonValues: 'inline > id > class > element, roughly, before !important',
    },
    whatItDoes:
      'When two rules both target the same element with conflicting values, the cascade decides which one actually renders — based on specificity (how precise the selector is), then source order (later wins ties).',
    whereItGoes:
      "It's not something you write, it's how the browser reads everything you've already written — but it explains almost every \"css isn't working\" bug.",
    mistakes: [
      'Reaching for !important to force a rule to win — it works, but it breaks the normal cascade for everyone who edits the file after, including future-you.',
      'Assuming "the CSS further down the file always wins" — an id selector earlier in the file still beats a class selector later, regardless of order.',
    ],
    example: '/* both match the same <a>, the id wins regardless of order */\n#nav a { color: red; }\n.nav a { color: blue; }',
    related: ['.class', '#id', '!important', 'inherit / initial'],
  },
  {
    tag: '--custom-property',
    category: 'attaching css',
    stats: {
      type: 'declaration + function pair',
      appliesTo: 'any element it\'s defined on, and its descendants (it inherits)',
      inherits: 'yes',
      commonValues: '--brand-color: #2563eb; used as var(--brand-color)',
    },
    whatItDoes:
      "Defines a value once, under a name you choose, and lets any other declaration reference it with var(--name) instead of repeating the literal value. Change the one definition and every place that uses var() picks up the new value — the same problem a find-and-replace on a literal color across a whole file solves, except it's actually reliable and works live.",
    whereItGoes:
      'Defined inside a selector (:root, meaning the whole document, is the most common spot for a global one); referenced anywhere inside var() that a normal value would go.',
    mistakes: [
      "Defining it somewhere too narrow (like a single .card rule) and then trying to use it outside that selector's descendants — a custom property is only visible to the element it's defined on and that element's children, same as any other inherited value.",
      'Forgetting the -- prefix — custom-color: blue; is just an unrecognized (and ignored) regular property, not a custom property.',
    ],
    example: ':root {\n  --brand-color: #2563eb;\n}\n\nbutton {\n  background: var(--brand-color);\n}\na {\n  color: var(--brand-color);\n}',
    related: ['specificity & the cascade'],
  },
  {
    tag: '.class',
    category: 'selectors',
    stats: {
      type: 'selector',
      appliesTo: 'every element carrying that class',
      inherits: 'n/a',
      commonValues: '.card, .btn, .active',
    },
    whatItDoes:
      'Targets every element that has this class in its class="" attribute, however many there are on the page. The reusable, day-to-day selector.',
    whereItGoes: 'Anywhere a rule needs to reuse the same look across multiple, unrelated elements.',
    mistakes: [
      'Naming classes after what something looks like (.red-text) instead of what it means (.error) — the look changes eventually, the name shouldn\'t have to.',
      'Fighting specificity by adding more classes to the selector (.card.card) instead of just checking why the original rule isn\'t winning.',
    ],
    example: '.card {\n  border: 1px solid #ccc;\n  padding: 16px;\n}',
    related: ['#id', 'specificity & the cascade'],
  },
  {
    tag: '#id',
    category: 'selectors',
    stats: {
      type: 'selector',
      appliesTo: 'the single element carrying that id',
      inherits: 'n/a',
      commonValues: '#header, #main-nav',
    },
    whatItDoes:
      'Targets the one element on the page with a matching id="" attribute. Much higher specificity than a class, which is exactly why it\'s used sparingly for styling.',
    whereItGoes: 'Reserved for genuinely one-off elements — a page header, a specific landmark JS also hooks into.',
    mistakes: [
      'Using an id selector for anything reusable — its high specificity makes it stubbornly hard to override later from a class.',
      'Reusing the same id on multiple elements — ids must be unique; CSS won\'t error, but JS relying on getElementById will only ever find the first one.',
    ],
    example: '#header {\n  background: black;\n  color: white;\n}',
    related: ['.class'],
  },
  {
    tag: 'descendant & child selectors',
    category: 'selectors',
    stats: {
      type: 'combinator',
      appliesTo: 'elements nested inside another selector',
      inherits: 'n/a',
      commonValues: 'nav a, nav > a, .card + .card',
    },
    whatItDoes:
      "Combines two selectors to target based on nesting: a space means anywhere inside (any depth), > means only a direct child, + means the very next sibling.",
    whereItGoes: 'Whenever the same tag or class needs different styling depending on where it sits in the tree.',
    mistakes: [
      'Using a plain space (any depth) when > (direct child only) was meant — the space version can accidentally catch nested elements several levels deep.',
      'Chaining too many descendant selectors (nav ul li a span) — it works, but it\'s brittle: restructure the HTML slightly and the rule silently stops matching.',
    ],
    example: 'nav a { color: white; }      /* any <a> inside <nav>, any depth */\nnav > a { color: white; }    /* only <a> directly inside <nav> */',
    related: [':hover / :first-child', '::before / ::after'],
  },
  {
    tag: ':hover / :first-child',
    category: 'selectors',
    stats: {
      type: 'pseudo-class',
      appliesTo: 'an element based on state or position, not markup',
      inherits: 'n/a',
      commonValues: ':hover, :focus, :first-child, :last-child, :nth-child()',
    },
    whatItDoes:
      "Selects an element based on something other than its tag, class, or id — a live interaction state (:hover, :focus) or its position among siblings (:first-child).",
    whereItGoes: 'Appended directly to another selector, with no space, to narrow what it matches.',
    mistakes: [
      'Styling :hover on a touch device and expecting it to behave like a click — hover has no real equivalent on touchscreens, so that state may never trigger.',
      'Adding a :hover style without a matching :focus style — a keyboard user tabbing through the page never triggers hover at all, and loses the same visual feedback.',
    ],
    example: 'button:hover, button:focus {\n  opacity: 0.8;\n}',
    related: ['descendant & child selectors', ':focus / :focus-visible', ':nth-child() / :not()', 'cursor'],
  },
  {
    tag: 'box-sizing',
    category: 'the box model',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: 'content-box (default), border-box',
    },
    whatItDoes:
      'Decides what width/height actually measure. content-box (the default) measures just the content, so padding and border add on top and inflate the final size. border-box includes them in the width you set.',
    whereItGoes:
      'Almost always set once, globally, at the top of a stylesheet — border-box is what most developers expect by default and the browser default fights that expectation.',
    mistakes: [
      'Setting width: 100% on an element with padding, under the default content-box — the padding adds on top and the element overflows its container.',
      'Setting box-sizing: border-box on one element but forgetting * { box-sizing: border-box; } globally — the two models mixed on the same page produce inconsistent sizing.',
    ],
    example: '* {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 300px;\n  padding: 20px; /* included in that 300px, not added to it */\n}',
    related: ['padding', 'border', 'margin', 'width / height'],
  },
  {
    tag: 'margin',
    category: 'the box model',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: '0, auto, 16px, 1rem, 1em',
    },
    whatItDoes:
      "Adds invisible space outside an element's border, pushing away whatever is next to it. Two vertical margins between adjacent elements collapse into one (the larger of the two), rather than adding together.",
    whereItGoes: 'On any element that needs breathing room from its neighbors.',
    mistakes: [
      'Expecting two stacked elements\' margins to add together — vertical margins between siblings collapse to the larger single value, not the sum.',
      'Using margin: auto to center something horizontally without giving it a fixed width first — auto centering only works once the element\'s width is set.',
    ],
    example: '.card {\n  margin: 0 auto 24px;\n  max-width: 600px;\n}',
    related: ['padding', 'box-sizing'],
  },
  {
    tag: 'padding',
    category: 'the box model',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: '0, 16px, 1rem, 8px 16px',
    },
    whatItDoes:
      "Adds space inside an element, between its content and its border. Unlike margin, padding's background color still shows through it, since it's inside the box.",
    whereItGoes: 'On any element whose content sits too close to its own edge.',
    mistakes: [
      "Reaching for margin when the goal was actually padding (or vice versa) — margin pushes other elements away, padding just gives the content inside more room.",
      'Forgetting box-sizing: border-box, then being surprised padding made the element wider than its set width.',
    ],
    example: '.button {\n  padding: 10px 20px;\n}',
    related: ['margin', 'box-sizing'],
  },
  {
    tag: 'border',
    category: 'the box model',
    stats: {
      type: 'property (shorthand)',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: '1px solid #ccc, none, 2px dashed red',
    },
    whatItDoes:
      'Draws a visible line around an element, sitting between its padding and its margin. Shorthand for width, style, and color in one line.',
    whereItGoes: 'On any element that needs a visible outline — a card, an input, a divider.',
    mistakes: [
      'Setting only border-color without border-style — border defaults to none, so without an explicit style like solid, nothing renders regardless of width or color.',
      'Not accounting for border adding to an element\'s total size under the default box-sizing — same gotcha as padding.',
    ],
    example: '.card {\n  border: 1px solid #ccc;\n  border-radius: 8px;\n}',
    related: ['padding', 'box-sizing', 'border-radius', 'box-shadow'],
  },
  {
    tag: 'color & background-color',
    category: 'color & type',
    stats: {
      type: 'property',
      appliesTo: 'any element (color: text; background-color: fill)',
      inherits: 'color: yes — background-color: no',
      commonValues: 'named (red), hex (#222), rgb(), hsl()',
    },
    whatItDoes:
      "color sets the color of an element's own text (and inherits down to children, unless overridden). background-color fills the element's own box and does not inherit.",
    whereItGoes: 'On text-containing elements for color; on any element for background-color.',
    mistakes: [
      'Setting a light background-color without checking the inherited text color still has enough contrast against it.',
      'Expecting background-color to inherit like color does — a parent\'s background never bleeds down to children automatically; each element\'s own background is transparent by default.',
    ],
    example: 'body {\n  color: #222;\n  background-color: #fafafa;\n}',
    related: ['font-family & font-size', 'background'],
  },
  {
    tag: 'font-family & font-size',
    category: 'color & type',
    stats: {
      type: 'property',
      appliesTo: 'any element containing text',
      inherits: 'yes',
      commonValues: 'system-ui, sans-serif, 16px, 1rem',
    },
    whatItDoes:
      'font-family lists which typefaces to try, in order, falling back to the next if one isn\'t available. font-size sets how large the text renders, and most other type-related sizing (line-height, em units) is relative to it.',
    whereItGoes:
      'Usually set once on body and inherited everywhere, with overrides only where a specific element genuinely needs to differ.',
    mistakes: [
      'Listing only one specific font with no generic fallback (sans-serif, serif) at the end — if that font fails to load, the browser falls back to something unpredictable instead.',
      'Setting font-size in px everywhere — it ignores a user\'s browser-level font size preference, unlike rem, which scales with it.',
    ],
    example: 'body {\n  font-family: system-ui, sans-serif;\n  font-size: 16px;\n}',
    related: ['font-weight & line-height', 'color & background-color', 'text-align', 'text-decoration / font-style', 'text-transform / letter-spacing', '@font-face'],
  },
  {
    tag: 'font-weight & line-height',
    category: 'color & type',
    stats: {
      type: 'property',
      appliesTo: 'any element containing text',
      inherits: 'yes',
      commonValues: 'font-weight: 400/700; line-height: 1.5, 24px',
    },
    whatItDoes:
      'font-weight controls boldness (400 normal, 700 bold, and steps between if the font supports them). line-height sets the vertical space each line of text occupies, which is what actually controls how airy or cramped a paragraph feels.',
    whereItGoes: 'Anywhere text needs emphasis (font-weight) or better readability in long-form text (line-height).',
    mistakes: [
      'Using a font-weight the loaded font file doesn\'t actually include — the browser fake-bolds it, which looks noticeably worse than a real bold weight.',
      'Leaving line-height at the browser default for body text — dense paragraphs with a tight default line-height are measurably harder to read.',
    ],
    example: 'p {\n  font-weight: 400;\n  line-height: 1.6;\n}',
    related: ['font-family & font-size'],
  },
  {
    tag: 'display',
    category: 'display & flow',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: 'block, inline, inline-block, flex, grid, none',
    },
    whatItDoes:
      "Sets how an element behaves in the page's layout flow — block elements stack and take the full width, inline elements sit in the middle of a line of text and ignore width/height, inline-block gets both a place in the line and a settable size.",
    whereItGoes: 'Overrides an element\'s browser-default display when the built-in behavior isn\'t what\'s needed.',
    mistakes: [
      'Trying to set width/height on a naturally inline element (like <span>) without changing its display first — those properties are simply ignored on inline elements.',
      'Using display: none to "hide" something that should stay in the accessibility tree (like a skip-navigation trick) — none removes it entirely, from sighted users and screen readers alike.',
    ],
    example: 'span.badge {\n  display: inline-block;\n  padding: 2px 8px;\n}',
    related: ['position', 'display: flex', 'display: grid', 'overflow', 'float / clear', 'list-style'],
  },
  {
    tag: 'position',
    category: 'display & flow',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: 'static (default), relative, absolute, fixed, sticky',
    },
    whatItDoes:
      "Changes how an element is positioned relative to normal flow. relative shifts it from where it would've been, without affecting other elements. absolute removes it from flow entirely and positions it against its nearest positioned ancestor. fixed pins it to the viewport. sticky toggles between relative and fixed based on scroll.",
    whereItGoes: 'Wherever an element needs to break out of normal document flow — an overlay, a pinned header, a badge in a corner.',
    mistakes: [
      'Using position: absolute without a position: relative ancestor — it then positions against the whole page instead of the intended nearby container.',
      'Reaching for position to build a layout (like a row of cards) instead of flexbox or grid — position solves overlap/pinning problems, not general layout.',
    ],
    example: '.badge-wrap {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
    related: ['display', 'z-index'],
  },
  {
    tag: 'z-index',
    category: 'display & flow',
    stats: {
      type: 'property',
      appliesTo: 'a positioned element (anything with position other than static)',
      inherits: 'no',
      commonValues: 'auto (default), 0, 10, 100, -1',
    },
    whatItDoes:
      'When two positioned elements overlap, z-index decides which one renders on top — higher numbers sit above lower ones. It only has any effect on an element that also has position set to something other than the default static; on a static element it\'s silently ignored.',
    whereItGoes: 'On the same element as a position declaration, whenever it needs to explicitly sit above or below something else it overlaps.',
    mistakes: [
      "Setting z-index on an element without also setting position — nothing happens, and it's easy to miss why.",
      'Reaching for increasingly large values (999, 9999, 99999) to "win" a stacking fight instead of figuring out why the actual stacking order is wrong — usually a sign two unrelated parts of the page are fighting over the same numeric range with no real system.',
    ],
    example: '.dropdown {\n  position: absolute;\n  z-index: 10;\n}\n.modal-overlay {\n  position: fixed;\n  z-index: 100;\n}',
    related: ['position'],
  },
  {
    tag: 'display: flex',
    category: 'flexbox',
    stats: {
      type: 'property value',
      appliesTo: 'a container, changing how its direct children lay out',
      inherits: 'no',
      commonValues: 'flex, inline-flex',
    },
    whatItDoes:
      'Turns an element into a flex container. Its direct children (only direct — not grandchildren) become flex items that line up in a row by default, and a handful of new properties become available to control how they space and align.',
    whereItGoes: 'On any container whose children need to sit in a row (or column) instead of stacking.',
    mistakes: [
      'Expecting display: flex to affect grandchildren, not just direct children — nested elements two levels down are untouched until their own parent is also flexed.',
      'Setting flex properties (justify-content, align-items) on the children instead of the container — those properties only do anything on the flex container itself.',
    ],
    example: '.row {\n  display: flex;\n  gap: 12px;\n}',
    related: ['justify-content & align-items', 'flex-wrap & gap', 'flex-direction', 'flex (grow / shrink / basis)', 'display: grid'],
  },
  {
    tag: 'justify-content & align-items',
    category: 'flexbox',
    stats: {
      type: 'property (on the flex container)',
      appliesTo: 'a flex container',
      inherits: 'no',
      commonValues: 'justify-content: flex-start/center/space-between; align-items: stretch/center',
    },
    whatItDoes:
      "justify-content positions items along the main axis (the row direction, by default). align-items positions them along the cross axis (perpendicular to that — vertically, in a row). Together they solve most 'how do I center this' questions.",
    whereItGoes: 'On the flex container, alongside display: flex — never on the individual flex items.',
    mistakes: [
      'Mixing up which axis each one controls — in the default row direction, justify-content is horizontal and align-items is vertical, and it\'s easy to reach for the wrong one.',
      'Trying to use justify-content to center a single item vertically — that\'s align-items\' job in a row-direction flex container.',
    ],
    example: '.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    related: ['display: flex', 'flex-wrap & gap', 'flex-direction'],
  },
  {
    tag: 'flex-wrap & gap',
    category: 'flexbox',
    stats: {
      type: 'property (on the flex container)',
      appliesTo: 'a flex container',
      inherits: 'no',
      commonValues: 'flex-wrap: nowrap (default)/wrap; gap: 12px',
    },
    whatItDoes:
      'By default, flex items are squeezed to fit on one line even if they overflow. flex-wrap: wrap lets them drop onto new lines instead. gap adds even spacing between items without needing margin hacks on each one.',
    whereItGoes: 'On the flex container, whenever items need to wrap responsively or need consistent spacing.',
    mistakes: [
      'Forgetting flex-wrap on a row of items meant to reflow on small screens — without it, they just shrink and squeeze instead of wrapping.',
      'Using margin on individual items for spacing instead of gap on the container — gap doesn\'t add extra space at the very start/end the way per-item margins do.',
    ],
    example: '.row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}',
    related: ['display: flex', 'justify-content & align-items'],
  },
  {
    tag: '@media',
    category: 'responsive basics',
    stats: {
      type: 'at-rule',
      appliesTo: 'a block of other rules, conditionally',
      inherits: 'n/a',
      commonValues: '(max-width: 600px), (min-width: 900px)',
    },
    whatItDoes:
      "Wraps a block of CSS so it only applies when a condition is true — almost always a screen width. This is the mechanism behind a layout that reflows for phones vs. desktops.",
    whereItGoes:
      'Anywhere in a stylesheet; rules inside only take effect once the condition matches, and normal cascade/specificity rules still apply within it.',
    mistakes: [
      "Only writing a max-width breakpoint for \"mobile\" and never testing the in-between sizes — a tablet-width viewport can fall through the cracks of two rules that don't account for it.",
      "Designing desktop-first with max-width queries added on top, instead of mobile-first with min-width — mobile-first is usually less CSS to override.",
    ],
    example: '.row {\n  flex-direction: row;\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}',
    related: ['rem / % / vw', 'flex-direction', 'calc()', 'grid-template-columns'],
  },
  {
    tag: 'rem / % / vw',
    category: 'responsive basics',
    stats: {
      type: 'unit',
      appliesTo: 'anywhere a length is expected',
      inherits: 'n/a',
      commonValues: 'rem (root font size), % (parent), vw/vh (viewport)',
    },
    whatItDoes:
      "Relative units scale instead of staying fixed. rem is always relative to the root (<html>) font size, making it predictable even in deeply nested elements. % is relative to the parent. vw/vh are relative to the viewport's width/height.",
    whereItGoes: 'Anywhere a fixed px value would fight against user preferences or different screen sizes.',
    mistakes: [
      'Using em instead of rem for font sizes inside nested components — em compounds with every ancestor\'s font-size, producing sizes that drift unpredictably as nesting gets deeper.',
      'Setting width: 100vw on an element inside a page that also has a vertical scrollbar — 100vw includes the scrollbar\'s width, causing a slight horizontal overflow.',
    ],
    example: '.container {\n  width: 90%;\n  max-width: 60rem;\n  padding: 2vw;\n}',
    related: ['@media', 'calc()', 'width / height', 'max-width / min-height'],
  },
  {
    tag: 'transition',
    category: 'interaction & polish',
    stats: {
      type: 'property (shorthand)',
      appliesTo: 'any element with a property that changes',
      inherits: 'no',
      commonValues: 'opacity 0.2s ease, all 0.3s ease-in-out',
    },
    whatItDoes:
      'Animates a property smoothly from its old value to its new one over a set duration, instead of the change happening instantly. Needs something else (like :hover or a class toggle) to actually trigger the value change.',
    whereItGoes: 'On the element whose property will change, set on its default/resting state, not on the :hover rule itself.',
    mistakes: [
      'Putting transition inside the :hover rule instead of the base rule — the transition then only applies on the way in, and the reverse (mouse leaving) snaps back instantly.',
      'Transitioning all as a lazy catch-all — it can quietly animate properties that were never meant to (like layout-affecting ones), sometimes hurting performance.',
    ],
    example: 'button {\n  opacity: 1;\n  transition: opacity 0.2s ease;\n}\nbutton:hover {\n  opacity: 0.8;\n}',
    related: [':hover / :first-child', 'transform', 'animation / @keyframes', 'opacity'],
  },
  {
    tag: '::before / ::after',
    category: 'selectors',
    stats: {
      type: 'pseudo-element',
      appliesTo: 'a generated box inside the element, before or after its content',
      inherits: 'n/a (it inherits from its element like a child would)',
      commonValues: 'content: ""; content: "→"; content: attr(data-label)',
    },
    whatItDoes:
      'Creates an extra box inside an element — one just before its real content, one just after — that you can style like anything else, without adding a tag to the HTML. Decorative quote marks, an arrow after a link, a colored stripe down a card\'s edge, a dimming overlay: all ::before/::after. The box only appears if content is set, even to an empty string.',
    whereItGoes:
      'Appended to a selector with two colons: .card::before. Set content (required), then style it — most layouts give it position: absolute so it sits on top of or beside the element without pushing text around.',
    mistakes: [
      'Forgetting the content property — without it the pseudo-element doesn\'t render at all, even with a width, height, and background set. content: "" is enough.',
      'Putting real text or meaning in it — screen readers mostly skip generated content, so anything a visitor needs to know belongs in the HTML, not in content.',
      'Trying to use it on an <img> or <input> — elements that can\'t have children can\'t have ::before/::after either. Wrap them in a <span> and attach it there.',
    ],
    example: '.quote::before {\n  content: "“";\n  font-size: 2em;\n  color: gray;\n}\n.card::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.3);\n}',
    related: ['descendant & child selectors', ':hover / :first-child', 'position'],
  },
  {
    tag: 'width / height',
    category: 'the box model',
    stats: {
      type: 'property',
      appliesTo: 'block elements, flex/grid items, images — not plain inline text',
      inherits: 'no',
      commonValues: 'auto, 100%, 480px, 60rem; min-width / max-width to set limits',
    },
    whatItDoes:
      'Sets how big an element is. auto (the default) means "as wide as the container, as tall as the content," which is right far more often than a fixed number. min-* and max-* set a floor and a ceiling, so width: 100% with max-width: 480px fills a phone screen and stops growing on a monitor.',
    whereItGoes: 'On the element being sized. Remember box-sizing: without border-box, padding and border get added on top of whatever width you set.',
    mistakes: [
      'Setting a fixed height on a box that holds text — the moment the text wraps one more line, it spills out the bottom. Let height stay auto, or use min-height.',
      'Setting width on an inline element like <a> or <span> and seeing nothing happen — inline elements ignore width and height. Change display first.',
      'Using width: 100% plus padding, then wondering why it overflows — under the default box-sizing the padding is added to the 100%. Set box-sizing: border-box.',
    ],
    example: '.card {\n  width: 100%;\n  max-width: 480px;\n  min-height: 120px;\n}',
    related: ['box-sizing', 'padding', 'rem / % / vw', 'overflow', 'max-width / min-height', 'object-fit'],
  },
  {
    tag: 'border-radius',
    category: 'the box model',
    stats: {
      type: 'property',
      appliesTo: 'any element',
      inherits: 'no',
      commonValues: '4px, 8px, 50%, 999px (a pill)',
    },
    whatItDoes:
      'Rounds the corners of an element\'s box — the border, the background, and anything clipped by overflow all follow the curve. A small value softens a card; 50% on a square makes a circle; a huge value on a wide element makes a pill.',
    whereItGoes: 'On the element whose corners should round. Works with or without a visible border — the background rounds too.',
    mistakes: [
      'Expecting the corners of a child image to round when only the parent has border-radius — the parent needs overflow: hidden to actually clip its children to the curve.',
      'Using 50% on a non-square element hoping for a circle — it makes an ellipse. Make the width and height equal first.',
      'Rounding every single element — a few consistent radii (say 4px for inputs, 12px for cards) read as a system; a different value on everything reads as noise.',
    ],
    example: '.avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  overflow: hidden;\n}',
    related: ['border', 'overflow', 'width / height', 'box-shadow'],
  },
  {
    tag: 'text-align',
    category: 'color & type',
    stats: {
      type: 'property',
      appliesTo: 'block containers — it aligns the inline content inside them',
      inherits: 'yes',
      commonValues: 'left (default), center, right, justify',
    },
    whatItDoes:
      'Lines up the text — and any inline things like images or inline-block buttons — inside a block. It\'s set on the container, not on the text itself: text-align: center on a <div> centers everything inline inside that <div>.',
    whereItGoes: 'On the block whose contents should align. It inherits, so setting it on <body> or a section cascades to everything inside.',
    mistakes: [
      'Using it to center a block element like a <div> or a card — it only moves inline content. A block centers with margin: 0 auto (plus a width), or with flexbox on its parent.',
      'Setting it on the element you want moved rather than on its parent — text-align: center on a <span> does nothing; the <span> is the thing being aligned, not the thing aligning.',
      'Reaching for justify on web text — it stretches spaces to fill the line, which without hyphenation produces rivers of white space in narrow columns.',
    ],
    example: 'h1 {\n  text-align: center;\n}\n.price {\n  text-align: right;\n}',
    related: ['font-family & font-size', 'justify-content & align-items', 'margin'],
  },
  {
    tag: 'text-decoration / font-style',
    category: 'color & type',
    stats: {
      type: 'property',
      appliesTo: 'any element containing text',
      inherits: 'text-decoration: no (but propagates visually) — font-style: yes',
      commonValues: 'text-decoration: none / underline / line-through; font-style: italic / normal',
    },
    whatItDoes:
      'text-decoration draws a line through, under, or over text — underline is what every link gets by default, none removes it, line-through strikes it out. font-style switches between upright and italic. Together they cover most "make this text look different" needs that aren\'t weight or size.',
    whereItGoes: 'On the text element. The single most common use is a { text-decoration: none; } to drop link underlines — then giving links some other signal they\'re clickable.',
    mistakes: [
      'Removing underlines from links in running text and giving them nothing else — color alone fails for colorblind readers; keep the underline there, or add it back on hover and focus at minimum.',
      'Using font-style: italic on text that should be <em>, or text-decoration: line-through on text that should be <del> — the look is right but the meaning is lost. Use the semantic tag and let it style itself.',
      'Trying to un-underline a child when the parent is underlined — text-decoration propagates to children and can\'t be removed from inside. Remove it on the parent.',
    ],
    example: 'a {\n  text-decoration: none;\n}\na:hover,\na:focus {\n  text-decoration: underline;\n}\n.old-price {\n  text-decoration: line-through;\n}',
    related: ['font-weight & line-height', ':hover / :first-child'],
  },
  {
    tag: 'overflow',
    category: 'display & flow',
    stats: {
      type: 'property',
      appliesTo: 'block containers with a set size',
      inherits: 'no',
      commonValues: 'visible (default), hidden, auto, scroll; overflow-x / overflow-y for one axis',
    },
    whatItDoes:
      'Decides what happens when the content inside a box is bigger than the box. visible lets it spill out over whatever\'s next (the default, and usually the surprise). hidden clips it. auto adds a scrollbar only when needed; scroll always shows one. It only does anything once the box has a size the content can exceed.',
    whereItGoes: 'On the container that has a fixed width or height. A box that just grows with its content never overflows, so there\'s nothing for the property to decide.',
    mistakes: [
      'Setting overflow: auto on a box with no height — it never overflows, so nothing scrolls. The box needs a height, max-height, or a flex/grid parent constraining it.',
      'Using overflow: hidden to "fix" a layout problem without finding the cause — it clips the symptom. The content is still too big, and whatever got cut off is now invisible to everyone.',
      'Forgetting that overflow: hidden also kills position: absolute children that reach outside the box — a dropdown menu inside an overflow: hidden container gets clipped at the edge.',
    ],
    example: '.log {\n  height: 240px;\n  overflow: auto;\n}\n.avatar {\n  border-radius: 50%;\n  overflow: hidden;\n}',
    related: ['width / height', 'display', 'position', 'border-radius'],
  },
  {
    tag: 'flex-direction',
    category: 'flexbox',
    stats: {
      type: 'property (on the flex container)',
      appliesTo: 'a flex container',
      inherits: 'no',
      commonValues: 'row (default), column, row-reverse, column-reverse',
    },
    whatItDoes:
      'Sets which way a flex container lays its items out — side by side (row) or stacked (column). It also rotates the whole axis system: in a column, justify-content works vertically and align-items works horizontally, the reverse of a row. That swap is what trips people up.',
    whereItGoes: 'On the flex container, next to display: flex. The classic use is a row on desktop that becomes a column inside a @media query on phones.',
    mistakes: [
      'Switching to column and then wondering why justify-content: center no longer centers horizontally — in a column, justify-content is the vertical axis. Use align-items: center for horizontal.',
      'Reaching for flex-direction: column on a single element that should just stack normally — block elements already stack. Flex column is for when you also need the gap, alignment, or flex-grow behavior.',
      'Using row-reverse or column-reverse to change visual order — keyboard and screen-reader order still follow the HTML, so visitors tab through it backwards. Reorder the HTML instead.',
    ],
    example: '.stack {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}',
    related: ['display: flex', 'justify-content & align-items', '@media'],
  },
  {
    tag: 'flex (grow / shrink / basis)',
    category: 'flexbox',
    stats: {
      type: 'property (on each flex item)',
      appliesTo: 'the children of a flex container',
      inherits: 'no',
      commonValues: 'flex: 1; flex: 0 0 240px; flex: 1 1 auto',
    },
    whatItDoes:
      'The one flex property that goes on the items, not the container. flex-grow says how much of the spare space this item takes; flex-shrink says how much it gives up when there isn\'t enough; flex-basis is its starting size. flex: 1 means "grow to share the room equally"; flex: 0 0 240px means "exactly 240px, never grow, never shrink" — a fixed sidebar next to a stretchy main area.',
    whereItGoes: 'On individual flex items — the children of whatever has display: flex. Different items can have different values; that\'s the point.',
    mistakes: [
      'Setting flex: 1 on the container instead of the items — it only means something on a child of a flex parent.',
      'Expecting equal columns from flex: 1 when the items have very different content — flex: 1 shares the *spare* space equally, on top of each item\'s own content size. flex: 1 1 0 (or just flex: 1, which sets basis to 0) makes them truly equal.',
      'Fighting a flex item that won\'t shrink below its content — a long word or an image sets a minimum. Add min-width: 0 to the item to let it shrink past that.',
    ],
    example: '.layout {\n  display: flex;\n}\n.sidebar {\n  flex: 0 0 240px;\n}\n.content {\n  flex: 1;\n  min-width: 0;\n}',
    related: ['display: flex', 'flex-wrap & gap', 'width / height'],
  },
  {
    tag: 'display: grid',
    category: 'grid',
    stats: {
      type: 'property value',
      appliesTo: 'a container, changing how its direct children lay out',
      inherits: 'no',
      commonValues: 'grid, inline-grid',
    },
    whatItDoes:
      'Turns an element into a grid container: its direct children snap into rows and columns you define, in two dimensions at once. Flexbox is one line that wraps; grid is a true table of cells. A photo gallery, a dashboard of cards, a page with a header, sidebar, and main area — anything you\'d sketch as boxes on graph paper is grid.',
    whereItGoes: 'On the container. On its own it does almost nothing visible — pair it with grid-template-columns to actually define the columns, and gap for spacing.',
    mistakes: [
      'Using grid for a simple row of items that just need to sit side by side — flexbox is simpler there. Grid earns its keep when both rows and columns need to line up.',
      'Setting grid properties on the children and expecting a layout — like flexbox, the container owns the layout; children only need rules if they span cells.',
      'Forgetting gap and adding margin to every child — gap puts even spacing between cells without the extra space at the edges that margins leave behind.',
    ],
    example: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}',
    related: ['grid-template-columns', 'display: flex', 'flex-wrap & gap', 'display', 'grid-template-rows', 'grid-column / grid-row / grid-area'],
  },
  {
    tag: 'grid-template-columns',
    category: 'grid',
    stats: {
      type: 'property (on the grid container)',
      appliesTo: 'a grid container',
      inherits: 'no',
      commonValues: '1fr 1fr 1fr; repeat(3, 1fr); 240px 1fr; repeat(auto-fit, minmax(200px, 1fr))',
    },
    whatItDoes:
      'Defines the columns of a grid — how many, and how wide. The fr unit is the key: it means "one share of whatever space is left," so 1fr 1fr 1fr is three equal columns and 240px 1fr is a fixed sidebar beside a stretchy main area. repeat(auto-fit, minmax(200px, 1fr)) fits as many 200px-minimum columns as will fit, then stretches them — a responsive grid with no media query at all.',
    whereItGoes: 'On the grid container, alongside display: grid. grid-template-rows is the same idea for rows, though rows are usually left to size themselves from the content.',
    mistakes: [
      'Writing percentages instead of fr — 33% 33% 33% plus a gap overflows the container, because the percentages don\'t know about the gap. fr does.',
      'Hard-coding a column count and then needing a media query to change it on phones — repeat(auto-fit, minmax(…)) handles that on its own.',
      'Expecting items to span columns automatically because they\'re wide — each child takes exactly one cell unless you tell it otherwise with grid-column: span 2.',
    ],
    example: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.sidebar-layout {\n  grid-template-columns: 240px 1fr;\n}',
    related: ['display: grid', 'rem / % / vw', '@media', 'grid-template-rows', 'grid-column / grid-row / grid-area'],
  },
  {
    tag: 'calc()',
    category: 'responsive basics',
    stats: {
      type: 'function',
      appliesTo: 'any property that takes a length, percentage, or number',
      inherits: 'n/a',
      commonValues: 'calc(100% - 240px), calc(100vh - 64px), calc(1rem + 2vw)',
    },
    whatItDoes:
      'Lets a value be arithmetic, and — the real power — lets that arithmetic mix units the browser otherwise can\'t combine. calc(100% - 240px) is "the container\'s width minus a fixed sidebar"; calc(100vh - 64px) is "the viewport minus the header." Neither is expressible as a single number.',
    whereItGoes: 'Anywhere a length goes: width, height, padding, margin, font-size, top/left. Written as the function around the expression.',
    mistakes: [
      'Leaving out the spaces around + and - : calc(100%-240px) is invalid and the whole declaration is dropped. The spaces are required (multiply and divide don\'t need them, but it\'s consistent to space everything).',
      'Using it where a simpler tool exists — calc(100% - 32px) for padding is what box-sizing: border-box already solves; calc for equal columns is what fr already solves.',
      'Dividing by a value with a unit — calc(100% / 50px) isn\'t allowed; only the divisor must be a plain number.',
    ],
    example: '.main {\n  width: calc(100% - 240px);\n  min-height: calc(100vh - 64px);\n}',
    related: ['rem / % / vw', 'width / height', '@media'],
  },
  {
    tag: "background",
    category: "color & type",
    stats: {
      type: "shorthand property",
      appliesTo: "any element",
      inherits: "no",
      commonValues: "a colour, url(image.jpg), a gradient, plus size / position / repeat",
    },
    whatItDoes:
      "The shorthand for everything behind an element's content: colour, an image, a gradient, and how that image sits (background-size, background-position, background-repeat). background: #222 is the same as background-color: #222; background: url(hero.jpg) center / cover no-repeat drops an image in, centres it, scales it to fill, and stops it tiling. Gradients count as images: background: linear-gradient(to right, #0ea5e9, #6366f1).",
    whereItGoes:
      "On the element whose box should carry the colour or image \u2014 a hero <section>, a card, <body> for the page. The image sits behind the padding box and under the content, so text on top stays readable only if you keep contrast in mind.",
    mistakes: [
      "Writing background: red after a background-image rule and losing the image \u2014 the shorthand resets every background-* property you don't mention. Use background-color when you only mean the colour.",
      "Forgetting background-size: cover (or the / cover part of the shorthand) \u2014 a large photo shows at its natural size and tiles, so you see the top-left corner four times.",
      "Putting meaningful images in the background \u2014 a CSS background has no alt text. If the picture is content, it's an <img>; if it's decoration, background is right.",
    ],
    example: ".hero {\n  background: url(hero.jpg) center / cover no-repeat;\n  color: white;\n}\n.btn {\n  background: linear-gradient(to right, #0ea5e9, #6366f1);\n}\n.card { background-color: #fff; }",
    related: ["color & background-color", "width / height", "opacity"],
  },
  {
    tag: "text-transform / letter-spacing",
    category: "color & type",
    stats: {
      type: "properties",
      appliesTo: "text",
      inherits: "yes",
      commonValues: "uppercase | capitalize | none; 0.05em, 1px, -0.02em",
    },
    whatItDoes:
      "Two small typographic dials. text-transform rewrites the case of text as it displays \u2014 uppercase for a label or button, capitalize for a title \u2014 without changing the HTML, so the source stays readable and copy-paste gives the original. letter-spacing adds (or removes) space between characters: a little positive spacing makes small uppercase text breathe; a touch of negative spacing tightens big headlines.",
    whereItGoes:
      "On the text element or a parent \u2014 both inherit. Common pairing: text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px for an eyebrow label or nav link.",
    mistakes: [
      "Typing the text in capitals in the HTML instead \u2014 screen readers may spell out all-caps words letter by letter, and you can't undo it with CSS. Lowercase in HTML, uppercase in CSS.",
      "Using px for letter-spacing on text that changes size \u2014 2px is loose on 12px text and invisible on 48px. em scales with the font.",
      "Adding spacing to uppercase text and forgetting it also applies after the last letter \u2014 centred labels drift right. A matching negative margin-right, or padding-left equal to the spacing, recentres it.",
    ],
    example: ".eyebrow {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 12px;\n}\nh1 { letter-spacing: -0.02em; }",
    related: ["font-family & font-size", "font-weight & line-height", "text-decoration / font-style"],
  },
  {
    tag: "max-width / min-height",
    category: "the box model",
    stats: {
      type: "properties",
      appliesTo: "block and flex/grid items",
      inherits: "no",
      commonValues: "65ch, 1100px, 100%; 100vh, 3rem, 0",
    },
    whatItDoes:
      "Limits rather than fixed sizes. width: 1100px is 1100px even on a 400px phone; max-width: 1100px means 'as wide as there is room, but never more than 1100px', which is how every centred content column is built. min-height says 'at least this tall, taller if the content needs it' \u2014 a full-screen hero with min-height: 100vh, or cards that line up at 3rem even when one is empty. max-height and min-width exist too and work the same way.",
    whereItGoes:
      "max-width on wrappers and text columns (65ch keeps lines readable), on images (max-width: 100% stops them overflowing their container), and on anything that must shrink on small screens. min-height on heroes, cards and footers that must not collapse.",
    mistakes: [
      "Using width for the content column and getting a horizontal scrollbar on phones \u2014 a fixed width can't shrink. max-width can.",
      "Setting height: 100vh on a hero and then adding content \u2014 it overflows and overlaps the next section. min-height grows with the content.",
      "Forgetting that max-width: 100% on an image measures the parent \u2014 with no parent width set, a 4000px photo still shows at 4000px. Give the container a width or use the img rule globally.",
    ],
    example: ".wrap {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 16px;\n}\nimg { max-width: 100%; height: auto; }\n.hero { min-height: 100vh; }",
    related: ["width / height", "margin", "rem / % / vw", "@media"],
  },
  {
    tag: "box-shadow",
    category: "the box model",
    stats: {
      type: "property",
      appliesTo: "any element",
      inherits: "no",
      commonValues: "x y blur spread colour, e.g. 0 4px 12px rgba(0,0,0,.15); none",
    },
    whatItDoes:
      "Draws a shadow around an element's box \u2014 the lift that makes a card look like it sits above the page. The value is offset-x, offset-y, then optional blur radius, optional spread, and a colour. 0 4px 12px rgba(0, 0, 0, 0.15) is a soft shadow slightly below the box; add inset to draw it inside instead. Several shadows can be stacked with commas, which is how subtle, realistic depth is built.",
    whereItGoes:
      "On cards, dropdowns, modals, buttons, and anything that should read as raised. It doesn't change layout \u2014 the shadow is painted outside the box without pushing neighbours \u2014 so it's safe to add anywhere, and it follows border-radius.",
    mistakes: [
      "Using opaque black (#000) \u2014 real shadows are translucent. A low-alpha rgba() lets the background show through and looks far less like a sticker.",
      "Reaching for a big blur to make it 'pop' \u2014 a large hard shadow looks like a smear. Small y-offset, moderate blur, low alpha reads as depth; stack two for richness.",
      "Expecting it to add space \u2014 it won't. If a shadow is clipped by a parent, the parent has overflow: hidden, not a missing margin.",
    ],
    example: ".card {\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.12);\n}\n.card:hover { box-shadow: 0 12px 32px rgba(0,0,0,.18); }",
    related: ["border", "border-radius", "transition", "overflow"],
  },
  {
    tag: "list-style",
    category: "display & flow",
    stats: {
      type: "shorthand property",
      appliesTo: "<ul>, <ol>, <li>",
      inherits: "yes",
      commonValues: "none; disc | circle | square | decimal | lower-alpha; inside | outside",
    },
    whatItDoes:
      "Controls the bullet or number on list items: which marker (disc, square, decimal, lower-roman...), whether it sits outside or inside the text block, and optionally an image. The single most-used value is none \u2014 it removes bullets entirely, which is step one of turning a <ul> into a nav bar or a card grid. list-style-type, list-style-position and list-style-image are the longhands.",
    whereItGoes:
      "On the <ul> or <ol> (it inherits down to the <li>s). Nav lists almost always get list-style: none plus margin: 0; padding: 0 to drop the browser's default indent.",
    mistakes: [
      "Removing the bullets and forgetting the default padding-left \u2014 the list still sits indented 40px. Reset padding and margin alongside list-style.",
      "Using list-style: none and then also removing the <ul> for being 'pointless' \u2014 keep the list markup; the semantics are still a list, the styling is just different. (Safari drops list semantics when list-style is none; adding role=\"list\" restores them.)",
      "Trying to colour the bullet with color \u2014 that colours the text too. Use the ::marker pseudo-element: li::marker { color: tomato; }.",
    ],
    example: "nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  gap: 16px;\n}\nol.steps { list-style: decimal inside; }",
    related: ["display: flex", "padding", "margin", "::before / ::after"],
  },
  {
    tag: "object-fit",
    category: "display & flow",
    stats: {
      type: "property",
      appliesTo: "<img>, <video>",
      inherits: "no",
      commonValues: "cover | contain | fill | none",
    },
    whatItDoes:
      "How an image or video fills a box that isn't its natural shape. Give an <img> a fixed width and height and by default it squashes to fit (fill). object-fit: cover scales it to fill the box and crops the overflow \u2014 the right answer for thumbnails, avatars and card images. contain scales it to fit entirely inside, leaving empty bars. object-position chooses which part survives the crop (top, center, 20% 80%).",
    whereItGoes:
      "On the <img> or <video> itself, together with a width and height (or aspect-ratio) so there's a box for it to fit. Without a box of a different shape, object-fit has nothing to do.",
    mistakes: [
      "Setting width and height on a photo and shipping the squashed result \u2014 if the box isn't the image's ratio, you need object-fit: cover.",
      "Putting object-fit on the wrapper <div> \u2014 it only applies to replaced elements like <img> and <video>. The wrapper needs overflow: hidden and the img needs object-fit.",
      "Forgetting object-position when the crop cuts off faces \u2014 cover crops from the centre by default; object-position: top keeps heads in portraits.",
    ],
    example: ".avatar {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.card img {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n  object-position: top;\n}",
    related: ["width / height", "border-radius", "overflow"],
  },
  {
    tag: "float / clear",
    category: "display & flow",
    stats: {
      type: "properties",
      appliesTo: "block elements",
      inherits: "no",
      commonValues: "left | right | none; clear: both",
    },
    whatItDoes:
      "float pulls an element to the left or right edge of its container and lets text wrap around it \u2014 a photo beside a paragraph, a drop cap, a pull quote. clear tells a following element to drop below any floats instead of wrapping. Before flexbox and grid, floats were how every multi-column layout was built, which is why you'll meet them in older code and tutorials. Today they're for wrapping text around things, and nothing else.",
    whereItGoes:
      "On an image or figure inside running text, with a margin on the side the text wraps against. If a parent only contains floats it collapses to zero height; display: flow-root on the parent (the modern 'clearfix') makes it contain them.",
    mistakes: [
      "Building a page layout with floats in 2026 \u2014 columns, nav bars and card grids are flexbox or grid jobs. Floats need clearfix hacks and break the moment content heights differ.",
      "Floating an element and wondering why the parent's background vanished \u2014 floated children are taken out of the flow, so the parent has no height. Add display: flow-root to the parent.",
      "Floating the only child and then trying to centre it \u2014 a float can't be centred. Use flex or margin: auto on a block instead.",
    ],
    example: ".figure-left {\n  float: left;\n  margin: 0 16px 8px 0;\n}\n.article { display: flow-root; } /* contains the float */\n.footer { clear: both; }",
    related: ["display", "display: flex", "display: grid", "margin"],
  },
  {
    tag: ":focus / :focus-visible",
    category: "selectors",
    stats: {
      type: "pseudo-classes",
      appliesTo: "links, buttons, inputs, anything focusable",
      inherits: "n/a",
      commonValues: ":focus, :focus-visible, :focus-within",
    },
    whatItDoes:
      "Styles the element that currently has keyboard focus \u2014 the one that will react to Enter or typing. Browsers draw a default outline ring so keyboard users can see where they are. :focus matches on any focus, including a mouse click; :focus-visible matches only when the browser thinks a visible ring is needed (keyboard navigation), which is usually what you want. :focus-within matches a parent while anything inside it is focused \u2014 handy for highlighting a whole form field.",
    whereItGoes:
      "Next to your :hover rules, on buttons, links and inputs. Replace the default ring with your own (outline: 2px solid var(--accent); outline-offset: 2px) rather than removing it.",
    mistakes: [
      "outline: none on :focus to get rid of the 'ugly ring' \u2014 this makes the site unusable by keyboard. Restyle the ring; never delete it.",
      "Styling only :hover \u2014 a keyboard user never hovers. Every :hover state for an interactive element should have a :focus-visible twin, often the same rule: a:hover, a:focus-visible { ... }.",
      "Using :focus for the fancy ring and getting it on every mouse click \u2014 that's what :focus-visible is for.",
    ],
    example: "button:focus-visible,\na:focus-visible {\n  outline: 2px solid #6366f1;\n  outline-offset: 2px;\n}\n.field:focus-within { border-color: #6366f1; }",
    related: [":hover / :first-child", "border", "transition"],
  },
  {
    tag: ":nth-child() / :not()",
    category: "selectors",
    stats: {
      type: "pseudo-classes",
      appliesTo: "any element",
      inherits: "n/a",
      commonValues: ":nth-child(2), :nth-child(odd), :nth-child(3n+1), :last-child, :not(.active)",
    },
    whatItDoes:
      ":nth-child() picks elements by their position among siblings: tr:nth-child(odd) stripes a table, li:nth-child(3) hits the third item, .card:nth-child(3n) hits every third card (3, 6, 9). :first-child and :last-child are the common shortcuts. :not() flips a selector \u2014 li:not(:last-child) is every item except the last, which is the usual way to add a divider between items without one dangling at the end.",
    whereItGoes:
      "In the selector, after the element or class it narrows. Counting is 1-based and counts all siblings regardless of type; :nth-of-type counts only siblings of the same tag.",
    mistakes: [
      "Expecting :nth-child(2) to mean 'the second .card' \u2014 it means 'the element that is its parent's second child, if it's also a .card'. A heading before the cards shifts everything by one; :nth-of-type or a wrapper fixes it.",
      "Writing :nth-child(0) or starting from 0 \u2014 the first child is 1. 3n+1 gives 1, 4, 7.",
      "Using :not() to exclude by position but writing li:not(:last-child) when items are added dynamically out of order \u2014 still works, but if the 'last' item isn't visually last, prefer gap on the parent to spacing hacks.",
    ],
    example: "tr:nth-child(odd) { background: #f5f5f7; }\n.card:nth-child(3n) { margin-right: 0; }\nli:not(:last-child) { border-bottom: 1px solid #ddd; }\n.btn:not(.primary) { background: transparent; }",
    related: [":hover / :first-child", "descendant & child selectors", "specificity & the cascade"],
  },
  {
    tag: "!important",
    category: "attaching css",
    stats: {
      type: "declaration flag",
      appliesTo: "any declaration",
      inherits: "n/a",
      commonValues: "property: value !important;",
    },
    whatItDoes:
      "A flag that makes one declaration beat every normal rule regardless of specificity or order. color: red !important wins over an id selector, an inline style, anything \u2014 except another !important with higher specificity. It exists for overriding styles you don't control (a third-party widget, a utility class that must always win) and for user stylesheets. Inside your own CSS it's almost always a sign that specificity has got away from you.",
    whereItGoes:
      "At the end of a declaration, before the semicolon. Realistic uses: utility classes like .hidden { display: none !important; }, overriding an embedded widget's inline styles, and print stylesheets. Not for 'making the rule work'.",
    mistakes: [
      "Reaching for it when a rule doesn't apply \u2014 the rule isn't applying for a reason (wrong selector, lower specificity, later rule). Find that; the fix is a better selector, not a bigger hammer.",
      "Stacking it \u2014 once one rule is !important, the next override needs !important too, and the stylesheet becomes a war nobody wins. One is a smell; three is a rewrite.",
      "Putting the space in the wrong place or the flag before the value \u2014 it's value !important;, with the flag last.",
    ],
    example: "/* legitimate: a utility that must always win */\n.visually-hidden { position: absolute !important; clip: rect(0 0 0 0) !important; }\n\n/* smell: fix the selector instead */\n.title { color: red !important; }",
    related: ["specificity & the cascade", "<style>", "inherit / initial"],
  },
  {
    tag: "inherit / initial",
    category: "attaching css",
    stats: {
      type: "keyword values",
      appliesTo: "any property",
      inherits: "n/a",
      commonValues: "inherit, initial, unset, revert",
    },
    whatItDoes:
      "Four keywords every property accepts. inherit copies the parent's computed value, even for properties that don't inherit by default \u2014 a { color: inherit } is how links take the colour of surrounding text. initial resets to the property's spec default (often not what the browser's own stylesheet does). unset means inherit if the property normally inherits, otherwise initial. revert goes back to the browser's default stylesheet, which is usually what people mean when they say 'reset it'. Knowing which properties inherit (text and font properties do; box properties don't) explains half the 'why did that change' moments in CSS.",
    whereItGoes:
      "As the value of a property. Common: button, input { font: inherit; color: inherit } so form controls match the page; a { color: inherit }; and all: unset to strip a component bare before restyling it.",
    mistakes: [
      "Expecting initial to give the browser default \u2014 initial for display is inline, not the block that the browser gives a <div>. Use revert for 'browser default'.",
      "Setting font-size on <body> and wondering why inputs ignore it \u2014 form controls don't inherit font by default in most browsers; font: inherit fixes it.",
      "Using all: unset on a button and losing focus rings, cursor and keyboard behaviour \u2014 re-add outline on :focus-visible and cursor: pointer after.",
    ],
    example: "button, input, select {\n  font: inherit;\n  color: inherit;\n}\na { color: inherit; }\n.plain { all: unset; cursor: pointer; }",
    related: ["specificity & the cascade", "--custom-property", "!important"],
  },
  {
    tag: "@font-face",
    category: "color & type",
    stats: {
      type: "at-rule",
      appliesTo: "the whole stylesheet",
      inherits: "n/a",
      commonValues: "font-family, src: url(), font-weight, font-display",
    },
    whatItDoes:
      "Loads a custom font file and gives it a name you can then use in font-family. Each @font-face block points at one file (one weight and style): src: url(inter-bold.woff2) with font-weight: 700. Once declared, font-family: 'Inter' works anywhere in the stylesheet, and the browser picks the right file for each weight. Google Fonts and similar services just generate these blocks for you.",
    whereItGoes:
      "At the top of the stylesheet, before any rule that uses the family. Use woff2 (smallest, universally supported), include font-display: swap so text shows in a fallback font while the file loads, and declare each weight you actually use \u2014 nothing more, because every file is a download.",
    mistakes: [
      "Declaring the family and then naming it differently in font-family \u2014 the names must match exactly, quotes and case included, or the fallback font shows.",
      "Loading one weight and using several \u2014 the browser fakes bold and italic by smearing the glyphs (faux bold), which looks muddy. Declare a block per weight you use.",
      "Skipping font-display \u2014 on a slow connection the text stays invisible until the font arrives. swap shows fallback text immediately.",
    ],
    example: "@font-face {\n  font-family: 'Inter';\n  src: url(/fonts/inter-regular.woff2) format('woff2');\n  font-weight: 400;\n  font-display: swap;\n}\nbody { font-family: 'Inter', system-ui, sans-serif; }",
    related: ["font-family & font-size", "font-weight & line-height", "<link rel=\"stylesheet\">"],
  },
  {
    tag: "grid-template-rows",
    category: "grid",
    stats: {
      type: "property",
      appliesTo: "grid containers",
      inherits: "no",
      commonValues: "auto 1fr auto; repeat(3, 120px); minmax(200px, auto)",
    },
    whatItDoes:
      "The row-direction twin of grid-template-columns: explicitly sizes each row of the grid. Most grids leave rows alone and let content decide, but a few layouts need it \u2014 the classic sticky-footer page is grid-template-rows: auto 1fr auto on a min-height: 100vh container (header sized to content, main takes the rest, footer sized to content). Rows you don't define are 'implicit' and sized by grid-auto-rows.",
    whereItGoes:
      "On the grid container, alongside display: grid, when the rows need fixed or proportional heights. Combine with a tall container (min-height) or 1fr has no spare space to take.",
    mistakes: [
      "Writing grid-template-rows: 1fr 1fr and getting rows that grow to the tallest content anyway \u2014 1fr shares the container's height, so without a height on the container there's nothing to share.",
      "Setting fixed px rows and watching content overflow them \u2014 content doesn't shrink to fit a row. minmax(120px, auto) gives a minimum but lets the row grow.",
      "Defining three rows and adding a fourth item \u2014 the extra row is implicit and sized by grid-auto-rows (auto by default), not by your template.",
    ],
    example: ".page {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}\n.gallery {\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: minmax(160px, auto);\n}",
    related: ["grid-template-columns", "display: grid", "max-width / min-height"],
  },
  {
    tag: "grid-column / grid-row / grid-area",
    category: "grid",
    stats: {
      type: "properties",
      appliesTo: "grid items",
      inherits: "no",
      commonValues: "grid-column: 1 / 3; grid-column: span 2; grid-area: header",
    },
    whatItDoes:
      "Tell a grid item which cells it occupies. grid-column: 1 / 3 stretches an item from line 1 to line 3 (two columns); span 2 says 'two columns from wherever you land'. grid-row works the same vertically. grid-area is the shortcut when the container names its regions with grid-template-areas \u2014 the item just says grid-area: sidebar. Lines are numbered from 1 at the start, and -1 is always the last line, so grid-column: 1 / -1 is 'full width' no matter how many columns there are.",
    whereItGoes:
      "On the child item, not the container. Count lines, not cells: a three-column grid has four column lines. For a named layout, put grid-template-areas on the container and grid-area on each child.",
    mistakes: [
      "Counting cells instead of lines \u2014 grid-column: 1 / 3 covers two cells, not three. Lines sit between and around the columns.",
      "Placing items explicitly and leaving holes \u2014 items you don't place auto-flow into the next free cell, which is often not the one you expected. Place everything, or use grid-auto-flow: dense.",
      "Using grid-area with a name the container never declared \u2014 the item is placed as if the property weren't there. The name must appear in grid-template-areas.",
    ],
    example: ".layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\";\n}\nheader { grid-area: header; }\naside { grid-area: sidebar; }\n.featured { grid-column: 1 / -1; }",
    related: ["display: grid", "grid-template-columns", "grid-template-rows"],
  },
  {
    tag: "opacity",
    category: "interaction & polish",
    stats: {
      type: "property",
      appliesTo: "any element",
      inherits: "no",
      commonValues: "0 to 1 (0.5 is half transparent)",
    },
    whatItDoes:
      "How see-through an element is, from 1 (solid) to 0 (invisible). It fades the whole element \u2014 content, background, border, children \u2014 as one layer. Great for disabled states, hover fades, and fade-in animations, because it's cheap for the browser to animate. An element at opacity: 0 is still there: it takes up space and can still be clicked and tabbed to, unlike display: none.",
    whereItGoes:
      "On the element to fade, often paired with transition: opacity 200ms. For a transparent background that keeps text solid, use a colour with alpha (rgba, hsla, #rrggbbaa) on background-color instead of opacity.",
    mistakes: [
      "Using opacity to make a background translucent and discovering the text faded too \u2014 opacity fades everything. Use rgba() on the background.",
      "Hiding things with opacity: 0 and leaving them clickable and focusable \u2014 invisible buttons still get tapped. Add visibility: hidden or pointer-events: none, or use display: none.",
      "Dimming text with opacity for 'secondary' labels and failing contrast \u2014 opacity 0.5 grey on white is often unreadable. Pick an actual colour that passes contrast.",
    ],
    example: ".btn:disabled { opacity: 0.5; cursor: not-allowed; }\n.toast {\n  opacity: 0;\n  transition: opacity 200ms;\n}\n.toast.show { opacity: 1; }",
    related: ["transition", "color & background-color", "display"],
  },
  {
    tag: "cursor",
    category: "interaction & polish",
    stats: {
      type: "property",
      appliesTo: "any element",
      inherits: "yes",
      commonValues: "pointer | default | text | not-allowed | grab | move | wait | none",
    },
    whatItDoes:
      "Which mouse pointer shows over an element. Browsers give links the hand (pointer) automatically but not buttons or anything else you make clickable, so cursor: pointer is the tiny rule that makes a custom button, card or icon feel interactive. not-allowed signals a disabled control; text is the I-beam; grab/grabbing suit drag handles. Touch screens ignore it entirely, so it's a hint, never the only one.",
    whereItGoes:
      "On anything with a click handler that isn't an <a> \u2014 buttons, clickable cards, tabs, close icons. Pair with a hover style; the cursor alone is easy to miss.",
    mistakes: [
      "Putting cursor: pointer on things that don't do anything \u2014 users click and nothing happens. Pointer is a promise.",
      "Relying on it for affordance \u2014 there's no cursor on a phone. Make clickable things look clickable with colour, border or hover states too.",
      "Forgetting cursor: not-allowed (or default) on a disabled button that inherited pointer from .btn \u2014 it still invites the click.",
    ],
    example: "button, .card[onclick], .tab { cursor: pointer; }\n.btn:disabled { cursor: not-allowed; }\n.handle { cursor: grab; }\n.handle:active { cursor: grabbing; }",
    related: [":hover / :first-child", "opacity", "transition"],
  },
  {
    tag: "transform",
    category: "interaction & polish",
    stats: {
      type: "property",
      appliesTo: "any element",
      inherits: "no",
      commonValues: "translateY(-2px), scale(1.05), rotate(45deg), translate(-50%, -50%)",
    },
    whatItDoes:
      "Moves, scales, rotates or skews an element visually without touching the layout around it. The element keeps its original slot; only its painted result shifts. That makes transform the right tool for hover lifts (translateY(-2px)), subtle zooms (scale(1.03)), spinning icons (rotate(180deg)), and the centring trick: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%). Browsers animate transforms on the GPU, so they stay smooth where animating top/left or width stutters.",
    whereItGoes:
      "On the element to move, usually in a :hover or active state with a transition on the base rule. Several functions can be combined in one value, applied right to left: transform: translateY(-2px) scale(1.02).",
    mistakes: [
      "Animating top/left/margin for movement \u2014 layout recalculates every frame and janks. Animate transform instead; same visual, far smoother.",
      "Expecting neighbours to move out of the way \u2014 they won't; transform is purely visual. If space must change, use margin or layout.",
      "Scaling text up with transform and getting blur \u2014 transform scales the rendered pixels. For text that should be bigger, change font-size.",
    ],
    example: ".card {\n  transition: transform 150ms, box-shadow 150ms;\n}\n.card:hover { transform: translateY(-4px); }\n.chev.open { transform: rotate(180deg); }\n.modal {\n  position: absolute; top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}",
    related: ["transition", "animation / @keyframes", "position", "box-shadow"],
  },
  {
    tag: "animation / @keyframes",
    category: "interaction & polish",
    stats: {
      type: "property + at-rule",
      appliesTo: "any element",
      inherits: "no",
      commonValues: "name duration timing-function delay iteration-count; @keyframes name { from {} to {} }",
    },
    whatItDoes:
      "Animation that runs on its own, without a state change to trigger it. @keyframes names a sequence of steps (from/to, or percentages) and animation plays it: animation: spin 1s linear infinite rotates a loading spinner forever; animation: fade-in 300ms ease-out plays a one-shot entrance. transition is for 'go from A to B when something changes'; animation is for 'play this sequence', including loops and multi-step choreography.",
    whereItGoes:
      "@keyframes at the top level of the stylesheet; the animation property on the element. Stick to transform and opacity inside keyframes for smoothness, and respect @media (prefers-reduced-motion: reduce) by shortening or removing animations for people who've asked for less motion.",
    mistakes: [
      "Writing the @keyframes name differently from the animation name \u2014 a typo means nothing plays, with no error.",
      "Animating width, height, top or left \u2014 these force layout every frame and stutter. Animate transform and opacity.",
      "Ignoring prefers-reduced-motion \u2014 looping or large motion can make some users ill. One media query at the bottom of the file turns it off for them.",
    ],
    example: "@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.spinner { animation: spin 1s linear infinite; }\n\n@media (prefers-reduced-motion: reduce) {\n  .spinner { animation-duration: 3s; }\n}",
    related: ["transition", "transform", "opacity", "@media"],
  },
];

export function getCssNestEntry(tag: string): NestEntry | undefined {
  return CSS_NEST.find((e) => e.tag === tag);
}
