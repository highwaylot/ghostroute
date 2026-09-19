import { STEPS } from '../data/steps';

type Props = {
  current: number;
  onInsert: () => void;
};

export function GhostTip({ current, onInsert }: Props) {
  const step = STEPS[current];

  if (!step) {
    return (
      <div className="ghost-tip">
        <p className="txt">
          Route complete — you've built a full basic page. Explore the Key Index or edit freely.
        </p>
      </div>
    );
  }

  return (
    <div className="ghost-tip">
      <p className="txt">
        Next on the route: <code>{step.tag}</code> — {step.why}
      </p>
      <button onClick={onInsert}>Insert this step</button>
    </div>
  );
}
