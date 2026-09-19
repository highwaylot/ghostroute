import { useEffect, useRef } from 'react';
import { STEPS } from '../data/steps';

type Props = {
  current: number;
  onSelect: (index: number) => void;
};

export function RouteTrack({ current, onSelect }: Props) {
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
      {STEPS.map((step, i) => (
        <div className="step-wrap" key={step.tag}>
          {i > 0 && <div className={`connector ${i <= current ? 'done' : ''}`} />}
          <button
            ref={i === current ? currentRef : undefined}
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
