import { useState } from 'react';
import { KEY_INDEX, KEY_CATEGORIES } from '../data/keyIndex';
import { NEST, getNestEntry } from '../data/nest';
import { BLUEPRINTS } from '../data/blueprints';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — nothing to do
    }
  };

  return (
    <button className="nest-copy-btn" onClick={handleCopy}>
      {copied ? 'copied!' : 'copy'}
    </button>
  );
}

export function NestPane() {
  const [section, setSection] = useState<'tags' | 'blueprints'>('tags');
  const [activeTag, setActiveTag] = useState(NEST[0].tag);
  const [activeBlueprint, setActiveBlueprint] = useState(BLUEPRINTS[0].id);
  const entry = getNestEntry(activeTag);
  const keyEntry = KEY_INDEX.find((k) => k.tag === activeTag);
  const blueprint = BLUEPRINTS.find((b) => b.id === activeBlueprint);

  return (
    <div className="nest-pane">
      <div className="nest-section-toggle">
        <button className={section === 'tags' ? 'active' : ''} onClick={() => setSection('tags')}>
          tags
        </button>
        <button className={section === 'blueprints' ? 'active' : ''} onClick={() => setSection('blueprints')}>
          blueprints
        </button>
      </div>

      {section === 'blueprints' ? (
        <div className="nest-blueprints">
          <div className="nest-list">
            {BLUEPRINTS.map((b) => (
              <button
                key={b.id}
                className={`nest-pick ${activeBlueprint === b.id ? 'active' : ''}`}
                onClick={() => setActiveBlueprint(b.id)}
              >
                {b.title}
              </button>
            ))}
          </div>

          {blueprint && (
            <div className="nest-detail">
              <div className="nest-detail-head">
                <span className="nest-detail-category">blueprint</span>
                <h1 className="nest-detail-tag">{blueprint.title}</h1>
              </div>
              <div className="nest-section">
                <p>{blueprint.desc}</p>
              </div>
              <div className="nest-section">
                <div className="nest-example-head">
                  <h2>Code</h2>
                  <CopyButton text={blueprint.code} />
                </div>
                <pre className="nest-example">{blueprint.code}</pre>
              </div>
            </div>
          )}
        </div>
      ) : (
      <div className="nest-tags">
      <div className="nest-list">
        {KEY_CATEGORIES.map((cat) => (
          <div key={cat} className="nest-category">
            <span className="nest-category-label">{cat}</span>
            {KEY_INDEX.filter((k) => k.category === cat).map((k) => {
              const hasDeep = Boolean(getNestEntry(k.tag));
              return (
                <button
                  key={k.tag}
                  className={`nest-pick ${activeTag === k.tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(k.tag)}
                  title={hasDeep ? undefined : 'Full deep dive coming soon — showing the short version for now'}
                >
                  {k.tag}
                  {!hasDeep && <span className="nest-pick-soon">soon</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {entry ? (
        <div className="nest-detail">
          <div className="nest-detail-head">
            <span className="nest-detail-category">{entry.category}</span>
            <h1 className="nest-detail-tag">{entry.tag}</h1>
          </div>

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
            <h2>What it does</h2>
            <p>{entry.whatItDoes}</p>
          </div>

          <div className="nest-section">
            <h2>Where it goes</h2>
            <p>{entry.whereItGoes}</p>
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
              {entry.related.map((r) =>
                getNestEntry(r) ? (
                  <button key={r} className="nest-related-chip" onClick={() => setActiveTag(r)}>
                    {r}
                  </button>
                ) : (
                  <span key={r} className="nest-related-chip stub">
                    {r}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      ) : keyEntry ? (
        <div className="nest-detail nest-stub-detail">
          <div className="nest-detail-head">
            <span className="nest-detail-category">{keyEntry.category}</span>
            <h1 className="nest-detail-tag">{keyEntry.tag}</h1>
          </div>
          <p className="nest-stub-note">Full deep dive coming soon — here's the short version for now.</p>
          <div className="nest-section">
            <p>{keyEntry.desc}</p>
          </div>
          <div className="nest-section">
            <h2>Example</h2>
            <pre className="nest-example">{keyEntry.example}</pre>
          </div>
        </div>
      ) : (
        <div className="nest-detail nest-empty">
          <p>Pick a tag from the list.</p>
        </div>
      )}
      </div>
      )}
    </div>
  );
}
