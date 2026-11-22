import { SITE_ORIGIN, canonicalUrl } from './pageMeta';
import { BOOKS, REF_ITEMS, refDescription, titleFor } from './reference';
import { AI_STORY } from '../data/aiStory';
import { GAME_STORY } from '../data/gameStory';

// Build-time only (entry-server.tsx): every page that is prerendered, with
// its sitemap date and structured data. One list, so the sitemap, the
// static files and the checks in scripts/prerender.mjs can never disagree.

type Json = Record<string, unknown>;

export type PrerenderRoute = {
  path: string;
  // Which lazy page module the route needs up front (CSS and JS).
  chunk: 'Workspace' | 'Story' | 'Reference' | null;
  inSitemap: boolean;
  lastmod: string;
  priority: string;
  ogType: 'website' | 'article';
  jsonLd: (meta: { title: string; description: string }) => Json;
};

const dates = __CONTENT_DATES__;
const ORG_ID = `${SITE_ORIGIN}/#org`;
const SITE_ID = `${SITE_ORIGIN}/#website`;
const IMAGE = `${SITE_ORIGIN}/og-image.png`;

const ORG: Json = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'tagsmiths',
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/apple-touch-icon.png`,
  parentOrganization: { '@type': 'Organization', name: 'Fenwick & Vale', url: 'https://fenwickvale.com' },
};

const WEBSITE: Json = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: 'tagsmiths',
  url: `${SITE_ORIGIN}/`,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

const crumbs = (items: [string, string][]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: canonicalUrl(path) })),
});

const graph = (...nodes: Json[]): Json => ({ '@context': 'https://schema.org', '@graph': [ORG, ...nodes] });

// Headlines drop the " · tagsmiths" suffix the <title> carries.
const headline = (title: string) => title.replace(/ · tagsmiths$/, '');

const latest = (...ds: string[]) => ds.filter(Boolean).sort().at(-1) ?? dates.site;

function track(path: string, name: string, key: string): PrerenderRoute {
  return {
    path,
    chunk: 'Workspace',
    inSitemap: true,
    lastmod: dates[key],
    priority: '0.9',
    ogType: 'website',
    jsonLd: (m) =>
      graph(
        {
          '@type': 'LearningResource',
          '@id': `${canonicalUrl(path)}#course`,
          name: headline(m.title),
          description: m.description,
          url: canonicalUrl(path),
          learningResourceType: 'interactive tutorial',
          educationalLevel: 'beginner',
          inLanguage: 'en',
          isAccessibleForFree: true,
          provider: { '@id': ORG_ID },
          isPartOf: { '@id': SITE_ID },
        },
        crumbs([
          ['tagsmiths', '/'],
          [name, path],
        ]),
      ),
  };
}

function story(path: string, key: string, published: string, name: string): PrerenderRoute {
  return {
    path,
    chunk: 'Story',
    inSitemap: true,
    lastmod: dates[key],
    priority: '0.7',
    ogType: 'article',
    jsonLd: (m) =>
      graph(
        {
          '@type': 'Article',
          headline: headline(m.title),
          description: m.description,
          image: IMAGE,
          datePublished: published,
          dateModified: latest(published, dates[key]),
          mainEntityOfPage: canonicalUrl(path),
          author: { '@id': ORG_ID },
          publisher: { '@id': ORG_ID },
          isPartOf: { '@id': SITE_ID },
          inLanguage: 'en',
        },
        crumbs([
          ['tagsmiths', '/'],
          [name, path],
        ]),
      ),
  };
}

const referenceDate = latest(...BOOKS.map((b) => dates[b.dateKey]));

export function getRoutes(): PrerenderRoute[] {
  return [
    {
      path: '/',
      chunk: null,
      inSitemap: true,
      lastmod: dates.site,
      priority: '1.0',
      ogType: 'website',
      jsonLd: (m) => graph({ ...WEBSITE, description: m.description }),
    },
    {
      path: '/html',
      chunk: null,
      inSitemap: true,
      lastmod: dates.site,
      priority: '0.8',
      ogType: 'website',
      jsonLd: (m) =>
        graph(
          { '@type': 'CollectionPage', name: headline(m.title), description: m.description, url: canonicalUrl('/html'), isPartOf: { '@id': SITE_ID } },
          crumbs([
            ['tagsmiths', '/'],
            ['HTML', '/html'],
          ]),
        ),
    },
    track('/html/website', 'HTML website course', 'track-html'),
    track('/css/website', 'CSS website course', 'track-css'),
    track('/html/email', 'HTML email course', 'track-email'),
    story(AI_STORY.path, 'ai', '2026-11-07', 'History of AI'),
    story(GAME_STORY.path, 'game-design', '2026-11-07', 'History of games and game design'),
    {
      path: '/reference',
      chunk: 'Reference',
      inSitemap: true,
      lastmod: referenceDate,
      priority: '0.8',
      ogType: 'website',
      jsonLd: (m) =>
        graph(
          {
            '@type': 'CollectionPage',
            name: headline(m.title),
            description: m.description,
            url: canonicalUrl('/reference'),
            isPartOf: { '@id': SITE_ID },
            hasPart: REF_ITEMS.map((r) => ({ '@type': 'TechArticle', headline: titleFor(r.book.id, r.entry.tag), url: canonicalUrl(r.path) })),
          },
          crumbs([
            ['tagsmiths', '/'],
            ['Reference', '/reference'],
          ]),
        ),
    },
    ...REF_ITEMS.map(
      (r): PrerenderRoute => ({
        path: r.path,
        chunk: 'Reference',
        inSitemap: true,
        lastmod: dates[r.book.dateKey],
        priority: '0.6',
        ogType: 'article',
        jsonLd: () =>
          graph(
            {
              '@type': 'TechArticle',
              headline: titleFor(r.book.id, r.entry.tag),
              description: refDescription(r),
              image: IMAGE,
              datePublished: dates[r.book.dateKey],
              dateModified: dates[r.book.dateKey],
              mainEntityOfPage: canonicalUrl(r.path),
              author: { '@id': ORG_ID },
              publisher: { '@id': ORG_ID },
              isPartOf: { '@id': SITE_ID },
              inLanguage: 'en',
              proficiencyLevel: 'Beginner',
            },
            crumbs([
              ['tagsmiths', '/'],
              ['Reference', '/reference'],
              [r.book.title, `/reference#${r.book.id}`],
              [r.name, r.path],
            ]),
          ),
      }),
    ),
    // Prerendered so it loads fast, but not a page to index yet.
    { path: '/javascript', chunk: null, inSitemap: false, lastmod: dates.site, priority: '0', ogType: 'website', jsonLd: () => graph() },
  ];
}
