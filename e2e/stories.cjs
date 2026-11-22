const { chromium } = require('playwright');
const B = 'http://localhost:4173';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  let failures = 0; const errors = [];
  const ok = (l, c, d = '') => { console.log(`${c ? 'ok  ' : 'FAIL'} ${l}${d ? ' -> ' + d : ''}`); if (!c) failures++; };
  const ctx = await b.newContext({ viewport: { width: 1366, height: 860 }, colorScheme: 'light' });
  const p = await ctx.newPage(); p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => m.type() === 'error' && !/status of 404/.test(m.text()) && errors.push(m.text()));
  const reqs = []; p.on('request', (r) => reqs.push(r.url()));

  // home: tiles, preload, transition into /ai
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  ok('home has ai, game design and reference tiles', (await p.$$eval('.landing-tile-story', (t) => t.map((x) => x.getAttribute('href')).join(','))) === '/ai,/game-design,/reference');
  ok('home does not load the story chunk before the page has loaded', !reqs.slice(0, 5).some((u) => /Story-/.test(u)));
  await p.waitForTimeout(3500);
  ok('home preloads the story chunk in the background', reqs.some((u) => /Story-.*\.js/.test(u)));
  const logoHome = await p.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${r.x},${r.y}`; });
  const t0 = Date.now(); await p.click('a.landing-tile-story[href="/ai"]'); await p.waitForSelector('.story-h1'); const dt = Date.now() - t0;
  ok('opening ai after preload is near-instant', dt < 500, `${dt}ms`);
  await p.waitForTimeout(500);
  ok('no "loading" fallback ever shown', !(await p.$('.route-loading')));
  const logoAi = await p.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${r.x},${r.y}`; });
  ok('logo on the same pixel on home and /ai (pinned through the transition)', logoHome === logoAi, `${logoHome} | ${logoAi}`);
  ok('/ai title and canonical', (await p.title()).startsWith('History of AI') && (await p.$eval('link[rel=canonical]', (l) => l.href)) === 'https://www.tagsmiths.com/ai');
  ok('/ai has 10 eras, each with entries', (await p.$$eval('.story-era', (s) => s.length)) === 10 && (await p.$$eval('.story-era', (s) => s.every((x) => x.querySelectorAll('.story-entry').length >= 3))));
  ok('one h1, era h2s', (await p.$$eval('h1', (h) => h.length)) === 1 && (await p.$$eval('.story-era h2', (h) => h.length)) === 10);

  // era index follows the scroll, and clicking jumps
  await p.click('.story-index-link[href="#deep-learning"]');
  await p.waitForTimeout(1200);
  ok('clicking an era scrolls to it and marks it current', (await p.$eval('.story-index-link.active', (a) => a.getAttribute('href'))) === '#deep-learning' && p.url().endsWith('#deep-learning'));
  ok('era heading took focus', (await p.evaluate(() => document.activeElement?.id)) === 'deep-learning-h');

  // ELIZA
  await p.locator('#eliza-input').scrollIntoViewIfNeeded();
  await p.fill('#eliza-input', 'I feel nervous about my exams');
  await p.click('.eliza-form button[type=submit]');
  const reply = await p.locator('.eliza-eliza .eliza-text').last().textContent();
  ok('ELIZA reflects the sentence', reply === 'Do you often feel nervous about your exams?', reply);
  ok('ELIZA shows how it made the reply', /Keyword "feel"/.test(await p.locator('.eliza-how').last().textContent()));
  await p.click('.demo-eliza .demo-chip >> nth=2');
  ok('starter chip sends a message', (await p.locator('.eliza-eliza .eliza-text').last().textContent()) === 'Do computers worry you?');
  const pageY = await p.evaluate(() => scrollY);
  for (const m of ['banana', 'ok', 'hmm', 'sure']) { await p.fill('#eliza-input', m); await p.press('#eliza-input', 'Enter'); }
  ok('ELIZA brings back what you said about "my ..."', (await p.locator('.eliza-eliza .eliza-text').allTextContents()).some((t) => t.startsWith('Earlier you mentioned your exams')));
  ok('chat scrolls inside its box, not the page', Math.abs((await p.evaluate(() => scrollY)) - pageY) < 2);

  // Perceptron: learns two groups, fails XOR
  await p.locator('.demo-perceptron').scrollIntoViewIfNeeded();
  await p.click('.demo-perceptron button:has-text("learn")');
  await p.waitForFunction(() => /Done in/.test(document.querySelector('.demo-perceptron .demo-status').textContent), null, { timeout: 30000 });
  ok('perceptron splits two groups', true, await p.textContent('.demo-perceptron .demo-status'));
  await p.click('.demo-perceptron .demo-chip:has-text("not both")');
  await p.click('.demo-perceptron button:has-text("learn")');
  await p.waitForFunction(() => /never get there/.test(document.querySelector('.demo-perceptron .demo-status').textContent), null, { timeout: 40000 });
  ok('perceptron cannot learn XOR, and says why', true);
  await p.click('.demo-perceptron .demo-chip:has-text("clear dots")');
  const box = await p.locator('.perceptron-canvas').boundingBox();
  await p.mouse.click(box.x + 40, box.y + 40); await p.click('.demo-perceptron .dot-chip:has-text("orange")'); await p.mouse.click(box.x + box.width - 40, box.y + box.height - 40);
  ok('tapping the square adds dots', /of 2 dots/.test(await p.textContent('.demo-perceptron .demo-status')), await p.textContent('.demo-perceptron .demo-status'));

  // Next word
  await p.locator('.demo-nextword').scrollIntoViewIfNeeded();
  ok('next-word shows options after "the"', (await p.$$eval('.nextword-option', (o) => o.length)) >= 3);
  ok('top guess after "the" is "cat"', (await p.locator('.nextword-word').first().textContent()) === 'cat');
  await p.click('.demo-nextword button:has-text("most likely")');
  await p.click('.demo-nextword button:has-text("most likely")');
  ok('sentence grows from the guesses', (await p.textContent('.nextword-sentence')).trim().split(' ').length === 3, await p.textContent('.nextword-sentence'));
  await p.fill('#nextword-text', 'i like green apples. i like red apples. you like green tea.');
  await p.click('.demo-nextword button:has-text("start over")');
  ok('new text changes the model', (await p.textContent('.nextword-sentence')).trim() === 'i' && (await p.locator('.nextword-word').first().textContent()) === 'like');

  // theme toggle
  await p.click('.story-theme');
  ok('theme toggle switches to dark', (await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  await p.click('.story-theme');

  // switch to game design via the top bar, logo still pinned
  await p.click('.story-switch-link[href="/game-design"]');
  await p.waitForSelector('#toolbox');
  await p.waitForTimeout(400);
  ok('game design page: history + ideas parts', (await p.$$eval('.story-part', (x) => x.map((e) => e.textContent).join('|'))) === 'Part one: the history|Part two: how games are designed');
  ok('starts at the top after switching story', (await p.evaluate(() => scrollY)) === 0);
  ok('logo still on the same pixel', (await p.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${r.x},${r.y}`; })) === logoHome);

  // game feel lab
  await p.locator('.gamefeel-canvas').scrollIntoViewIfNeeded();
  await p.focus('.gamefeel-canvas');
  await p.keyboard.press('Space');
  await p.waitForTimeout(300);
  await p.keyboard.press('Space');
  await p.waitForTimeout(600);
  // let it run until it dies
  await p.waitForFunction(() => /Score:/.test(document.querySelector('.demo-gamefeel .demo-status').textContent), null, { timeout: 20000 });
  ok('runner plays and ends with a score', true, await p.textContent('.demo-gamefeel .demo-status'));
  ok('space on the canvas does not scroll the page', true);
  await p.click('.demo-gamefeel .demo-chip:has-text("everything on")');
  ok('"everything on" switches on all six effects', (await p.$$eval('.demo-gamefeel input[type=checkbox]', (c) => c.filter((x) => x.checked).length)) === 6);
  await p.fill('.demo-gamefeel input[type=range] >> nth=0', '3000');
  ok('gravity slider updates its number', /3000/.test(await p.textContent('.gamefeel-slider >> nth=0')));

  // direct load with hash
  await p.goto(B + '/ai#language-models', { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  ok('direct link to an era lands on it', Math.abs(await p.$eval('#language-models', (e) => e.getBoundingClientRect().top)) < 40);

  // phone
  const ph = await b.newPage({ viewport: { width: 390, height: 844 } });
  ph.on('pageerror', (e) => errors.push('phone: ' + e.message));
  await ph.goto(B + '/', { waitUntil: 'networkidle' });
  const lh = await ph.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${r.x},${r.y}`; });
  await ph.goto(B + '/game-design', { waitUntil: 'networkidle' });
  ok('phone: logo on the same pixel', (await ph.$eval('.logo', (e) => { const r = e.getBoundingClientRect(); return `${r.x},${r.y}`; })) === lh);
  ok('phone: no sideways scroll', (await ph.evaluate(() => document.documentElement.scrollWidth)) <= 390);
  ok('phone: era chips shown, sidebar hidden', (await ph.$eval('.story-chips', (e) => getComputedStyle(e).display)) === 'flex' && (await ph.$eval('.story-index', (e) => getComputedStyle(e).display)) === 'none');
  await ph.evaluate(() => document.getElementById('golden-age').scrollIntoView());
  await ph.waitForTimeout(500);
  ok('phone: chip row follows the page', (await ph.$eval('.story-chip-link.active', (a) => a.getAttribute('href'))) === '#golden-age');
  const chipTop = await ph.$eval('.story-chips', (e) => e.getBoundingClientRect().top);
  ok('phone: chip row sticks to the top', chipTop === 0, String(chipTop));
  await ph.goto(B + '/ai', { waitUntil: 'networkidle' });
  ok('phone: ai has no sideways scroll either', (await ph.evaluate(() => document.documentElement.scrollWidth)) <= 390);
  // tap the game canvas on a phone
  await ph.goto(B + '/game-design#toolbox', { waitUntil: 'networkidle' });
  await ph.locator('.gamefeel-canvas').scrollIntoViewIfNeeded();
  await ph.locator('.gamefeel-canvas').click();
  await ph.waitForFunction(() => /Score:/.test(document.querySelector('.demo-gamefeel .demo-status').textContent), null, { timeout: 20000 });
  ok('phone: tapping starts the game', true);

  // the old routes still answer, unknown still 404s
  const r404 = await p.goto(B + '/ai/nope', { waitUntil: 'networkidle' });
  ok('/ai/nope is a real 404 (status and page)', r404.status() === 404 && /not found/i.test(await p.title()));

  ok('no page errors', errors.length === 0, errors.join(' | '));
  console.log(failures ? `\n${failures} FAILURES` : '\nALL STORY CHECKS PASSED');
  await b.close();
  process.exit(failures ? 1 : 0);
})();