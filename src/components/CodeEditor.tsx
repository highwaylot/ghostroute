import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { linter, lintGutter, type Diagnostic as CMDiagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { runDiagnostics } from '../lib/diagnostics';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

// Feeds the full diagnostics engine into CodeMirror's own linter, so every
// issue gets a colored squiggle (red for errors, amber for warnings), a dot
// in the gutter, and the same plain-English explanation on hover that the
// DiagnosticsPanel shows in full below the editor.
const diagnosticsLinter = linter((view) => {
  const code = view.state.doc.toString();
  const docLength = view.state.doc.length;
  const diagnostics: CMDiagnostic[] = runDiagnostics(code).map((d) => ({
    from: Math.min(d.from, docLength),
    to: Math.min(Math.max(d.to, d.from + 1), docLength),
    severity: d.severity,
    message: `${d.title} — ${d.explain}`,
  }));
  return diagnostics;
});

const theme = EditorView.theme({
  '&': { fontSize: '14px', height: '100%' },
  '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.7' },
  '.cm-content': { padding: '12px 0' },
  '.cm-gutters': { paddingTop: 0 },
  '.cm-lint-marker-error': { color: '#d6455f' },
  '.cm-lint-marker-warning': { color: '#c98a1a' },
});

export function CodeEditor({ value, onChange }: Props) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme="light"
      // autoCloseTags off — auto-inserting closing tags as you type was
      // fighting the point of the route, which is writing the tag yourself.
      extensions={[html({ autoCloseTags: false }), diagnosticsLinter, lintGutter(), theme]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        // Same reasoning: no auto-closing brackets/quotes, no autocomplete
        // popups taking over what you're typing.
        closeBrackets: false,
        autocompletion: false,
      }}
    />
  );
}
