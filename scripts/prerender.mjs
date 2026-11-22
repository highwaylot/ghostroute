// Turns the built single-page app into real HTML pages, one file per
// public address, so search engines, link previews and AI tools read the
// actual content instead of an empty shell. Runs after both Vite builds
// (see "build" in package.json):
//
//   dist/            the client build (index.html is the template)
//   dist-ssr/        entry-server.js: render(url) and getRoutes()
//
// Writes dist/<path>.html for every route (Vercel serves /ai from ai.html
// with cleanUrls), dist/app-shell.html for deeper workspace addresses,
// sitemap.xml and robots.txt. Then checks the result and fails the build
// if a public page breaks a rule (see check()).
//
// Staging: when Vercel builds anything but production (VERCEL_ENV), every
// page is noindex, nofollow and robots.txt disallows everything, so
// production is the only copy search engines can index.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.tagsmiths.com';
const HOLD_INDEX = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production';

const { render, getRoutes } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href);
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(join(DIST, '.vite', 'manifest.json'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const canonical = (path) => SITE + (path === '/' ? '/' : path);
const robots = (noindex) => (HOLD_INDEX ? 'noindex, nofollow' : noindex ? 'noindex, follow' : 'index, follow');

// A lazy page's own CSS and JS, and those of everything it imports, so the
// static HTML is styled at first paint and the app takes over sooner.
function assetsFor(chunk) {
  if (!chunk) return { css: [], js: [] };
  const key = `src/pages/${chunk}.tsx`;
  const css = new Set();
  const js = new Set();
  const walk = (k) => {
    const m = manifest[k];
    if (!m || js.has(m.file)) return;
    js.add(m.file);
    (m.css ?? []).forEach((c) => css.add(c));
    (m.imports ?? []).forEach(walk);
  };
  walk(key);
  if (!js.size) throw new Error(`prerender: no chunk for ${key} in the Vite manifest`);
  // The entry chunk is already in the template.
  const entry = Object.values(manifest).find((m) => m.isEntry);
  js.delete(entry.file);
  (entry.css ?? []).forEach((c) => css.delete(c));
  return { css: [...css], js: [...js] };
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*" ?/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  if (!re.test(html)) throw new Error(`prerender: template has no <meta ${attr}="${key}">`);
  return html.replace(re, () => tag);
}

function page({ meta, body, route, prerendered = true }) {
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'name', 'robots', robots(meta.noindex));
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', canonical(meta.path));
  html = setMeta(html, 'property', 'og:type', route?.ogType ?? 'website');
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = html.replace(/<link rel="canonical" href="[^"]*" ?\/?>/, () => `<link rel="canonical" href="${canonical(meta.path)}" />`);
  // Structured data: "</" escaped so no text in it can close the script.
  const ld = route ? JSON.stringify(route.jsonLd(meta), null, 0).replace(/</g, '\\u003c') : null;
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, () => (ld ? `\n    <script type="application/ld+json">${ld}</script>` : ''));
  const { css, js } = assetsFor(route?.chunk ?? null);
  const links = [...css.map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`), ...js.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)];
  if (links.length) html = html.replace('</head>', () => `    ${links.join('\n    ')}\n  </head>`);
  if (HOLD_INDEX) html = html.replace('<html lang="en">', '<html lang="en" data-hold-index>');
  if (body !== undefined) {
    html = html.replace(/<div id="root">[\s\S]*<\/div>(\s*<\/body>)/, (_, end) => `<div id="root"${prerendered ? ' data-prerendered' : ''}>${body}</div>${end}`);
  }
  return html;
}

function write(path, html) {
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const routes = getRoutes();
const outputs = [];
for (const route of routes) {
  const { html: body, meta } = await render(route.path);
  if (!meta) throw new Error(`prerender: ${route.path} set no page meta (usePageMeta)`);
  if (meta.path !== route.path) throw new Error(`prerender: ${route.path} says its canonical path is ${meta.path}`);
  const html = page({ meta, body, route });
  outputs.push({ route, meta, html });
}

// Deeper workspace addresses (/html/website/sandbox, …) get the plain app:
// they are panes of a track, canonically the track itself, not pages.
const shell = page({
  meta: { title: 'tagsmiths', description: 'Free HTML and CSS lessons in your browser.', path: '/', noindex: true },
  route: { chunk: 'Workspace', ogType: 'website', jsonLd: () => ({}) },
}).replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

check(outputs);

for (const o of outputs) write(o.route.path, o.html);
writeFileSync(join(DIST, 'app-shell.html'), shell);

const inSitemap = outputs.filter((o) => o.route.inSitemap);
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${inSitemap
    .map((o) => `  <url><loc>${canonical(o.route.path)}</loc><lastmod>${o.route.lastmod}</lastmod><priority>${o.route.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync(
  join(DIST, 'robots.txt'),
  HOLD_INDEX
    ? '# Preview build: nothing here is meant for search engines.\nUser-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

console.log(
  `prerender: ${outputs.length} pages, ${inSitemap.length} in the sitemap${HOLD_INDEX ? ' (preview build: everything noindex)' : ''}`,
);

// The rules every page in the sitemap must meet. A failure stops the build,
// so a broken page never reaches production.
function check(list) {
  const problems = [];
  const seenTitle = new Map();
  const seenDesc = new Map();
  for (const { route, meta, html } of list.filter((o) => o.route.inSitemap)) {
    const p = route.path;
    const fail = (m) => problems.push(`${p}: ${m}`);
    if (meta.noindex) fail('is in the sitemap but marked noindex');
    if (meta.title.length > 60) fail(`title is ${meta.title.length} characters (max 60): "${meta.title}"`);
    if (meta.description.length < 70 || meta.description.length > 160) fail(`description is ${meta.description.length} characters (70-160)`);
    if (seenTitle.has(meta.title)) fail(`same title as ${seenTitle.get(meta.title)}`);
    if (seenDesc.has(meta.description)) fail(`same description as ${seenDesc.get(meta.description)}`);
    seenTitle.set(meta.title, p);
    seenDesc.set(meta.description, p);
    const body = html.slice(html.indexOf('<div id="root"'));
    const words = body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
    // The two landing pages are short on purpose (a headline and links);
    // every other public page has to carry real reading.
    const minWords = p === '/' || p === '/html' ? 50 : 120;
    if (words < minWords) fail(`only ${words} words of real content (min ${minWords})`);
    if ((body.match(/<h1[\s>]/g) ?? []).length !== 1) fail('needs exactly one <h1>');
    if (/coming soon|lorem ipsum/i.test(body.replace(/<[^>]+>/g, ' ')) && p !== '/') fail('has placeholder text');
    try {
      const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (!ld) fail('no structured data');
      else JSON.parse(ld[1]);
    } catch {
      fail('structured data is not valid JSON');
    }
  }
  if (problems.length) {
    console.error(`prerender: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
    process.exit(1);
  }
}
