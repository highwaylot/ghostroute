// Mimics vercel.json for dist/: cleanUrls, trailingSlash:false, redirects,
// rewrites, 404.html with status 404.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const cfg = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
const file = (p) => existsSync(p) && statSync(p).isFile() ? p : null;
const toRe = (src) => new RegExp('^' + src.replace(/:path\+/, '.+').replace(/:path\*/, '.*') + '$');
createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = decodeURIComponent(url.pathname);
  if (p.length > 1 && p.endsWith('/')) { res.writeHead(308, { Location: p.slice(0, -1) }); return res.end(); }
  if (p.endsWith('.html')) { res.writeHead(308, { Location: p.slice(0, -5) === '/index' ? '/' : p.slice(0, -5) }); return res.end(); }
  for (const r of cfg.redirects ?? []) if (toRe(r.source).test(p)) { res.writeHead(r.permanent ? 308 : 307, { Location: r.destination }); return res.end(); }
  let f = p === '/' ? file(join(DIST, 'index.html')) : file(join(DIST, p)) || file(join(DIST, p + '.html'));
  // Like Vercel: with cleanUrls, a rewrite must name the clean path
  // (/app-shell); a destination ending in .html would hit a redirect and 404.
  if (!f) for (const r of cfg.rewrites ?? []) if (toRe(r.source).test(p)) {
    const d = r.destination;
    f = cfg.cleanUrls && d.endsWith('.html') ? null : file(join(DIST, d)) || file(join(DIST, d + '.html'));
    break;
  }
  let status = 200;
  if (!f) { f = join(DIST, '404.html'); status = 404; }
  res.writeHead(status, { 'Content-Type': TYPES[extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(4173, () => console.log('vserve on 4173'));
