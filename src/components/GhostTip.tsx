import { useRef, useState } from 'react';
import type { Step } from '../data/steps';
import { useHintLadder, getHint, type AssistLevel } from '../lib/useHintLadder';

type Props = {
  steps: Step[];
  current: number;
  code: string;
  assist: AssistLevel;
  onAdvance: () => void;
  onReset: () => void;
  onSuccess: () => void;
  completeMessage: string;
};

export function GhostTip({ steps, current, code, assist, onAdvance, onReset, onSuccess, completeMessage }: Props) {
  const step = steps[current];
  const { attempts, registerFail, reset } = useHintLadder(String(current));
  const [justFailed, setJustFailed] = useState(false);
  const [justSolved, setJustSolved] = useState(false);
  // Shown for 2s after a correct answer, across the move to the next step,
  // so it is readable (it used to vanish after 650ms).
  const [showCorrect, setShowCorrect] = useState(false);
  // One persistent polite live region: every check writes its result here,
  // so a screen-reader user hears "Correct" or the hint without hunting.
  const [announce, setAnnounce] = useState('');
  const advancing = useRef(false);

  const liveRegion = (
    <p className="sr-only" role="status" aria-live="polite">
      {announce}
    </p>
  );

  if (!step) {
    return (
      <div className="ghost-tip">
        {liveRegion}
        <p className="txt">{completeMessage}</p>
      </div>
    );
  }

  const handleCheck = () => {
    if (advancing.current) return;
    if (step.check(code)) {
      setJustFailed(false);
      reset();
      setJustSolved(true);
      setShowCorrect(true);
      onSuccess();
      advancing.current = true;
      const next = steps[current + 1];
      setAnnounce(next ? `Correct. Next, step ${current + 2} of ${steps.length}: ${next.tag}.` : 'Correct. Route complete.');
      window.setTimeout(() => {
        setJustSolved(false);
        advancing.current = false;
        onAdvance();
      }, 650);
      window.setTimeout(() => setShowCorrect(false), 2000);
    } else {
      registerFail();
      setJustFailed(true);
      const n = attempts + 1;
      const earlyIdx = current < 3 ? Math.min(n - 1, step.hints.length - 1) : -1;
      const nextHint = getHint(step.hints, n, assist) ?? (earlyIdx >= 0 ? step.hints[earlyIdx] : null);
      setAnnounce(`Not yet. ${nextHint ?? `This step needs ${step.tag} in your code.`}`);
    }
  };

  // The first three steps of any route are where a complete beginner
  // decides whether this is for them, so a miss there always shows the
  // next hint, whatever the assist level says. After that the ladder
  // (and hands-off mode) take over as normal.
  const earlyStep = current < 3;
  const earlyHint = earlyStep && attempts > 0 ? step.hints[Math.min(attempts - 1, step.hints.length - 1)] : null;
  const hint = getHint(step.hints, attempts, assist) ?? earlyHint;
  const showRetry = attempts > 0 && !hint;

  return (
    <div className={`ghost-tip ${justSolved ? 'solved' : ''}`}>
      {liveRegion}
      {showCorrect && <p className="solved-banner">✓ Correct — on to the next step</p>}
      {/* Keyed by step so each new step settles in. */}
      <div className="txt" key={current}>
        {/* No "Target:" prefix — the card's STEP header already frames
            this, and the word only read naturally for HTML, where `tag`
            is a literal element. CSS/email steps put a rule pattern or a
            concept name here ("padding", "bulletproof button"), and
            "Target: padding — ..." reads wrong, worse when the `why` text
            then explains what a selector "targets" in the same sentence. */}
        <p className="target">
          <code>{step.tag}</code> — {step.why}
        </p>
        {hint && (
          <p className={`hint ${justFailed ? 'flash' : ''}`}>{hint}</p>
        )}
        {showRetry && (
          <p className={`hint ${justFailed ? 'flash' : ''}`}>
            Not quite yet — this step needs <code>{step.tag}</code> in your code. Look at the step above and try again.
          </p>
        )}
        {step.fact && (
          <p className="step-fact">
            {step.fact.text}
            <span className="step-fact-source"> — {step.fact.source}</span>
          </p>
        )}
      </div>
      <div className="ghost-tip-actions">
        {/* Not disabled while advancing: a disabled button drops keyboard
            focus to <body>. The handler ignores presses during the move. */}
        <button className="btn btn-secondary btn-on-dark" onClick={() => !justSolved && onReset()}>
          Reset this step
        </button>
        <button className="btn btn-primary" onClick={handleCheck} aria-disabled={justSolved}>
          Check my work
        </button>
      </div>
    </div>
  );
}
