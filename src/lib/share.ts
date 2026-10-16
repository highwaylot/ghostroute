// Share links and downloads for things a learner made. No server: the code
// itself rides in the URL fragment, so a link is the whole page. That's the
// cheapest possible "show someone" — the person on the other end needs
// nothing but a browser.

const SHARE_PARAM = 'share';

function toBase64Url(utf8: string): string {
  const bytes = new TextEncoder().encode(utf8);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64url.length + 3) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

// Builds an absolute URL to the given sandbox path with the code in the
// fragment. Fragments never reach a server, so nothing is logged anywhere.
export function buildShareUrl(sandboxPath: string, code: string): string {
  const base = `${window.location.origin}${sandboxPath}`;
  return `${base}#${SHARE_PARAM}=${toBase64Url(code)}`;
}

// Reads (and clears) a shared code payload from the current URL fragment.
// Returns null when there isn't one or it doesn't decode.
export function consumeSharedCode(): string | null {
  const hash = window.location.hash;
  const prefix = `#${SHARE_PARAM}=`;
  if (!hash.startsWith(prefix)) return null;
  try {
    const code = fromBase64Url(hash.slice(prefix.length));
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    return code;
  } catch {
    return null;
  }
}

// Rough guard: browsers handle fragments far longer than this, but a
// 30 KB page in a URL is already past "paste it in a chat".
export const SHARE_MAX_CHARS = 30_000;

export function downloadHtml(name: string, code: string): void {
  const safe = name.trim().replace(/[^a-z0-9-_ ]/gi, '').replace(/\s+/g, '-').toLowerCase() || 'page';
  const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safe}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
