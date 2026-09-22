import { useEffect, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Puzzle, Difficulty } from '../data/puzzles';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { PreviewFrame } from './PreviewFrame';
import { useHintLadder, getHint, type AssistLevel } from '../lib/useHintLadder';
import { useSuccessFlash } from '../lib/useSuccessFlash';
import { loadSolvedPuzzles, markPuzzleSolved } from '../lib/puzzleProgress';
import { DIFFICULTY_VAR } from '../lib/difficulty';
import { AssistanceControl } from './AssistanceControl';

type Props = {
  puzzles: Puzzle[];
  basePath: string;
  assist: AssistLevel;
  onAssistChange: (level: AssistLevel) => void;
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

export function PuzzlePane({ puzzles, basePath, assist, onAssistChange }: Props) {
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

  // A direct link to a specific puzzle (e.g. /solve/puzzles/missing-alt)
  // selects it on load, or when navigated to directly.
  useEffect(() => {
    const p = findPuzzle(item);
    if (!p || p.id === selectedId) return;
    setSelectedId(p.id);
    setCode(p.broken);
    setSolved(false);
    setJustFailed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const selectPuzzle = (p: Puzzle) => {
    setSelectedId(p.id);
    setCode(p.broken);
    setSolved(false);
    setJustFailed(false);
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

  const hint = puzzle ? getHint(puzzle.hints, attempts, assist) : null;
  const showGenericRetry = attempts > 0 && assist === 1;

  return (
    <div className="puzzle-pane">
      <div className="puzzle-list">
        {TIERS.map((t) => {
          const tPuzzles = puzzles.filter((p) => p.difficulty === t.id);
          const tSolved = tPuzzles.filter((p) => solvedIds.has(p.id)).length;
          return (
            <div
              key={t.id}
              className="tier-section"
              style={{ '--tier-accent': DIFFICULTY_VAR[t.id] } as CSSProperties}
            >
              <div className="tier-section-label">
                <span className="tier-section-dot" />
                {t.label}
                <span className="tier-section-count">
                  {tPuzzles.length > 0 ? `${tSolved}/${tPuzzles.length}` : '0/0'}
                </span>
              </div>

              {tPuzzles.length === 0 ? (
                <p className="puzzle-tier-empty">
                  Coming soon — {TIERS[0].label} is fully stocked, start there.
                </p>
              ) : (
                tPuzzles.map((p, i) => (
                  <button
                    key={p.id}
                    className={`tier-card ${p.id === selectedId ? 'active' : ''} ${
                      solvedIds.has(p.id) ? 'solved' : ''
                    }`}
                    onClick={() => selectPuzzle(p)}
                  >
                    <span className="tier-card-check" aria-hidden="true">
                      {solvedIds.has(p.id) ? '✓' : i + 1}
                    </span>
                    <span className="tier-card-body">
                      <span className="tier-card-title">{p.title}</span>
                      <span className="tier-card-snip">{snippet(p.broken)}</span>
                    </span>
                  </button>
                ))
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
