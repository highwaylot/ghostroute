import { hasAnyAttribute, hasImgWithSrcAndAlt } from '../lib/htmlCheck';

export type Requirement = {
  id: string;
  desc: string;
  hint: string;
  check: (code: string) => boolean;
};

export type Project = {
  id: string;
  title: string;
  brief: string;
  starter: string;
  requirements: Requirement[];
};

const has = (code: string, re: RegExp) => re.test(code);

export const PROJECTS: Project[] = [
  {
    id: 'bio-page',
    title: 'personal bio page',
    brief:
      "Build a small page about yourself (real or made up) — no route holding your hand this time. Use whatever you learned. The checklist tracks what you've got; nothing here checks in a fixed order.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>

  </body>
</html>
`,
    requirements: [
      {
        id: 'heading',
        desc: 'A heading with your name or a title',
        hint: '<h1>Your Name</h1>',
        check: (code) => has(code, /<h1[^>]*>[^<]*<\/h1>/i),
      },
      {
        id: 'paragraph',
        desc: 'At least one paragraph of text',
        hint: '<p>A sentence or two about yourself.</p>',
        check: (code) => has(code, /<p[^>]*>[^<]*<\/p>/i),
      },
      {
        id: 'list',
        desc: 'A list of things (interests, skills, whatever)',
        hint: '<ul>\n  <li>Reading</li>\n  <li>Hiking</li>\n</ul>',
        check: (code) =>
          has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ul>/i) ||
          has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[^<]*<\/li>[\s\S]*?<\/ol>/i),
      },
      {
        id: 'link',
        desc: 'A link to somewhere (a social profile, a project, anything)',
        hint: '<a href="https://github.com">My GitHub</a>',
        check: (code) => has(code, /<a\s+href\s*=\s*"[^"]+"[^>]*>[^<]*<\/a>/i),
      },
      {
        id: 'image',
        desc: 'An image with alt text',
        hint: '<img src="https://placekitten.com/200/200" alt="A cat">',
        check: (code) => hasImgWithSrcAndAlt(code),
      },
      {
        id: 'semantic',
        desc: 'At least one semantic layout tag (header, nav, main, or footer)',
        hint: 'Wrap your heading in <header>...</header>, or wrap the rest of your content in <main>...</main>.',
        check: (code) =>
          has(code, /<header[^>]*>/i) ||
          has(code, /<nav[^>]*>/i) ||
          has(code, /<main[^>]*>/i) ||
          has(code, /<footer[^>]*>/i),
      },
      {
        id: 'attribute',
        desc: 'A class or id attribute used somewhere',
        hint: 'Add class="intro" or id="intro" to any tag you already have — for example: <p class="intro">Hi, I\'m...</p>',
        check: (code) => hasAnyAttribute(code, 'class') || hasAnyAttribute(code, 'id'),
      },
    ],
  },
];
