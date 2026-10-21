import { useEffect, useMemo, useRef, useState } from 'react';
import type { Step } from '../data/steps';
import type { Chapter } from '../data/chapters';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { playSuccessChime } from '../lib/celebrate';

type Props = {
  steps: Step[];
  chapters: Chapter[];
  // Steps below this index have been passed on the route. Quickfire only
  // ever asks about those — it is retrieval practice, not new material.
  passedCount: number;
  storageKey: string;
  onGoToRoute: () => void;
};

type Phase = 'ask' | 'correct';

function loadBest(key: string): number {
  try {
    const n = Number(localStorage.getItem(key));
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

function pickNext(count: number, avoid: number | null): number {
  if (count <= 1) return 0;
  let i = Math.floor(Math.random() * count);
  if (i === avoid) i = (i + 1 + Math.floor(Math.random() * (count - 1))) % count;
  return i;
}

// Retrieval practice over steps already passed. The route checks each
// thing once and never asks again; this asks again, from a cold start, in
// random order — the testing effect, applied to the exact material the
// learner just met. The prompt is the step's own "why" line with the
// answer removed; the check is the step's own check, so a snippet that
// would have passed the route passes here.
export function QuickfirePane({ steps, chapters, passedCount, storageKey, onGoToRoute }: Props) {
  const pool = useMemo(() => steps.slice(0, passedCount), [steps, passedCount]);
  const [index, setIndex] = useState<number>(() => pickNext(pool.length, null));
  const [answer, setAnswer] = useState('');
  const [phase, setPhase] = useState<Phase>('ask');
  const [misses, setMisses] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(() => loadBest(storageKey));
  const [answered, setAnswered] = useState(0);
  const [shake, setShake] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(best));
    } catch {
      // storage unavailable — the number still lives for this session
    }
  }, [best, storageKey]);

  // If the pool shrinks (track switch), keep the index valid.
  useEffect(() => {
    if (index >= pool.length) setIndex(0);
  }, [pool.length, index]);

  const step = pool[index];
  const chapter = step ? chapters.find((c) => c.id === step.chapter) : null;

  const next = () => {
    setIndex((i) => pickNext(pool.length, i));
    setAnswer('');
    setPhase('ask');
    setMisses(0);
    setRevealed(false);
  };

  const check = () => {
    if (!step || phase !== 'ask') return;
    if (step.check(answer)) {
      playSuccessChime();
      setPhase('correct');
      setAnswered((n) => n + 1);
      if (!revealed) {
        setStreak((s) => {
          const ns = s + 1;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
      }
      timer.current = window.setTimeout(next, 700);
    } else {
      setMisses((m) => m + 1);
      setStreak(0);
      setShake(true);
      window.setTimeout(() => setShake(false), 350);
    }
  };

  const skip = () => {
    setStreak(0);
    next();
  };

  if (pool.length === 0) {
    return (
      <div className="quickfire quickfire-empty">
        <p className="mode-blurb">
          Quickfire asks you to write, from memory, the things you've already passed on the route — in random order, with no code in front of you.
          Nothing's been passed yet, so there's nothing to ask.
        </p>
        <button className="btn btn-primary" onClick={onGoToRoute}>
          go pass a route step
        </button>
      </div>
    );
  }

  if (!step) return null;

  // Strip the literal answer out of the prompt where a step's "why" quotes
  // it, so the card doesn't hand over the thing it's asking for.
  const prompt = step.why.split(step.tag).join('___');
  const hint = misses > 0 ? step.hints[Math.min(misses - 1, step.hints.length - 1)] : null;

  return (
    <div className="quickfire">
      <div className="quickfire-head">
        <div className="quickfire-stats">
          <span className="quickfire-stat">
            <span className="quickfire-stat-label">streak</span>
            <span className="quickfire-stat-value">{streak}</span>
          </span>
          <span className="quickfire-stat">
            <span className="quickfire-stat-label">best</span>
            <span className="quickfire-stat-value">{best}</span>
          </span>
          <span className="quickfire-stat">
            <span className="quickfire-stat-label">answered</span>
            <span className="quickfire-stat-value">{answered}</span>
          </span>
          <span className="quickfire-stat">
            <span className="quickfire-stat-label">pool</span>
            <span className="quickfire-stat-value">{pool.length} steps</span>
          </span>
        </div>
        <p className="mode-blurb">
          From memory: write the thing this step was about. Your own check from the route decides if it counts.
        </p>
      </div>

      <div className={`quickfire-card ${phase === 'correct' ? 'correct' : ''} ${shake ? 'shake' : ''}`}>
        <span className="quickfire-eyebrow">{chapter ? `chapter — ${chapter.title}` : 'step'}</span>
        <p className="quickfire-prompt">{prompt}</p>
        {revealed && (
          <p className="quickfire-reveal">
            answer: <code>{step.tag}</code>
          </p>
        )}
        {hint && !revealed && <p className="quickfire-hint">{hint}</p>}
        {phase === 'correct' && <p className="quickfire-correct">✓ that's it</p>}
      </div>

      <EditorPanel label="your answer — from memory" className="code-panel quickfire-editor">
        <CodeEditor value={answer} onChange={setAnswer} />
      </EditorPanel>

      <div className="quickfire-actions">
        <button className="btn btn-primary" onClick={check} disabled={phase !== 'ask' || answer.trim() === ''}>
          check
        </button>
        <button className="btn btn-ghost" onClick={() => setRevealed(true)} disabled={revealed || phase !== 'ask'}>
          show me
        </button>
        <button className="btn btn-secondary" onClick={skip} disabled={phase !== 'ask'}>
          skip
        </button>
      </div>
    </div>
  );
}
