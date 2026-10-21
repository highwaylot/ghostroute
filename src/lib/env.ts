// Production is the real domain; everything else (Vercel preview URLs,
// localhost, the built preview server) is a preview. Features that are
// still being tried out can be shown on previews only, without forking
// the branches: main and staging stay the same code.
const PRODUCTION_HOSTS = new Set(['tagsmiths.com', 'www.tagsmiths.com']);

export function isProduction(): boolean {
  return typeof window !== 'undefined' && PRODUCTION_HOSTS.has(window.location.hostname);
}

// Quickfire (retrieval practice over passed route steps) is preview-only
// for now, by request.
export const QUICKFIRE_ENABLED = !isProduction();
