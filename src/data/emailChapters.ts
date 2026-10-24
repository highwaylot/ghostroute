import type { Chapter } from './chapters';

export type { Chapter };

// Deliberately lean — email doesn't have a wide tag vocabulary to teach
// (it's still <table>, <td>, <img>, <a>), it has a dense set of
// constraints and workarounds. Four chapters, not six.
export const EMAIL_CHAPTERS: Chapter[] = [
  {
    id: 'layout',
    title: 'why tables',
    blurb:
      "An email client is the app that shows an email: Gmail, Outlook, Apple Mail. Each one draws HTML a little differently, and Outlook uses the engine from Microsoft Word. Flexbox and grid break in some of them. A table is the one layout that works in all of them.",
  },
  {
    id: 'styling',
    title: 'inline styles',
    blurb:
      "Many email apps throw away the <style> tag. Linked CSS files are ignored too. The only CSS that works everywhere is written on the tag itself, in a style attribute.",
  },
  {
    id: 'images-buttons',
    title: 'images & buttons',
    blurb:
      "Most clients hide images until the reader allows them. And a link styled as a button often loses its styling in Outlook. Both need a version that still works when the styling is gone.",
  },
  {
    id: 'compatibility',
    title: 'client quirks',
    blurb:
      "The last stretch: the small details that make an email look right in every inbox, not just yours.",
  },
];
