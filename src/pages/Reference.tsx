import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransitionLink } from '../components/TransitionLink';
import { ReadingTopbar } from '../components/ReadingTopbar';
import { usePageMeta } from '../lib/pageMeta';
import { formatDate } from '../lib/dates';
import { BOOKS, REF_ITEMS, findRef, findRefByTag, refDescription, sandboxLink, titleFor, type RefItem } from '../lib/reference';
import NotFound from './NotFound';
import './Story.css';
import './Reference.css';

// "closingTag" -> "closing tag"
const humanize = (key: string) => key.replace(/([A-Z])/g, ' $1').toLowerCase();

const firstSentence = (text: string) => {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
};

function ReadingFooter() {
  return (
    <footer className="ref-footer">
      <p className="story-small">
        <TransitionLink to="/">← code.</TransitionLink> · <TransitionLink to="/reference">reference</TransitionLink> ·{' '}
        <TransitionLink to="/ai">the story of ai</TransitionLink> · <TransitionLink to="/game-design">the story of games</TransitionLink>
        <br />
        tagsmiths is a hobby project by{' '}
        <a href="https://fenwickvale.com" rel="noopener">
          Fenwick &amp; Vale
        </a>
        . No accounts, no cookies, no analytics.
      </p>
    </footer>
  );
}

function Hub() {
  usePageMeta({
    title: 'HTML and CSS reference, in plain English · tagsmiths',
    description:
      'Every HTML tag and CSS property the tagsmiths lessons teach, explained in plain English: what it does, where it goes, a working example and common mistakes.',
    path: '/reference',
  });
  return (
    <main className="ref-main view-settle" id="ref-main">
      <span className="story-eyebrow">reference</span>
      <h1 className="story-h1">HTML and CSS, explained in plain English.</h1>
      <p className="story-intro">
        {REF_ITEMS.length} short pages, one for each tag, property and trick the lessons use. Each one says what the thing does, where it goes, and
        the mistakes people make with it, with an example you can open in the editor.
      </p>
      <nav className="ref-jump" aria-label="Books">
        {BOOKS.map((b) => (
          <a key={b.id} href={`#${b.id}`} className="demo-chip">
            {b.title}
          </a>
        ))}
      </nav>
      {BOOKS.map((book) => {
        const cats = [...new Set(book.entries.map((e) => e.category))];
        return (
          <section key={book.id} id={book.id} className="ref-book" aria-labelledby={`${book.id}-h`}>
            <h2 id={`${book.id}-h`} className="story-era-title">
              {book.title}
            </h2>
            <p className="story-era-blurb">{book.blurb}</p>
            {cats.map((cat) => (
              <Fragment key={cat}>
                <h3 className="ref-cat">{cat}</h3>
                <ul className="ref-list">
                  {REF_ITEMS.filter((r) => r.book.id === book.id && r.entry.category === cat).map((r) => (
                    <li key={r.path}>
                      <TransitionLink to={r.path} className="ref-list-link">
                        <code className="ref-list-tag">{r.entry.tag}</code>
                        <span className="ref-list-desc">{firstSentence(r.entry.whatItDoes)}</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </section>
        );
      })}
      <ReadingFooter />
    </main>
  );
}

function Entry({ item }: { item: RefItem }) {
  const { book, entry } = item;
  usePageMeta({ title: titleFor(book.id, entry.tag), description: refDescription(item), path: item.path });
  const siblings = REF_ITEMS.filter((r) => r.book.id === book.id);
  const at = siblings.indexOf(item);
  const prev = siblings[at - 1];
  const next = siblings[at + 1];
  const related = entry.related.map((t) => ({ tag: t, item: findRefByTag(book.id, t) }));
  const canTry = entry.example.includes('<');

  return (
    <main className="ref-main view-settle" id="ref-main">
      <nav className="ref-crumbs" aria-label="Breadcrumb">
        <TransitionLink to="/reference">reference</TransitionLink>
        <span aria-hidden="true"> › </span>
        <a href={`/reference#${book.id}`}>{book.label}</a>
        <span aria-hidden="true"> › </span>
        <span aria-current="page">{entry.tag}</span>
      </nav>
      <span className="story-eyebrow">
        {book.label} reference · {entry.category}
      </span>
      <h1 className="story-h1 ref-h1">{item.name}</h1>

      <aside className="story-bigidea">
        <h2 className="story-bigidea-title">Short answer</h2>
        <p>{entry.whatItDoes}</p>
      </aside>

      <dl className="ref-facts">
        {Object.entries(entry.stats).map(([k, v]) => (
          <div key={k} className="ref-fact">
            <dt>{humanize(k)}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="ref-h2">Where it goes</h2>
      <p className="ref-p">{entry.whereItGoes}</p>

      <h2 className="ref-h2">Example</h2>
      <pre className="ref-code">
        <code>{entry.example}</code>
      </pre>
      {canTry && (
        <p className="ref-p">
          <a className="demo-btn demo-btn-primary ref-try" href={sandboxLink(book, entry.example)}>
            Open this example in the editor →
          </a>
        </p>
      )}

      <h2 className="ref-h2">Common mistakes</h2>
      <ul className="ref-mistakes">
        {entry.mistakes.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      {related.length > 0 && (
        <>
          <h2 className="ref-h2">Related</h2>
          <ul className="ref-related">
            {related.map((r) => (
              <li key={r.tag}>
                {r.item ? (
                  <TransitionLink to={r.item.path} className="demo-chip">
                    {r.tag}
                  </TransitionLink>
                ) : (
                  <span className="demo-chip ref-chip-plain">{r.tag}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="story-small ref-meta">
        Updated {formatDate(__CONTENT_DATES__[book.dateKey])}. Practice it in the <TransitionLink to={book.track}>{book.label} route</TransitionLink>, or read
        more on{' '}
        <a href={`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(entry.tag.replace(/[<>]/g, ' ').trim())}`} rel="noopener">
          MDN
        </a>
        .
      </p>

      <nav className="ref-pager" aria-label="More pages">
        {prev ? (
          <TransitionLink to={prev.path} className="ref-pager-link">
            <span className="story-small">← previous</span>
            <code>{prev.entry.tag}</code>
          </TransitionLink>
        ) : (
          <span />
        )}
        {next && (
          <TransitionLink to={next.path} className="ref-pager-link ref-pager-next">
            <span className="story-small">next →</span>
            <code>{next.entry.tag}</code>
          </TransitionLink>
        )}
      </nav>
      <ReadingFooter />
    </main>
  );
}

// /reference (the list of every page) and /reference/<book>/<slug>.
export default function Reference() {
  const { book, slug } = useParams<{ book?: string; slug?: string }>();
  const item = book && slug ? findRef(book, slug) : undefined;

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [book, slug]);

  if (book && slug && !item) return <NotFound />;
  return (
    <div className="story">
      <a className="story-skip" href="#ref-main">
        Skip to the page
      </a>
      <ReadingTopbar current="reference" />
      {item ? <Entry key={item.path} item={item} /> : <Hub />}
    </div>
  );
}
