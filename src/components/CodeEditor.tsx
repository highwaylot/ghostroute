import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { linter, type Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { findUnclosedTags } from '../lib/htmlCheck';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const unclosedTagLinter = linter((view) => {
  const code = view.state.doc.toString();
  const diagnostics: Diagnostic[] = findUnclosedTags(code).map((tag) => ({
    from: tag.from,
    to: tag.to,
    severity: 'error',
    message: `<${tag.name}> is never closed`,
  }));
  return diagnostics;
});

const theme = EditorView.theme({
  '&': { fontSize: '14px', height: '100%' },
  '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.7' },
  '.cm-content': { padding: '12px 0' },
  '.cm-gutters': { paddingTop: 0 },
});

export function CodeEditor({ value, onChange }: Props) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme="light"
      // autoCloseTags off — auto-inserting closing tags as you type was
      // fighting the point of the route, which is writing the tag yourself.
      extensions={[html({ autoCloseTags: false }), unclosedTagLinter, theme]}
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
