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
  // A share link someone sent lands here. The receiver sees exactly what the
  // sender saw, but as an unsaved copy: their own stored sandbox is not
  // touched until they choose to keep the shared page.
  const [initial] = useState(() => {
    const shared = consumeSharedCode();
    return shared !== null ? { code: shared, shared: true } : { code: loadSandbox(), shared: false };
  });
  const [code, setCode] = useState(initial.code);
  const [viewingShared, setViewingShared] = useState(initial.shared);
  const [justSaved, setJustSaved] = useState(false);
  const [pending, setPending] = useState<PendingAction>(null);
  const [nameDraft, setNameDraft] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Someone already on the sandbox who pastes a share link into the URL bar
  // gets a hash change, not a reload — pick that up too.
  useEffect(() => {
    const onHash = () => {
      const shared = consumeSharedCode();
      if (shared !== null) {
        setCode(shared);
        setViewingShared(true);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (viewingShared) return;
    try {
      localStorage.setItem(SANDBOX_KEY, code);
    } catch {
      // storage unavailable — nothing to do
    }
  }, [code, viewingShared]);

  const keepShared = () => setViewingShared(false);
  const backToMine = () => {
    setCode(loadSandbox());
    setViewingShared(false);
  };

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
      {viewingShared && (
        <div className="shared-banner" role="status">
          <p>
            You're looking at a page someone shared. It is not saved, and your own sandbox is untouched.
          </p>
          <div className="shared-banner-actions">
            <button className="btn btn-primary btn-sm" onClick={keepShared}>
              keep this as my sandbox
            </button>
            <button className="btn btn-secondary btn-sm" onClick={startSave}>
              save to my projects
            </button>
            <button className="btn btn-secondary btn-sm" onClick={backToMine}>
              back to my sandbox
            </button>
          </div>
        </div>
      )}
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
          <CodeEditor value={code} onChange={setCode} label="Sandbox code editor" />
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
