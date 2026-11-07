import { useEffect, useRef, useState } from 'react';
import { createEliza, ELIZA_OPENING } from '../../lib/eliza';

type Line = { who: 'eliza' | 'you'; text: string; how?: string };

const STARTERS = ['I feel tired all the time', 'My mother never calls me', 'You are just a computer', 'I need a holiday'];

// Chat with a rebuilt ELIZA. Every reply can show how it was made, which
// is the point: it feels like listening and it is only pattern matching.
export function ElizaDemo() {
  const [respond] = useState(createEliza);
  const [lines, setLines] = useState<Line[]>([{ who: 'eliza', text: ELIZA_OPENING }]);
  const [input, setInput] = useState('');
  const [showHow, setShowHow] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);

  // Scroll the log itself, never the page around it.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, showHow]);

  const send = (text: string) => {
    const said = text.trim();
    if (!said) return;
    const reply = respond(said);
    setLines((l) => [...l, { who: 'you', text: said }, { who: 'eliza', text: reply.text, how: reply.how }]);
    setInput('');
  };

  return (
    <div className="demo demo-eliza">
      <div className="demo-head">
        <span className="demo-tag">try it</span>
        <h4 className="demo-title">Talk to ELIZA (1966)</h4>
        <p className="demo-lead">Tell it something about your day. Then turn on "show how" to see the trick behind each reply.</p>
      </div>
      <div className="eliza-log" ref={logRef} role="log" aria-live="polite" aria-label="Conversation with ELIZA">
        {lines.map((l, i) => (
          <div key={i} className={`eliza-line eliza-${l.who}`}>
            <span className="eliza-who">{l.who === 'eliza' ? 'ELIZA' : 'you'}</span>
            <span className="eliza-text">{l.text}</span>
            {showHow && l.how && <span className="eliza-how">{l.how}</span>}
          </div>
        ))}
      </div>
      <form
        className="eliza-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label className="sr-only" htmlFor="eliza-input">
          Say something to ELIZA
        </label>
        <input
          id="eliza-input"
          className="demo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here…"
          autoComplete="off"
          maxLength={200}
        />
        <button type="submit" className="demo-btn demo-btn-primary" disabled={!input.trim()}>
          send
        </button>
      </form>
      <div className="demo-row">
        {STARTERS.map((s) => (
          <button key={s} type="button" className="demo-chip" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>
      <label className="demo-check">
        <input type="checkbox" checked={showHow} onChange={(e) => setShowHow(e.target.checked)} />
        show how each reply was made
      </label>
    </div>
  );
}
