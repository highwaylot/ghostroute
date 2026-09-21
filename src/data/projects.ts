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
        check: (code) => has(code, /<h1[^>]*>[\s\S]*?<\/h1>/i),
      },
      {
        id: 'paragraph',
        desc: 'At least one paragraph of text',
        hint: '<p>A sentence or two about yourself.</p>',
        check: (code) => has(code, /<p[^>]*>[\s\S]*?<\/p>/i),
      },
      {
        id: 'list',
        desc: 'A list of things (interests, skills, whatever)',
        hint: '<ul>\n  <li>Reading</li>\n  <li>Hiking</li>\n</ul>',
        check: (code) =>
          has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ul>/i) ||
          has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ol>/i),
      },
      {
        id: 'link',
        desc: 'A link to somewhere (a social profile, a project, anything)',
        hint: '<a href="https://github.com">My GitHub</a>',
        check: (code) => has(code, /<a\s+href\s*=\s*"[^"]+"[^>]*>[\s\S]*?<\/a>/i),
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
  {
    id: 'recipe-card',
    title: 'recipe card',
    brief:
      "Build a page for a recipe (real or made up): a title, a photo, an ingredients list, and numbered steps. Nothing here checks in a fixed order — build it however makes sense to you.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>My Recipe</title>
  </head>
  <body>

  </body>
</html>
`,
    requirements: [
      {
        id: 'heading',
        desc: 'A heading with the recipe name',
        hint: '<h1>Grandma\'s Pancakes</h1>',
        check: (code) => has(code, /<h1[^>]*>[\s\S]*?<\/h1>/i),
      },
      {
        id: 'image',
        desc: 'A photo of the dish, with alt text',
        hint: '<img src="https://placekitten.com/300/200" alt="A stack of pancakes">',
        check: (code) => hasImgWithSrcAndAlt(code),
      },
      {
        id: 'ingredients',
        desc: 'An ingredients list (unordered — order doesn\'t matter)',
        hint: '<ul>\n  <li>2 eggs</li>\n  <li>1 cup flour</li>\n</ul>',
        check: (code) => has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ul>/i),
      },
      {
        id: 'steps',
        desc: 'The cooking steps as a numbered list',
        hint: '<ol>\n  <li>Mix the batter.</li>\n  <li>Cook on a griddle.</li>\n</ol>',
        check: (code) => has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ol>/i),
      },
      {
        id: 'semantic',
        desc: 'At least one semantic layout tag (header, main, or footer)',
        hint: 'Wrap your title and photo in <header>...</header>, and the ingredients/steps in <main>...</main>.',
        check: (code) =>
          has(code, /<header[^>]*>/i) || has(code, /<main[^>]*>/i) || has(code, /<footer[^>]*>/i),
      },
      {
        id: 'link',
        desc: 'A link — credit the original source, or link to something related',
        hint: '<a href="https://example.com">Original recipe</a>',
        check: (code) => has(code, /<a\s+href\s*=\s*"[^"]+"[^>]*>[\s\S]*?<\/a>/i),
      },
    ],
  },
  {
    id: 'mini-portfolio',
    title: 'mini portfolio',
    brief:
      "Build a one-page portfolio: an intro section, a nav with a couple of links, a list of projects or skills, and a footer. This is the most layout-heavy project yet — lean on header/nav/main/footer to organize it.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>My Portfolio</title>
  </head>
  <body>

  </body>
</html>
`,
    requirements: [
      {
        id: 'header',
        desc: 'A <header> containing your name or a title',
        hint: '<header>\n  <h1>Jane Doe</h1>\n</header>',
        check: (code) => has(code, /<header[^>]*>[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/header>/i),
      },
      {
        id: 'nav',
        desc: 'A <nav> with at least two links in it',
        hint: '<nav>\n  <a href="#projects">Projects</a>\n  <a href="#contact">Contact</a>\n</nav>',
        check: (code) => {
          const navMatch = code.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
          if (!navMatch) return false;
          const links = navMatch[0].match(/<a\s+href\s*=\s*"[^"]+"[^>]*>/gi);
          return !!links && links.length >= 2;
        },
      },
      {
        id: 'main',
        desc: 'A <main> section holding the bulk of the page',
        hint: '<main>\n  <p>What you do, or a list of projects.</p>\n</main>',
        check: (code) => has(code, /<main[^>]*>[\s\S]*?<\/main>/i),
      },
      {
        id: 'list',
        desc: 'A list of projects or skills',
        hint: '<ul>\n  <li>Built a portfolio site</li>\n  <li>Learned HTML</li>\n</ul>',
        check: (code) =>
          has(code, /<ul[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ul>/i) ||
          has(code, /<ol[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ol>/i),
      },
      {
        id: 'footer',
        desc: 'A <footer> at the bottom',
        hint: '<footer>\n  <p>&copy; 2025</p>\n</footer>',
        check: (code) => has(code, /<footer[^>]*>[\s\S]*?<\/footer>/i),
      },
      {
        id: 'image',
        desc: 'A profile photo or project image, with alt text',
        hint: '<img src="https://placekitten.com/150/150" alt="Profile photo">',
        check: (code) => hasImgWithSrcAndAlt(code),
      },
    ],
  },
];
