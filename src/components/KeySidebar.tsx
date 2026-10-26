import { useEffect, useMemo, useRef, useState } from 'react';
import { KEY_INDEX, KEY_CATEGORIES } from '../data/keyIndex';
import { CopyButton } from './CopyButton';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DEFAULT_POS = { x: 0, y: 0 }; // offset from the default bottom-right anchor
const SIZE_KEY = 'tagsmiths-key-size';

function loadSize(): { width: number; height: number } | null {
  try {
    const raw = localStorage.getItem(SIZE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function KeySidebar({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [pos, setPos] = useState(DEFAULT_POS);
  const [savedSize] = useState(loadSize);
  const panelRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null
  );

  // The native resize handle sets the element's own size directly (not a
  // React state we control), so persisting it means watching the DOM node
  // itself — a ResizeObserver, saved on a short debounce so it's not
  // writing to localStorage on every pixel of a drag.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    let timeout: number | undefined;
    const observer = new ResizeObserver(() => {
      // offsetWidth/Height (border-box) match what the CSS width/height
      // properties below actually control, given box-sizing: border-box
      // is set globally — contentRect would exclude padding and be wrong
      // to reapply as-is.
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        try {
          localStorage.setItem(SIZE_KEY, JSON.stringify({ width, height }));
        } catch {
          // storage unavailable — nothing to do
        }
      }, 300);
    });
    observer.observe(el);
    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return KEY_INDEX.filter((entry) => {
      const matchesQuery =
        !q || entry.tag.toLowerCase().includes(q) || entry.desc.toLowerCase().includes(q);
      const matchesCategory = !category || entry.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  // Escape closes the panel, like every other overlay on the site.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Pointer events cover mouse, pen and touch in one path (the drag used to
  // be mouse-only). Capture keeps the drag alive if the pointer outruns the
  // header.
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current) return;
      setPos({
        x: dragRef.current.origX + (ev.clientX - dragRef.current.startX),
        y: dragRef.current.origY + (ev.clientY - dragRef.current.startY),
      });
    };
    const onUp = () => {
      dragRef.current = null;
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
  };

  if (!open) return null;

  // No scrim, no click-outside-to-close: this is a companion panel meant
  // to stay open alongside the editor, not a modal that blocks the page.
  // It's an in-page draggable div, not a real browser window, so popup
  // blockers never touch it.
  return (
    <aside
      ref={panelRef}
      className="sidebar open"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        ...(savedSize ? { width: `${savedSize.width}px`, height: `${savedSize.height}px` } : {}),
      }}
    >
      <div className="sidebar-head" onPointerDown={handleDragStart}>
        <h2>key index</h2>
        <button
          className="sidebar-close"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          aria-label="Close key index"
        >
          ×
        </button>
      </div>
      <input
        className="key-search"
        placeholder="Search a tag or concept…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="key-categories">
        <button
          className={`key-cat ${category === null ? 'active' : ''}`}
          onClick={() => setCategory(null)}
        >
          all
        </button>
        {KEY_CATEGORIES.map((c) => (
          <button
            key={c}
            className={`key-cat ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="key-list">
        {filtered.map((entry) => (
          <div className="key-item" key={entry.tag}>
            <span className="tag">{entry.tag}</span>
            <span className="desc">{entry.desc}</span>
            <div className="key-example-wrap">
              <pre className="key-example">{entry.example}</pre>
              <CopyButton text={entry.example} className="key-copy-btn" iconOnly />
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="key-empty">No matches.</p>}
      </div>
      {/* Purely visual — the real resize hit area is the native browser
          handle underneath it (CSS `resize`). pointer-events: none so this
          never intercepts that drag, it just makes the corner obvious. */}
      <div className="sidebar-resize-hint" aria-hidden="true" />
    </aside>
  );
}
