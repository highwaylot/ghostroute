export type Chapter = {
  id: string;
  title: string;
  blurb: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'foundations',
    title: 'foundations',
    blurb:
      "Every HTML page needs the same handful of wrapper tags before anything else works. Write this skeleton once, and you'll recognize it in every website you ever look at.",
  },
  {
    id: 'text',
    title: 'text basics',
    blurb:
      'Headings, paragraphs, and simple formatting are how you put words on a page and tell the browser (and readers) which words matter most.',
  },
  {
    id: 'lists',
    title: 'lists',
    blurb:
      'Lists group related items — steps, ingredients, links — in a way that both looks organized and tells screen readers "this is a set of things."',
  },
  {
    id: 'links-media',
    title: 'links & media',
    blurb:
      "The web is pages linking to other pages, plus images that aren't just text. These two tags are how a page stops being an island.",
  },
  {
    id: 'grouping',
    title: 'grouping & attributes',
    blurb:
      'div and span carry no meaning of their own — they exist purely to group things so you (or CSS, later) can target them. class and id are how you name those groups.',
  },
  {
    id: 'semantic',
    title: 'semantic layout',
    blurb:
      "These tags don't look like anything by default, but they tell browsers, screen readers, and search engines what each part of your page actually is.",
  },
];
