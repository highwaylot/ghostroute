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
        <h3>Lines</h3>
        <div className="val">{lines}</div>
      </div>
      <div className="stat">
        <h3>Characters</h3>
        <div className="val">{chars}</div>
      </div>
      <div className={`stat ${unclosed === 0 ? 'ok' : 'err'}`}>
        <h3>{unclosed === 0 ? 'Tags balanced' : 'Unclosed tags'}</h3>
        <div className="val">{unclosed}</div>
      </div>
      <div className="stat">
        <h3>Route step</h3>
        <div className="val">{stepLabel}</div>
      </div>
    </div>
  );
}
