import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { InstructionsRail } from '../components/InstructionsRail';
import { KeySidebar } from '../components/KeySidebar';
import { StatsPanel } from '../components/StatsPanel';
import { DiagnosticsPanel } from '../components/DiagnosticsPanel';
import { QuickfirePane } from '../components/QuickfirePane';
import { QUICKFIRE_ENABLED } from '../lib/env';
import { clearSolvedPuzzles } from '../lib/puzzleProgress';
import { PROJECT_STORAGE_PREFIX } from '../lib/projectProgress';
import { CodeEditor } from '../components/CodeEditor';
import { EditorPanel } from '../components/EditorPanel';
import { PuzzlePane } from '../components/PuzzlePane';
import { SandboxPane } from '../components/SandboxPane';
import { ProjectPane } from '../components/ProjectPane';
import { MyProjectsPane } from '../components/MyProjectsPane';
import { NestPane } from '../components/NestPane';
import { SettingsMenu } from '../components/SettingsMenu';
import { usePageMeta } from '../lib/pageMeta';
import { useTheme } from '../lib/ThemeContext';
import { KEY_INDEX, KEY_CATEGORIES } from '../data/keyIndex';
import { getNestEntry } from '../data/nest';
import { BLUEPRINTS } from '../data/blueprints';
import { CSS_KEY_INDEX, CSS_KEY_CATEGORIES, getCssNestEntry } from '../data/cssNest';
import { EMAIL_KEY_INDEX, EMAIL_KEY_CATEGORIES, getEmailNestEntry } from '../data/emailNest';
import { PreviewFrame } from '../components/PreviewFrame';
import { Logo } from '../components/Logo';
import { STEPS } from '../data/steps';
import { CHAPTERS } from '../data/chapters';
import { CSS_STEPS, CSS_STARTER } from '../data/cssSteps';
import { CSS_CHAPTERS } from '../data/cssChapters';
import { EMAIL_STEPS, EMAIL_STARTER } from '../data/emailSteps';
import { EMAIL_CHAPTERS } from '../data/emailChapters';
import { PUZZLES } from '../data/puzzles';
import { PROJECTS } from '../data/projects';
import { CSS_PUZZLES } from '../data/cssPuzzles';
import { CSS_PROJECTS } from '../data/cssProjects';
import { EMAIL_PUZZLES } from '../data/emailPuzzles';
import { EMAIL_PROJECTS } from '../data/emailProjects';
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

const ASSIST_KEY = 'tagsmiths-assist';

type Mode = 'route' | 'solve' | 'sandbox' | 'myprojects' | 'nest' | 'quickfire';
type SolveSection = 'puzzles' | 'project';
type Track = 'html' | 'css' | 'email';

// One place per track for everything that varies by track — its Route
// content, its starter code, its storage keys, its puzzle/project sets
// (when it has them), and the URL prefix it lives under. Adding a track
// (JS, eventually) means adding one entry here, not touching logic
// scattered through the component.
const TRACK_CONFIG = {
  html: {
    basePath: '/html/website',
    steps: STEPS,
    chapters: CHAPTERS,
    starter: '',
    codeKey: 'tagsmiths-code',
    stepKey: 'tagsmiths-step-v3', // v2: route was condensed from 24 to 14 steps; v3: a 'first win' step was inserted at index 0 (migrated below)
    puzzles: PUZZLES,
    projects: PROJECTS,
    nestLabel: 'the html book',
    nestKeyIndex: KEY_INDEX,
    nestCategories: KEY_CATEGORIES,
    nestGetEntry: getNestEntry,
    nestBlueprints: BLUEPRINTS,
  },
  css: {
    basePath: '/css/website',
    steps: CSS_STEPS,
    chapters: CSS_CHAPTERS,
    starter: CSS_STARTER,
    codeKey: 'tagsmiths-css-code',
    stepKey: 'tagsmiths-css-step',
    puzzles: CSS_PUZZLES,
    projects: CSS_PROJECTS,
    nestLabel: 'the css book',
    nestKeyIndex: CSS_KEY_INDEX,
    nestCategories: CSS_KEY_CATEGORIES,
    nestGetEntry: getCssNestEntry,
    nestBlueprints: undefined,
  },
  email: {
    basePath: '/html/email',
    steps: EMAIL_STEPS,
    chapters: EMAIL_CHAPTERS,
    starter: EMAIL_STARTER,
    codeKey: 'tagsmiths-email-code',
    stepKey: 'tagsmiths-email-step',
    puzzles: EMAIL_PUZZLES,
    projects: EMAIL_PROJECTS,
    nestLabel: 'the email book',
    nestKeyIndex: EMAIL_KEY_INDEX,
    nestCategories: EMAIL_KEY_CATEGORIES,
    nestGetEntry: getEmailNestEntry,
    nestBlueprints: undefined,
  },
} as const;

function trackFromPath(pathname: string): Track {
  if (pathname.startsWith('/css')) return 'css';
  if (pathname.startsWith('/html/email')) return 'email';
  return 'html';
}

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
    modeParam === 'nest' ||
    (modeParam === 'quickfire' && QUICKFIRE_ENABLED)
  ) {
    return modeParam;
  }
  return 'route';
}

function resolveSolveSection(modeParam: string | undefined, subParam: string | undefined): SolveSection {
  if (modeParam === 'project' || subParam === 'project') return 'project';
  return 'puzzles';
}

function loadSavedCode(track: Track): string {
  const cfg = TRACK_CONFIG[track];
  try {
    return localStorage.getItem(cfg.codeKey) ?? cfg.starter;
  } catch {
    return cfg.starter;
  }
}

// One-time migration: the HTML route gained a step at index 0, so a learner
// saved under the old key resumes one index later and keeps their place.
function migrateHtmlStepKey() {
  try {
    if (localStorage.getItem('tagsmiths-step-v3') !== null) return;
    const old = localStorage.getItem('tagsmiths-step-v2');
    if (old === null) return;
    const n = Number(old);
    if (Number.isFinite(n) && n >= 0) localStorage.setItem('tagsmiths-step-v3', String(n + 1));
  } catch {
    // storage unavailable — nothing to migrate
  }
}

function loadSavedStep(track: Track): number {
  const cfg = TRACK_CONFIG[track];
  if (track === 'html') migrateHtmlStepKey();
  try {
    const raw = Number(localStorage.getItem(cfg.stepKey));
    return Number.isFinite(raw) && raw >= 0 ? Math.min(raw, cfg.steps.length) : 0;
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
  const location = useLocation();
  const track: Track = trackFromPath(location.pathname);
  const trackConfig = TRACK_CONFIG[track];
  const basePath = trackConfig.basePath;
  const trackName = track === 'html' ? 'HTML website' : track === 'css' ? 'CSS website' : 'HTML email';
  const MODE_NAME: Record<string, string> = { route: 'route', solve: 'solve this code', sandbox: 'sandbox', nest: 'nest', myprojects: 'my projects', quickfire: 'quickfire' };
  const TRACK_DESC: Record<Track, string> = {
    html: 'Learn HTML by building a real web page one tag at a time, in an editor that shows the result as you type.',
    css: 'Learn CSS by styling a real page: selectors, the box model, flexbox, grid and responsive layout, with a live preview.',
    email: 'Learn to build HTML emails that survive Gmail and Outlook: table layouts, inline styles and the quirks of each inbox.',
  };
  const steps = trackConfig.steps;
  const chapters = trackConfig.chapters;
  const trackPuzzles = trackConfig.puzzles;
  const trackProjects = trackConfig.projects;
  const mode: Mode = resolveMode(modeParam);
  const pageHeading = `${trackName}: ${MODE_NAME[mode] ?? mode}`;
  usePageMeta({
    title: mode === 'route' ? `${trackName} · tagsmiths` : `${MODE_NAME[mode] ?? mode} · ${trackName} · tagsmiths`,
    description: TRACK_DESC[track],
    // Every pane of a track is canonically the track itself: the panes are
    // tools inside one lesson, not separate pages worth indexing.
    path: basePath,
  });
  const solveSection: SolveSection = resolveSolveSection(modeParam, subParam);
  const setMode = (m: Mode) => navigate(`${basePath}/${m}`);
  const [code, setCode] = useState(() => loadSavedCode(track));
  const [current, setCurrent] = useState(() => loadSavedStep(track));
  const [assist, setAssist] = useState<AssistLevel>(loadSavedAssist);
  const prevTrack = useRef(track);
  useEffect(() => {
    if (track === prevTrack.current) return;
    prevTrack.current = track;
    setCode(loadSavedCode(track));
    setCurrent(loadSavedStep(track));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);
  const [keyOpen, setKeyOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [flash, triggerFlash] = useSuccessFlash();
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [projectsDone, setProjectsDone] = useState(0);

  // Which accordion section (if any) is open — independent of the URL's
  // solveSection, which only tracks "last section a link pointed at."
  // A bare arrival at "solve this code" (no sub-route) starts with both
  // collapsed, per spec; a direct link to a puzzle/project opens its
  // section. Reset only fires when *entering* solve mode fresh, not on
  // every render, so toggling doesn't fight this.
  const [expandedSection, setExpandedSection] = useState<SolveSection | null>(
    subParam ? solveSection : null,
  );
  const prevMode = useRef(mode);
  useEffect(() => {
    if (mode === 'solve' && prevMode.current !== 'solve') {
      setExpandedSection(subParam ? solveSection : null);
    }
    prevMode.current = mode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Each header is an independent light switch: click the open one to
  // collapse it (leaving both closed is a valid state), click the closed
  // one to open it and close the other.
  const toggleSection = (s: SolveSection) => {
    if (expandedSection === s) {
      setExpandedSection(null);
      navigate(`${basePath}/solve`);
    } else {
      setExpandedSection(s);
      navigate(`${basePath}/solve/${s}`);
    }
  };

  // Recomputed whenever "solve this code" comes into view (mode switch, or
  // toggling either accordion section) — cheap enough not to need
  // finer-grained invalidation, and it's the header stat, not something
  // you're staring at mid-solve.
  useEffect(() => {
    if (mode !== 'solve' || !trackPuzzles || !trackProjects) return;
    const solved = loadSolvedPuzzles();
    setPuzzlesSolved(trackPuzzles.filter((p) => solved.has(p.id)).length);
    setProjectsDone(countCompletedProjects(trackProjects).done);
  }, [mode, expandedSection, trackPuzzles, trackProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(trackConfig.codeKey, code);
    } catch {
      // storage unavailable (private window, etc.) — nothing to do
    }
  }, [code, trackConfig.codeKey]);

  useEffect(() => {
    try {
      localStorage.setItem(trackConfig.stepKey, String(current));
    } catch {
      // storage unavailable — nothing to do
    }
  }, [current, trackConfig.stepKey]);

  useEffect(() => {
    try {
      localStorage.setItem(ASSIST_KEY, String(assist));
    } catch {
      // storage unavailable — nothing to do
    }
  }, [assist]);

  const handleAdvance = () => {
    setCurrent((c) => Math.min(c + 1, steps.length));
  };

  const handleReset = () => {
    setCode(trackConfig.starter);
  };

  // Settings → "restart this route": position and code for this track only.
  // The persistence effects write the fresh values straight back.
  const handleRestartRoute = () => {
    setCurrent(0);
    setCode(trackConfig.starter);
    setMode('route');
  };

  // Settings → "Restart Fully": everything saved for THIS track — route
  // position and code, solved puzzles, project code, quickfire best — and
  // nothing else. Other tracks, the sandbox, my projects, theme and sound
  // are untouched. A full reload afterwards so no mounted pane writes a
  // stale copy back.
  const handleRestartTrack = () => {
    try {
      localStorage.removeItem(trackConfig.codeKey);
      localStorage.removeItem(trackConfig.stepKey);
      localStorage.removeItem(`tagsmiths-quickfire-best-${track}`);
      for (const p of trackConfig.projects ?? []) localStorage.removeItem(PROJECT_STORAGE_PREFIX + p.id);
      clearSolvedPuzzles((trackConfig.puzzles ?? []).map((p) => p.id));
      for (const p of trackConfig.puzzles ?? []) localStorage.removeItem(`tagsmiths-puzzle-${p.id}`);
    } catch {
      // storage unavailable — nothing was saved in the first place
    }
    window.location.assign(`${basePath}/route`);
  };

  const stepLabel = `${Math.min(current + 1, steps.length)} / ${steps.length}`;

  const routeCompleteMessage =
    track === 'css'
      ? "Route complete for now — more CSS chapters are on the way. Try Sandbox to keep styling freely in the meantime."
      : track === 'email'
        ? "Route complete — you've hardened a small promo email against the way real clients render. Try solve this code to test what stuck, or build one from scratch there."
        : "Route complete — you've written a full page: structure, text, lists, links, media, grouping, and semantic layout. That's real, usable HTML. Try solve this code to test what stuck and build a page from scratch, or the sandbox to build freely.";

  return (
    <div className="app">
      <a className="skip-link" href="#workspace-main">
        Skip to the lesson
      </a>
      <header className="topbar">
        <Link to="/" className="brand-row" aria-label="tagsmiths home">
          <Logo size={20} />
        </Link>

        <nav className="tabs">
          <button className={`tab ${mode === 'route' ? 'active' : ''}`} aria-current={mode === 'route' ? 'page' : undefined} onClick={() => setMode('route')}>
            route
          </button>
          <button className={`tab ${mode === 'solve' ? 'active' : ''}`} aria-current={mode === 'solve' ? 'page' : undefined} onClick={() => setMode('solve')}>
            <span className="tab-long">solve this code</span>
            <span className="tab-short">solve</span>
          </button>
          <button className={`tab ${mode === 'sandbox' ? 'active' : ''}`} aria-current={mode === 'sandbox' ? 'page' : undefined} onClick={() => setMode('sandbox')}>
            sandbox
          </button>
          <button className={`tab ${mode === 'nest' ? 'active' : ''}`} aria-current={mode === 'nest' ? 'page' : undefined} onClick={() => setMode('nest')}>
            nest
          </button>
          {QUICKFIRE_ENABLED && (
            <button className={`tab ${mode === 'quickfire' ? 'active' : ''}`} aria-current={mode === 'quickfire' ? 'page' : undefined} onClick={() => setMode('quickfire')}>
              quickfire
            </button>
          )}
        </nav>

        <div className="topbar-actions">
          <button
            className={`topbar-action ${mode === 'myprojects' ? 'active' : ''}`}
            onClick={() => setMode('myprojects')}
            aria-label="My projects"
            title="My projects"
          >
            <FolderIcon />
            <span>my projects</span>
          </button>
          <button
            className={`topbar-action ${keyOpen ? 'active' : ''}`}
            onClick={() => setKeyOpen((v) => !v)}
            aria-label="Key index"
            aria-expanded={keyOpen}
            title="Key index"
          >
            <KeyIcon />
            <span>key index</span>
          </button>
          <SettingsMenu
            theme={theme}
            onToggleTheme={toggleTheme}
            onRestartRoute={handleRestartRoute}
            onRestartTrack={handleRestartTrack}
            routeLabel={track === 'html' ? 'html' : track === 'css' ? 'css' : 'email template'}
          />
        </div>
      </header>

      <div className="workspace">
        <main className="main" id="workspace-main" tabIndex={-1}>
          {/* One heading per page, for screen readers and search: the visible
              layout already says where you are, so this one is hidden. */}
          {/* The Nest renders its own h1 (the entry being read). */}
          {mode !== 'nest' && <h1 className="sr-only">{pageHeading}</h1>}
          {mode === 'route' && (
            <div className="workspace-grid">
              <InstructionsRail
                steps={steps}
                chapters={chapters}
                completeMessage={routeCompleteMessage}
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
                    <CodeEditor value={code} onChange={setCode} label={`${trackName} route code editor`} />
                  </EditorPanel>
                  <StatsPanel code={code} stepLabel={stepLabel} />
                </div>

                <EditorPanel label="output" className="output-panel">
                  <PreviewFrame code={code} title="preview" />
                </EditorPanel>

                <DiagnosticsPanel code={code} context="route" />
              </div>
            </div>
          )}

          {mode === 'solve' && (!trackPuzzles || !trackProjects) && (
            <p className="mode-blurb">
              No puzzles or projects yet for this track. Try the sandbox to practice freely.
            </p>
          )}

          {mode === 'solve' && trackPuzzles && trackProjects && (
            <>
              <div className="solve-mini-hub">
                <span className="solve-mini-hub-label">your progress</span>
                <span className="solve-mini-hub-bar">
                  <span
                    className="solve-mini-hub-bar-fill"
                    style={{
                      width: `${((puzzlesSolved + projectsDone) / (trackPuzzles.length + trackProjects.length)) * 100}%`,
                    }}
                  />
                </span>
                <span className="solve-mini-hub-stat">
                  {puzzlesSolved + projectsDone}/{trackPuzzles.length + trackProjects.length} solved
                </span>
              </div>

              <div className="solve-accordion">
              {/* Both panes stay mounted at all times — collapsing a section
                  only hides it visually (CSS grid-rows), it never unmounts
                  the component. That means there is no code path where
                  opening the other tab can lose in-progress code: nothing
                  is ever torn down to make room for it. */}
              <div className={`accordion-section ${expandedSection === 'puzzles' ? 'expanded' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => toggleSection('puzzles')}
                  aria-expanded={expandedSection === 'puzzles'}
                >
                  <span className="accordion-header-icon">
                    <WrenchIcon />
                  </span>
                  <span className="accordion-header-body">
                    <span className="accordion-header-title">fix this code</span>
                    <span className="accordion-header-desc">
                      Broken HTML, on purpose. Find what's wrong and repair it.
                    </span>
                  </span>
                  <span className="accordion-header-stat">
                    <span className="accordion-header-stat-num">
                      {puzzlesSolved}/{trackPuzzles.length}
                    </span>
                    <span className="accordion-header-stat-lbl">solved</span>
                  </span>
                  <svg className="accordion-chev" width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 3.5 5 6.5 8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    {/* Keyed by track: Workspace itself doesn't remount when the
                        URL prefix changes (see the prevTrack effect above), so
                        without this the pane keeps the previous track's
                        selected puzzle id and its collapsed-tier state. */}
                    <PuzzlePane
                      key={track}
                      puzzles={trackPuzzles}
                      basePath={`${basePath}/solve/puzzles`}
                      assist={assist}
                      onAssistChange={setAssist}
                      onProgress={() =>
                        setPuzzlesSolved(trackPuzzles.filter((p) => loadSolvedPuzzles().has(p.id)).length)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={`accordion-section ${expandedSection === 'project' ? 'expanded' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => toggleSection('project')}
                  aria-expanded={expandedSection === 'project'}
                >
                  <span className="accordion-header-icon">
                    <BlueprintIcon />
                  </span>
                  <span className="accordion-header-body">
                    <span className="accordion-header-title">build this code</span>
                    <span className="accordion-header-desc">
                      A brief and a checklist. Build the page yourself, in any order.
                    </span>
                  </span>
                  <span className="accordion-header-stat">
                    <span className="accordion-header-stat-num">{projectsDone}/{trackProjects.length}</span>
                    <span className="accordion-header-stat-lbl">done</span>
                  </span>
                  <svg className="accordion-chev" width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 3.5 5 6.5 8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <ProjectPane
                      key={track}
                      projects={trackProjects}
                      basePath={`${basePath}/solve/project`}
                      onProgress={() => setProjectsDone(countCompletedProjects(trackProjects).done)}
                    />
                  </div>
                </div>
              </div>
              </div>
            </>
          )}

          {mode === 'quickfire' && QUICKFIRE_ENABLED && (
            <QuickfirePane
              key={track}
              steps={steps}
              chapters={chapters}
              passedCount={current}
              storageKey={`tagsmiths-quickfire-best-${track}`}
              onGoToRoute={() => setMode('route')}
            />
          )}

          {mode === 'sandbox' && (
            <>
              <p className="mode-blurb">
                No route, no checks — just a blank page to build whatever you want.
              </p>
              <SandboxPane sandboxPath={`${basePath}/sandbox`} />
            </>
          )}

          {mode === 'myprojects' && (
            <>
              <p className="mode-blurb">
                Your own saved projects — name them, come back to them, delete them. Start blank here,
                or save a copy over from Sandbox.
              </p>
              <MyProjectsPane sandboxPath={`${basePath}/sandbox`} />
            </>
          )}

          {mode === 'nest' && (
            <>
              <p className="mode-blurb">
                The deep dive. Key index is quick lookup; this is where a tag gets explained —
                what it does, exactly where it goes, and the mistakes people actually make with it.
              </p>
              <NestPane
                bookLabel={trackConfig.nestLabel}
                keyIndex={trackConfig.nestKeyIndex}
                categories={trackConfig.nestCategories}
                getEntry={trackConfig.nestGetEntry}
                blueprints={trackConfig.nestBlueprints}
              />
            </>
          )}
        </main>

        <KeySidebar open={keyOpen} onClose={() => setKeyOpen(false)} />
      </div>
    </div>
  );
}
