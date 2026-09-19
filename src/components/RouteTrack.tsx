import { STEPS } from '../data/steps';

type Props = {
  current: number;
  onSelect: (index: number) => void;
};

export function RouteTrack({ current, onSelect }: Props) {
  return (
    <div className="track">
      {STEPS.map((step, i) => (
        <div className="step-wrap" key={step.tag}>
          {i > 0 && <div className={`connector ${i <= current ? 'done' : ''}`} />}
          <button
            className={`node ${i < current ? 'done' : i === current ? 'current' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="dot" />
            <span className="label">{step.tag}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
