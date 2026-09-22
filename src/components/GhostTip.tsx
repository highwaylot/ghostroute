import { useState } from 'react';
import { STEPS } from '../data/steps';
import { useHintLadder, getHint, type AssistLevel } from '../lib/useHintLadder';

type Props = {
  current: number;
  code: string;
  assist: AssistLevel;
  onAdvance: () => void;
  onReset: () => void;
  onSuccess: () => void;
};

export function GhostTip({ current, code, assist, onAdvance, onReset, onSuccess }: Props) {
  const step = STEPS[current];
  const { attempts, registerFail, reset } = useHintLadder(String(current));
  const [justFailed, setJustFailed] = useState(false);
  const [justSolved, setJustSolved] = useState(false);

  if (!step) {
    return (
      <div className="ghost-tip">
        <p className="txt">
          Route complete — you've written a full page: structure, text, lists, links, media,
          grouping, and semantic layout. That's real, usable HTML. Try Fix This Code to test what
          stuck, the Project to build something from scratch, or Sandbox to build freely.
        </p>
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

  const hint = getHint(step.hints, attempts, assist);
  const showGenericRetry = attempts > 0 && assist === 1;

  return (
    <div className={`ghost-tip ${justSolved ? 'solved' : ''}`}>
      {justSolved && <p className="solved-banner">✓ Correct — moving on</p>}
      <div className="txt">
        <p className="target">
          Target: <code>{step.tag}</code> — {step.why}
        </p>
        {hint && (
          <p className={`hint ${justFailed ? 'flash' : ''}`}>{hint}</p>
        )}
        {showGenericRetry && (
          <p className={`hint ${justFailed ? 'flash' : ''}`}>
            Not quite yet — look closely at the target above and try again.
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
