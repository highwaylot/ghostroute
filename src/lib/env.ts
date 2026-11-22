// Production is the real domain; everything else (Vercel preview URLs,
// localhost, the built preview server) is a preview. Features that are
// still being tried out can be shown on previews only, without forking
// the branches: main and staging stay the same code.
const PRODUCTION_HOSTS = new Set(['tagsmiths.com', 'www.tagsmiths.com']);

export function isProduction(): boolean {
  // Prerendering (build time) has no hostname: the Vercel deployment it is
  // building for decides, so the static HTML matches what the browser shows.
  if (import.meta.env.SSR) return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.VERCEL_ENV === 'production';
  return typeof window !== 'undefined' && PRODUCTION_HOSTS.has(window.location.hostname);
}

// Quickfire (retrieval practice over passed route steps) is preview-only
// for now, by request.
export const QUICKFIRE_ENABLED = !isProduction();
