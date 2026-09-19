import { useState } from 'react';
import { STEPS } from '../data/steps';
import { useHintLadder } from '../lib/useHintLadder';

type Props = {
  current: number;
  code: string;
  onAdvance: () => void;
  onReset: () => void;
};

export function GhostTip({ current, code, onAdvance, onReset }: Props) {
  const step = STEPS[current];
  const { attempts, registerFail, reset, hintLevel } = useHintLadder(String(current));
  const [justFailed, setJustFailed] = useState(false);

  if (!step) {
    return (
      <div className="ghost-tip">
        <p className="txt">
          Route complete — you've built a full basic page. Try the Puzzles tab, or edit freely in Sandbox.
        </p>
      </div>
    );
  }

  const handleCheck = () => {
    if (step.check(code)) {
      setJustFailed(false);
      reset();
      onAdvance();
    } else {
      registerFail();
      setJustFailed(true);
    }
  };

  const showHint = attempts > 0;
  const hint = showHint ? step.hints[hintLevel(step.hints)] : null;

  return (
    <div className="ghost-tip">
      <div className="txt">
        <p className="target">
          Target: <code>{step.tag}</code> — {step.why}
        </p>
        {hint && (
          <p className={`hint ${justFailed ? 'flash' : ''}`}>
            Hint {Math.min(attempts, step.hints.length)}/{step.hints.length}: {hint}
          </p>
        )}
      </div>
      <div className="ghost-tip-actions">
        <button className="secondary" onClick={onReset}>
          Reset this step
        </button>
        <button onClick={handleCheck}>Check my work</button>
      </div>
    </div>
  );
}
