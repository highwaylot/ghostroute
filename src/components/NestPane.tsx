import { useEffect, useState } from 'react';
import type { KeyEntry } from '../data/keyIndex';
import type { NestEntry } from '../data/nest';
import type { Blueprint } from '../data/blueprints';
import { CopyButton } from './CopyButton';

type Props = {
  bookLabel: string; // e.g. "the html book" / "the css book"
  keyIndex: KeyEntry[];
  categories: string[];
  getEntry: (tag: string) => NestEntry | undefined;
  blueprints?: Blueprint[]; // omit to hide the blueprints tab entirely
};

// Pulls the bare element name out of a tag label like '<img src="" alt="">'
// or '<a href="">' so the diagram can spot which lines are actually that
// tag, as opposed to attribute-only entries like class="" which have none.
function bareTagName(tag: string): string | null {
  const match = tag.match(/^<([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

// "closingTag" -> "closing tag", "appliesTo" -> "applies to" — works for
// any domain's stat keys without a hardcoded label list per track.
function humanizeKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').toLowerCase();
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

export function NestPane({ bookLabel, keyIndex, categories, getEntry, blueprints }: Props) {
  const [section, setSection] = useState<'tags' | 'blueprints'>('tags');
  const [activeTag, setActiveTag] = useState(keyIndex[0]?.tag ?? '');
  const [activeBlueprint, setActiveBlueprint] = useState(blueprints?.[0]?.id ?? '');
  const [query, setQuery] = useState('');

  // Switching tracks swaps in a whole new keyIndex/blueprints set — reset
  // to the top of the new book instead of holding onto a tag/blueprint id
  // that may not even exist in it.
  useEffect(() => {
    setActiveTag(keyIndex[0]?.tag ?? '');
    setActiveBlueprint(blueprints?.[0]?.id ?? '');
    setSection('tags');
    setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyIndex]);

  const entry = getEntry(activeTag);
  const blueprint = blueprints?.find((b) => b.id === activeBlueprint);

  const orderedTags = categories.flatMap((cat) => keyIndex.filter((k) => k.category === cat).map((k) => k.tag));

  const q = query.trim().toLowerCase();
  const filteredBlueprints = (blueprints ?? []).filter(
    (b) => !q || b.title.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q),
  );

  const flatIndex = orderedTags.indexOf(activeTag);
  const chapterNum = entry ? categories.indexOf(entry.category) + 1 : 0;
  const prevTag = flatIndex > 0 ? orderedTags[flatIndex - 1] : null;
  const nextTag = flatIndex >= 0 && flatIndex < orderedTags.length - 1 ? orderedTags[flatIndex + 1] : null;

  const bpIndex = (blueprints ?? []).findIndex((b) => b.id === activeBlueprint);
  const prevBp = bpIndex > 0 ? blueprints![bpIndex - 1] : null;
  const nextBp = blueprints && bpIndex >= 0 && bpIndex < blueprints.length - 1 ? blueprints[bpIndex + 1] : null;

  return (
    <div className="nest-book">
      <div className="nest-spine">
        <h1 className="nest-spine-title">Nest</h1>
        <span className="nest-spine-sub">{section === 'tags' ? bookLabel : 'the workshop'}</span>

        {blueprints && (
          <div className="nest-spine-tabs">
            <button className={section === 'tags' ? 'active' : ''} onClick={() => setSection('tags')}>
              tags
            </button>
            <button className={section === 'blueprints' ? 'active' : ''} onClick={() => setSection('blueprints')}>
              blueprints
            </button>
          </div>
        )}

        <input
          className="nest-spine-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={section === 'tags' ? 'Search…' : 'Search blueprints…'}
        />

        {section === 'tags' ? (
          <>
            {categories.map((cat, i) => {
              const items = keyIndex.filter((k) => k.category === cat && (!q || k.tag.toLowerCase().includes(q)));
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
            {q && keyIndex.every((k) => !k.tag.toLowerCase().includes(q)) && (
              <p className="nest-spine-empty">Nothing matches "{query}".</p>
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
            Chapter {chapterNum} · {entry.category} · page {flatIndex + 1} of {orderedTags.length}
          </p>
          <h1 className="nest-page-title">{entry.tag}</h1>

          <div className="nest-stat-row">
            {Object.entries(entry.stats).map(([key, value]) => (
              <div className="nest-stat" key={key}>
                <span className="nest-stat-label">{humanizeKey(key)}</span>
                <span className="nest-stat-value">{value}</span>
              </div>
            ))}
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
            The Workshop · page {bpIndex + 1} of {(blueprints ?? []).length}
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
