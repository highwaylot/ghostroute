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
    why:
      "CSS lives in a <style> tag inside <head>. Every rule for this page goes between <style> and </style>.",
    hints: [
      "Add a pair of tags inside <head> that CSS rules can go inside.",
      "It is <style> ... </style>, with the same closing-tag pattern as every other tag.",
      "Add this inside <head>:\n<style>\n\n</style>",
    ],
    check: (code) => /<head[^>]*>[\s\S]*?<style[^>]*>[\s\S]*?<\/style>[\s\S]*?<\/head>/i.test(code),
  },
  {
    tag: 'h1 { color: ... }',
    chapter: 'attach',
    why:
      "A rule: h1 { color: crimson; }. h1 is the selector, the thing to change. color is the property and crimson is the value.",
    hints: [
      "Inside <style>, write the tag name you want to change, then curly braces.",
      "Inside the braces: a property name, a colon, a value, and a semicolon.",
      "Add: h1 { color: crimson; } inside your <style> tag.",
    ],
    check: (code) => hasRule(code, 'h1', 'color\\s*:\\s*[^;}]+;?'),
  },

  // --- selectors ---
  {
    tag: '.intro { }',
    chapter: 'selectors',
    why:
      "A dot plus a class name picks every tag with that class. .intro picks class=\"intro\".",
    hints: [
      "The starter page already has class=\"intro\" on its <p>. Write a rule that picks that class.",
      "A class selector is a dot followed by the class name, with no quotes.",
      "Add: .intro { font-style: italic; }",
    ],
    check: (code) => hasRule(code, '\\.intro', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: '#id { }',
    chapter: 'selectors',
    why:
      "A # plus an id picks the one tag with that id. Give your <h1> id=\"title\", then style #title.",
    hints: [
      "Give your <h1> an id, then write a selector that matches it.",
      "An id selector is a # followed by the id name.",
      "Add id=\"title\" to your <h1>, then: #title { text-decoration: underline; }",
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
    why:
      "Two selectors with a space pick tags inside other tags. nav a means links inside a <nav>.",
    hints: [
      "Write two selectors separated by a space, not a comma.",
      "nav a picks <a> tags, but only the ones sitting inside a <nav>.",
      "Add: nav a { color: teal; }",
    ],
    check: (code) => hasRule(code, 'nav\\s+a', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },

  // --- box-model ---
  {
    tag: 'padding',
    chapter: 'box-model',
    why:
      "Padding is space inside a box, between its edge and its content. Add some to .intro.",
    hints: [
      "Add a property to your .intro rule that adds space inside the box.",
      "padding takes a length, like 16px, and applies it on all four sides.",
      "Add to .intro: padding: 16px;",
    ],
    check: (code) => hasRule(code, '\\.intro', 'padding\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'margin',
    chapter: 'box-model',
    why:
      "Margin is space outside a box. It pushes other boxes away. Add some to .intro.",
    hints: [
      "Same idea as padding, but for the outside of the box.",
      "margin also takes a length and applies it on all four sides by default.",
      "Add to .intro: margin: 20px 0;",
    ],
    check: (code) => hasRule(code, '\\.intro', 'margin\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'border + box-sizing',
    chapter: 'box-model',
    why:
      "A border needs a thickness, a style and a color: 1px solid #333. box-sizing: border-box keeps the box at the width you set.",
    hints: [
      "Give .intro a visible border, and set box-sizing so its width stays what you set.",
      "border needs a thickness, a style (like solid) and a color, all in one value.",
      "Add to .intro: border: 1px solid #333; box-sizing: border-box;",
    ],
    check: (code) =>
      hasRule(code, '\\.intro', 'border\\s*:\\s*[^;}]+;?') &&
      hasRule(code, '\\.intro', 'box-sizing\\s*:\\s*border-box'),
  },

  // --- color-type ---
  {
    tag: 'background-color',
    chapter: 'color-type',
    why:
      "color paints the text. background-color paints behind it. Give body a background.",
    hints: [
      "Add a property to your body rule (or create one) that sets a background color.",
      "background-color takes any color: a name, or a code like #f4f5fa.",
      "Add: body { background-color: #f4f5fa; }",
    ],
    check: (code) => hasRule(code, 'body', 'background-color\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'font-family + font-size',
    chapter: 'color-type',
    why:
      "font-family picks the typeface. font-size sets how big. Put both on body so the whole page uses them.",
    hints: [
      "Set both properties on the body rule so the whole page uses them.",
      "font-family usually lists a few fonts, separated by commas, in case the first is missing.",
      "Add to body: font-family: sans-serif; font-size: 16px;",
    ],
    check: (code) =>
      hasRule(code, 'body', 'font-family\\s*:\\s*[^;}]+;?') &&
      hasRule(code, 'body', 'font-size\\s*:\\s*[^;}]+;?'),
  },

  // --- display ---
  {
    tag: 'display: inline-block',
    chapter: 'display',
    why:
      "Links sit inside a line of text, so width and padding do not work well on them. display: inline-block fixes that.",
    hints: [
      "Pick the links inside your nav, and change their display value.",
      "inline-block is a value for the display property.",
      "Add: nav a { display: inline-block; padding: 8px; }",
    ],
    check: (code) => hasRule(code, 'nav\\s+a', 'display\\s*:\\s*inline-block'),
  },
  {
    tag: 'text-align',
    chapter: 'display',
    why:
      "text-align moves text left, right or center inside its box. Center your h1.",
    hints: [
      "Add a property to your h1 rule that centers its text.",
      "text-align takes left, right, or center.",
      "Add to h1: text-align: center;",
    ],
    check: (code) => hasRule(code, 'h1', 'text-align\\s*:\\s*[^;}]+;?'),
  },

  // --- flexbox ---
  {
    tag: 'display: flex',
    chapter: 'flexbox',
    why:
      "display: flex on a parent lines up the tags inside it in a row. Put it on the <nav>.",
    hints: [
      "Pick the <nav> itself (not the links inside it) and change its display value.",
      "The value is flex.",
      "Add: nav { display: flex; }",
    ],
    check: (code) => hasRule(code, 'nav', 'display\\s*:\\s*flex'),
  },
  {
    tag: 'justify-content',
    chapter: 'flexbox',
    why:
      "justify-content sets the gaps between items in a row. Try space-between on your nav bar.",
    hints: [
      "Add a line to your nav rule that spaces the links out.",
      "Its values include center, space-between and flex-end.",
      "Add to nav: justify-content: space-between;",
    ],
    check: (code) => hasRule(code, 'nav', 'justify-content\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'align-items',
    chapter: 'flexbox',
    why:
      "align-items lines flex items up from top to bottom. Put the nav links in the middle.",
    hints: [
      "Add another property to nav that lines the items up top to bottom.",
      "align-items takes values like center, flex-start, flex-end.",
      "Add to nav: align-items: center;",
    ],
    check: (code) => hasRule(code, 'nav', 'align-items\\s*:\\s*[^;}]+;?'),
  },

  // --- responsive ---
  {
    tag: '@media',
    chapter: 'responsive',
    why:
      "A media query applies rules only on some screens. @media (max-width: 600px) means 600 pixels wide or less.",
    hints: [
      "Write a block starting with @media, a condition in parentheses, then curly braces holding rules.",
      "A common condition is (max-width: 600px).",
      "Add:\n@media (max-width: 600px) {\n  nav { flex-direction: column; }\n}",
    ],
    check: (code) => /@media\s*\([^)]*max-width[^)]*\)\s*\{[\s\S]*?\}/i.test(code),
  },
  {
    tag: 'rem',
    chapter: 'responsive',
    why:
      "rem sizes grow when a reader makes their text bigger. px sizes never do. Size your h1 in rem.",
    hints: [
      "Change your h1's font-size to use rem instead of px.",
      "rem is written like px, just a different unit after the number.",
      "Add to h1: font-size: 2rem;",
    ],
    check: (code) => hasRule(code, 'h1', 'font-size\\s*:\\s*[\\d.]+rem'),
  },

  // --- interaction ---
  {
    tag: ':hover',
    chapter: 'interaction',
    why:
      ":hover makes a rule apply only while the mouse is over a tag. Turn the nav links red on hover.",
    hints: [
      "Write a selector for your nav links that only matches while the mouse is over one.",
      ":hover is written straight onto the selector, with no space.",
      "Add: nav a:hover { color: crimson; }",
    ],
    check: (code) => hasRule(code, 'nav\\s+a:hover', '[a-z-]+\\s*:\\s*[^;}]+;?'),
  },
  {
    tag: 'transition',
    chapter: 'interaction',
    why:
      "transition makes a change glide instead of snap. Put it on the normal nav a rule, not the :hover one.",
    hints: [
      "Add a property to the normal nav a rule, not the :hover rule.",
      "transition takes a property name and a time, like color 0.2s.",
      "Add to nav a: transition: color 0.2s;",
    ],
    check: (code) => hasRule(code, 'nav\\s+a(?!:hover)', 'transition\\s*:\\s*[^;}]+;?'),
  },
];
