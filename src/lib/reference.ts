import { NEST, type NestEntry } from '../data/nest';
import { CSS_NEST } from '../data/cssNest';
import { EMAIL_NEST } from '../data/emailNest';

// The Nest's deep pages, each also published as its own page at
// /reference/<book>/<slug>, so a search for "html main tag" or "css
// margin" can land on the one page that answers it. Inside the workspace
// the Nest is a tool with no addresses; these pages are the addresses.

export type BookId = 'html' | 'css' | 'email';

export type Book = {
  id: BookId;
  label: string;
  title: string;
  blurb: string;
  // Where "try it" links go: that track's sandbox.
  sandbox: string;
  track: string;
  dateKey: string;
  entries: NestEntry[];
};

export const BOOKS: Book[] = [
  {
    id: 'html',
    label: 'html',
    title: 'HTML tags and attributes',
    blurb: 'Every tag the HTML route teaches, plus the ones you will meet next: what each one does, where it goes and the mistakes people make with it.',
    sandbox: '/html/website/sandbox',
    track: '/html/website',
    dateKey: 'reference-html',
    entries: NEST,
  },
  {
    id: 'css',
    label: 'css',
    title: 'CSS properties and selectors',
    blurb: 'The CSS you need to style a real page, from selectors and the box model to flexbox, grid and media queries.',
    sandbox: '/css/website/sandbox',
    track: '/css/website',
    dateKey: 'reference-css',
    entries: CSS_NEST,
  },
  {
    id: 'email',
    label: 'html email',
    title: 'HTML email patterns',
    blurb: 'The tricks that make an email look right in Gmail and Outlook: layout tables, inline styles and buttons that survive every inbox.',
    sandbox: '/html/email/sandbox',
    track: '/html/email',
    dateKey: 'reference-email',
    entries: EMAIL_NEST,
  },
];

export const getBook = (id: string) => BOOKS.find((b) => b.id === id);

// '<a href="">' -> 'a-href', '<h1> – <h6>' -> 'h1-h6', 'display: flex' ->
// 'display-flex', '::before / ::after' -> 'before-after'.
const SLUG_OVERRIDES: Record<string, string> = {
  'style=""': 'style-attribute',
  '<meta name="viewport">': 'meta-viewport',
  '<meta charset="utf-8">': 'meta-charset',
  '<link rel="stylesheet">': 'link-stylesheet',
  'role="presentation"': 'role-presentation',
  'target="_blank" / rel=""': 'target-blank-rel',
};

export function slugFor(tag: string): string {
  if (SLUG_OVERRIDES[tag]) return SLUG_OVERRIDES[tag];
  return (
    tag
      .toLowerCase()
      .replace(/<!--.*-->/, 'comment')
      .replace(/="[^"]*"/g, ' ')
      .replace(/!important/, 'important')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'entry'
  );
}

// What a searcher would type, key words first: "HTML <main> tag",
// "CSS margin", "Bulletproof buttons in HTML email".
const NAME_OVERRIDES: Record<string, string> = {
  'html:<!DOCTYPE html>': 'HTML <!DOCTYPE html>',
  'html:<!-- comment -->': 'HTML comments <!-- -->',
  'html:target="_blank" / rel=""': 'HTML target="_blank" and rel',
  'html:checked / required / disabled': 'HTML checked, required and disabled',
  'html:data-*=""': 'HTML data-* attributes',
  'html:<input type="">': 'HTML input types',
  'html:<meta charset="utf-8">': 'HTML <meta charset="utf-8">',
  'html:<meta name="viewport">': 'HTML viewport meta tag',
  'html:<link rel="stylesheet">': 'HTML <link rel="stylesheet">',
  'css:<style>': 'CSS in a <style> tag',
  'css:<link rel="stylesheet">': 'Linking a CSS file with <link>',
  'css:selector { }': 'CSS selectors and rules',
  'css:.class': 'CSS .class selector',
  'css:#id': 'CSS #id selector',
  'css:--custom-property': 'CSS custom properties (variables)',
  'css:@media': 'CSS @media queries',
  'css:@font-face': 'CSS @font-face',
  'css:!important': 'CSS !important',
  'css:calc()': 'CSS calc()',
  'email:role="presentation"': 'role="presentation" on email tables',
  'email:nested centering table': 'Centering an HTML email with tables',
  'email:style="" (inline)': 'Inline styles in HTML email',
  'email:bgcolor + background-color': 'Background colors in HTML email',
  'email:bulletproof button': 'Bulletproof buttons in HTML email',
  'email:width/height attributes on <img>': 'Image width and height in HTML email',
  'email:XHTML doctype + MSO conditionals': 'Outlook conditional comments in HTML email',
  'email:preheader text': 'Preheader text in HTML email',
};

export function nameFor(book: BookId, tag: string): string {
  const o = NAME_OVERRIDES[`${book}:${tag}`];
  if (o) return o;
  if (book === 'css') return `CSS ${tag}`;
  if (book === 'email') return `${tag} in HTML email`;
  if (tag.startsWith('<')) return `HTML ${tag} ${/[/–]/.test(tag) ? 'tags' : 'tag'}`;
  return `HTML ${tag.replace(/=""/g, '')} ${tag.includes('/') ? 'attributes' : 'attribute'}`;
}

// Titles stay within 60 characters so search results show them whole.
export function titleFor(book: BookId, tag: string): string {
  const name = nameFor(book, tag);
  for (const t of [`${name}, explained with an example`, `${name}, explained`, name]) if (t.length <= 60) return t;
  return name.slice(0, 60);
}

// About 155 characters, ending on a whole word, from the entry's own
// opening lines. `lead` goes in front when two books open the same way
// (the HTML and CSS pages for <style>), so every page reads differently.
export function descriptionFor(e: NestEntry, lead = ''): string {
  const text = (lead + e.whatItDoes).replace(/\s+/g, ' ').trim();
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  const lastStop = cut.lastIndexOf('. ');
  if (lastStop > 90) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export type RefItem = { book: Book; entry: NestEntry; slug: string; path: string; name: string };

export const REF_ITEMS: RefItem[] = BOOKS.flatMap((book) =>
  book.entries.map((entry) => {
    const slug = slugFor(entry.tag);
    return { book, entry, slug, path: `/reference/${book.id}/${slug}`, name: nameFor(book.id, entry.tag) };
  }),
);

// Each page's description, made unique where two entries would match.
const DESCRIPTIONS = new Map<RefItem, string>();
for (const r of REF_ITEMS) {
  const plain = descriptionFor(r.entry);
  const taken = [...DESCRIPTIONS.values()].includes(plain);
  DESCRIPTIONS.set(r, taken ? descriptionFor(r.entry, `${r.name}: `) : plain);
}
export const refDescription = (r: RefItem) => DESCRIPTIONS.get(r) ?? descriptionFor(r.entry);

export const findRef = (book: string, slug: string) => REF_ITEMS.find((r) => r.book.id === book && r.slug === slug);
export const findRefByTag = (book: BookId, tag: string) => REF_ITEMS.find((r) => r.book.id === book && r.entry.tag === tag);

// Code in a URL fragment opens as an unsaved copy in the sandbox (see
// lib/share.ts). Built without window, so prerendered pages carry it too.
export function sandboxLink(book: Book, code: string): string {
  const bytes = new TextEncoder().encode(code);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return `${book.sandbox}#share=${btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;
}
