import { useMemo, useState } from 'react';

// The smallest possible language model: count which word follows which,
// then guess the next word from those counts. Real models look back at
// thousands of words and learned from trillions, but the job they were
// trained on is the same one: guess the next word.

const DEFAULT_TEXT =
  'the cat sat on the mat. the cat ate the fish. the dog sat on the rug. the dog ate the bone. ' +
  'the cat chased the dog. the dog chased the ball. the ball rolled under the bed. ' +
  'the cat slept on the bed. the dog slept on the rug. a bird sat on the fence. ' +
  'the cat watched the bird. the bird flew away.';

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.!?]+/g, ' . ')
    .replace(/[^a-z0-9'. ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

type Counts = Map<string, Map<string, number>>;

function countPairs(tokens: string[]): Counts {
  const m: Counts = new Map();
  for (let i = 0; i < tokens.length - 1; i++) {
    const a = tokens[i];
    const b = tokens[i + 1];
    if (!m.has(a)) m.set(a, new Map());
    const row = m.get(a)!;
    row.set(b, (row.get(b) ?? 0) + 1);
  }
  return m;
}

// Each word's chance is its share of the counts, like a weighted die.
function pickByChance(row: Map<string, number>): string {
  const entries = [...row.entries()];
  let r = Math.random() * entries.reduce((a, [, n]) => a + n, 0);
  for (const [w, n] of entries) {
    r -= n;
    if (r <= 0) return w;
  }
  return entries[entries.length - 1][0];
}

export function NextWordDemo() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [words, setWords] = useState<string[]>(['the']);
  const counts = useMemo(() => countPairs(tokenize(text)), [text]);

  const last = words[words.length - 1];
  const row = counts.get(last);
  const total = row ? [...row.values()].reduce((a, b) => a + b, 0) : 0;
  const options = row
    ? [...row.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 6)
        .map(([w, n]) => ({ w, p: n / total }))
    : [];
  const ended = last === '.';

  const add = (w: string) => setWords((ws) => [...ws, w].slice(-40));
  const byChance = () => {
    if (row) add(pickByChance(row));
  };
  const restart = () => {
    const tokens = tokenize(text);
    const starts = tokens.filter((t, i) => t !== '.' && (i === 0 || tokens[i - 1] === '.'));
    setWords([starts.includes('the') ? 'the' : (starts[0] ?? 'the')]);
  };

  const sentence = words.join(' ').replace(/ \./g, '.');

  return (
    <div className="demo demo-nextword">
      <div className="demo-head">
        <span className="demo-tag">try it</span>
        <h4 className="demo-title">Guess the next word</h4>
        <p className="demo-lead">
          This tiny model read the text below and counted which word comes after which. Pick its next word, or let it pick by chance.
        </p>
      </div>
      <p className="nextword-sentence" aria-live="polite">
        {sentence}
        {!ended && <span className="nextword-caret" aria-hidden="true" />}
      </p>
      {ended ? (
        <p className="demo-status">The model guessed the end of a sentence.</p>
      ) : options.length ? (
        <>
          <p className="demo-small">After "{last}", it has seen:</p>
          <ul className="nextword-options">
            {options.map((o) => (
              <li key={o.w}>
                <button type="button" className="nextword-option" onClick={() => add(o.w)}>
                  <span className="nextword-word">{o.w === '.' ? '(end)' : o.w}</span>
                  <span className="nextword-bar" style={{ width: `${Math.max(4, o.p * 100)}%` }} aria-hidden="true" />
                  <span className="nextword-pct">{Math.round(o.p * 100)}%</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="demo-status">It has never seen any word after "{last}", so it has nothing to guess. Real models have read so much this almost never happens.</p>
      )}
      <div className="demo-row">
        <button type="button" className="demo-btn demo-btn-primary" onClick={() => options[0] && add(options[0].w)} disabled={ended || !options.length}>
          add the most likely word
        </button>
        <button type="button" className="demo-btn" onClick={byChance} disabled={ended || !options.length}>
          add a word by chance
        </button>
        <button type="button" className="demo-btn" onClick={restart}>
          start over
        </button>
      </div>
      <label className="demo-small nextword-label" htmlFor="nextword-text">
        The text it learns from. Change it and the guesses change:
      </label>
      <textarea
        id="nextword-text"
        className="demo-input nextword-text"
        value={text}
        rows={4}
        onChange={(e) => {
          setText(e.target.value);
          setWords((ws) => ws.slice(0, 1));
        }}
      />
      <p className="demo-small">
        A chatbot does the same job with a far bigger memory. It looks back at thousands of words, not one, and it learned from a huge share of
        everything people have written online.
      </p>
    </div>
  );
}
