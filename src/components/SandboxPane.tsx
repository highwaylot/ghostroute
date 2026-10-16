import { useEffect, useRef, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { StatsPanel } from './StatsPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';
import { PreviewFrame } from './PreviewFrame';
import { saveAsMyProject } from './MyProjectsPane';
import { ShareActions } from './ShareActions';
import { consumeSharedCode } from '../lib/share';

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

type Props = {
  sandboxPath: string;
};

export function SandboxPane({ sandboxPath }: Props) {
  // A share link someone sent lands here: its code replaces the sandbox so
  // the receiver sees exactly what the sender saw, and can save it as theirs.
  const [code, setCode] = useState(() => consumeSharedCode() ?? loadSandbox());
  const [justSaved, setJustSaved] = useState(false);
  const [pending, setPending] = useState<PendingAction>(null);
  const [nameDraft, setNameDraft] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Someone already on the sandbox who pastes a share link into the URL bar
  // gets a hash change, not a reload — pick that up too.
  useEffect(() => {
    const onHash = () => {
      const shared = consumeSharedCode();
      if (shared !== null) setCode(shared);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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
                <ShareActions name="sandbox" code={code} sandboxPath={sandboxPath} />
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
