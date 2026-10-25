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
      "Email apps like Gmail and Outlook draw HTML differently. Tables are the one layout that works in all of them.",
  },
  {
    id: 'styling',
    title: 'inline styles',
    blurb:
      "Many email apps delete the <style> tag. CSS has to go on each tag, in a style attribute.",
  },
  {
    id: 'images-buttons',
    title: 'images & buttons',
    blurb:
      "Images are often hidden, and button styling often breaks. Both need a version that still works.",
  },
  {
    id: 'compatibility',
    title: 'client quirks',
    blurb:
      "Small details that make an email look right in every inbox.",
  },
];
