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

  // Center the current step by scrolling the track itself. scrollIntoView
  // did the same visually, but Chrome also treats it as the starting point
  // for the next Tab press, so a keyboard user's first Tab skipped the
  // whole top bar and landed on "Reset this step".
  useEffect(() => {
    const track = trackRef.current;
    const node = currentRef.current;
    if (!track || !node) return;
    const target = node.offsetLeft - track.clientWidth / 2 + node.offsetWidth / 2;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
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
