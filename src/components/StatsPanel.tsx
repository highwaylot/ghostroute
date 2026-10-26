import { countUnclosed } from '../lib/htmlCheck';

type Props = {
  code: string;
  stepLabel: string;
};

export function StatsPanel({ code, stepLabel }: Props) {
  const lines = code.split('\n').length;
  const chars = code.length;
  const unclosed = countUnclosed(code);

  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-label">Lines</div>
        <div className="val">{lines}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Characters</div>
        <div className="val">{chars}</div>
      </div>
      <div className={`stat ${unclosed === 0 ? 'ok' : 'err'}`}>
        <div className="stat-label">Unclosed tags</div>
        <div className="val">{unclosed}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Route step</div>
        <div className="val">{stepLabel}</div>
      </div>
    </div>
  );
}
