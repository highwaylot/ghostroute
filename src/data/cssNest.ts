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
      "<style> holds CSS written straight into the page. Everything between <style> and </style> is read as CSS, not HTML. A rule like h1 { color: teal; } works exactly as it would in a separate .css file. It is the simplest way to attach CSS, with no second file and no path to get wrong. That is why every exercise here starts with one.",
    whereItGoes:
      "Inside <head>, so the browser knows the styles before it draws the page. For a real site with several pages, move the rules to a .css file and attach it with <link rel=\"stylesheet\">. Then every page shares them.",
    mistakes: [
      "Writing HTML inside it. <style> switches the browser into CSS mode, so <h1> { } is an error. Write the bare selector: h1 { }.",
      "Leaving off </style>. The browser reads the rest of the page as CSS, and the page goes blank from that point.",
      "Using the style=\"\" attribute instead. A style on one tag beats every rule in the <style> block. A stray style=\"\" is the classic reason a rule \"does not work.\"",
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
      "<link rel=\"stylesheet\" href=\"style.css\"> attaches a CSS file to an HTML page. Without it, a .css file full of rules just sits there, and nothing tells the browser to use it.",
    whereItGoes:
      "Inside <head>. Then the browser loads the styles before it draws the page, instead of showing an unstyled page for a moment first.",
    mistakes: [
      "A wrong or misspelled href. The browser says nothing. The styles just never show up.",
      "Putting it at the bottom of <body> to \"make the page load faster.\" It usually backfires: the page flashes unstyled, then jumps.",
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
      "Every CSS rule has the same shape: h1 { color: teal; }. The part before the brace is the selector. It names what to change. Inside the braces are one or more declarations. Each declaration is a property, a colon, a value and a semicolon.",
    whereItGoes:
      "In a .css file, or inside a <style> tag in <head>. Never written inside a tag like an attribute. That is the separate, more limited style=\"\" form.",
    mistakes: [
      "Forgetting the semicolon after a declaration. The browser usually recovers, but it can quietly drop the next declaration on the same line.",
      "A { with no matching }. Everything after it in the file can end up inside that rule by accident.",
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
      "Two rules can change the same thing on the same tag. The cascade is how the browser picks the winner. First it looks at specificity: how precise the selector is. An id beats a class, and a class beats a tag name. If two rules are equally specific, the one written later wins.",
    whereItGoes:
      "You do not write it. It is how the browser reads everything you have already written. It explains almost every \"my CSS is not working\" bug.",
    mistakes: [
      "Reaching for !important to force a rule to win. It works, but it breaks the normal order for everyone who edits the file after you, including future you.",
      "Assuming the rule further down the file always wins. An id selector earlier in the file still beats a class selector later. Order only breaks ties.",
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
      "A custom property is a value you name once and reuse. Define it: --brand: #6366f1;. Use it anywhere: color: var(--brand);. Change the one definition and every place that uses var() updates. It is like find and replace for a color, except it is reliable and it works live.",
    whereItGoes:
      "Defined inside a rule. :root (which means the whole page) is the usual spot for one the whole site uses. Used anywhere a normal value would go, inside var().",
    mistakes: [
      "Defining it in a narrow rule like .card and then using it outside the card. A custom property is only visible to the tag it is defined on and the tags inside that one.",
      "Forgetting the -- at the front. custom-color: blue; is just an unknown property the browser ignores.",
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
      ".card picks every tag that has class=\"card\", however many there are. It is the everyday selector: style the look once, reuse it everywhere.",
    whereItGoes:
      "Anywhere the same look is needed on several tags that are not related in any other way.",
    mistakes: [
      "Naming classes after how something looks (.red-text) instead of what it is (.error). The look will change. The name should not have to.",
      "Doubling up classes in the selector (.card.card) to force a rule to win, instead of checking why the first rule lost.",
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
      "#title picks the one tag with id=\"title\". An id selector is much more specific than a class, which is exactly why it is used sparingly for styling.",
    whereItGoes:
      "For things there is only one of: the page header, a tag JavaScript also needs to find.",
    mistakes: [
      "Using an id selector for anything reusable. Its high specificity makes it stubbornly hard to override from a class later.",
      "Using the same id on more than one tag. CSS will not complain, but ids must be unique, and JavaScript will only ever find the first one.",
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
      "Two selectors joined together pick tags based on where they sit. A space means anywhere inside: nav a is every link inside a nav, at any depth. A > means directly inside only: nav > a. A + means the very next tag after: h1 + p.",
    whereItGoes:
      "Whenever the same tag or class should look different depending on where it is on the page.",
    mistakes: [
      "Using a space when > was meant. The space version catches tags several levels deep, which can be more than you intended.",
      "Chaining many selectors, like nav ul li a span. It works, but it is fragile. Change the HTML slightly and the rule quietly stops matching.",
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
      "A word after a colon narrows a selector by state or position. a:hover picks a link while the mouse is over it. li:first-child picks the first item in a list. :focus picks the field the keyboard is in.",
    whereItGoes:
      "Stuck directly onto the end of a selector, with no space before the colon.",
    mistakes: [
      "Expecting :hover to work like a tap on a phone. Touch screens have no hover, so that state may never show.",
      "Styling :hover without a matching :focus. Someone moving through the page with the keyboard never hovers, and loses the same visual cue.",
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
      "box-sizing decides what width and height measure. The default, content-box, measures just the content. Padding and border get added on top, so the box ends up bigger than the number you wrote. border-box counts them inside the width you set, which is what people expect.",
    whereItGoes:
      "Almost always set once, for everything, at the top of a stylesheet: * { box-sizing: border-box; }.",
    mistakes: [
      "Setting width: 100% on a box with padding under the default. The padding is added on top and the box spills out of its parent.",
      "Setting border-box on one tag but not the rest. Two sizing models on the same page give sizes that do not line up.",
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
      "Margin is empty space outside a box. It pushes other boxes away. When two boxes stack, their top and bottom margins overlap: you get the larger of the two, not the sum.",
    whereItGoes:
      "On any box that needs room from its neighbors.",
    mistakes: [
      "Expecting two stacked margins to add up. Between stacked boxes, only the larger one counts.",
      "Using margin: auto to center a box that has no width set. Auto centering only works once the box has a width.",
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
      "Padding is space inside a box, between its content and its edge. The background color shows through the padding, because it is inside the box. Margin, outside the box, stays empty.",
    whereItGoes:
      "On any box whose content sits too close to its own edge.",
    mistakes: [
      "Using margin when padding was meant, or the other way round. Margin pushes other boxes away. Padding gives the content inside more room.",
      "Forgetting box-sizing: border-box, then being surprised that padding made the box wider than the width you set.",
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
      "border draws a visible line around a box, between its padding and its margin. One value sets all three parts: thickness, style and color, like 1px solid #333.",
    whereItGoes:
      "On any box that needs a visible edge: a card, a text field, a divider.",
    mistakes: [
      "Setting border-color without a style. The style defaults to none, so without a word like solid nothing shows, whatever the color.",
      "Forgetting that the border adds to the box's size under the default box-sizing. Same gotcha as padding.",
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
      "color sets the color of the text. It passes down to every tag inside, unless a rule overrides it. background-color fills the box behind the content. It does not pass down. Each tag's background is clear by default.",
    whereItGoes:
      "color on anything with text in it. background-color on any box.",
    mistakes: [
      "Setting a light background without checking that the text color still stands out against it.",
      "Expecting background-color to pass down like color does. A parent's background never spreads to the tags inside it on its own.",
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
      "font-family lists the typefaces to try, in order. If the first is missing, the browser tries the next. font-size sets how big the text is. Most other text sizes, like line-height, are measured from it.",
    whereItGoes:
      "Usually set once on body and passed down to everything. Override only where a specific tag really needs to differ.",
    mistakes: [
      "Listing one font with no general fallback like sans-serif at the end. If that font fails to load, the browser picks something unpredictable.",
      "Setting every font-size in px. That ignores a reader's own text-size setting. rem scales with it.",
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
      "font-weight sets how bold text is: 400 is normal, 700 is bold. line-height sets how tall each line of text is. That is what makes a paragraph feel airy or cramped.",
    whereItGoes:
      "font-weight wherever text needs emphasis. line-height on body text, so long passages are easy to read.",
    mistakes: [
      "Using a weight the font file does not include. The browser fakes it by thickening the letters, and it looks noticeably worse than a real bold.",
      "Leaving line-height at the browser default for body text. Tight lines in a dense paragraph are harder to read.",
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
      "Every tag is either a block or inline. A block, like <p>, starts on its own line and stretches across the page. Inline, like <strong>, sits inside a line of text and only takes the room its words need. Inline tags ignore width and height. display lets you change which one a tag is. inline-block sits in the line but also accepts a size.",
    whereItGoes:
      "On a tag whose built-in behavior is not what you need.",
    mistakes: [
      "Setting width or height on an inline tag like <span> without changing its display first. Inline tags ignore those properties.",
      "Using display: none to hide something that a screen reader (software that reads the page aloud) should still find. none removes it from everyone.",
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
      "position changes where a box sits compared to its normal place. relative nudges it from where it would have been, and nothing else moves. absolute takes it out of the flow and places it against the nearest parent that also has a position. fixed pins it to the screen. sticky acts normal until you scroll past it, then sticks.",
    whereItGoes:
      "Wherever a box needs to leave the normal flow: an overlay, a pinned header, a badge in a corner.",
    mistakes: [
      "Using position: absolute with no parent that has position: relative. The box is then placed against the whole page instead of the box you meant.",
      "Using position to build a layout like a row of cards. That is a flexbox or grid job. position is for overlaps and pinning.",
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
      "When two boxes overlap, z-index decides which is on top. A higher number sits above a lower one. It only works on a box that also has a position other than the default. On a normal box it is silently ignored.",
    whereItGoes:
      "On the same box as its position rule, whenever that box must sit above or below something it overlaps.",
    mistakes: [
      "Setting z-index on a box with no position. Nothing happens, and it is easy to miss why.",
      "Reaching for bigger and bigger numbers (999, 9999) to win a fight. That is a sign two parts of the page are using the same range with no plan. Find the real order instead.",
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
      "display: flex goes on a parent tag. The tags directly inside it become flex items and line up in a row. Only the direct children, not their children. A few new properties then control how the items space out and line up.",
    whereItGoes:
      "On any parent whose children should sit in a row or column instead of stacking.",
    mistakes: [
      "Expecting display: flex to reach grandchildren. Tags two levels down are untouched until their own parent is also flex.",
      "Putting justify-content or align-items on the children. Those properties only do something on the parent that has display: flex.",
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
      "Both go on the flex parent. justify-content spaces the items along the row: left, right, center, or spread out. align-items lines them up the other way: top, bottom or middle. Together they answer most \"how do I center this\" questions.",
    whereItGoes:
      "On the parent that has display: flex. Never on the items themselves.",
    mistakes: [
      "Mixing up which one goes which way. In a row, justify-content is left to right and align-items is top to bottom.",
      "Using justify-content to center one item top to bottom. In a row, that is align-items.",
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
      "By default, flex items squeeze onto one line even when they do not fit. flex-wrap: wrap lets them drop onto a new line instead. gap adds even space between the items, with no margin on each one.",
    whereItGoes:
      "On the flex parent, whenever items should wrap on small screens or need even spacing.",
    mistakes: [
      "Forgetting flex-wrap on a row that should reflow on phones. Without it, the items shrink and squeeze instead of wrapping.",
      "Using margin on each item for spacing instead of gap on the parent. gap does not add extra space at the ends the way margins do.",
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
      "A media query wraps rules that only apply when a condition is true. Almost always the condition is a screen width: @media (max-width: 600px) { ... } means \"on screens 600 pixels wide or less.\" It is how one page can lay out differently on a phone and a desktop.",
    whereItGoes:
      "Anywhere in a stylesheet. The rules inside only take effect when the condition matches. Specificity and order still apply inside it.",
    mistakes: [
      "Writing one rule for \"mobile\" and never testing the sizes between phone and desktop. A tablet can fall between two rules that do not account for it.",
      "Designing for desktop first and adding max-width queries on top. Starting from the phone and adding min-width queries is usually less CSS to undo.",
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
      "Units that scale instead of staying fixed. rem is measured from the page's base text size, usually 16px, so 2rem is 32px. % is measured from the parent box. vw and vh are a percent of the screen's width and height.",
    whereItGoes:
      "Anywhere a fixed px value would fight a reader's settings or a different screen size.",
    mistakes: [
      "Using em instead of rem for text sizes inside nested tags. em multiplies through every parent, so sizes drift as nesting gets deeper.",
      "Setting width: 100vw on a page that has a vertical scrollbar. 100vw includes the scrollbar's width, so the page gets a small sideways scroll.",
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
      "transition makes a change glide instead of snapping. transition: color 0.2s; means \"when color changes, take 0.2 seconds to get there.\" Something else, like :hover, has to cause the change.",
    whereItGoes:
      "On the tag in its normal state, not on the :hover rule.",
    mistakes: [
      "Putting transition inside the :hover rule. Then it only glides on the way in. When the mouse leaves, it snaps back.",
      "Using transition: all as a catch-all. It can quietly animate things it should not, like layout sizes, and slow the page down.",
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
      "::before and ::after add an extra box inside a tag without adding a tag to the HTML. One goes before the real content, one after. Style it like anything else. Decorative quote marks, an arrow after a link, a colored stripe on a card, a dimming overlay. The box only appears if content is set, even to an empty string.",
    whereItGoes:
      "On the end of a selector with two colons: .card::before. Set content (required), then style it. Most layouts give it position: absolute so it sits over or beside the tag without pushing text around.",
    mistakes: [
      "Forgetting content. Without it the box does not appear at all, even with a size and a background. content: \"\" is enough.",
      "Putting real text or meaning in it. A screen reader (software that reads the page aloud) mostly skips it. Anything a visitor needs belongs in the HTML.",
      "Using it on an <img> or <input>. Tags that cannot hold children cannot hold these either. Wrap them in a <span> and attach it there.",
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
      "width and height set how big a box is. auto, the default, means as wide as the parent and as tall as the content. That is right more often than a fixed number. min- and max- versions set a floor and a ceiling. width: 100% with max-width: 480px fills a phone screen and stops growing on a monitor.",
    whereItGoes:
      "On the box being sized. Remember box-sizing: without border-box, padding and border are added on top of the width you set.",
    mistakes: [
      "Setting a fixed height on a box that holds text. The moment the text wraps one more line, it spills out the bottom. Leave height auto, or use min-height.",
      "Setting width on an inline tag like <a> or <span> and seeing nothing. Inline tags ignore width and height. Change display first.",
      "Using width: 100% plus padding, then wondering why it spills over. Under the default box-sizing the padding is added to the 100%. Set border-box.",
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
      "border-radius rounds the corners of a box. The border, the background and anything clipped inside all follow the curve. A small value softens a card. 50% on a square makes a circle. A huge value on a wide box makes a pill.",
    whereItGoes:
      "On the box whose corners should round. It works with or without a visible border, because the background rounds too.",
    mistakes: [
      "Expecting a child image to round when only the parent has border-radius. The parent also needs overflow: hidden to clip its children to the curve.",
      "Using 50% on a box that is not square and hoping for a circle. You get an oval. Make the width and height equal first.",
      "Rounding every single box with a different value. A few consistent sizes (4px for inputs, 12px for cards) read as a system. Random values read as noise.",
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
      "text-align lines up the text inside a box: left, right or center. It also moves inline things like images and inline-block buttons. It goes on the box, not on the text. text-align: center on a <div> centers everything inline inside that <div>.",
    whereItGoes:
      "On the box whose contents should line up. It passes down, so setting it on <body> or a section affects everything inside.",
    mistakes: [
      "Using it to center a block like a <div> or a card. It only moves inline content. A block centers with margin: 0 auto plus a width, or with flexbox on its parent.",
      "Putting it on the thing you want moved instead of its parent. text-align: center on a <span> does nothing. The <span> is the thing being lined up.",
      "Using justify on web text. It stretches the spaces to fill each line, which leaves ugly gaps in narrow columns.",
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
      "text-decoration draws a line under, through or over text. underline is what every link gets by default. none removes it. line-through strikes text out. font-style switches between upright and italic.",
    whereItGoes:
      "On the text. The most common use is a { text-decoration: none; } to drop link underlines. Then give links some other sign that they are clickable.",
    mistakes: [
      "Removing underlines from links in running text and giving them nothing else. Color alone fails for colorblind readers. Keep the underline, or bring it back on hover and focus.",
      "Using font-style: italic on text that should be <em>, or line-through on text that should be <del>. The look is right but the meaning is lost. Use the tag and let it style itself.",
      "Trying to remove an underline from a child when the parent is underlined. The line passes down and cannot be removed from inside. Remove it on the parent.",
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
      "overflow decides what happens when the content inside a box is bigger than the box. visible, the default, lets it spill out over whatever is next. hidden clips it. auto adds a scrollbar only when needed. scroll always shows one. It only matters once the box has a size the content can exceed.",
    whereItGoes:
      "On the box that has a fixed width or height. A box that just grows with its content never overflows, so there is nothing to decide.",
    mistakes: [
      "Setting overflow: auto on a box with no height. It never overflows, so nothing scrolls. The box needs a height, a max-height, or a flex or grid parent holding it in.",
      "Using overflow: hidden to fix a layout problem without finding the cause. It hides the symptom. The content is still too big, and whatever got cut off is now invisible to everyone.",
      "Forgetting that overflow: hidden also clips absolute-positioned children that reach past the edge. A dropdown menu inside such a box gets cut off.",
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
      "flex-direction sets which way a flex parent lays its items out: side by side (row, the default) or stacked (column). It also turns the whole axis system. In a column, justify-content works top to bottom and align-items works left to right, the reverse of a row. That swap is what trips people up.",
    whereItGoes:
      "On the flex parent, next to display: flex. The classic use is a row on desktop that becomes a column inside a @media query on phones.",
    mistakes: [
      "Switching to column and then wondering why justify-content: center no longer centers left to right. In a column, justify-content is the vertical axis. Use align-items: center.",
      "Using flex-direction: column on a tag whose children should just stack. Blocks already stack. Flex column is for when you also need gap, alignment or stretching.",
      "Using row-reverse or column-reverse to change the visual order. Keyboard and a screen reader (software that reads the page aloud) order still follow the HTML, so visitors tab through it backwards. Reorder the HTML instead.",
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
      "flex is the one flex property that goes on the items, not the parent. flex-grow says how much of the spare space this item takes. flex-shrink says how much it gives up when there is not enough. flex-basis is its starting size. flex: 1 means \"share the room equally.\" flex: 0 0 240px means \"exactly 240px, never grow, never shrink,\" like a fixed sidebar next to a stretchy main area.",
    whereItGoes:
      "On the items inside whatever has display: flex. Different items can have different values. That is the point.",
    mistakes: [
      "Setting flex: 1 on the parent instead of the items. It only means something on a child of a flex parent.",
      "Expecting equal columns from flex: 1 when the items hold very different content. flex: 1 sets the starting size to 0 and shares all the room, so it does give equal columns. flex: 1 1 auto does not, because it starts from each item's own size.",
      "Fighting an item that will not shrink below its content. A long word or an image sets a minimum. Add min-width: 0 to the item to let it shrink past that.",
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
      "display: grid turns a parent into a grid. Its direct children snap into rows and columns you define, both directions at once. Flexbox is one line that wraps. Grid is a true table of cells. A photo gallery, a dashboard of cards, a page with a header, sidebar and main area. Anything you would sketch as boxes on graph paper is grid.",
    whereItGoes:
      "On the parent. On its own it does almost nothing you can see. Pair it with grid-template-columns to define the columns, and gap for spacing.",
    mistakes: [
      "Using grid for a simple row of items that just need to sit side by side. Flexbox is simpler there. Grid earns its keep when both rows and columns must line up.",
      "Setting grid properties on the children and expecting a layout. Like flexbox, the parent owns the layout. Children only need rules if they span cells.",
      "Forgetting gap and adding margin to every child. gap puts even space between cells without the extra space at the edges that margins leave.",
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
      "grid-template-columns defines the columns of a grid: how many, and how wide. The fr unit is the key. It means \"one share of whatever space is left.\" 1fr 1fr 1fr is three equal columns. 240px 1fr is a fixed sidebar beside a stretchy main area. repeat(auto-fit, minmax(200px, 1fr)) fits as many 200px columns as the width allows, then stretches them. That is a responsive grid with no media query at all.",
    whereItGoes:
      "On the grid parent, next to display: grid. grid-template-rows is the same idea for rows, though rows are usually left to size themselves.",
    mistakes: [
      "Writing percentages instead of fr. 33% 33% 33% plus a gap spills out of the box, because the percentages do not know about the gap. fr does.",
      "Hard-coding a column count and then needing a media query to change it on phones. repeat(auto-fit, minmax(...)) handles that on its own.",
      "Expecting a wide item to span two columns on its own. Each child takes one cell unless you say otherwise with grid-column: span 2.",
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
      "calc() lets a value be a sum, and it can mix units the browser could not otherwise combine. calc(100% - 240px) is \"the parent's width minus a fixed sidebar.\" calc(100vh - 64px) is \"the screen height minus the header.\" Neither can be written as a single number.",
    whereItGoes:
      "Anywhere a length goes: width, height, padding, margin, font-size, top, left. Write the math inside the parentheses.",
    mistakes: [
      "Leaving out the spaces around + and -. calc(100%-240px) is invalid and the whole declaration is dropped. The spaces are required.",
      "Using it where a simpler tool exists. calc(100% - 32px) for padding is what box-sizing: border-box already solves. calc for equal columns is what fr already solves.",
      "Dividing by a value with a unit. calc(100% / 50px) is not allowed. The number you divide by must be plain.",
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
      "background is the shorthand for everything behind a box's content: a color, an image, a gradient, and how the image sits. background: #222 is the same as background-color: #222. background: url(hero.jpg) center / cover no-repeat puts an image in, centers it, scales it to fill, and stops it repeating. A gradient counts as an image: background: linear-gradient(to right, #0ea5e9, #6366f1).",
    whereItGoes:
      "On the box that should carry the color or image: a hero section, a card, <body> for the whole page. The image sits behind the content, so keep the text readable on top of it.",
    mistakes: [
      "Writing background: red after a background-image rule and losing the image. The shorthand resets every background property you leave out. Use background-color when you only mean the color.",
      "Forgetting background-size: cover (or the / cover part of the shorthand). A large photo shows at its real size and repeats, so you see the top-left corner four times.",
      "Putting meaningful pictures in the background. A CSS background has no alt text. If the picture is content, it is an <img>. If it is decoration, background is right.",
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
      "Two small dials for text. text-transform changes the case as it displays: uppercase for a label or button, capitalize for a title. The HTML stays as typed, so copy and paste gives the original. letter-spacing adds or removes space between letters. A little extra space helps small capitals breathe. A touch of negative space tightens a big headline.",
    whereItGoes:
      "On the text or a parent. Both pass down. A common pair: text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px for a small label or a nav link.",
    mistakes: [
      "Typing the text in capitals in the HTML instead. A screen reader (software that reads the page aloud) may spell all-caps words letter by letter, and CSS cannot undo it. Lowercase in HTML, uppercase in CSS.",
      "Using px for letter-spacing on text that changes size. 2px is loose on 12px text and invisible on 48px. em scales with the text.",
      "Adding spacing to capitals and forgetting it also lands after the last letter. Centered labels drift right. A matching negative margin-right fixes it.",
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
      "Limits instead of fixed sizes. width: 1100px is 1100px even on a 400px phone. max-width: 1100px means \"as wide as there is room, but never more than 1100px.\" That is how every centered content column is built. min-height means \"at least this tall, and taller if the content needs it.\" A full-screen hero uses min-height: 100vh. max-height and min-width work the same way.",
    whereItGoes:
      "max-width on wrappers and text columns, where 65ch keeps lines readable. On images, where max-width: 100% stops them spilling out. On anything that must shrink on small screens. min-height on heroes, cards and footers that must not collapse.",
    mistakes: [
      "Using width for the content column and getting a sideways scrollbar on phones. A fixed width cannot shrink. max-width can.",
      "Setting height: 100vh on a hero and then adding content. It spills out and overlaps the next section. min-height grows with the content.",
      "Forgetting that max-width: 100% on an image measures the parent. With no parent width, a 4000px photo still shows at 4000px. Give the parent a width.",
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
      "box-shadow draws a shadow around a box. It is the lift that makes a card look like it floats above the page. The value is: sideways offset, downward offset, blur, spread, color. 0 4px 12px rgba(0, 0, 0, 0.15) is a soft shadow just below the box. Add inset to draw it inside instead. Several shadows can be listed with commas for a more realistic depth.",
    whereItGoes:
      "On cards, dropdowns, popups, buttons, and anything that should look raised. It does not change layout. The shadow is painted outside the box without pushing neighbors, and it follows border-radius.",
    mistakes: [
      "Using solid black. Real shadows are see-through. A low-alpha rgba() lets the background show through and looks far less like a sticker.",
      "Reaching for a huge blur to make it \"pop.\" A big hard shadow looks like a smear. Small offset, moderate blur, low alpha reads as depth.",
      "Expecting it to add space. It does not. If a shadow is cut off by a parent, the parent has overflow: hidden, not a missing margin.",
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
      "list-style controls the bullet or number on a list. Which marker: disc, square, decimal, lower-roman. Whether it sits outside or inside the text. Optionally, an image. The most used value is none. It removes the bullets, which is step one of turning a <ul> into a nav bar or a card grid.",
    whereItGoes:
      "On the <ul> or <ol>. It passes down to the <li> tags. Nav lists almost always get list-style: none plus margin: 0; padding: 0 to drop the default indent.",
    mistakes: [
      "Removing the bullets and forgetting the default padding-left. The list still sits indented 40px. Reset padding and margin as well.",
      "Removing the bullets and then removing the <ul> as \"pointless.\" Keep the list tags. It is still a list; only the look changed. Safari drops list meaning when list-style is none, and role=\"list\" restores it.",
      "Trying to color the bullet with color. That colors the text too. Use li::marker { color: tomato; }.",
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
      "object-fit decides how an image or video fills a box that is not its natural shape. Give an <img> a fixed width and height and by default it squashes to fit. object-fit: cover scales it to fill the box and crops what spills over. That is the right answer for thumbnails, avatars and card images. contain scales it to fit inside, leaving empty bars. object-position chooses which part survives the crop.",
    whereItGoes:
      "On the <img> or <video> itself, with a width and height (or aspect-ratio) so there is a box to fit. Without a box of a different shape, object-fit has nothing to do.",
    mistakes: [
      "Setting width and height on a photo and shipping the squashed result. If the box is not the image's shape, you need object-fit: cover.",
      "Putting object-fit on the wrapper <div>. It only works on <img> and <video>. The wrapper needs overflow: hidden, and the img needs object-fit.",
      "Forgetting object-position when the crop cuts off faces. cover crops from the center by default. object-position: top keeps heads in portraits.",
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
      "float pulls a box to the left or right edge of its parent and lets text wrap around it. A photo beside a paragraph, a pull quote. clear tells a later box to drop below any floats instead of wrapping. Before flexbox and grid, floats were how every column layout was built, which is why you will meet them in older code. Today they are for wrapping text around things, and nothing else.",
    whereItGoes:
      "On an image or figure inside running text, with a margin on the side the text wraps against. If a parent only contains floats it collapses to zero height. display: flow-root on the parent makes it contain them.",
    mistakes: [
      "Building a page layout with floats today. Columns, nav bars and card grids are flexbox or grid jobs. Floats need hacks and break the moment content heights differ.",
      "Floating a box and wondering why the parent's background vanished. Floated children leave the flow, so the parent has no height. Add display: flow-root to the parent.",
      "Floating the only child and then trying to center it. A float cannot be centered. Use flex, or margin: auto on a block.",
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
      ":focus picks the tag the keyboard is currently in, the one that reacts to Enter or typing. Browsers draw a ring around it so keyboard users can see where they are. :focus matches on any focus, including a mouse click. :focus-visible matches only when the browser thinks a ring is needed, mostly keyboard use. That is usually what you want. :focus-within matches a parent while anything inside it is focused.",
    whereItGoes:
      "Next to your :hover rules, on buttons, links and inputs. Replace the default ring with your own, like outline: 2px solid #6366f1; outline-offset: 2px. Never just remove it.",
    mistakes: [
      "Writing outline: none to get rid of the \"ugly ring.\" That makes the site unusable by keyboard. Restyle the ring. Never delete it.",
      "Styling only :hover. A keyboard user never hovers. Every :hover state needs a :focus-visible twin, often the same rule: a:hover, a:focus-visible { ... }.",
      "Using :focus for a fancy ring and getting it on every mouse click. That is what :focus-visible is for.",
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
      ":nth-child() picks tags by their position among their siblings. tr:nth-child(odd) stripes a table. li:nth-child(3) is the third item. .card:nth-child(3n) is every third card. :first-child and :last-child are the common shortcuts. :not() flips a selector. li:not(:last-child) is every item except the last, which is how you add a divider between items without one hanging off the end.",
    whereItGoes:
      "In the selector, after the tag or class it narrows. Counting starts at 1 and counts every sibling, whatever its tag. :nth-of-type counts only siblings with the same tag.",
    mistakes: [
      "Expecting :nth-child(2) to mean \"the second .card.\" It means \"the parent's second child, if it is also a .card.\" A heading before the cards shifts everything by one. :nth-of-type fixes it.",
      "Starting the count at 0. The first child is 1. 3n+1 gives 1, 4, 7.",
      "Using :not(:last-child) for spacing when items can be added out of order. It still works, but gap on the parent is simpler and never leaves a stray divider.",
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
      "!important makes one declaration beat every normal rule, whatever the specificity or order. color: red !important wins over an id selector and even an inline style. It exists for overriding styles you do not control, like a third-party widget, and for utility classes that must always win. Inside your own CSS it is almost always a sign that specificity got away from you.",
    whereItGoes:
      "At the end of a declaration, before the semicolon. Honest uses: .hidden { display: none !important; }, overriding a widget's inline styles, print styles. Not for making a rule work.",
    mistakes: [
      "Reaching for it when a rule does not apply. The rule is losing for a reason: wrong selector, lower specificity, an earlier rule. Find that. A better selector is the fix.",
      "Stacking it. Once one rule has !important, the next override needs it too, and the stylesheet becomes a war nobody wins. One is a smell. Three is a rewrite.",
      "Putting the flag before the value. It is value !important; with the flag last.",
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
      "Four keywords every property accepts. inherit copies the parent's value, even for properties that do not pass down on their own. a { color: inherit } is how links take the color of the text around them. initial resets to the property's built-in default, which is often not what the browser's own stylesheet does. unset means inherit if the property normally passes down, otherwise initial. revert goes back to the browser's default stylesheet, which is usually what people mean by \"reset it.\"",
    whereItGoes:
      "As the value of a property. Common: button, input { font: inherit; color: inherit } so form fields match the page, and a { color: inherit }.",
    mistakes: [
      "Expecting initial to give the browser default. initial for display is inline, not the block the browser gives a <div>. Use revert for the browser default.",
      "Setting font-size on <body> and wondering why inputs ignore it. Form fields do not inherit fonts by default in most browsers. font: inherit fixes it.",
      "Using all: unset on a button and losing the focus ring, the cursor and keyboard behavior. Add outline on :focus-visible and cursor: pointer back afterwards.",
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
      "@font-face loads a font file and gives it a name you can use in font-family. Each block points at one file for one weight and style: src: url(inter-bold.woff2) with font-weight: 700. After that, font-family: 'Inter' works anywhere, and the browser picks the right file for each weight. Google Fonts and similar services just write these blocks for you.",
    whereItGoes:
      "At the top of the stylesheet, before any rule that uses the family. Use woff2, add font-display: swap so text shows in a fallback font while the file loads, and declare only the weights you use. Every file is a download.",
    mistakes: [
      "Naming the family differently in font-family than in @font-face. The names must match exactly, quotes and case included, or the fallback font shows.",
      "Loading one weight and using several. The browser fakes bold and italic by smearing the letters, which looks muddy. Declare a block for each weight you use.",
      "Skipping font-display. On a slow connection the text stays invisible until the font arrives. swap shows fallback text right away.",
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
      "grid-template-rows is the row twin of grid-template-columns. It sizes each row. Most grids leave rows alone and let content decide, but some layouts need it. The classic sticky-footer page is grid-template-rows: auto 1fr auto on a min-height: 100vh parent. The header is sized to its content, the main area takes the rest, the footer is sized to its content. Rows you do not define are sized by grid-auto-rows.",
    whereItGoes:
      "On the grid parent, next to display: grid, when rows need fixed or shared heights. Give the parent a height or min-height, or 1fr has no spare room to take.",
    mistakes: [
      "Writing grid-template-rows: 1fr 1fr and getting rows that grow to the tallest content anyway. 1fr shares the parent's height, so with no height on the parent there is nothing to share.",
      "Setting fixed px rows and watching content spill out of them. Content does not shrink to fit a row. minmax(120px, auto) sets a minimum but lets the row grow.",
      "Defining three rows and adding a fourth item. The extra row is sized by grid-auto-rows (auto by default), not by your list.",
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
      "These tell a grid item which cells it fills. grid-column: 1 / 3 stretches an item from line 1 to line 3, which is two columns. span 2 means \"two columns from wherever you land.\" grid-row works the same up and down. grid-area is the shortcut when the parent names its regions with grid-template-areas: the item just says grid-area: sidebar. Lines are numbered from 1, and -1 is always the last line, so grid-column: 1 / -1 means full width however many columns there are.",
    whereItGoes:
      "On the child item, not the parent. Count lines, not cells: a three-column grid has four column lines. For a named layout, put grid-template-areas on the parent and grid-area on each child.",
    mistakes: [
      "Counting cells instead of lines. grid-column: 1 / 3 covers two cells, not three. Lines sit between and around the columns.",
      "Placing some items by hand and leaving holes. Items you do not place flow into the next free cell, which is often not the one you expected. Place everything, or use grid-auto-flow: dense.",
      "Using grid-area with a name the parent never declared. The item is placed as if the rule were not there. The name must appear in grid-template-areas.",
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
      "opacity sets how see-through a box is, from 1 (solid) to 0 (invisible). It fades the whole box as one layer: content, background, border, children. Good for disabled states, hover fades and fade-ins, because it is cheap for the browser to animate. A box at opacity: 0 is still there. It takes up space and can still be clicked and tabbed to, unlike display: none.",
    whereItGoes:
      "On the box to fade, often paired with transition: opacity 200ms. For a see-through background with solid text, use a color with alpha (rgba) on background-color instead.",
    mistakes: [
      "Using opacity to make a background see-through and finding the text faded too. opacity fades everything. Use rgba() on the background.",
      "Hiding things with opacity: 0 and leaving them clickable. Invisible buttons still get tapped. Add visibility: hidden or pointer-events: none, or use display: none.",
      "Dimming labels with opacity and failing contrast. Half-faded grey on white is often unreadable. Pick a real color that passes.",
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
      "cursor sets which mouse pointer shows over a box. Browsers give links the hand on their own, but not buttons or anything else you make clickable. cursor: pointer is the tiny rule that makes a custom button, card or icon feel clickable. not-allowed signals a disabled control. grab and grabbing suit drag handles. Touch screens ignore it, so it is a hint, never the only one.",
    whereItGoes:
      "On anything clickable that is not an <a>: buttons, clickable cards, tabs, close icons. Pair it with a hover style. The cursor alone is easy to miss.",
    mistakes: [
      "Putting cursor: pointer on things that do nothing. People click and nothing happens. The pointer is a promise.",
      "Relying on it to show what is clickable. There is no cursor on a phone. Use color, a border or a hover state too.",
      "Forgetting cursor: not-allowed on a disabled button that inherited pointer from .btn. It still invites the click.",
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
      "transform moves, scales, rotates or skews a box visually without moving anything around it. The box keeps its slot. Only the drawn result shifts. That makes it the right tool for hover lifts (translateY(-2px)), gentle zooms (scale(1.03)) and spinning icons (rotate(180deg)). It is also the centering trick: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%). Browsers animate transforms on the graphics chip, so they stay smooth where animating top, left or width stutters.",
    whereItGoes:
      "On the box to move, usually in a :hover state with a transition on the normal rule. Several functions can be combined in one value: transform: translateY(-2px) scale(1.02).",
    mistakes: [
      "Animating top, left or margin to move something. The browser recalculates the layout every frame and it stutters. Animate transform instead.",
      "Expecting neighbors to move out of the way. They do not. transform is purely visual. If space must change, use margin or layout.",
      "Scaling text up with transform and getting blur. transform scales the drawn pixels. For bigger text, change font-size.",
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
      "animation plays on its own, with no hover or click to trigger it. @keyframes names a sequence of steps (from and to, or percentages). animation plays it: animation: spin 1s linear infinite rotates a loading spinner forever. animation: fade-in 300ms ease-out plays a one-time entrance. transition is for \"go from A to B when something changes.\" animation is for \"play this sequence,\" including loops.",
    whereItGoes:
      "@keyframes at the top level of the stylesheet. The animation property on the box. Stick to transform and opacity inside the steps for smoothness. Respect @media (prefers-reduced-motion: reduce) by shortening or removing animations for people who asked for less motion.",
    mistakes: [
      "Spelling the @keyframes name differently from the animation name. A typo means nothing plays, with no error.",
      "Animating width, height, top or left. These force a layout recalculation every frame and stutter. Animate transform and opacity.",
      "Ignoring prefers-reduced-motion. Looping or large motion makes some people ill. One media query at the bottom of the file turns it off for them.",
    ],
    example: "@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.spinner { animation: spin 1s linear infinite; }\n\n@media (prefers-reduced-motion: reduce) {\n  .spinner { animation-duration: 3s; }\n}",
    related: ["transition", "transform", "opacity", "@media"],
  },
];

export function getCssNestEntry(tag: string): NestEntry | undefined {
  return CSS_NEST.find((e) => e.tag === tag);
}
