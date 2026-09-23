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
    related: [':hover / :first-child'],
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
    related: ['padding', 'border', 'margin'],
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
    related: ['padding', 'box-sizing'],
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
    related: ['font-weight & line-height', 'color & background-color'],
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
    related: ['position', 'display: flex'],
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
    related: ['display'],
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
    related: ['justify-content & align-items', 'flex-wrap & gap'],
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
    related: ['display: flex', 'flex-wrap & gap'],
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
    related: ['rem / % / vw'],
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
    related: ['@media'],
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
];

export function getCssNestEntry(tag: string): NestEntry | undefined {
  return CSS_NEST.find((e) => e.tag === tag);
}
