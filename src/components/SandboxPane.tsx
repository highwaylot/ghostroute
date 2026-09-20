import { useEffect, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { StatsPanel } from './StatsPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';

const SANDBOX_KEY = 'tagsmiths-sandbox';

const STARTER = `<!DOCTYPE html>
<html>
  <head>
    <title>My Sandbox</title>
  </head>
  <body>
    <h1>Build anything here.</h1>
  </body>
</html>
`;

function loadSandbox(): string {
  try {
    return localStorage.getItem(SANDBOX_KEY) ?? STARTER;
  } catch {
    return STARTER;
  }
}

export function SandboxPane() {
  const [code, setCode] = useState(loadSandbox);

  useEffect(() => {
    try {
      localStorage.setItem(SANDBOX_KEY, code);
    } catch {
      // storage unavailable — nothing to do
    }
  }, [code]);

  const handleClear = () => {
    if (code.trim() === '' || window.confirm('Clear everything in the sandbox? This can\'t be undone.')) {
      setCode('');
    }
  };

  return (
    <>
      <div className="lower">
        <EditorPanel
          label="sandbox — no route, no checks"
          className="code-panel"
          actions={
            <button className="editor-panel-bar-clear" onClick={handleClear}>
              clear all
            </button>
          }
        >
          <CodeEditor value={code} onChange={setCode} />
        </EditorPanel>
        <StatsPanel code={code} stepLabel="free" />
      </div>

      <EditorPanel label="output" className="output-panel">
        <iframe title="sandbox preview" srcDoc={code} />
      </EditorPanel>

      <DiagnosticsPanel code={code} />
    </>
  );
}
