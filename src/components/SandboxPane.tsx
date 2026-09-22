import { useEffect, useRef, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { StatsPanel } from './StatsPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';
import { PreviewFrame } from './PreviewFrame';
import { saveAsMyProject } from './MyProjectsPane';

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

type PendingAction = 'save' | 'clear' | null;

export function SandboxPane() {
  const [code, setCode] = useState(loadSandbox);
  const [justSaved, setJustSaved] = useState(false);
  const [pending, setPending] = useState<PendingAction>(null);
  const [nameDraft, setNameDraft] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(SANDBOX_KEY, code);
    } catch {
      // storage unavailable — nothing to do
    }
  }, [code]);

  useEffect(() => {
    if (pending === 'save') nameInputRef.current?.focus();
  }, [pending]);

  const startSave = () => {
    setNameDraft('');
    setPending('save');
  };

  const confirmSave = () => {
    const name = nameDraft.trim();
    if (!name) return;
    saveAsMyProject(name, code);
    setPending(null);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 1800);
  };

  const confirmClear = () => {
    setCode('');
    setPending(null);
  };

  return (
    <>
      <div className="lower">
        <EditorPanel
          label="sandbox — no route, no checks"
          className="code-panel"
          actions={
            pending === 'save' ? (
              <div className="sandbox-inline-form">
                <input
                  ref={nameInputRef}
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmSave();
                    if (e.key === 'Escape') setPending(null);
                  }}
                  placeholder="Project name…"
                />
                <button className="btn btn-primary btn-sm" onClick={confirmSave} disabled={!nameDraft.trim()}>
                  save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setPending(null)}>
                  cancel
                </button>
              </div>
            ) : pending === 'clear' ? (
              <div className="sandbox-inline-form">
                <span className="sandbox-inline-warn">Clear everything? Can't be undone.</span>
                <button className="btn btn-destructive btn-sm" onClick={confirmClear}>
                  yes, clear
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setPending(null)}>
                  cancel
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-secondary btn-sm" onClick={startSave}>
                  {justSaved ? 'saved to my projects ✓' : 'save to my projects'}
                </button>
                <button
                  className="btn btn-destructive btn-sm"
                  onClick={() => (code.trim() === '' ? setCode('') : setPending('clear'))}
                >
                  clear all
                </button>
              </>
            )
          }
        >
          <CodeEditor value={code} onChange={setCode} />
        </EditorPanel>
        <StatsPanel code={code} stepLabel="free" />
      </div>

      <EditorPanel label="output" className="output-panel">
        <PreviewFrame code={code} title="sandbox preview" />
      </EditorPanel>

      <DiagnosticsPanel code={code} />
    </>
  );
}
