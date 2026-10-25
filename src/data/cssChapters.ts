import type { Chapter } from './chapters';

export type { Chapter };

// Sized to what CSS actually needs, not copied from HTML's 6 chapters —
// selectors and the box model each carry enough weight to deserve their
// own chapter, and flexbox gets three steps because it's the workhorse.
export const CSS_CHAPTERS: Chapter[] = [
  {
    id: 'attach',
    title: 'getting css onto the page',
    blurb:
      "HTML says what is on your page. CSS says what it looks like. A line of CSS looks like this: h1 { color: teal; }",
  },
  {
    id: 'selectors',
    title: 'selectors',
    blurb:
      "The part of a rule before the brace is the selector. It picks which tags the rule changes.",
  },
  {
    id: 'box-model',
    title: 'the box model',
    blurb:
      "Every tag is a box. Padding is space inside its edge, border is the edge, margin is space outside.",
  },
  {
    id: 'color-type',
    title: 'color & type',
    blurb:
      "What color things are, and what the text looks like.",
  },
  {
    id: 'display',
    title: 'display & flow',
    blurb:
      "Some tags take their own line. Others sit inside a line of text. Here you start choosing which.",
  },
  {
    id: 'flexbox',
    title: 'flexbox',
    blurb:
      "One line turns stacked tags into a row. Two more control the spacing and alignment.",
  },
  {
    id: 'responsive',
    title: 'responsive basics',
    blurb:
      "Different rules for small screens, and text sizes that grow with the reader's settings.",
  },
  {
    id: 'interaction',
    title: 'interaction & polish',
    blurb:
      "A link that changes when you point at it, and changes that glide instead of snap.",
  },
];
