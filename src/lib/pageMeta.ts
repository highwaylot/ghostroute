import { useEffect } from 'react';

// The server makes www the primary host (the bare domain 308s to it), so
// every canonical, og:url and sitemap entry uses www.
export const SITE_ORIGIN = 'https://www.tagsmiths.com';

type Meta = {
  title: string;
  description: string;
  // Path the page should be known by. Lowercased and trailing-slash free,
  // so /HTML/ and /html are never two pages to a search engine.
  path: string;
  noindex?: boolean;
};

function setTag(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Every route used to share one <head>: the title "tagsmiths" and a
// canonical pointing at the home page, which told search engines every
// lesson was a copy of the landing page. This sets them per route.
export function usePageMeta({ title, description, path, noindex = false }: Meta) {
  useEffect(() => {
    const clean = (path.toLowerCase().replace(/\/+$/, '') || '/');
    const url = SITE_ORIGIN + (clean === '/' ? '/' : clean);
    document.title = title;
    setTag('meta[name="description"]', 'name', 'description', description);
    setTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setTag('meta[property="og:title"]', 'property', 'og:title', title);
    setTag('meta[property="og:description"]', 'property', 'og:description', description);
    setTag('meta[property="og:url"]', 'property', 'og:url', url);
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, noindex]);
}
