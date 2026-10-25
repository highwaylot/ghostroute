export type Chapter = {
  id: string;
  title: string;
  blurb: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'start',
    title: 'your first line',
    blurb:
      "A tag is a label in angle brackets, like <h1>. The browser is the app you read this in. Render means the browser reads your tags and draws the page.",
  },
  {
    id: 'foundations',
    title: 'foundations',
    blurb:
      "Every web page starts with the same few lines. They tell the browser what the page is and where the visible part begins.",
  },
  {
    id: 'text',
    title: 'text basics',
    blurb:
      "Headings are titles. Paragraphs are the normal text under them. Then two ways to make a word stand out.",
  },
  {
    id: 'lists',
    title: 'lists',
    blurb:
      "A list is a set of things that belong together. One tag for the list, one tag for each item.",
  },
  {
    id: 'links-media',
    title: 'links & media',
    blurb:
      "A link takes the reader to another page. An image puts a picture on this one.",
  },
  {
    id: 'grouping',
    title: 'grouping & attributes',
    blurb:
      "Two tags that group other tags, and two ways to give a tag a name so CSS can find it later.",
  },
  {
    id: 'semantic',
    title: 'semantic layout',
    blurb:
      "Four tags that name the parts of a page: the top, the menu, the main content, the bottom. Screen readers and search engines use them.",
  },
];
