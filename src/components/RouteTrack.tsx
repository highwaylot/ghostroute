import { useEffect, useRef } from 'react';
import type { Step } from '../data/steps';

type Props = {
  steps: Step[];
  current: number;
  onSelect: (index: number) => void;
};

export function RouteTrack({ steps, current, onSelect }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [current]);

  return (
    <div className="track" ref={trackRef}>
      {steps.map((step, i) => (
        <div className="step-wrap" key={step.tag}>
          {i > 0 && <div className={`connector ${i <= current ? 'done' : ''}`} />}
          <button
            ref={i === current ? currentRef : undefined}
            className={`node ${i < current ? 'done' : i === current ? 'current' : 'locked'}`}
            onClick={() => i <= current && onSelect(i)}
            disabled={i > current}
            title={i > current ? 'Finish the current step first' : undefined}
          >
            <span className="dot" />
            <span className="label">{step.tag}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
