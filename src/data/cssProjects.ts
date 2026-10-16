import type { Project } from './projects';
import { ruleBody, hasRule } from '../lib/cssCheck';

export type { Project };

// Five projects. The first two: one medium single-component project and
// one harder one that integrates flexbox, positioning, responsive,
// interaction, and custom properties the way a real small page would.
// The next three were added once the CSS Nest grew a grid chapter and
// pages for typography and polish, so each project has somewhere to send
// a stuck learner: a grid pricing table, a readable article (typography
// and max-width), and a landing hero (background, transform, box-shadow).
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
  // --- the three added for the "Ha" stage: someone who can style a card
  // and wants layouts that look like real pages. Each leans on a chapter
  // the first two projects barely touch: grid, typography/max-width, and
  // background/transform/box-shadow polish.
  {
    id: 'css-pricing-table',
    title: 'pricing table',
    difficulty: 'medium',
    brief:
      'Lay out three pricing tiers with CSS grid: three equal columns on desktop, one column on a phone, a highlighted middle tier, real card styling, and a button that looks like a button. Nothing here checks in a fixed order.',
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Pricing</title>
    <style>

    </style>
  </head>
  <body>
    <h1>Pick a plan</h1>
    <div class="plans">
      <div class="plan">
        <h2>Starter</h2>
        <p class="price">$0</p>
        <ul>
          <li>1 project</li>
          <li>Community support</li>
        </ul>
        <a class="btn" href="#">Choose</a>
      </div>
      <div class="plan featured">
        <h2>Pro</h2>
        <p class="price">$12</p>
        <ul>
          <li>Unlimited projects</li>
          <li>Email support</li>
        </ul>
        <a class="btn" href="#">Choose</a>
      </div>
      <div class="plan">
        <h2>Team</h2>
        <p class="price">$40</p>
        <ul>
          <li>Everything in Pro</li>
          <li>Shared workspace</li>
        </ul>
        <a class="btn" href="#">Choose</a>
      </div>
    </div>
  </body>
</html>
`,
    requirements: [
      {
        id: 'grid',
        desc: '.plans is a grid container (display: grid)',
        hint: '.plans { display: grid; }',
        check: (code) => hasRule(code, '\\.plans', 'display\\s*:\\s*grid'),
      },
      {
        id: 'columns',
        desc: 'Three columns on .plans using grid-template-columns (repeat(3, 1fr) or three values)',
        hint: '.plans { grid-template-columns: repeat(3, 1fr); }',
        check: (code) => {
          const body = ruleBody(code, '\\.plans');
          if (!body) return false;
          const m = body.match(/grid-template-columns\s*:\s*([^;}]+)/i);
          if (!m) return false;
          const v = m[1].trim();
          return /repeat\(\s*3\s*,/.test(v) || v.split(/\s+/).length === 3;
        },
      },
      {
        id: 'gap',
        desc: 'A gap between the plans (gap on .plans)',
        hint: '.plans { gap: 20px; }',
        check: (code) => hasRule(code, '\\.plans', '(^|[^-])gap\\s*:'),
      },
      {
        id: 'card',
        desc: 'Each .plan reads as a card: padding plus a border or box-shadow',
        hint: '.plan { padding: 24px; border: 1px solid #ddd; border-radius: 12px; }',
        check: (code) => hasRule(code, '\\.plan(?![a-z-])', 'padding\\s*:') && hasRule(code, '\\.plan(?![a-z-])', '(border|box-shadow)\\s*:'),
      },
      {
        id: 'featured',
        desc: 'The .featured plan stands out: a different border, background, or transform than the others',
        hint: '.featured { border-color: #6366f1; transform: scale(1.04); }',
        check: (code) => hasRule(code, '\\.(?:plan\\.)?featured', '(border|background|transform|box-shadow)[a-z-]*\\s*:'),
      },
      {
        id: 'button',
        desc: '.btn looks like a button: display inline-block or block, padding, and a background color',
        hint: '.btn { display: inline-block; padding: 10px 18px; background: #6366f1; color: #fff; border-radius: 8px; text-decoration: none; }',
        check: (code) =>
          hasRule(code, '\\.btn', 'display\\s*:\\s*(inline-block|block|inline-flex|flex)') &&
          hasRule(code, '\\.btn', 'padding\\s*:') &&
          hasRule(code, '\\.btn', 'background(-color)?\\s*:'),
      },
      {
        id: 'responsive',
        desc: 'A media query that makes .plans a single column on a narrow screen',
        hint: '@media (max-width: 700px) {\n  .plans {\n    grid-template-columns: 1fr;\n  }\n}',
        check: (code) => {
          const m = code.match(/@media\s*\([^)]*max-width[^)]*\)\s*\{([\s\S]*?)\}\s*\}/i);
          if (!m) return false;
          return /\.plans\s*\{[^}]*grid-template-columns\s*:\s*(1fr|100%|none|auto)\s*(;|$)/im.test(m[1]);
        },
      },
    ],
  },
  {
    id: 'css-article-layout',
    title: 'readable article',
    difficulty: 'medium',
    brief:
      'Make this plain article pleasant to read: a readable measure with max-width, real line-height, a font stack, a styled blockquote with a left border, an image that never overflows, and a lead paragraph that reads differently from the rest. Typography is most of CSS in practice — this is that practice.',
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Why I switched to Linux</title>
    <style>

    </style>
  </head>
  <body>
    <article>
      <h1>Why I switched to Linux</h1>
      <p class="lead">It started with a broken update and ended with a laptop I actually understand.</p>
      <img src="https://picsum.photos/900/400" alt="A desk with a laptop">
      <p>The first week was rough. Nothing was where I expected, and every forum answer assumed I already knew the answer.</p>
      <blockquote>The terminal is not a punishment. It is a conversation.</blockquote>
      <p>By the second month I'd stopped noticing the difference, except that the machine was faster and quieter and mine.</p>
    </article>
  </body>
</html>
`,
    requirements: [
      {
        id: 'measure',
        desc: 'A max-width on article (or body) so lines don\'t run the full screen width',
        hint: 'article { max-width: 65ch; }',
        check: (code) => hasRule(code, 'article', 'max-width\\s*:') || hasRule(code, 'body', 'max-width\\s*:'),
      },
      {
        id: 'centered',
        desc: 'The article is centered with margin: ... auto (left and right)',
        hint: 'article { margin: 0 auto; }',
        check: (code) =>
          hasRule(code, 'article', 'margin\\s*:\\s*([^;}]*\\s)?auto(\\s|;|$)') ||
          hasRule(code, 'article', 'margin-(left|right)\\s*:\\s*auto') ||
          hasRule(code, 'body', 'margin\\s*:\\s*([^;}]*\\s)?auto(\\s|;|$)') ||
          hasRule(code, 'article', 'margin-inline\\s*:\\s*auto'),
      },
      {
        id: 'line-height',
        desc: 'A line-height of at least 1.4 on body, article, or p',
        hint: 'body { line-height: 1.6; }',
        check: (code) => {
          for (const sel of ['body', 'article', 'p(?![a-z-])']) {
            const body = ruleBody(code, sel);
            const m = body?.match(/line-height\s*:\s*([0-9.]+)/i);
            if (m && Number(m[1]) >= 1.4) return true;
          }
          return false;
        },
      },
      {
        id: 'font-stack',
        desc: 'A font-family with a fallback (at least two fonts, comma-separated) on body',
        hint: 'body { font-family: Georgia, "Times New Roman", serif; }',
        check: (code) => {
          const body = ruleBody(code, 'body');
          const m = body?.match(/font-family\s*:\s*([^;}]+)/i);
          return !!m && m[1].split(',').length >= 2;
        },
      },
      {
        id: 'blockquote',
        desc: 'blockquote gets a left border and padding-left (or padding) so it reads as a quote',
        hint: 'blockquote { border-left: 4px solid #6366f1; padding-left: 16px; font-style: italic; }',
        check: (code) => hasRule(code, 'blockquote', 'border(-left)?\\s*:') && hasRule(code, 'blockquote', 'padding(-left)?\\s*:'),
      },
      {
        id: 'img',
        desc: 'Images never overflow: img { max-width: 100% } (height: auto is a good habit too)',
        hint: 'img { max-width: 100%; height: auto; }',
        check: (code) => hasRule(code, 'img', 'max-width\\s*:\\s*100%'),
      },
      {
        id: 'lead',
        desc: 'The .lead paragraph is set apart: a larger font-size, a different color, or a different weight than body text',
        hint: '.lead { font-size: 1.25rem; color: #555; }',
        check: (code) => hasRule(code, '\\.lead', '(font-size|color|font-weight|font-style)\\s*:'),
      },
    ],
  },
  {
    id: 'css-landing-hero',
    title: 'landing hero',
    difficulty: 'hard',
    brief:
      'Build the top of a landing page: a full-height hero with a background (color, gradient, or image), centered content with flexbox, a call-to-action button with a hover state that moves or lifts, a box-shadow somewhere, a custom property for the brand color used at least twice, and a media query that shrinks the heading on a phone. This is the polish chapter, applied.',
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Tagsmiths — learn by building</title>
    <style>

    </style>
  </head>
  <body>
    <section class="hero">
      <div class="hero-inner">
        <h1>Build the page you've been putting off.</h1>
        <p>Small steps, real code, instant output.</p>
        <a class="cta" href="#">Start for free</a>
      </div>
    </section>
  </body>
</html>
`,
    requirements: [
      {
        id: 'min-height',
        desc: '.hero fills the screen: min-height using vh (or 100svh/100dvh)',
        hint: '.hero { min-height: 100vh; }',
        check: (code) => hasRule(code, '\\.hero(?![a-z-])', 'min-height\\s*:\\s*[0-9.]+(vh|svh|dvh)'),
      },
      {
        id: 'background',
        desc: '.hero has a background: a color, a gradient, or an image',
        hint: '.hero { background: linear-gradient(135deg, #1e1b4b, #4338ca); color: #fff; }',
        check: (code) => hasRule(code, '\\.hero(?![a-z-])', 'background(-color|-image)?\\s*:'),
      },
      {
        id: 'centered',
        desc: '.hero centers its content with flexbox: display flex plus justify-content and align-items set to center',
        hint: '.hero { display: flex; justify-content: center; align-items: center; }',
        check: (code) =>
          hasRule(code, '\\.hero(?![a-z-])', 'display\\s*:\\s*flex') &&
          hasRule(code, '\\.hero(?![a-z-])', 'justify-content\\s*:\\s*center') &&
          hasRule(code, '\\.hero(?![a-z-])', 'align-items\\s*:\\s*center'),
      },
      {
        id: 'cta',
        desc: '.cta looks like a button: padding, a background, and a border-radius',
        hint: '.cta { display: inline-block; padding: 14px 28px; background: var(--brand); color: #fff; border-radius: 999px; text-decoration: none; }',
        check: (code) =>
          hasRule(code, '\\.cta(?![a-z-:])', 'padding\\s*:') &&
          hasRule(code, '\\.cta(?![a-z-:])', 'background(-color)?\\s*:') &&
          hasRule(code, '\\.cta(?![a-z-:])', 'border-radius\\s*:'),
      },
      {
        id: 'hover',
        desc: '.cta:hover changes transform (lift or scale), with a transition on .cta so it animates',
        hint: '.cta { transition: transform 150ms; }\n.cta:hover { transform: translateY(-2px); }',
        check: (code) => hasRule(code, '\\.cta:hover', 'transform\\s*:') && hasRule(code, '\\.cta(?![a-z-:])', 'transition\\s*:'),
      },
      {
        id: 'shadow',
        desc: 'A box-shadow somewhere in the hero (on .cta or .hero-inner)',
        hint: '.cta { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); }',
        check: (code) => hasRule(code, '\\.cta(?![a-z-:])', 'box-shadow\\s*:') || hasRule(code, '\\.hero-inner', 'box-shadow\\s*:') || hasRule(code, '\\.cta:hover', 'box-shadow\\s*:'),
      },
      {
        id: 'custom-property',
        desc: 'A custom property (--something) declared on :root and used with var() at least twice',
        hint: ':root { --brand: #6366f1; }\n.cta { background: var(--brand); }\n.hero { border-bottom: 4px solid var(--brand); }',
        check: (code) => {
          const root = ruleBody(code, ':root');
          const decl = root?.match(/--([a-z0-9-]+)\s*:/i);
          if (!decl) return false;
          const uses = code.match(new RegExp(`var\\(\\s*--${decl[1]}\\s*[,)]`, 'gi'));
          return !!uses && uses.length >= 2;
        },
      },
      {
        id: 'responsive',
        desc: 'A media query that reduces the h1 font-size on a narrow screen',
        hint: '@media (max-width: 600px) {\n  h1 {\n    font-size: 1.8rem;\n  }\n}',
        check: (code) => {
          const m = code.match(/@media\s*\([^)]*max-width[^)]*\)\s*\{([\s\S]*?)\}\s*\}/i);
          return !!m && /h1[^{]*\{[^}]*font-size\s*:/i.test(m[1]);
        },
      },
    ],
  },
];
