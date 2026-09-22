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
      "CSS doesn't do anything sitting on its own — it has to be connected to HTML first, and then paired into rules: a selector (what to style) plus a declaration (how to style it).",
  },
  {
    id: 'selectors',
    title: 'selectors',
    blurb:
      'Remember class and id from HTML? This is what they were for — selectors are how a CSS rule says which elements it applies to.',
  },
  {
    id: 'box-model',
    title: 'the box model',
    blurb:
      'Every element is secretly a rectangle with four layers around its content: padding, border, and margin. Almost every spacing bug comes from mixing these up.',
  },
  {
    id: 'color-type',
    title: 'color & type',
    blurb:
      "The most immediately visible layer of CSS — what color things are, and what the text looks like.",
  },
  {
    id: 'display',
    title: 'display & flow',
    blurb:
      'Every element already has a default display behavior before you write a line of CSS. This is where that becomes something you control on purpose.',
  },
  {
    id: 'flexbox',
    title: 'flexbox',
    blurb:
      "The layout tool you'll reach for constantly — one line turns a pile of stacked elements into a row, evenly spaced, that actually behaves.",
  },
  {
    id: 'responsive',
    title: 'responsive basics',
    blurb:
      'A page that only looks right at one screen size is broken for most visitors. Media queries and relative units are how it adapts.',
  },
  {
    id: 'interaction',
    title: 'interaction & polish',
    blurb:
      'The small stuff that makes a page feel alive instead of static — a hover state, a smooth change instead of an instant jump.',
  },
];
