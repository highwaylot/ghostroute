import { useMemo, useState } from 'react';
import { KEY_INDEX } from '../data/keyIndex';

export function KeySidebar() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KEY_INDEX;
    return KEY_INDEX.filter(
      (entry) => entry.tag.toLowerCase().includes(q) || entry.desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <aside className="sidebar">
      <h2>Key Index</h2>
      <input
        className="key-search"
        placeholder="Search a tag or concept…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="key-list">
        {filtered.map((entry) => (
          <div className="key-item" key={entry.tag}>
            <span className="tag">{entry.tag}</span>
            <span className="desc">{entry.desc}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="key-empty">No matches.</p>}
      </div>
    </aside>
  );
}
