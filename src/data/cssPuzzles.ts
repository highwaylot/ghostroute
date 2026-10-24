import type { Puzzle } from './puzzles';
import { ruleBody, hasRule } from '../lib/cssCheck';

export type { Puzzle };

// Ids are prefixed so they never collide with the HTML/email puzzle sets —
// solved-state is tracked in one shared localStorage set keyed by id.
//
// Sized to what CSS actually needs, not copied for parity with HTML's 29 —
// CSS doesn't have a wide tag vocabulary to make puzzles out of, it has a
// dense set of real, well-documented gotchas (specificity, the box model,
// unit rules, flex axis mixups, silent custom-property typos). 20 puzzles
// covering every CSS_CHAPTERS chapter, plus custom properties and z-index
// from the Nest reference, is that set — not a number chosen to match.
export const CSS_PUZZLES: Puzzle[] = [
  // --- basic ------------------------------------------------------------
  {
    id: 'css-missing-dot-class',
    title: 'A selector with nothing to select',
    difficulty: 'basic',
    prompt: 'This rule is supposed to style the callout below, but nothing is happening. Find the mistake and fix it.',
    broken:
      '<p class="callout">Don\'t miss this.</p>\n<style>\n  callout {\n    background: #fff7e6;\n    padding: 12px;\n  }\n</style>',
    hints: [
      'callout on its own targets a tag literally named <callout> — which doesn\'t exist.',
      'A class selector needs a leading dot to say "match the class," not a tag name.',
      'Fix it to: .callout { ... }',
    ],
    check: (code) => ruleBody(code, '\\.callout') !== null,
  },
  {
    id: 'css-hover-space-typo',
    title: 'A hover that never triggers',
    difficulty: 'basic',
    prompt: 'This link is supposed to turn crimson on hover, but it never does. Find the typo and fix it.',
    broken: '<a href="#" class="link">Hover me</a>\n<style>\n  .link :hover {\n    color: crimson;\n  }\n</style>',
    hints: [
      'A pseudo-class attaches directly to what it modifies, with no space — a space changes the meaning entirely.',
      '.link :hover (with a space) means "something hovered, inside .link" — not ".link itself, while hovered."',
      'Fix it to: .link:hover { color: crimson; }',
    ],
    check: (code) => /\.link:hover\s*\{/i.test(code) && !/\.link\s+:hover/i.test(code),
  },
  {
    id: 'css-missing-units',
    title: 'A number with nowhere to land',
    difficulty: 'basic',
    prompt: 'This box is supposed to have room around its text, but the padding isn\'t showing up at all. Find the mistake and fix it.',
    broken: '<p class="box">Some text.</p>\n<style>\n  .box {\n    padding: 20;\n  }\n</style>',
    hints: [
      'CSS length values need a unit attached — a bare number like 20 isn\'t valid, and the whole declaration gets dropped.',
      'px is the most common unit for a fixed length like this.',
      'Fix it to: padding: 20px;',
    ],
    check: (code) => hasRule(code, '\\.box', 'padding\\s*:\\s*\\d+px'),
  },
  {
    id: 'css-invalid-hex-color',
    title: 'A color the browser can\'t read',
    difficulty: 'basic',
    prompt: 'This text is supposed to be red, but it\'s rendering as plain black. Find what\'s wrong with the color and fix it.',
    broken: '<p class="alert">Careful!</p>\n<style>\n  .alert {\n    color: #ff000;\n  }\n</style>',
    hints: [
      'Count the digits after the #. A hex color needs exactly 3 or exactly 6.',
      '#ff000 only has 5 — one short of a valid 6-digit color, so the whole declaration is invalid and gets ignored.',
      'Fix it to: color: #ff0000; (or the short form, #f00)',
    ],
    check: (code) => hasRule(code, '\\.alert', 'color\\s*:\\s*#([0-9a-fA-F]{3}\\b|[0-9a-fA-F]{6}\\b)'),
  },
  {
    id: 'css-border-missing-style',
    title: 'A border with nothing to draw',
    difficulty: 'basic',
    prompt: 'This card is supposed to have a visible border, but nothing shows up. Find the missing piece and fix it.',
    broken: '<div class="card">Card content</div>\n<style>\n  .card {\n    border: 2px #333;\n  }\n</style>',
    hints: [
      'border is shorthand for three things: a width, a style, and a color. One of them is missing here.',
      'Without a line style (like solid), the style defaults to none — so the border never actually draws, no matter the width or color.',
      'Fix it to: border: 2px solid #333;',
    ],
    check: (code) => {
      const body = ruleBody(code, '\\.card');
      if (!body) return false;
      const m = body.match(/border\s*:\s*([^;}]+)/i);
      return !!m && /\b(solid|dashed|dotted|double|groove|ridge|inset|outset)\b/i.test(m[1]);
    },
  },
  {
    id: 'css-id-selector-missing-hash',
    title: 'An id selector missing its mark',
    difficulty: 'basic',
    prompt: 'This heading is supposed to be underlined, but the rule targeting it does nothing. Find the mistake and fix it.',
    broken: '<h1 id="pageTitle">My Site</h1>\n<style>\n  pageTitle {\n    text-decoration: underline;\n  }\n</style>',
    hints: [
      'pageTitle alone targets a tag literally named <pageTitle> — which doesn\'t exist.',
      'An id selector needs a leading # to say "match the id," not a tag name.',
      'Fix it to: #pageTitle { text-decoration: underline; }',
    ],
    check: (code) => ruleBody(code, '#pageTitle') !== null,
  },
  {
    id: 'css-property-name-typo',
    title: 'A property the browser has never heard of',
    difficulty: 'basic',
    prompt: 'This text is supposed to be dark red, but it\'s still the default black. Find the typo and fix it.',
    broken: '<p class="notice">Please read carefully.</p>\n<style>\n  .notice {\n    colr: darkred;\n  }\n</style>',
    hints: [
      'The browser doesn\'t error on an unrecognized property — it just silently ignores it, which makes this kind of typo easy to miss.',
      'Check the property name letter by letter against the property you actually meant.',
      'Fix it to: color: darkred;',
    ],
    check: (code) => {
      const body = ruleBody(code, '\\.notice');
      if (!body) return false;
      return /\bcolor\s*:\s*darkred/i.test(body) && !/\bcolr\s*:/i.test(body);
    },
  },

  // --- medium -------------------------------------------------------------
  {
    id: 'css-specificity-id-beats-class',
    title: 'An override that refuses to override',
    difficulty: 'medium',
    prompt:
      "You want this warning to be orange, using .warning. It is still red, because of an id rule above it. Make orange win. Moving the rule will not help. An id beats a class no matter the order.",
    broken:
      '<p id="banner" class="warning">Careful, storm incoming.</p>\n<style>\n  #banner {\n    color: red;\n  }\n  .warning {\n    color: orange;\n  }\n</style>',
    hints: [
      "An id selector is more specific than a class selector. So #banner wins, even if the .warning rule comes later.",
      "Either stop #banner from setting a color, or make the .warning rule at least as specific as the id.",
      "Fix it either by removing #banner's color, or by writing a compound selector: #banner.warning { color: orange; }",
    ],
    check: (code) => {
      const bannerBody = ruleBody(code, '#banner(?!\\.warning)');
      const bannerStillRed = bannerBody !== null && /color\s*:\s*red\b/i.test(bannerBody);
      const compoundOrange = hasRule(code, '#banner\\.warning', 'color\\s*:\\s*orange');
      return !bannerStillRed || compoundOrange;
    },
  },
  {
    id: 'css-justify-content-no-flex',
    title: 'A property with no container to belong to',
    difficulty: 'medium',
    prompt: 'These two buttons are supposed to sit at opposite ends of the toolbar, but justify-content isn\'t doing anything. Find what\'s missing and fix it.',
    broken:
      '<div class="toolbar">\n  <button>Save</button>\n  <button>Cancel</button>\n</div>\n<style>\n  .toolbar {\n    justify-content: space-between;\n  }\n</style>',
    hints: [
      'justify-content only means something on a flex (or grid) container — right now, .toolbar isn\'t one.',
      'Turn .toolbar into a flex container first.',
      'Add to .toolbar: display: flex;',
    ],
    check: (code) =>
      hasRule(code, '\\.toolbar', 'display\\s*:\\s*flex') &&
      hasRule(code, '\\.toolbar', 'justify-content\\s*:\\s*space-between'),
  },
  {
    id: 'css-align-vs-justify-mixup',
    title: 'Centered the wrong way',
    difficulty: 'medium',
    prompt:
      "The badge is centered left to right, but it sits at the top of its row instead of the middle. Fix it.",
    broken:
      '<div class="badge-row">\n  <span class="badge">3</span>\n</div>\n<style>\n  .badge-row {\n    display: flex;\n    height: 60px;\n    justify-content: center;\n  }\n</style>',
    hints: [
      "justify-content moves items along the row, left to right. Up and down needs the other property.",
      "align-items moves items up and down inside a flex row.",
      "Add to .badge-row: align-items: center;",
    ],
    check: (code) => hasRule(code, '\\.badge-row', 'align-items\\s*:\\s*center'),
  },
  {
    id: 'css-missing-flex-wrap',
    title: 'Tags squeezed into one impossible line',
    difficulty: 'medium',
    prompt:
      "This row of tags should drop onto a new line when it runs out of room. Right now it squeezes everything onto one line. Fix it.",
    broken:
      '<div class="tag-list">\n  <span>design</span>\n  <span>css</span>\n  <span>layout</span>\n  <span>flexbox</span>\n  <span>responsive</span>\n</div>\n<style>\n  .tag-list {\n    display: flex;\n    gap: 8px;\n  }\n</style>',
    hints: [
      "By default, flex items squeeze onto one line and shrink to fit instead of wrapping.",
      "One property lets them drop onto a new line instead.",
      "Add to .tag-list: flex-wrap: wrap;",
    ],
    check: (code) => hasRule(code, '\\.tag-list', 'flex-wrap\\s*:\\s*wrap'),
  },
  {
    id: 'css-transition-on-hover-only',
    title: 'An animation that only plays one way',
    difficulty: 'medium',
    prompt: 'Hovering this link fades its color in smoothly, but moving the mouse away snaps it back instantly. Find where the transition is written and fix it.',
    broken:
      '<a href="#" class="cta">Learn more</a>\n<style>\n  .cta {\n    color: #2563eb;\n  }\n  .cta:hover {\n    color: #1d4ed8;\n    transition: color 0.2s;\n  }\n</style>',
    hints: [
      'transition has to be on the element\'s resting state to animate both directions — right now it only exists on the :hover rule.',
      'Move transition out of .cta:hover and onto the base .cta rule instead.',
      'Fix it to: .cta { color: #2563eb; transition: color 0.2s; }',
    ],
    check: (code) => hasRule(code, '\\.cta(?!:hover)', 'transition\\s*:'),
  },
  {
    id: 'css-box-sizing-overflow',
    title: 'A box wider than its own width',
    difficulty: 'medium',
    prompt: 'This panel is set to 300px wide, but its padding is pushing it visibly wider than that. Fix the sizing so 300px actually means 300px.',
    broken:
      '<div class="panel">Some panel content that needs room to breathe.</div>\n<style>\n  .panel {\n    width: 300px;\n    padding: 24px;\n  }\n</style>',
    hints: [
      'By default, padding adds to an element\'s set width instead of being included in it.',
      'One property changes that sizing math so padding is included in the 300px instead of added on top.',
      'Add to .panel: box-sizing: border-box;',
    ],
    check: (code) => hasRule(code, '\\.panel', 'box-sizing\\s*:\\s*border-box'),
  },
  {
    id: 'css-media-query-wrong-direction',
    title: 'A breakpoint pointed the wrong way',
    difficulty: 'medium',
    prompt: 'This nav is supposed to stack into a column once the screen gets narrow (600px or less) — right now it does the opposite. Fix the condition.',
    broken:
      '<nav class="mainnav">\n  <a href="#">Home</a>\n  <a href="#">About</a>\n</nav>\n<style>\n  .mainnav {\n    display: flex;\n  }\n  @media (min-width: 600px) {\n    .mainnav {\n      flex-direction: column;\n    }\n  }\n</style>',
    hints: [
      'min-width triggers once the screen is at least that wide — the opposite of "narrow."',
      'max-width triggers once the screen is at most that wide, which is what "600px or less" actually means.',
      'Fix it to: @media (max-width: 600px) { ... }',
    ],
    check: (code) =>
      /@media\s*\(\s*max-width\s*:\s*600px\s*\)/i.test(code) &&
      !/@media\s*\(\s*min-width\s*:\s*600px\s*\)/i.test(code),
  },
  {
    id: 'css-custom-property-missing-dashes',
    title: 'A variable that was never actually declared',
    difficulty: 'medium',
    prompt:
      "This button should be blue, but var(--brand-color) finds nothing. Find why the definition does not count and fix it.",
    broken:
      '<button class="cta-btn">Get Started</button>\n<style>\n  :root {\n    brand-color: #2563eb;\n  }\n  .cta-btn {\n    background: var(--brand-color);\n    color: white;\n  }\n</style>',
    hints: [
      "A custom property must start with two dashes. Without them it is just an unknown property, and the browser ignores it.",
      "The definition in :root needs the same -- prefix that var() is looking for.",
      "Fix it to: :root { --brand-color: #2563eb; }",
    ],
    check: (code) => {
      const rootBody = ruleBody(code, ':root');
      return rootBody !== null && /--brand-color\s*:/.test(rootBody);
    },
  },

  // --- hard -----------------------------------------------------------
  {
    id: 'css-custom-property-typo',
    title: 'A variable name that\'s almost right',
    difficulty: 'hard',
    prompt:
      "This link should use the brand color. Instead it shows the browser's default link color. There is no error. Find the mismatch and fix it.",
    broken:
      '<a href="#" class="link">Read more</a>\n<style>\n  :root {\n    --brand-color: #2563eb;\n  }\n  .link {\n    color: var(--brand-colour);\n  }\n</style>',
    hints: [
      "var() is asking for a name that was never defined. Check it letter by letter against the one in :root.",
      "Custom property names must match exactly. --brand-color and --brand-colour are two different names.",
      "Fix it to: color: var(--brand-color);",
    ],
    check: (code) => {
      const rootBody = ruleBody(code, ':root');
      if (!rootBody) return false;
      const defMatch = rootBody.match(/--([a-zA-Z0-9-]+)\s*:/);
      const useMatch = code.match(/var\(\s*--([a-zA-Z0-9-]+)\s*\)/);
      if (!defMatch || !useMatch) return false;
      return defMatch[1] === useMatch[1];
    },
  },
  {
    id: 'css-z-index-without-position',
    title: 'A stacking order with no stack to join',
    difficulty: 'hard',
    prompt:
      "This dropdown should sit on top of everything else, but raising z-index does nothing. Find what is missing and fix it.",
    broken: '<div class="dropdown">Menu options here</div>\n<style>\n  .dropdown {\n    z-index: 10;\n  }\n</style>',
    hints: [
      "z-index only works on a box that has a position other than the default.",
      "Give .dropdown a position, as well as its z-index.",
      "Add to .dropdown: position: relative;",
    ],
    check: (code) => {
      const body = ruleBody(code, '\\.dropdown');
      return body !== null && /z-index\s*:/.test(body) && /position\s*:\s*(relative|absolute|fixed|sticky)/i.test(body);
    },
  },
  {
    id: 'css-missing-focus-state',
    title: 'Feedback only a mouse can see',
    difficulty: 'hard',
    prompt: 'This nav link shows feedback on hover, but a keyboard user tabbing through the page gets nothing at all. Fix it so both get the same signal.',
    broken: '<a href="#" class="nav-link">Pricing</a>\n<style>\n  .nav-link:hover {\n    text-decoration: underline;\n  }\n</style>',
    hints: [
      ':hover only ever fires from a mouse — a keyboard user tabbing between links triggers a completely different state.',
      ':focus is that state — add a rule for it alongside (or combined with) :hover.',
      'Fix it to: .nav-link:hover, .nav-link:focus { text-decoration: underline; }',
    ],
    check: (code) => /\.nav-link:focus\b[^{]*\{/i.test(code),
  },
  {
    id: 'css-vw-overflow',
    title: 'A width that\'s wider than the window',
    difficulty: 'hard',
    prompt:
      "This section should fill the screen edge to edge. Instead it causes a small sideways scrollbar. Fix the width.",
    broken: '<section class="hero">Welcome to the site</section>\n<style>\n  .hero {\n    width: 100vw;\n    padding: 40px;\n  }\n</style>',
    hints: [
      "100vw is the full screen width, including the space the scrollbar takes. The box cannot use that space, so it spills over.",
      "A percentage is measured from the parent box, which already leaves room for the scrollbar.",
      "Fix it to: width: 100%;",
    ],
    check: (code) => {
      const body = ruleBody(code, '\\.hero');
      return body !== null && !/vw\b/i.test(body) && /width\s*:\s*100%/i.test(body);
    },
  },
  {
    id: 'css-em-compounding',
    title: 'A size that keeps changing itself',
    difficulty: 'hard',
    prompt:
      "This badge should be the same size everywhere. Instead its size changes depending on where it sits. Fix the unit.",
    broken: '<span class="badge">New</span>\n<style>\n  .badge {\n    font-size: 0.8em;\n  }\n</style>',
    hints: [
      "em is measured from the parent's text size. Put the badge inside something with a different text size and it changes, more with every level.",
      "A unit measured from the page's base text size stays the same no matter how deep it sits.",
      "Fix it to: font-size: 0.8rem;",
    ],
    check: (code) => {
      const body = ruleBody(code, '\\.badge');
      return body !== null && /font-size\s*:\s*[\d.]+rem/i.test(body) && !/font-size\s*:\s*[\d.]+em\b/i.test(body);
    },
  },
];
