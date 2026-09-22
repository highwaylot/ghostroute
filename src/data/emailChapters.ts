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
      "Flexbox and grid aren't reliably supported across email clients — Outlook still renders using Word's engine. Tables are the one layout method that survives almost everywhere.",
  },
  {
    id: 'styling',
    title: 'inline styles',
    blurb:
      'Many clients strip <style> blocks and ignore external stylesheets entirely. Styling has to live directly on each tag.',
  },
  {
    id: 'images-buttons',
    title: 'images & buttons',
    blurb:
      'Images are often blocked by default, and CSS-styled links render inconsistently — especially in Outlook. Both need a fallback-first approach.',
  },
  {
    id: 'compatibility',
    title: 'client quirks',
    blurb:
      "The last stretch: the small things that separate an email that looks right everywhere from one that only looks right in your own inbox.",
  },
];
