import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstructionsRail } from '../components/InstructionsRail';
import { KeySidebar } from '../components/KeySidebar';
import { StatsPanel } from '../components/StatsPanel';
import { CodeEditor } from '../components/CodeEditor';
import { EditorPanel } from '../components/EditorPanel';
import { PuzzlePane } from '../components/PuzzlePane';
import { SandboxPane } from '../components/SandboxPane';
import { Logo } from '../components/Logo';
import { STEPS } from '../data/steps';
import '../App.css';

const STORAGE_KEY = 'tagsmiths-code';
const STEP_KEY = 'tagsmiths-step';

type Mode = 'route' | 'puzzles' | 'sandbox';

function loadSavedCode(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function loadSavedStep(): number {
  try {
    const raw = Number(localStorage.getItem(STEP_KEY));
    return Number.isFinite(raw) && raw >= 0 ? Math.min(raw, STEPS.length) : 0;
  } catch {
    return 0;
  }
}

export default function Workspace() {
  const [mode, setMode] = useState<Mode>('route');
  const [code, setCode] = useState(loadSavedCode);
  const [current, setCurrent] = useState(loadSavedStep);
  const [keyOpen, setKeyOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable (private window, etc.) — nothing to do
    }
  }, [code]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, String(current));
    } catch {
      // storage unavailable — nothing to do
    }
  }, [current]);

  const handleAdvance = () => {
    setCurrent((c) => Math.min(c + 1, STEPS.length));
  };

  const handleReset = () => {
    setCode('');
  };

  const stepLabel = `${Math.min(current + 1, STEPS.length)} / ${STEPS.length}`;

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand-row">
          <Logo size={20} />
        </Link>

        <nav className="tabs">
          <button className={`tab ${mode === 'route' ? 'active' : ''}`} onClick={() => setMode('route')}>
            route
          </button>
          <button className={`tab ${mode === 'puzzles' ? 'active' : ''}`} onClick={() => setMode('puzzles')}>
            fix this code
          </button>
          <button className={`tab ${mode === 'sandbox' ? 'active' : ''}`} onClick={() => setMode('sandbox')}>
            sandbox
          </button>
        </nav>

        <button className="key-toggle" onClick={() => setKeyOpen((v) => !v)}>
          key index
        </button>
      </header>

      <div className="workspace">
        <KeySidebar open={keyOpen} onClose={() => setKeyOpen(false)} />

        <main className="main">
          {mode === 'route' && (
            <div className="workspace-grid">
              <InstructionsRail
                current={current}
                code={code}
                onSelect={setCurrent}
                onAdvance={handleAdvance}
                onReset={handleReset}
              />

              <div className="workspace-main">
                <div className="lower">
                  <EditorPanel label="active coding window" className="code-panel">
                    <CodeEditor value={code} onChange={setCode} />
                  </EditorPanel>
                  <StatsPanel code={code} stepLabel={stepLabel} />
                </div>

                <EditorPanel label="output" className="output-panel">
                  <iframe title="preview" srcDoc={code} />
                </EditorPanel>
              </div>
            </div>
          )}

          {mode === 'puzzles' && (
            <>
              <p className="mode-blurb">
                Each puzzle starts broken on purpose. Read the code, find what's wrong, and fix it.
              </p>
              <PuzzlePane />
            </>
          )}

          {mode === 'sandbox' && (
            <>
              <p className="mode-blurb">
                No route, no checks — just a blank page to build whatever you want.
              </p>
              <SandboxPane />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
