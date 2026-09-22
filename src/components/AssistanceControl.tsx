import { ASSIST_LEVELS, type AssistLevel } from '../lib/useHintLadder';

type Props = {
  value: AssistLevel;
  onChange: (level: AssistLevel) => void;
  light?: boolean;
};

// One row, always: a label, the three level buttons, and the active
// level's name. The full description lives in each button's tooltip
// instead of its own line — less to visually parse, same info on hover.
export function AssistanceControl({ value, onChange, light }: Props) {
  const active = ASSIST_LEVELS.find((a) => a.level === value);

  return (
    <div className={`assist-control ${light ? 'light' : ''}`}>
      <span className="assist-label">assist</span>
      <div className="assist-buttons">
        {ASSIST_LEVELS.map((a) => (
          <button
            key={a.level}
            className={`assist-btn ${a.level === value ? 'active' : ''}`}
            onClick={() => onChange(a.level)}
            title={`${a.label} — ${a.desc}`}
          >
            {a.level}
          </button>
        ))}
      </div>
      {active && <span className="assist-desc">{active.label}</span>}
    </div>
  );
}
