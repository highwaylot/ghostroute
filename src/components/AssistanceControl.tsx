import { ASSIST_LEVELS, type AssistLevel } from '../lib/useHintLadder';

type Props = {
  value: AssistLevel;
  onChange: (level: AssistLevel) => void;
};

export function AssistanceControl({ value, onChange }: Props) {
  const active = ASSIST_LEVELS.find((a) => a.level === value);

  return (
    <div className="assist-control">
      <div className="assist-row">
        <span className="assist-label">assistance</span>
        <div className="assist-buttons">
          {ASSIST_LEVELS.map((a) => (
            <button
              key={a.level}
              className={`assist-btn ${a.level === value ? 'active' : ''}`}
              onClick={() => onChange(a.level)}
              title={a.label}
            >
              {a.level}
            </button>
          ))}
        </div>
      </div>
      {active && <span className="assist-desc">{active.label} — {active.desc}</span>}
    </div>
  );
}
