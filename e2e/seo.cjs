// Prerendered pages: raw HTML, takeover by React, no-JS rendering, sitemap.
const { chromium } = require('playwright');
const B = 'http://localhost:4173';
const SITE = 'https://www.tagsmiths.com';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  let failures = 0;
  const ok = (l, c, d = '') => { console.log(`${c ? 'ok  ' : 'FAIL'} ${l}${d ? ' -> ' + d : ''}`); if (!c) failures++; };
  const ctx = await b.newContext({ viewport: { width: 1366, height: 860 }, colorScheme: 'light' });
  const req = ctx.request;
  const pick = (html, re) => (html.match(re) || [])[1];

  const PAGES = {
    '/': 'WebSite', '/html': 'CollectionPage', '/html/website': 'LearningResource', '/css/website': 'LearningResource', '/html/email': 'LearningResource',
    '/ai': 'Article', '/game-design': 'Article', '/reference': 'CollectionPage', '/reference/html/main': 'TechArticle',
    '/reference/css/display-flex': 'TechArticle', '/reference/email/bulletproof-button': 'TechArticle',
  };
  const titles = new Set();
  for (const [path, type] of Object.entries(PAGES)) {
    const r = await req.get(B + path);
    const html = await r.text();
    const title = pick(html, /<title>([^<]*)<\/title>/);
    const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
    const ogUrl = pick(html, /<meta property="og:url" content="([^"]*)"/);
    const robots = pick(html, /<meta name="robots" content="([^"]*)"/);
    const desc = pick(html, /<meta name="description" content="([^"]*)"/);
    const ld = JSON.parse(pick(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || '{}');
    const types = (ld['@graph'] || []).map((n) => n['@type']);
    const body = html.slice(html.indexOf('<div id="root"'));
    const words = body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
    const want = SITE + (path === '/' ? '/' : path);
    ok(`${path}: 200, prerendered root, ${words} words in the raw HTML`, r.status() === 200 && html.includes('<div id="root" data-prerendered>') && words >= 50, `${r.status()} ${words}`);
    ok(`${path}: title ≤ 60 and unique`, title.length <= 60 && !titles.has(title), `${title.length} "${title}"`);
    titles.add(title);
    ok(`${path}: canonical and og:url are ${want}`, canonical === want && ogUrl === want, `${canonical} | ${ogUrl}`);
    ok(`${path}: index, follow; description ${desc.length} chars`, robots === 'index, follow' && desc.length >= 70 && desc.length <= 160);
    ok(`${path}: JSON-LD has ${type}${path === '/' ? '' : ' and BreadcrumbList'}`, types.includes(type) && types.includes('Organization') && (path === '/' || types.includes('BreadcrumbList')), types.join(','));
    ok(`${path}: exactly one h1 in the raw HTML`, (body.match(/<h1[\s>]/g) || []).length === 1);
  }

  // React takes over the prerendered page: no errors, no redraw, links work
  // without a full page load.
  const errors = [];
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => (m.type() === 'error' || /hydrat/i.test(m.text())) && errors.push(`${p.url()}: ${m.text()}`));
  for (const path of Object.keys(PAGES)) {
    await p.goto(B + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
  }
  ok('every page hydrates with no errors or hydration warnings', errors.length === 0, errors.join(' | ').slice(0, 400));

  // The prerendered DOM is kept (hydrated), not thrown away and redrawn.
  await p.goto(B + '/ai', { waitUntil: 'domcontentloaded' });
  await p.evaluate(() => { document.querySelector('.story-h1').dataset.marker = 'kept'; });
  await p.waitForLoadState('networkidle'); await p.waitForTimeout(500);
  ok('the prerendered DOM is adopted, not replaced', (await p.$eval('.story-h1', (e) => e.dataset.marker)) === 'kept');
  await p.evaluate(() => { window.__noReload = 1; });
  await p.click('.story-switch-link[href="/reference"]');
  await p.waitForSelector('.ref-list');
  ok('after takeover, links navigate in-app (no full reload)', (await p.evaluate(() => window.__noReload)) === 1);
  await p.click('a.ref-list-link[href="/reference/html/main"]');
  await p.waitForSelector('.ref-h1');
  ok('in-app navigation updates title and canonical', (await p.title()) === 'HTML <main> tag, explained with an example' && (await p.$eval('link[rel=canonical]', (l) => l.href)) === SITE + '/reference/html/main');
  ok('reference page: short answer, facts, example, mistakes, related', (await p.$$eval('.ref-h2', (h) => h.map((x) => x.textContent).join('|'))) === 'Where it goes|Example|Common mistakes|Related' && (await p.$$eval('.ref-fact', (f) => f.length)) >= 3);
  ok('reference page: updated date shown', /Updated \d{1,2} [A-Z][a-z]+ 20\d\d/.test(await p.textContent('.ref-meta')));
  // "Open this example in the editor" carries the example into the sandbox.
  await p.click('.ref-try');
  await p.waitForSelector('.cm-content');
  await p.waitForTimeout(800);
  ok('"open in the editor" loads the example into the sandbox', /<main>/.test(await p.textContent('.cm-content')), (await p.textContent('.cm-content')).slice(0, 60));

  // Without JavaScript the pages still read and are styled.
  const nojs = await b.newContext({ viewport: { width: 1366, height: 860 }, javaScriptEnabled: false });
  const q = await nojs.newPage();
  for (const [path, sel] of [['/ai', '.story-topbar'], ['/reference/css/margin', '.story-topbar'], ['/html/website', '.topbar']]) {
    await q.goto(B + path, { waitUntil: 'networkidle' });
    const bg = await q.$eval(sel, (e) => getComputedStyle(e).backgroundColor);
    const h1 = (await q.textContent('h1')).trim();
    ok(`no JS ${path}: content and styles present`, bg === 'rgb(18, 26, 61)' && h1.length > 3, `${bg} "${h1.slice(0, 40)}"`);
  }
  await nojs.close();

  // A returning learner: dark theme and saved progress. No flash of light,
  // the saved step shows, nothing logged.
  const ret = await b.newContext({ viewport: { width: 1366, height: 860 }, colorScheme: 'light' });
  await ret.addInitScript(() => { try { localStorage.setItem('tagsmiths-theme', 'dark'); localStorage.setItem('tagsmiths-step-v3', '3'); } catch {} });
  const r2 = await ret.newPage();
  const errs2 = [];
  r2.on('pageerror', (e) => errs2.push(e.message));
  r2.on('console', (m) => m.type() === 'error' && errs2.push(m.text()));
  let themeAtFirstPaint = null;
  r2.on('domcontentloaded', async () => { themeAtFirstPaint = await r2.evaluate(() => document.documentElement.dataset.theme).catch(() => null); });
  await r2.goto(B + '/html/website', { waitUntil: 'networkidle' });
  await r2.waitForTimeout(600);
  ok('returning dark-mode reader: dark from the first paint', themeAtFirstPaint === 'dark', String(themeAtFirstPaint));
  ok('returning learner: saved step shows after takeover', /4\s*\/\s*15/.test(await r2.textContent('body')));
  ok('returning learner: no errors logged', errs2.length === 0, errs2.join(' | '));
  await r2.goto(B + '/ai', { waitUntil: 'networkidle' });
  ok('returning reader: theme button label matches the theme', (await r2.textContent('.story-theme-label')).trim() === 'light');
  await ret.close();

  // Deeper workspace addresses get the app shell and still work.
  const r3 = await p.goto(B + '/html/website/sandbox', { waitUntil: 'networkidle' });
  ok('/html/website/sandbox: 200 and the sandbox works', r3.status() === 200 && !!(await p.$('.cm-content')));
  ok('…and its canonical is the track', (await p.$eval('link[rel=canonical]', (l) => l.href)) === SITE + '/html/website');

  // Sitemap and robots
  const sm = await (await req.get(B + '/sitemap.xml')).text();
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  ok('sitemap lists 136 pages, each with a lastmod', locs.length === 136 && (sm.match(/<lastmod>\d{4}-\d\d-\d\d<\/lastmod>/g) || []).length === 136, String(locs.length));
  let bad = [];
  for (const loc of locs) {
    const path = loc.replace(SITE, '') || '/';
    const res = await req.get(B + path, { maxRedirects: 0 });
    const c = pick(await res.text(), /<link rel="canonical" href="([^"]*)"/);
    if (res.status() !== 200 || c !== loc) bad.push(`${path} ${res.status()} ${c}`);
  }
  ok('every sitemap URL answers 200 with no redirect, canonical = its own URL', bad.length === 0, bad.slice(0, 5).join(' | '));
  ok('sitemap leaves out /javascript (noindex)', !locs.some((l) => l.endsWith('/javascript')));
  const robotsTxt = await (await req.get(B + '/robots.txt')).text();
  ok('robots.txt allows all and names the sitemap', /Allow: \//.test(robotsTxt) && robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`));

  // Every page reachable by links from the home page (no orphans): crawl the raw HTML.
  const seen = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const path = queue.shift();
    const html = await (await req.get(B + path)).text();
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const h = m[1];
      if (h.startsWith('/assets') || /\.(png|svg|css|js|xml)$/.test(h) || seen.has(h)) continue;
      seen.add(h);
      if (locs.includes(SITE + h) || h === '/') queue.push(h);
    }
  }
  const orphans = locs.filter((l) => !seen.has(l.replace(SITE, '') || '/'));
  ok('no orphans: every sitemap page is linked from the home page by plain links', orphans.length === 0, orphans.slice(0, 5).join(' '));

  console.log(failures ? `\n${failures} FAILURES` : '\nALL SEO CHECKS PASSED');
  await b.close();
  process.exit(failures ? 1 : 0);
})();
