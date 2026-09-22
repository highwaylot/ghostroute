import type { Step } from './steps';

export type { Step };

// The page every CSS step styles. Unlike the HTML route, this doesn't
// build up from nothing — the HTML skeleton is assumed knowledge at this
// point, so the starter code hands you a small real page and the whole
// route is about styling it, not re-deriving <!DOCTYPE html> again.
export const CSS_STARTER = `<!DOCTYPE html>
<html>
  <head>
    <title>My Styled Page</title>
  </head>
  <body>
    <h1>Hello there</h1>
    <p class="intro">This paragraph is begging for some style.</p>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </body>
</html>
`;

function hasRule(code: string, selector: string, property: string): boolean {
  const re = new RegExp(`${selector}\\s*\\{[^}]*${property}[^}]*\\}`, 'i');
  return re.test(code);
}

export const CSS_STEPS: Step[] = [
  // --- attach ---
  {
    tag: '<style></style>',
    chapter: 'attach',
    why: "CSS needs somewhere to live. The simplest way to attach it — a <style> tag inside <head> — holds every rule for this page.",
    hints: [
      'Add a tag pair inside <head> that CSS rules can go inside.',
      'It\'s <style> ... </style>, same closing-tag pattern as everything else.',
      'Add:\n<style>\n\n</style>\ninside <head>.',
    ],
    check: (code) => /<head[^>]*>[\s\S]*?<style[^>]*>[\s\S]*?<\/style>[\s\S]*?<\/head>/i.test(code),
  },
  {
    tag: 'h1 { color: ... }',
    chapter: 'attach',
    why: 'A CSS rule is two parts: a selector (what to target — here, every <h1>) and a declaration in curly braces (a property, a colon, and a value).',
    hints: [
      'Inside <style>, write the tag name you want to target, then curly braces.',
      'Inside the braces: a property name, a colon, a value, and a semicolon.',
      'Add: h1 { color: crimson; } inside your <style> block.',
    ],
    check: (code) => hasRule(code, 'h1', 'color\\s*:\\s*[^;}]+;?'),
  },

  // --- selectors ---
  {
    tag: '.intro { }',
    chapter: 'selectors',
    why: 'A class selector (a dot, then the class name) targets every element with that class — the same class="" you wrote back in HTML, now doing something visible.',
    hints: [
      'The starter page already has class="intro" on its <p> — target that.',
      'A class selector is a period followed by the class name, no quotes.',
      'Add: .intro { font-style: italic; }',
    ],
    check: (code) => hasRule(code, '\\.intro', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: '#id { }',
    chapter: 'selectors',
    why: 'An id selector (a #, then the id) targets the one element with that id — same id="" from HTML, same one-only rule as before.',
    hints: [
      'Give your <h1> an id, then write a selector that matches it.',
      'An id selector is a # followed by the id name.',
      'Add id="title" to your <h1>, then: #title { text-decoration: underline; }',
    ],
    check: (code) => {
      const idMatch = code.match(/\bid\s*=\s*"([^"]+)"/i);
      if (!idMatch) return false;
      return hasRule(code, `#${idMatch[1]}`, '[a-z-]+\\s*:\\s*[^;}]+;?');
    },
  },
  {
    tag: 'nav a { }',
    chapter: 'selectors',
    why: 'A descendant selector — two selectors with a space between them — targets elements matching the second one, but only inside the first. nav a means "only links inside a <nav>."',
    hints: [
      'Write two selectors separated by a space, not a comma.',
      'nav a targets <a> tags, but only the ones sitting inside a <nav>.',
      'Add: nav a { color: teal; }',
    ],
    check: (code) => hasRule(code, 'nav\\s+a', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },

  // --- box-model ---
  {
    tag: 'padding',
    chapter: 'box-model',
    why: 'Padding is space inside an element, between its border and its content — it pushes the content inward without moving the element itself.',
    hints: [
      'Add a property to your .intro rule that adds inner spacing.',
      'padding takes a length, like 16px, and applies it on all four sides.',
      'Add to .intro: padding: 16px;',
    ],
    check: (code) => hasRule(code, '\\.intro', 'padding\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'margin',
    chapter: 'box-model',
    why: "Margin is the opposite side of the same coin — space outside an element's border, pushing other elements away from it.",
    hints: [
      'Same idea as padding, but for the outside of the box.',
      'margin also takes a length and applies it on all four sides by default.',
      'Add to .intro: margin: 20px 0;',
    ],
    check: (code) => hasRule(code, '\\.intro', 'margin\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'border + box-sizing',
    chapter: 'box-model',
    why: 'A border sits between padding and margin, visible by default — and box-sizing: border-box changes the sizing math so padding/border don\'t silently grow an element past the width you set.',
    hints: [
      'Give .intro a visible border, and set box-sizing so its width stays predictable.',
      'border needs a width, a style (like solid), and a color, all in one value.',
      'Add to .intro: border: 1px solid #333; box-sizing: border-box;',
    ],
    check: (code) =>
      hasRule(code, '\\.intro', 'border\\s*:\\s*[^;}]+;?') &&
      hasRule(code, '\\.intro', 'box-sizing\\s*:\\s*border-box'),
  },

  // --- color-type ---
  {
    tag: 'background-color',
    chapter: 'color-type',
    why: "color paints text; background-color paints the space behind an element — two different properties for two different layers.",
    hints: [
      'Add a property to your body rule (or create one) that sets a background color.',
      'background-color takes any color value — a name, or a hex code like #f4f5fa.',
      'Add: body { background-color: #f4f5fa; }',
    ],
    check: (code) => hasRule(code, 'body', 'background-color\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'font-family + font-size',
    chapter: 'color-type',
    why: 'font-family picks the typeface; font-size sets how big it renders. Both usually go on body once, so every element inherits them by default.',
    hints: [
      'Set both properties on the body rule so the whole page inherits them.',
      'font-family usually lists a few fallback fonts, separated by commas.',
      'Add to body: font-family: sans-serif; font-size: 16px;',
    ],
    check: (code) =>
      hasRule(code, 'body', 'font-family\\s*:\\s*[^;}]+;?') &&
      hasRule(code, 'body', 'font-size\\s*:\\s*[^;}]+;?'),
  },

  // --- display ---
  {
    tag: 'display: inline-block',
    chapter: 'display',
    why: '<a> is inline by default — it can\'t take padding or a set width the way a block element can. display: inline-block gets the best of both: sits in a line of text, but accepts box-model properties.',
    hints: [
      'Target the links inside your nav, and change their display value.',
      'inline-block is a specific value for the display property.',
      'Add: nav a { display: inline-block; padding: 8px; }',
    ],
    check: (code) => hasRule(code, 'nav\\s+a', 'display\\s*:\\s*inline-block'),
  },
  {
    tag: 'text-align',
    chapter: 'display',
    why: 'text-align controls how inline content (text, inline-block elements) lines up inside its container — left, right, or center.',
    hints: [
      'Add a property to your h1 rule that centers its text.',
      'text-align takes left, right, or center.',
      'Add to h1: text-align: center;',
    ],
    check: (code) => hasRule(code, 'h1', 'text-align\\s*:\\s*[^;}]+;?'),
  },

  // --- flexbox ---
  {
    tag: 'display: flex',
    chapter: 'flexbox',
    why: "One declaration turns an element's direct children from stacked blocks into a row, sitting side by side automatically.",
    hints: [
      'Target the <nav> itself (not the links inside it) and change its display value.',
      'The value is flex.',
      'Add: nav { display: flex; }',
    ],
    check: (code) => hasRule(code, 'nav', 'display\\s*:\\s*flex'),
  },
  {
    tag: 'justify-content',
    chapter: 'flexbox',
    why: 'Once something is a flex container, justify-content controls how its children space out along the row — start, end, center, or spread apart.',
    hints: [
      'Add a property to your nav rule that spaces the links out.',
      'justify-content takes values like center, space-between, flex-end.',
      'Add to nav: justify-content: space-between;',
    ],
    check: (code) => hasRule(code, 'nav', 'justify-content\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'align-items',
    chapter: 'flexbox',
    why: 'justify-content spaces things along the row; align-items lines them up across it — top, bottom, or centered vertically.',
    hints: [
      'Add another property to nav that controls cross-axis alignment.',
      'align-items takes values like center, flex-start, flex-end.',
      'Add to nav: align-items: center;',
    ],
    check: (code) => hasRule(code, 'nav', 'align-items\\s*:\\s*[^;}]+;?'),
  },

  // --- responsive ---
  {
    tag: '@media',
    chapter: 'responsive',
    why: 'A media query wraps rules that only apply under a condition — most often a max screen width — so a page can behave differently on a phone than on a desktop.',
    hints: [
      'Write a block starting with @media, a condition in parentheses, then curly braces holding rules.',
      'A common condition is (max-width: 600px).',
      'Add: @media (max-width: 600px) {\n  nav { flex-direction: column; }\n}',
    ],
    check: (code) => /@media\s*\([^)]*max-width[^)]*\)\s*\{[\s\S]*?\}/i.test(code),
  },
  {
    tag: 'rem',
    chapter: 'responsive',
    why: 'px is a fixed size no matter what. rem is relative to the root font-size, so if someone bumps their browser\'s text size for accessibility, anything sized in rem scales with it — px never does.',
    hints: [
      'Change your h1\'s font-size to use a relative unit instead of px.',
      'rem is written the same way as px, just a different unit after the number.',
      'Add to h1: font-size: 2rem;',
    ],
    check: (code) => hasRule(code, 'h1', 'font-size\\s*:\\s*[\\d.]+rem'),
  },

  // --- interaction ---
  {
    tag: ':hover',
    chapter: 'interaction',
    why: ':hover is a pseudo-class — a selector suffix that only matches while a condition is true, here "the mouse is over this element."',
    hints: [
      'Write a selector for your nav links, but only while the mouse is over one.',
      'A pseudo-class is a colon plus a keyword, stuck directly onto a selector with no space.',
      'Add: nav a:hover { color: crimson; }',
    ],
    check: (code) => hasRule(code, 'nav\\s+a:hover', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'transition',
    chapter: 'interaction',
    why: "Without transition, a :hover change happens instantly — one frame to the next. transition tells the browser to animate the change smoothly over time instead.",
    hints: [
      'Add a property to the base (non-hover) nav a rule, not the :hover rule itself.',
      'transition takes a property name and a duration, like color 0.2s.',
      'Add to nav a: transition: color 0.2s;',
    ],
    check: (code) => hasRule(code, 'nav\\s+a(?!:hover)', 'transition\\s*:\\s*[^;}]+;?'),
  },
];
