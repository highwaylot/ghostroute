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
      "Three words before anything else. A tag is a label in angle brackets, like <h1>. It tells the browser what a piece of content is. The browser is the app you are reading this in (Chrome, Safari, Firefox). Render means the browser reads your tags and draws the page. That is all HTML is: labels, read by a browser, drawn on screen.",
  },
  {
    id: 'foundations',
    title: 'foundations',
    blurb:
      "Every web page starts with the same five lines. They tell the browser what kind of page this is and where the visible part begins. You will write them once here, and you will see them at the top of every website for the rest of your life.",
  },
  {
    id: 'text',
    title: 'text basics',
    blurb:
      "Words on a page come in two kinds: headings and paragraphs. A heading is a title. A paragraph is the normal text under it. This chapter also shows how to make a word bold or italic.",
  },
  {
    id: 'lists',
    title: 'lists',
    blurb:
      "A list is a set of things that belong together: steps in a recipe, items in a menu, links in a sidebar. HTML has a tag for the list and a tag for each item in it.",
  },
  {
    id: 'links-media',
    title: 'links & media',
    blurb:
      "A link takes the reader to another page. An image puts a picture on this one. These two tags are what make a web page more than a document.",
  },
  {
    id: 'grouping',
    title: 'grouping & attributes',
    blurb:
      "Sometimes you need to treat a few tags as one thing, so you can style them together later. This chapter shows the two tags that do that, and the two ways to give a tag a name.",
  },
  {
    id: 'semantic',
    title: 'semantic layout',
    blurb:
      "A page has parts: the top, the menu, the main content, the bottom. These four tags name those parts. They look like nothing on their own. They matter because browsers, search engines and screen readers use them to understand your page.",
  },
];
