import { useEffect, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { StatsPanel } from './StatsPanel';

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
      <div className="output-wrap">
        <span className="lbl">Output</span>
        <iframe title="sandbox preview" srcDoc={code} />
      </div>

      <div className="lower">
        <div className="editor-wrap">
          <span className="lbl">Sandbox — no route, no checks</span>
          <CodeEditor value={code} onChange={setCode} />
        </div>
        <StatsPanel code={code} stepLabel="free" />
      </div>
    </>
  );
}
