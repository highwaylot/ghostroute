import { useState } from 'react';
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

  if (!step) {
    return (
      <div className="ghost-tip">
        <p className="txt">{completeMessage}</p>
      </div>
    );
  }

  const handleCheck = () => {
    if (step.check(code)) {
      setJustFailed(false);
      reset();
      setJustSolved(true);
      onSuccess();
      window.setTimeout(() => {
        setJustSolved(false);
        onAdvance();
      }, 650);
    } else {
      registerFail();
      setJustFailed(true);
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
      {justSolved && <p className="solved-banner">✓ Correct — moving on</p>}
      <div className="txt">
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
        <button className="btn btn-secondary btn-on-dark" onClick={onReset} disabled={justSolved}>
          Reset this step
        </button>
        <button className="btn btn-primary" onClick={handleCheck} disabled={justSolved}>
          Check my work
        </button>
      </div>
    </div>
  );
}
