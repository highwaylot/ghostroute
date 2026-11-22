// Workspace and motion regressions, on the prerendered build.
const { chromium } = require('playwright');
const B = 'http://localhost:4173';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  let failures = 0; const errors = [];
  const ok = (l, c, d = '') => { console.log(`${c ? 'ok  ' : 'FAIL'} ${l}${d ? ' -> ' + d : ''}`); if (!c) failures++; };
  const ctx = await b.newContext({ viewport: { width: 1366, height: 860 }, colorScheme: 'light' });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && !/status of 404/.test(m.text()) && errors.push(m.text()));
  const logoAt = (pg) => pg.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.x)},${Math.round(r.y)}`; });

  // The logo is on the same pixel on every kind of page, at three widths.
  for (const [w, h] of [[1366, 820], [700, 900], [390, 844]]) {
    const pg = await b.newPage({ viewport: { width: w, height: h } });
    const at = [];
    for (const path of ['/', '/html', '/html/website', '/javascript', '/ai', '/game-design', '/reference', '/reference/html/main']) {
      await pg.goto(B + path, { waitUntil: 'networkidle' });
      at.push(await logoAt(pg));
    }
    ok(`${w}px: logo on the same pixel on every page`, new Set(at).size === 1, at.join(' '));
    ok(`${w}px: no sideways scroll on a reference page`, (await pg.evaluate(() => document.documentElement.scrollWidth)) <= w);
    await pg.close();
  }

  // Page transitions still run, fading through navy, with the logo pinned.
  await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(3500);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.05 });
  await p.click('a.landing-tile-story[href="/reference"]');
  await p.waitForFunction(() => document.getAnimations().some((a) => /view-transition/.test(a.effect.pseudoElement || '')));
  const anims = await p.evaluate(() => document.getAnimations().map((a) => `${a.effect.pseudoElement}:${a.animationName}`).join(' '));
  ok('home → reference: view transition fades through, logo not animated', /vt-fade-out/.test(anims) && /vt-settle-in/.test(anims) && !/site-logo/.test(anims), anims);
  await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 }); await cdp.detach();
  await p.waitForSelector('.ref-list');

  // Workspace: hydrated, and the route works end to end.
  await p.goto(B + '/html/website', { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  await p.click('.cm-content');
  await p.keyboard.type('<h1>hello</h1>');
  await p.getByRole('button', { name: 'Check my work' }).click();
  await p.waitForTimeout(2600);
  ok('route step 1 passes and moves to step 2', /2\s*\/\s*15/.test(await p.textContent('body')));
  for (const tab of ['solve', 'sandbox', 'nest']) {
    await p.locator(`.tabs .tab:has-text("${tab}")`).first().click();
    await p.waitForTimeout(300);
    ok(`tab "${tab}" opens and updates the address`, p.url().endsWith(`/html/website/${tab}`));
  }
  const perma = await p.getAttribute('.nest-page-permalink', 'href');
  const nestTag = (await p.textContent('.nest-page-title')).trim();
  ok('Nest page links to its own reference page', perma === '/reference/html/doctype-html' && nestTag === '<!DOCTYPE html>', `${nestTag} -> ${perma}`);
  ok('canonical stays the track on a pane', (await p.$eval('link[rel=canonical]', (l) => l.href)) === 'https://www.tagsmiths.com/html/website');
  await p.getByRole('button', { name: 'Settings' }).click();
  ok('settings menu opens', !!(await p.$('.settings-menu')));
  await p.keyboard.press('Escape');
  ok('Escape closes it and returns focus to the gear', !(await p.$('.settings-menu')) && (await p.evaluate(() => document.activeElement?.getAttribute('aria-label'))) === 'Settings');
  ok('quickfire tab shown on a preview build (local)', (await p.$$eval('.tabs .tab', (t) => t.some((x) => /quickfire/.test(x.textContent)))));
  await p.locator('button:has-text("key index")').first().click();
  ok('key index opens', !!(await p.$('.sidebar.open')));
  await p.keyboard.press('Escape');

  // Reloading a deep address straight from the server works (app shell).
  await p.goto(B + '/css/website/nest', { waitUntil: 'networkidle' });
  ok('/css/website/nest loads directly into the CSS Nest', !!(await p.$('.nest-page-title')) && /CSS/.test(await p.title()));
  await p.goto(B + '/css', { waitUntil: 'networkidle' });
  ok('/css redirects to /css/website', p.url() === B + '/css/website');

  ok('no page errors', errors.length === 0, errors.join(' | ').slice(0, 300));
  console.log(failures ? `\n${failures} FAILURES` : '\nALL APP CHECKS PASSED');
  await b.close();
  process.exit(failures ? 1 : 0);
})();
