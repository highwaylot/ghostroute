import { useEffect, useState } from 'react';
import { RouteTrack } from './components/RouteTrack';
import { GhostTip } from './components/GhostTip';
import { KeySidebar } from './components/KeySidebar';
import { StatsPanel } from './components/StatsPanel';
import { STEPS } from './data/steps';
import './App.css';

const STORAGE_KEY = 'ghost-route-code';

function loadSavedCode(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function App() {
  const [code, setCode] = useState(loadSavedCode);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable (private window, etc.) — nothing to do
    }
  }, [code]);

  const handleInsert = () => {
    const step = STEPS[current];
    if (!step) return;
    setCode((prev) => prev + (prev && !prev.endsWith('\n') ? '\n' : '') + step.insert);
    setCurrent((c) => Math.min(c + 1, STEPS.length));
  };

  const stepLabel = `${Math.min(current + 1, STEPS.length)} / ${STEPS.length}`;

  return (
    <div className="page">
      <header className="route-header">
        <h1>Ghost Route — build your first page</h1>
        <RouteTrack current={current} onSelect={setCurrent} />
        <GhostTip current={current} onInsert={handleInsert} />
      </header>

      <div className="body-wrap">
        <KeySidebar />

        <main className="main">
          <div className="tabs">
            <button className="tab active">html</button>
            <button className="tab" disabled>
              css (soon)
            </button>
            <button className="tab" disabled>
              js (soon)
            </button>
          </div>

          <div className="output-wrap">
            <span className="lbl">Output</span>
            <iframe title="preview" srcDoc={code} />
          </div>

          <div className="lower">
            <div className="editor-wrap">
              <span className="lbl">Active coding window</span>
              <textarea
                spellCheck={false}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <StatsPanel code={code} stepLabel={stepLabel} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
