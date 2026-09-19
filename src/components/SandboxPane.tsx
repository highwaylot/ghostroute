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

  return (
    <>
      <div className="lower">
        <EditorPanel label="sandbox — no route, no checks" className="code-panel">
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
