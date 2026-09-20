import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstructionsRail } from '../components/InstructionsRail';
import { KeySidebar } from '../components/KeySidebar';
import { StatsPanel } from '../components/StatsPanel';
import { DiagnosticsPanel } from '../components/DiagnosticsPanel';
import { CodeEditor } from '../components/CodeEditor';
import { EditorPanel } from '../components/EditorPanel';
import { PuzzlePane } from '../components/PuzzlePane';
import { SandboxPane } from '../components/SandboxPane';
import { ProjectPane } from '../components/ProjectPane';
import { NestPane } from '../components/NestPane';
import { PreviewFrame } from '../components/PreviewFrame';
import { Logo } from '../components/Logo';
import { STEPS } from '../data/steps';
import type { AssistLevel } from '../lib/useHintLadder';
import '../App.css';

const STORAGE_KEY = 'tagsmiths-code';
const STEP_KEY = 'tagsmiths-step-v2'; // v2: route was condensed from 24 to 14 steps
const ASSIST_KEY = 'tagsmiths-assist';

type Mode = 'route' | 'puzzles' | 'project' | 'sandbox' | 'nest';

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

function loadSavedAssist(): AssistLevel {
  try {
    const raw = Number(localStorage.getItem(ASSIST_KEY));
    return raw === 1 || raw === 2 || raw === 3 ? raw : 2;
  } catch {
    return 2;
  }
}

export default function Workspace() {
  const [mode, setMode] = useState<Mode>('route');
  const [code, setCode] = useState(loadSavedCode);
  const [current, setCurrent] = useState(loadSavedStep);
  const [assist, setAssist] = useState<AssistLevel>(loadSavedAssist);
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

  useEffect(() => {
    try {
      localStorage.setItem(ASSIST_KEY, String(assist));
    } catch {
      // storage unavailable — nothing to do
    }
  }, [assist]);

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
          <button className={`tab ${mode === 'project' ? 'active' : ''}`} onClick={() => setMode('project')}>
            project
          </button>
          <button className={`tab ${mode === 'sandbox' ? 'active' : ''}`} onClick={() => setMode('sandbox')}>
            sandbox
          </button>
          <button className={`tab ${mode === 'nest' ? 'active' : ''}`} onClick={() => setMode('nest')}>
            the nest
          </button>
        </nav>

        <button className="key-toggle" onClick={() => setKeyOpen((v) => !v)}>
          key index
        </button>
      </header>

      <div className="workspace">
        <main className="main">
          {mode === 'route' && (
            <div className="workspace-grid">
              <InstructionsRail
                current={current}
                code={code}
                assist={assist}
                onSelect={setCurrent}
                onAdvance={handleAdvance}
                onReset={handleReset}
                onAssistChange={setAssist}
              />

              <div className="workspace-main">
                <div className="lower">
                  <EditorPanel label="active coding window" className="code-panel">
                    <CodeEditor value={code} onChange={setCode} />
                  </EditorPanel>
                  <StatsPanel code={code} stepLabel={stepLabel} />
                </div>

                <EditorPanel label="output" className="output-panel">
                  <PreviewFrame code={code} title="preview" />
                </EditorPanel>

                <DiagnosticsPanel code={code} />
              </div>
            </div>
          )}

          {mode === 'puzzles' && (
            <>
              <p className="mode-blurb">
                Each puzzle starts broken on purpose. Read the code, find what's wrong, and fix it.
              </p>
              <PuzzlePane assist={assist} />
            </>
          )}

          {mode === 'project' && <ProjectPane />}

          {mode === 'sandbox' && (
            <>
              <p className="mode-blurb">
                No route, no checks — just a blank page to build whatever you want.
              </p>
              <SandboxPane />
            </>
          )}

          {mode === 'nest' && (
            <>
              <p className="mode-blurb">
                The deep dive. Key index is quick lookup; this is where a tag gets explained —
                what it does, exactly where it goes, and the mistakes people actually make with it.
              </p>
              <NestPane />
            </>
          )}
        </main>

        <KeySidebar open={keyOpen} onClose={() => setKeyOpen(false)} />
      </div>
    </div>
  );
}
