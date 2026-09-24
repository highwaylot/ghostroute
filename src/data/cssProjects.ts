import type { Project } from './projects';
import { ruleBody, hasRule } from '../lib/cssCheck';

export type { Project };

// Two projects, not five like HTML's set — CSS mastery here means
// styling something real well, not building a series of new page
// skeletons from scratch (that's what the HTML projects already cover).
// One medium-difficulty single-component project, one harder project
// that integrates flexbox, positioning, responsive, interaction, and
// custom properties together the way a real small page actually would.
export const CSS_PROJECTS: Project[] = [
  {
    id: 'css-profile-card',
    title: 'profile card',
    difficulty: 'medium',
    brief:
      "Style this profile card: give it real breathing room, a visible edge, a row of links that behaves like a flex row with a hover state, a custom property for its accent color, and a small responsive tweak. Nothing here checks in a fixed order.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Profile Card</title>
    <style>

    </style>
  </head>
  <body>
    <div class="card">
      <img src="https://placekitten.com/120/120" alt="Profile photo">
      <h2>Jordan Lee</h2>
      <p>Frontend developer who likes clean layouts and strong coffee.</p>
      <div class="actions">
        <a href="#">GitHub</a>
        <a href="#">Twitter</a>
      </div>
    </div>
  </body>
</html>
`,
    requirements: [
      {
        id: 'box-sizing',
        desc: 'box-sizing: border-box on .card, so padding doesn\'t inflate its width',
        hint: '.card { box-sizing: border-box; }',
        check: (code) => hasRule(code, '\\.card', 'box-sizing\\s*:\\s*border-box') || hasRule(code, '\\*', 'box-sizing\\s*:\\s*border-box'),
      },
      {
        id: 'padding',
        desc: 'Padding on .card, so the content isn\'t pressed against the edge',
        hint: '.card { padding: 24px; }',
        check: (code) => hasRule(code, '\\.card', 'padding\\s*:'),
      },
      {
        id: 'border',
        desc: 'A visible border or border-radius on .card, so it actually reads as a card',
        hint: '.card { border: 1px solid #ddd; border-radius: 12px; }',
        check: (code) => hasRule(code, '\\.card', 'border(-radius)?\\s*:'),
      },
      {
        id: 'flex-actions',
        desc: '.actions turned into a flex row with gap between the links',
        hint: '.actions { display: flex; gap: 12px; }',
        check: (code) => hasRule(code, '\\.actions', 'display\\s*:\\s*flex') && hasRule(code, '\\.actions', 'gap\\s*:'),
      },
      {
        id: 'hover-state',
        desc: 'A hover state on the links inside .actions',
        hint: '.actions a:hover { color: #2563eb; }',
        check: (code) => {
          const body = ruleBody(code, '\\.actions\\s+a:hover');
          return body !== null && /color\s*:/.test(body);
        },
      },
      {
        id: 'custom-property',
        desc: 'A custom property defined in :root and actually used somewhere with var()',
        hint: ':root { --accent: #2563eb; }\nh2 { color: var(--accent); }',
        check: (code) => {
          const rootBody = ruleBody(code, ':root');
          if (!rootBody) return false;
          const defs = [...rootBody.matchAll(/--([a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]);
          return defs.some((name) => new RegExp(`var\\(\\s*--${name}\\b`).test(code));
        },
      },
      {
        id: 'responsive',
        desc: 'A media query that adjusts something about .card on a narrow screen',
        hint: '@media (max-width: 500px) {\n  .card {\n    padding: 16px;\n  }\n}',
        check: (code) => /@media\s*\([^)]*(max-width|min-width)[^)]*\)/i.test(code),
      },
    ],
  },
  {
    id: 'css-responsive-navbar',
    title: 'responsive header + card grid',
    difficulty: 'hard',
    brief:
      "Style this small dashboard page: a flexbox header, a card row that wraps with gap, a positioned badge on the first card, a hover transition on the nav links, a media query that stacks the header on narrow screens, and a custom property reused for the shared accent color. This is the most integrated CSS project — every chapter shows up here somewhere.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Dashboard</title>
    <style>

    </style>
  </head>
  <body>
    <header class="site-header">
      <span class="logo">Acme</span>
      <nav class="nav-links">
        <a href="#">Home</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </nav>
    </header>
    <main class="card-grid">
      <div class="tile">
        <span class="badge">New</span>
        <h3>Starter</h3>
        <p>Good for trying things out.</p>
      </div>
      <div class="tile">
        <h3>Pro</h3>
        <p>For serious projects.</p>
      </div>
      <div class="tile">
        <h3>Team</h3>
        <p>Built for collaboration.</p>
      </div>
    </main>
  </body>
</html>
`,
    requirements: [
      {
        id: 'header-flex',
        desc: '.site-header as a flex row with its logo and nav pushed to opposite ends',
        hint: '.site-header { display: flex; justify-content: space-between; align-items: center; }',
        check: (code) =>
          hasRule(code, '\\.site-header', 'display\\s*:\\s*flex') &&
          hasRule(code, '\\.site-header', 'justify-content\\s*:'),
      },
      {
        id: 'grid-wrap',
        desc: '.card-grid as a flex row that wraps, with gap between the cards',
        hint: '.card-grid { display: flex; flex-wrap: wrap; gap: 20px; }',
        check: (code) =>
          hasRule(code, '\\.card-grid', 'display\\s*:\\s*flex') &&
          hasRule(code, '\\.card-grid', 'flex-wrap\\s*:\\s*wrap') &&
          hasRule(code, '\\.card-grid', 'gap\\s*:'),
      },
      {
        id: 'badge-position',
        desc: 'The .badge positioned in a corner of its .tile — .tile needs position: relative, .badge needs position: absolute',
        hint: '.tile { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }',
        check: (code) =>
          hasRule(code, '\\.tile', 'position\\s*:\\s*relative') &&
          hasRule(code, '\\.badge', 'position\\s*:\\s*absolute'),
      },
      {
        id: 'nav-hover-transition',
        desc: 'A hover state on the nav links, with the transition on their resting state (not the :hover rule)',
        hint: '.nav-links a { transition: color 0.2s; }\n.nav-links a:hover { color: #2563eb; }',
        check: (code) =>
          hasRule(code, '\\.nav-links a(?!:hover)', 'transition\\s*:') && ruleBody(code, '\\.nav-links a:hover') !== null,
      },
      {
        id: 'responsive-header',
        desc: 'A media query that stacks .site-header into a column on a narrow screen',
        hint: '@media (max-width: 600px) {\n  .site-header {\n    flex-direction: column;\n  }\n}',
        check: (code) => {
          const m = code.match(/@media\s*\([^)]*(?:max-width|min-width)[^)]*\)\s*\{/i);
          if (!m || m.index === undefined) return false;
          const after = code.slice(m.index);
          return /\.site-header/.test(after) && /flex-direction\s*:\s*column/i.test(after);
        },
      },
      {
        id: 'shared-custom-property',
        desc: 'A custom property in :root, referenced with var() in at least two different places',
        hint: ':root { --accent: #2563eb; }\n.logo { color: var(--accent); }\n.badge { background: var(--accent); }',
        check: (code) => {
          const rootBody = ruleBody(code, ':root');
          if (!rootBody) return false;
          const defs = [...rootBody.matchAll(/--([a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]);
          return defs.some((name) => {
            const uses = code.match(new RegExp(`var\\(\\s*--${name}\\b`, 'gi'));
            return uses !== null && uses.length >= 2;
          });
        },
      },
    ],
  },
];
