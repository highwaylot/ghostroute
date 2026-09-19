import { runDiagnostics } from '../lib/diagnostics';

type Props = {
  code: string;
};

export function DiagnosticsPanel({ code }: Props) {
  const diagnostics = runDiagnostics(code);
  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

  return (
    <div className="diagnostics-panel">
      <div className="diagnostics-head">
        <span className="diagnostics-title">diagnostics</span>
        {diagnostics.length === 0 ? (
          <span className="diagnostics-summary ok">clean</span>
        ) : (
          <span className="diagnostics-summary">
            {errors > 0 && <span className="count-error">{errors} error{errors === 1 ? '' : 's'}</span>}
            {errors > 0 && warnings > 0 && ' · '}
            {warnings > 0 && <span className="count-warning">{warnings} warning{warnings === 1 ? '' : 's'}</span>}
          </span>
        )}
      </div>

      {diagnostics.length === 0 ? (
        <p className="diagnostics-empty">No issues found in your HTML — looking good.</p>
      ) : (
        <div className="diagnostics-list">
          {diagnostics.map((d, i) => (
            <div key={i} className={`diagnostic-item ${d.severity}`}>
              <span className="diagnostic-dot" />
              <div>
                <p className="diagnostic-title">
                  line {d.line} — {d.title}
                </p>
                <p className="diagnostic-explain">{d.explain}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
