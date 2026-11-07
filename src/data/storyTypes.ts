// The history sections (ai, game design) are reading pages, not code
// tracks: a story told in eras, with a few hands-on demos dropped in where
// the thing they show first happened. Same writing standard as the rest of
// the site (docs/WRITING.md), gated at the Nest level (grade 9).

export type DemoId = 'eliza' | 'perceptron' | 'nextword' | 'gamefeel';

export type StoryEntry = {
  // Shown as written: "1956", "c. 2600 BC", "1966–72", "today".
  year: string;
  title: string;
  text: string;
  // A hands-on demo shown right after this entry.
  demo?: DemoId;
};

export type StoryEra = {
  id: string;
  title: string;
  years: string;
  blurb: string;
  entries: StoryEntry[];
  // Groups eras under a heading in the era list ("history", "ideas").
  part?: string;
};

export type Story = {
  id: 'ai' | 'game-design';
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  bigIdea: { title: string; text: string };
  eras: StoryEra[];
  sources: { label: string; url: string }[];
  meta: { title: string; description: string };
};
