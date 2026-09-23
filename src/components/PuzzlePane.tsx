import { useEffect, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Puzzle, Difficulty } from '../data/puzzles';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { PreviewFrame } from './PreviewFrame';
import { useHintLadder, hintIndex, type AssistLevel } from '../lib/useHintLadder';
import { useSuccessFlash } from '../lib/useSuccessFlash';
import { loadSolvedPuzzles, markPuzzleSolved } from '../lib/puzzleProgress';
import { DIFFICULTY_VAR } from '../lib/difficulty';
import { AssistanceControl } from './AssistanceControl';

type Props = {
  puzzles: Puzzle[];
  basePath: string;
  assist: AssistLevel;
  onAssistChange: (level: AssistLevel) => void;
  onProgress?: () => void;
};

const TIERS: { id: Difficulty; label: string }[] = [
  { id: 'basic', label: 'basic' },
  { id: 'medium', label: 'medium' },
  { id: 'hard', label: 'hard' },
];

// A one-line taste of the broken tag itself, not just the puzzle's title —
// gives the list something to actually look at instead of plain text.
function snippet(broken: string): string {
  const line = broken.split('\n').find((l) => l.trim().length > 0) ?? '';
  const trimmed = line.trim();
  return trimmed.length > 34 ? trimmed.slice(0, 34) + '…' : trimmed;
}

export function PuzzlePane({ puzzles, basePath, assist, onAssistChange, onProgress }: Props) {
  const { item } = useParams<{ item?: string }>();
  const navigate = useNavigate();
  const findPuzzle = (id: string | undefined) => (id ? puzzles.find((p) => p.id === id) : undefined);
  const urlPuzzle = findPuzzle(item);

  const [selectedId, setSelectedId] = useState(urlPuzzle?.id ?? puzzles[0]?.id);
  const puzzle = puzzles.find((p) => p.id === selectedId);
  const [code, setCode] = useState(puzzle?.broken ?? '');
  const [solved, setSolved] = useState(false);
  const { attempts, registerFail, reset } = useHintLadder(puzzle?.id ?? 'none');
  const [justFailed, setJustFailed] = useState(false);
  const [flash, triggerFlash] = useSuccessFlash();
  const [solvedIds, setSolvedIds] = useState(loadSolvedPuzzles);

  // How many hints have been manually requested (click-to-reveal), on top
  // of whatever the assist level auto-reveals on a failed check — the
  // Assistance level only controls the passive, fail-triggered cadence;
  // an explicit "need a hint?" ask always works, at any level.
  const [revealedCount, setRevealedCount] = useState(0);

  // Two independent collapse layers: a whole difficulty tier can be
  // folded away, and — separately — the solved puzzles inside a tier
  // (which have nothing left to do) start tucked under their own toggle
  // so the visible list is mostly what's still unsolved.
  const [collapsedTiers, setCollapsedTiers] = useState<Set<Difficulty>>(new Set());
  const [openSolved, setOpenSolved] = useState<Set<Difficulty>>(new Set());
  const toggleTier = (id: Difficulty) => {
    setCollapsedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleSolved = (id: Difficulty) => {
    setOpenSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // A direct link to a specific puzzle (e.g. /solve/puzzles/missing-alt)
  // selects it on load, or when navigated to directly.
  useEffect(() => {
    const p = findPuzzle(item);
    if (!p || p.id === selectedId) return;
    setSelectedId(p.id);
    setCode(p.broken);
    setSolved(false);
    setJustFailed(false);
    setRevealedCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const selectPuzzle = (p: Puzzle) => {
    setSelectedId(p.id);
    setCode(p.broken);
    setSolved(false);
    setJustFailed(false);
    setRevealedCount(0);
    navigate(`${basePath}/${p.id}`);
  };

  const handleCheck = () => {
    if (!puzzle) return;
    if (puzzle.check(code)) {
      setSolved(true);
      setJustFailed(false);
      reset();
      triggerFlash();
      markPuzzleSolved(puzzle.id);
      setSolvedIds(loadSolvedPuzzles());
      onProgress?.();
    } else {
      registerFail();
      setJustFailed(true);
    }
  };

  const handleReset = () => {
    if (!puzzle) return;
    setCode(puzzle.broken);
    setSolved(false);
    setJustFailed(false);
    reset();
  };

  const autoIdx = puzzle ? hintIndex(attempts, assist) : -1;
  const shownIdx = Math.max(autoIdx, revealedCount - 1);
  const hint = puzzle && shownIdx >= 0 ? puzzle.hints[Math.min(shownIdx, puzzle.hints.length - 1)] : null;
  const hasMoreHints = puzzle ? shownIdx < puzzle.hints.length - 1 : false;
  const requestHint = () => setRevealedCount((c) => Math.max(c, shownIdx + 2));
  const showGenericRetry = attempts > 0 && assist === 1 && !hint;

  return (
    <div className="puzzle-pane">
      <div className="puzzle-list">
        {TIERS.map((t) => {
          const tPuzzlesNumbered = puzzles
            .map((p, i) => ({ p, num: i + 1 }))
            .filter(({ p }) => p.difficulty === t.id);
          const unsolved = tPuzzlesNumbered.filter(({ p }) => !solvedIds.has(p.id));
          const solvedList = tPuzzlesNumbered.filter(({ p }) => solvedIds.has(p.id));
          const tSolved = solvedList.length;
          const tierCollapsed = collapsedTiers.has(t.id);
          const solvedOpen = openSolved.has(t.id);

          const card = ({ p, num }: { p: Puzzle; num: number }) => (
            <button
              key={p.id}
              className={`tier-card ${p.id === selectedId ? 'active' : ''} ${
                solvedIds.has(p.id) ? 'solved' : ''
              }`}
              onClick={() => selectPuzzle(p)}
            >
              <span className="tier-card-check" aria-hidden="true">
                {solvedIds.has(p.id) ? '✓' : num}
              </span>
              <span className="tier-card-body">
                <span className="tier-card-title">{p.title}</span>
                <span className="tier-card-snip">{snippet(p.broken)}</span>
              </span>
            </button>
          );

          return (
            <div
              key={t.id}
              className="tier-section"
              style={{ '--tier-accent': DIFFICULTY_VAR[t.id] } as CSSProperties}
            >
              <button
                className="tier-section-label"
                onClick={() => toggleTier(t.id)}
                aria-expanded={!tierCollapsed}
              >
                <span className="tier-section-dot" />
                {t.label}
                <span className="tier-section-count">
                  {tPuzzlesNumbered.length > 0 ? `${tSolved}/${tPuzzlesNumbered.length}` : '0/0'}
                </span>
                <svg className="tier-chev" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 3.5 5 6.5 8 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {!tierCollapsed && (
                <>
                  {tPuzzlesNumbered.length === 0 ? (
                    <p className="puzzle-tier-empty">
                      Coming soon — {TIERS[0].label} is fully stocked, start there.
                    </p>
                  ) : (
                    <>
                      {unsolved.map(card)}
                      {solvedList.length > 0 && (
                        <div className="tier-solved-group">
                          <button className="tier-solved-toggle" onClick={() => toggleSolved(t.id)}>
                            <svg
                              className={`tier-chev ${solvedOpen ? 'open' : ''}`}
                              width="9"
                              height="9"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M2 3.5 5 6.5 8 3.5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {tSolved} solved
                          </button>
                          {solvedOpen && solvedList.map(card)}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {puzzle ? (
        <div className="puzzle-body">
          <div className="puzzle-prompt-row">
            <p className="puzzle-prompt">{puzzle.prompt}</p>
            <AssistanceControl value={assist} onChange={onAssistChange} light />
          </div>

          <EditorPanel
            label="active coding window"
            className={`code-panel puzzle-editor-wrap ${flash ? 'flash-success' : ''}`}
          >
            <CodeEditor value={code} onChange={setCode} />
          </EditorPanel>

          <EditorPanel label="output" className="output-panel puzzle-output">
            <PreviewFrame code={code} title="puzzle preview" />
          </EditorPanel>

          {solved ? (
            <p className="puzzle-solved">Fixed it. Nice debugging.</p>
          ) : (
            <>
              {hint && <p className={`hint ${justFailed ? 'flash' : ''}`}>{hint}</p>}
              {showGenericRetry && (
                <p className={`hint ${justFailed ? 'flash' : ''}`}>
                  Not quite yet — read the code closely and try again.
                </p>
              )}
              <div className="ghost-tip-actions">
                {hasMoreHints && (
                  <button className="btn btn-ghost hint-request-btn" onClick={requestHint}>
                    {hint ? 'Show another hint' : 'Need a hint?'}
                  </button>
                )}
                <button className="btn btn-secondary" onClick={handleReset}>
                  Reset this puzzle
                </button>
                <button className="btn btn-primary" onClick={handleCheck}>
                  Check my work
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="puzzle-body puzzle-empty-body">
          <p>Nothing here yet — pick basic on the left.</p>
        </div>
      )}
    </div>
  );
}
