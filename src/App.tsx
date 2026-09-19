import { useEffect, useState } from 'react';
import { RouteTrack } from './components/RouteTrack';
import { GhostTip } from './components/GhostTip';
import { KeySidebar } from './components/KeySidebar';
import { StatsPanel } from './components/StatsPanel';
import { CodeEditor } from './components/CodeEditor';
import { PuzzlePane } from './components/PuzzlePane';
import { SandboxPane } from './components/SandboxPane';
import { STEPS } from './data/steps';
import './App.css';

const STORAGE_KEY = 'tagsmiths-code';

type Mode = 'route' | 'puzzles' | 'sandbox';

function loadSavedCode(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function App() {
  const [mode, setMode] = useState<Mode>('route');
  const [code, setCode] = useState(loadSavedCode);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable (private window, etc.) — nothing to do
    }
  }, [code]);

  const handleAdvance = () => {
    setCurrent((c) => Math.min(c + 1, STEPS.length));
  };

  const handleReset = () => {
    setCode('');
  };

  const stepLabel = `${Math.min(current + 1, STEPS.length)} / ${STEPS.length}`;

  return (
    <div className="page">
      <header className="route-header">
        <h1>Tagsmiths — build your first page</h1>
        {mode === 'route' && (
          <>
            <RouteTrack current={current} onSelect={setCurrent} />
            <GhostTip current={current} code={code} onAdvance={handleAdvance} onReset={handleReset} />
          </>
        )}
        {mode === 'puzzles' && (
          <p className="mode-blurb">
            Each puzzle starts broken on purpose. Read the code, find what's wrong, and fix it.
          </p>
        )}
        {mode === 'sandbox' && (
          <p className="mode-blurb">
            No route, no checks — just a blank page to build whatever you want.
          </p>
        )}
      </header>

      <div className="body-wrap">
        <KeySidebar />

        <main className="main">
          <div className="tabs">
            <button className={`tab ${mode === 'route' ? 'active' : ''}`} onClick={() => setMode('route')}>
              route
            </button>
            <button className={`tab ${mode === 'puzzles' ? 'active' : ''}`} onClick={() => setMode('puzzles')}>
              fix this code
            </button>
            <button className={`tab ${mode === 'sandbox' ? 'active' : ''}`} onClick={() => setMode('sandbox')}>
              sandbox
            </button>
          </div>

          {mode === 'route' && (
            <>
              <div className="output-wrap">
                <span className="lbl">Output</span>
                <iframe title="preview" srcDoc={code} />
              </div>

              <div className="lower">
                <div className="editor-wrap">
                  <span className="lbl">Active coding window</span>
                  <CodeEditor value={code} onChange={setCode} />
                </div>
                <StatsPanel code={code} stepLabel={stepLabel} />
              </div>
            </>
          )}

          {mode === 'puzzles' && <PuzzlePane />}
          {mode === 'sandbox' && <SandboxPane />}
        </main>
      </div>
    </div>
  );
}

export default App;
