import { runDiagnostics } from '../lib/diagnostics';

type Props = {
  code: string;
  // 'route' sits next to a step check, so a clean lint must not read as
  // "step done"; 'free' (sandbox, projects) has no step to confuse it with.
  context?: 'route' | 'free';
};

export function DiagnosticsPanel({ code, context = 'free' }: Props) {
  const empty = code.trim() === '';
  const diagnostics = empty ? [] : runDiagnostics(code);
  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

  return (
    <div className="diagnostics-panel">
      <div className="diagnostics-head">
        <span className="diagnostics-title">diagnostics</span>
        {empty ? (
          <span className="diagnostics-summary">empty</span>
        ) : diagnostics.length === 0 ? (
          <span className="diagnostics-summary ok">clean</span>
        ) : (
          <span className="diagnostics-summary">
            {errors > 0 && <span className="count-error">{errors} error{errors === 1 ? '' : 's'}</span>}
            {errors > 0 && warnings > 0 && ' · '}
            {warnings > 0 && <span className="count-warning">{warnings} warning{warnings === 1 ? '' : 's'}</span>}
          </span>
        )}
      </div>

      {empty ? (
        <p className="diagnostics-empty">Nothing here yet — click in the coding window above and start typing.</p>
      ) : diagnostics.length === 0 ? (
        <p className="diagnostics-empty">
          {context === 'route'
            ? 'No syntax issues. That isn\'t the same as the step being done — Check my work tells you that.'
            : 'No issues found in your HTML — looking good.'}
        </p>
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
