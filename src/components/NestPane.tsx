import { useState } from 'react';
import { KEY_INDEX, KEY_CATEGORIES } from '../data/keyIndex';
import { NEST, getNestEntry } from '../data/nest';
import { BLUEPRINTS } from '../data/blueprints';
import { CopyButton } from './CopyButton';

// Flat, ordered list of every tag the way the spine displays them —
// category by category, in KEY_CATEGORIES order — used for page numbers
// and prev/next "book" navigation.
const ORDERED_TAGS = KEY_CATEGORIES.flatMap((cat) => KEY_INDEX.filter((k) => k.category === cat).map((k) => k.tag));

// Pulls the bare element name out of a tag label like '<img src="" alt="">'
// or '<a href="">' so the diagram can spot which lines are actually that
// tag, as opposed to attribute-only entries like class="" which have none.
function bareTagName(tag: string): string | null {
  const match = tag.match(/^<([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function Diagram({ example, tag }: { example: string; tag: string }) {
  const name = bareTagName(tag);
  const lines = example.split('\n');
  const tagLineRe = name ? new RegExp(`</?${name}[\\s>]`) : null;

  return (
    <pre className="nest-diagram">
      {lines.map((line, i) => (
        <div key={i} className={tagLineRe && tagLineRe.test(line + '>') ? 'nest-diagram-hl' : undefined}>
          {line || ' '}
        </div>
      ))}
    </pre>
  );
}

export function NestPane() {
  const [section, setSection] = useState<'tags' | 'blueprints'>('tags');
  const [activeTag, setActiveTag] = useState(NEST[0].tag);
  const [activeBlueprint, setActiveBlueprint] = useState(BLUEPRINTS[0].id);
  const [query, setQuery] = useState('');
  const entry = getNestEntry(activeTag);
  const blueprint = BLUEPRINTS.find((b) => b.id === activeBlueprint);

  const q = query.trim().toLowerCase();
  const filteredBlueprints = BLUEPRINTS.filter(
    (b) => !q || b.title.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q),
  );

  const flatIndex = ORDERED_TAGS.indexOf(activeTag);
  const chapterNum = entry ? KEY_CATEGORIES.indexOf(entry.category) + 1 : 0;
  const prevTag = flatIndex > 0 ? ORDERED_TAGS[flatIndex - 1] : null;
  const nextTag = flatIndex >= 0 && flatIndex < ORDERED_TAGS.length - 1 ? ORDERED_TAGS[flatIndex + 1] : null;

  const bpIndex = BLUEPRINTS.findIndex((b) => b.id === activeBlueprint);
  const prevBp = bpIndex > 0 ? BLUEPRINTS[bpIndex - 1] : null;
  const nextBp = bpIndex >= 0 && bpIndex < BLUEPRINTS.length - 1 ? BLUEPRINTS[bpIndex + 1] : null;

  return (
    <div className="nest-book">
      <div className="nest-spine">
        <h1 className="nest-spine-title">Nest</h1>
        <span className="nest-spine-sub">{section === 'tags' ? 'the html book' : 'the workshop'}</span>

        <div className="nest-spine-tabs">
          <button className={section === 'tags' ? 'active' : ''} onClick={() => setSection('tags')}>
            tags
          </button>
          <button className={section === 'blueprints' ? 'active' : ''} onClick={() => setSection('blueprints')}>
            blueprints
          </button>
        </div>

        <input
          className="nest-spine-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={section === 'tags' ? 'Search tags…' : 'Search blueprints…'}
        />

        {section === 'tags' ? (
          <>
            {KEY_CATEGORIES.map((cat, i) => {
              const items = KEY_INDEX.filter((k) => k.category === cat && (!q || k.tag.toLowerCase().includes(q)));
              if (q && items.length === 0) return null;
              return (
                <div key={cat} className="nest-chapter">
                  <span className="nest-chapter-head">
                    Ch. {i + 1} — {cat}
                  </span>
                  {items.map((k) => (
                    <button
                      key={k.tag}
                      className={`nest-chapter-item ${activeTag === k.tag ? 'active' : ''}`}
                      onClick={() => setActiveTag(k.tag)}
                    >
                      {k.tag}
                    </button>
                  ))}
                </div>
              );
            })}
            {q && KEY_INDEX.every((k) => !k.tag.toLowerCase().includes(q)) && (
              <p className="nest-spine-empty">No tags match "{query}".</p>
            )}
          </>
        ) : (
          <div className="nest-chapter">
            <span className="nest-chapter-head">Full page skeletons</span>
            {filteredBlueprints.map((b) => (
              <button
                key={b.id}
                className={`nest-chapter-item ${activeBlueprint === b.id ? 'active' : ''}`}
                onClick={() => setActiveBlueprint(b.id)}
              >
                {b.title}
              </button>
            ))}
            {filteredBlueprints.length === 0 && <p className="nest-spine-empty">No blueprints match "{query}".</p>}
          </div>
        )}
      </div>

      {section === 'tags' && entry && (
        <div className="nest-page">
          <p className="nest-crumb">
            Chapter {chapterNum} · {entry.category} · page {flatIndex + 1} of {ORDERED_TAGS.length}
          </p>
          <h1 className="nest-page-title">{entry.tag}</h1>

          <div className="nest-stat-row">
            <div className="nest-stat">
              <span className="nest-stat-label">closing tag</span>
              <span className="nest-stat-value">{entry.stats.closingTag}</span>
            </div>
            <div className="nest-stat">
              <span className="nest-stat-label">void element</span>
              <span className="nest-stat-value">{entry.stats.voidElement}</span>
            </div>
            <div className="nest-stat">
              <span className="nest-stat-label">lives inside</span>
              <span className="nest-stat-value">{entry.stats.livesInside}</span>
            </div>
            <div className="nest-stat">
              <span className="nest-stat-label">typically holds</span>
              <span className="nest-stat-value">{entry.stats.typicallyHolds}</span>
            </div>
          </div>

          <div className="nest-section">
            <p className="nest-lede">{entry.whatItDoes}</p>
          </div>

          <div className="nest-section">
            <h2>Where it goes</h2>
            <p>{entry.whereItGoes}</p>
            <Diagram example={entry.example} tag={entry.tag} />
          </div>

          <div className="nest-section">
            <div className="nest-example-head">
              <h2>Example</h2>
              <CopyButton text={entry.example} />
            </div>
            <pre className="nest-example">{entry.example}</pre>
          </div>

          <div className="nest-section">
            <h2>Common mistakes</h2>
            <ul className="nest-mistakes">
              {entry.mistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="nest-section">
            <h2>Related</h2>
            <div className="nest-related">
              {entry.related.map((r) => (
                <button key={r} className="nest-related-chip" onClick={() => setActiveTag(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="nest-page-nav">
            <button disabled={!prevTag} onClick={() => prevTag && setActiveTag(prevTag)}>
              ← {prevTag ?? 'start of book'}
            </button>
            <button disabled={!nextTag} onClick={() => nextTag && setActiveTag(nextTag)}>
              {nextTag ?? 'end of book'} →
            </button>
          </div>
        </div>
      )}

      {section === 'blueprints' && blueprint && (
        <div className="nest-page">
          <p className="nest-crumb">
            The Workshop · page {bpIndex + 1} of {BLUEPRINTS.length}
          </p>
          <h1 className="nest-page-title">{blueprint.title}</h1>

          <div className="nest-section">
            <p className="nest-lede">{blueprint.desc}</p>
          </div>

          <div className="nest-section">
            <div className="nest-example-head">
              <h2>Code</h2>
              <CopyButton text={blueprint.code} />
            </div>
            <pre className="nest-example">{blueprint.code}</pre>
          </div>

          <div className="nest-page-nav">
            <button disabled={!prevBp} onClick={() => prevBp && setActiveBlueprint(prevBp.id)}>
              ← {prevBp?.title ?? 'start of workshop'}
            </button>
            <button disabled={!nextBp} onClick={() => nextBp && setActiveBlueprint(nextBp.id)}>
              {nextBp?.title ?? 'end of workshop'} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
