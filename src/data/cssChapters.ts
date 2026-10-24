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
      "HTML says what is on your page. CSS says what it looks like. One line of CSS looks like this: h1 { color: teal; }. The part before the brace picks what to change. The part inside says how. This chapter gets that first line onto your page.",
  },
  {
    id: 'selectors',
    title: 'selectors',
    blurb:
      "The part of a rule before the brace is called the selector. It picks which tags the rule changes. Remember class and id from HTML? They were made for this. This chapter shows three ways to pick exactly the tags you want.",
  },
  {
    id: 'box-model',
    title: 'the box model',
    blurb:
      "Every tag on a page is a box, even when you cannot see its edges. Around the content there are three layers: padding (space inside the edge), border (the edge itself) and margin (space outside the edge). Most spacing problems come from mixing these up.",
  },
  {
    id: 'color-type',
    title: 'color & type',
    blurb:
      "The changes you see first: what color things are, and what the text looks like. Two properties for color, two for text.",
  },
  {
    id: 'display',
    title: 'display & flow',
    blurb:
      "Every tag already behaves one of two ways before you write any CSS. A block tag takes its own line. An inline tag sits inside a line of text. This chapter is where you start choosing that yourself.",
  },
  {
    id: 'flexbox',
    title: 'flexbox',
    blurb:
      "Flexbox turns a pile of stacked tags into a row. One line does it. Two more lines control the spacing and the alignment. You will use it on almost every page you build.",
  },
  {
    id: 'responsive',
    title: 'responsive basics',
    blurb:
      "A page that only looks right on one screen size is broken on most phones. This chapter shows how to give the page different rules on small screens, and how to size text so it scales.",
  },
  {
    id: 'interaction',
    title: 'interaction & polish',
    blurb:
      "The small things that make a page feel alive. A link that changes when you point at it. A change that glides instead of snapping.",
  },
];
