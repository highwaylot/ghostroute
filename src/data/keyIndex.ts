export type KeyEntry = {
  tag: string;
  desc: string;
};

export const KEY_INDEX: KeyEntry[] = [
  { tag: '<h1> – <h6>', desc: 'Headings, biggest to smallest. Use one <h1> per page.' },
  { tag: '<p>', desc: 'A paragraph of normal text.' },
  { tag: '<a href="">', desc: 'A clickable link. href is where it goes.' },
  { tag: '<img src="">', desc: 'Shows an image. src is the file or URL.' },
  { tag: '<div>', desc: 'An invisible box used to group things together for layout.' },
  { tag: '<span>', desc: 'Like <div> but for a small chunk of text inline.' },
  { tag: '<ul> / <li>', desc: 'A bullet list. Each item is an <li> inside a <ul>.' },
  { tag: '<ol> / <li>', desc: 'A numbered list. Same idea as <ul>, but ordered.' },
  { tag: '<button>', desc: 'A clickable button.' },
  { tag: '<input>', desc: 'A box the user can type into.' },
  { tag: '<form>', desc: 'Groups inputs together so they can be submitted at once.' },
  { tag: 'class=""', desc: 'Labels an element so CSS or JS can target it. Reusable across many elements.' },
  { tag: 'id=""', desc: 'A unique name for one specific element on the page.' },
  { tag: '<!-- comment -->', desc: 'Notes for humans reading the code. The browser ignores this text.' },
  { tag: '<script>', desc: 'Where JavaScript code lives, or a link to a separate JS file.' },
  { tag: '<link rel="stylesheet">', desc: 'Connects a CSS file so it can style this page.' },
  { tag: '<head>', desc: 'Page metadata: title, styles, scripts. Not shown directly to visitors.' },
  { tag: '<body>', desc: 'Everything visible on the page lives here.' },
  { tag: '<nav>', desc: 'Marks a block of navigation links, like a menu bar.' },
  { tag: '<footer>', desc: 'The bottom section of a page, usually credits or links.' },
];
