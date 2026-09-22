import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InstructionsRail } from '../components/InstructionsRail';
import { KeySidebar } from '../components/KeySidebar';
import { StatsPanel } from '../components/StatsPanel';
import { DiagnosticsPanel } from '../components/DiagnosticsPanel';
import { CodeEditor } from '../components/CodeEditor';
import { EditorPanel } from '../components/EditorPanel';
import { PuzzlePane } from '../components/PuzzlePane';
import { SandboxPane } from '../components/SandboxPane';
import { ProjectPane } from '../components/ProjectPane';
import { MyProjectsPane } from '../components/MyProjectsPane';
import { NestPane } from '../components/NestPane';
import { PreviewFrame } from '../components/PreviewFrame';
import { Logo } from '../components/Logo';
import { STEPS } from '../data/steps';
import { PUZZLES } from '../data/puzzles';
import type { AssistLevel } from '../lib/useHintLadder';
import { useSuccessFlash } from '../lib/useSuccessFlash';
import { loadSolvedPuzzles } from '../lib/puzzleProgress';
import { countCompletedProjects } from '../lib/projectProgress';
import '../App.css';

function WrenchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.2 3.4a4 4 0 0 0-5.3 4.6L3 13v3h3l4.9-4.9a4 4 0 0 0 4.6-5.3l-2.8 2.8-2-2 2.8-2.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 7.5h7M6.5 10h7M6.5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 6a1.5 1.5 0 0 1 1.5-1.5h3.5l1.6 1.6H16A1.5 1.5 0 0 1 17.5 7.6v7.9A1.5 1.5 0 0 1 16 17H4A1.5 1.5 0 0 1 2.5 15.5V6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m9.2 10.8 6.3-6.3m0 0 2 2m-2-2-2.4 2.4m0 0 1.7 1.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STORAGE_KEY = 'tagsmiths-code';
const STEP_KEY = 'tagsmiths-step-v2'; // v2: route was condensed from 24 to 14 steps
const ASSIST_KEY = 'tagsmiths-assist';

type Mode = 'route' | 'solve' | 'sandbox' | 'myprojects' | 'nest';
type SolveSection = 'puzzles' | 'project';

// 'puzzles' and 'project' used to be their own top-level tabs, now merged
// under "solve this code" — old bookmarks/links to them still resolve
// correctly, just landing on the matching sub-section instead of 404ing.
function resolveMode(modeParam: string | undefined): Mode {
  if (modeParam === 'puzzles' || modeParam === 'project') return 'solve';
  if (
    modeParam === 'route' ||
    modeParam === 'solve' ||
    modeParam === 'sandbox' ||
    modeParam === 'myprojects' ||
    modeParam === 'nest'
  ) {
    return modeParam;
  }
  return 'route';
}

function resolveSolveSection(modeParam: string | undefined, subParam: string | undefined): SolveSection {
  if (modeParam === 'project' || subParam === 'project') return 'project';
  return 'puzzles';
}

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
  const { mode: modeParam, sub: subParam } = useParams<{ mode?: string; sub?: string }>();
  const navigate = useNavigate();
  const mode: Mode = resolveMode(modeParam);
  const solveSection: SolveSection = resolveSolveSection(modeParam, subParam);
  const setMode = (m: Mode) => navigate(`/html/website/${m}`);
  const setSolveSection = (s: SolveSection) => {
    navigate(`/html/website/solve/${s}`);
    setSwitcherOpen(false);
  };
  const [code, setCode] = useState(loadSavedCode);
  const [current, setCurrent] = useState(loadSavedStep);
  const [assist, setAssist] = useState<AssistLevel>(loadSavedAssist);
  const [keyOpen, setKeyOpen] = useState(false);
  const [flash, triggerFlash] = useSuccessFlash();
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [projectsDone, setProjectsDone] = useState(0);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // Recomputed whenever "solve this code" comes into view (mode switch, or
  // hopping between its fix/build sub-sections) — cheap enough not to need
  // finer-grained invalidation, and it's the picker cards above the active
  // pane, not something you're staring at mid-solve.
  useEffect(() => {
    if (mode !== 'solve') return;
    setPuzzlesSolved(loadSolvedPuzzles().size);
    setProjectsDone(countCompletedProjects().done);
  }, [mode, solveSection]);

  useEffect(() => {
    if (!switcherOpen) return;
    const close = () => setSwitcherOpen(false);
    // Deferred a tick so the click that opened it doesn't also close it.
    const id = window.setTimeout(() => window.addEventListener('click', close), 0);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('click', close);
    };
  }, [switcherOpen]);

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
          <button className={`tab ${mode === 'solve' ? 'active' : ''}`} onClick={() => setMode('solve')}>
            solve this code
          </button>
          <button className={`tab ${mode === 'sandbox' ? 'active' : ''}`} onClick={() => setMode('sandbox')}>
            sandbox
          </button>
          <button className={`tab ${mode === 'nest' ? 'active' : ''}`} onClick={() => setMode('nest')}>
            nest
          </button>
        </nav>

        <div className="topbar-actions">
          <button
            className={`topbar-action ${mode === 'myprojects' ? 'active' : ''}`}
            onClick={() => setMode('myprojects')}
          >
            <FolderIcon />
            <span>my projects</span>
          </button>
          <button
            className={`topbar-action ${keyOpen ? 'active' : ''}`}
            onClick={() => setKeyOpen((v) => !v)}
          >
            <KeyIcon />
            <span>key index</span>
          </button>
        </div>
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
                onSuccess={triggerFlash}
                onAssistChange={setAssist}
              />

              <div className="workspace-main">
                <div className="lower">
                  <EditorPanel
                    label="active coding window"
                    className={`code-panel ${flash ? 'flash-success' : ''}`}
                  >
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

          {mode === 'solve' && (
            <>
              <div className="solve-switcher">
                <button
                  className={`solve-breadcrumb ${switcherOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwitcherOpen((v) => !v);
                  }}
                >
                  solve this code /{' '}
                  <b>{solveSection === 'puzzles' ? 'fix this code' : 'build this code'}</b>
                  <svg className="chev" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 3.5 5 6.5 8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {switcherOpen && (
                  <div className="solve-switch-menu" onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`solve-switch-item ${solveSection === 'puzzles' ? 'current' : ''}`}
                      onClick={() => setSolveSection('puzzles')}
                    >
                      <span className="solve-switch-item-icon">
                        <WrenchIcon />
                      </span>
                      <span className="solve-switch-item-body">
                        <span className="solve-switch-item-title">fix this code</span>
                        <span className="solve-switch-item-sub">
                          {puzzlesSolved}/{PUZZLES.length} solved
                        </span>
                      </span>
                      {solveSection === 'puzzles' && <span className="solve-switch-item-check">✓</span>}
                    </button>
                    <button
                      className={`solve-switch-item ${solveSection === 'project' ? 'current' : ''}`}
                      onClick={() => setSolveSection('project')}
                    >
                      <span className="solve-switch-item-icon">
                        <BlueprintIcon />
                      </span>
                      <span className="solve-switch-item-body">
                        <span className="solve-switch-item-title">build this code</span>
                        <span className="solve-switch-item-sub">{projectsDone}/3 done</span>
                      </span>
                      {solveSection === 'project' && <span className="solve-switch-item-check">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              <div className="solve-hero">
                <span className="solve-hero-icon">
                  {solveSection === 'puzzles' ? <WrenchIcon /> : <BlueprintIcon />}
                </span>
                <span className="solve-hero-body">
                  <span className="solve-hero-title">
                    {solveSection === 'puzzles' ? 'fix this code' : 'build this code'}
                  </span>
                  <span className="solve-hero-desc">
                    {solveSection === 'puzzles'
                      ? "Broken HTML, on purpose. Find what's wrong and repair it."
                      : 'A brief and a checklist. Build the page yourself, in any order.'}
                  </span>
                </span>
                <span className="solve-hero-stat">
                  <span className="solve-hero-stat-num">
                    {solveSection === 'puzzles' ? `${puzzlesSolved}/${PUZZLES.length}` : `${projectsDone}/3`}
                  </span>
                  <span className="solve-hero-stat-lbl">
                    {solveSection === 'puzzles' ? 'solved' : 'done'}
                  </span>
                </span>
              </div>

              {solveSection === 'puzzles' ? <PuzzlePane assist={assist} /> : <ProjectPane />}
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

          {mode === 'myprojects' && (
            <>
              <p className="mode-blurb">
                Your own saved projects — name them, come back to them, delete them. Start blank here,
                or save a copy over from Sandbox.
              </p>
              <MyProjectsPane />
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
