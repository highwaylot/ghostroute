import { useEffect, useState } from 'react';
import { RouteTrack } from './components/RouteTrack';
import { GhostTip } from './components/GhostTip';
import { ChapterIntro } from './components/ChapterIntro';
import { KeySidebar } from './components/KeySidebar';
import { StatsPanel } from './components/StatsPanel';
import { CodeEditor } from './components/CodeEditor';
import { EditorPanel } from './components/EditorPanel';
import { PuzzlePane } from './components/PuzzlePane';
import { SandboxPane } from './components/SandboxPane';
import { Logo } from './components/Logo';
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
  const [keyOpen, setKeyOpen] = useState(false);

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
    <div className="app">
      <header className="topbar">
        <div className="brand-row">
          <Logo size={20} />
        </div>

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
            <>
              <section className="route-panel">
                <ChapterIntro current={current} />
                <RouteTrack current={current} onSelect={setCurrent} />
                <GhostTip current={current} code={code} onAdvance={handleAdvance} onReset={handleReset} />
              </section>

              <EditorPanel label="output" className="output-panel">
                <iframe title="preview" srcDoc={code} />
              </EditorPanel>

              <div className="lower">
                <EditorPanel label="active coding window" className="code-panel">
                  <CodeEditor value={code} onChange={setCode} />
                </EditorPanel>
                <StatsPanel code={code} stepLabel={stepLabel} />
              </div>
            </>
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

export default App;
