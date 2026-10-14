import type { KeyEntry } from './keyIndex';
import type { NestEntry } from './nest';

// CSS's quick-reference index — same KeyEntry shape HTML uses, but every
// row here is a selector, property, or at-rule instead of a tag. Grouped
// to match CSS_CHAPTERS' own progression (attach -> selectors -> box model
// -> color & type -> display -> flexbox -> responsive -> interaction) so
// the Nest's chapter order lines up with the Route the learner just did.
export const CSS_KEY_INDEX: KeyEntry[] = [
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
];

export const CSS_KEY_CATEGORIES = Array.from(new Set(CSS_KEY_INDEX.map((e) => e.category)));

// Deep-dive pages, same NestEntry shape HTML's Nest uses — stats just pick
// different keys (type/appliesTo/inherits/commonValues) since "closing tag"
// and "void element" mean nothing for a property. Every CSS_KEY_INDEX row
// above gets one; CSS doesn't need a shallower Nest than HTML's, it just
// needs a differently-shaped one.
export const CSS_NEST: NestEntry[] = [
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
    related: ['selector { }'],
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
    related: ['.class', '#id'],
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
    related: ['descendant & child selectors'],
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
    related: ['padding', 'box-sizing', 'border-radius'],
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
    related: ['font-family & font-size'],
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
    related: ['font-weight & line-height', 'color & background-color', 'text-align', 'text-decoration / font-style'],
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
    related: ['position', 'display: flex', 'display: grid', 'overflow'],
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
    related: ['@media', 'calc()', 'width / height'],
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
    related: [':hover / :first-child'],
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
    related: ['box-sizing', 'padding', 'rem / % / vw', 'overflow'],
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
    related: ['border', 'overflow', 'width / height'],
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
    related: ['grid-template-columns', 'display: flex', 'flex-wrap & gap', 'display'],
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
    related: ['display: grid', 'rem / % / vw', '@media'],
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
];

export function getCssNestEntry(tag: string): NestEntry | undefined {
  return CSS_NEST.find((e) => e.tag === tag);
}
