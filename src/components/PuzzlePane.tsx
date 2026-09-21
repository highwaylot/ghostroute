import { useState } from 'react';
import { PUZZLES, type Difficulty } from '../data/puzzles';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { PreviewFrame } from './PreviewFrame';
import { useHintLadder, getHint, type AssistLevel } from '../lib/useHintLadder';
import { useSuccessFlash } from '../lib/useSuccessFlash';

type Props = {
  assist: AssistLevel;
};

const TIERS: { id: Difficulty; label: string }[] = [
  { id: 'basic', label: 'basic' },
  { id: 'medium', label: 'medium' },
  { id: 'hard', label: 'hard' },
];

export function PuzzlePane({ assist }: Props) {
  const [tier, setTier] = useState<Difficulty>('basic');
  const tierPuzzles = PUZZLES.filter((p) => p.difficulty === tier);
  const [index, setIndex] = useState(0);
  const puzzle = tierPuzzles[index];
  const [code, setCode] = useState(puzzle?.broken ?? '');
  const [solved, setSolved] = useState(false);
  const { attempts, registerFail, reset } = useHintLadder(puzzle?.id ?? tier);
  const [justFailed, setJustFailed] = useState(false);
  const [flash, triggerFlash] = useSuccessFlash();

  const selectTier = (t: Difficulty) => {
    setTier(t);
    setIndex(0);
    const first = PUZZLES.filter((p) => p.difficulty === t)[0];
    setCode(first?.broken ?? '');
    setSolved(false);
    setJustFailed(false);
  };

  const selectPuzzle = (i: number) => {
    setIndex(i);
    setCode(tierPuzzles[i].broken);
    setSolved(false);
    setJustFailed(false);
  };

  const handleCheck = () => {
    if (!puzzle) return;
    if (puzzle.check(code)) {
      setSolved(true);
      setJustFailed(false);
      reset();
      triggerFlash();
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
        <div className="puzzle-tier-picker">
          {TIERS.map((t) => {
            const count = PUZZLES.filter((p) => p.difficulty === t.id).length;
            return (
              <button
                key={t.id}
                className={tier === t.id ? 'active' : ''}
                onClick={() => selectTier(t.id)}
              >
                {t.label}
                <span className="puzzle-tier-count">{count}</span>
              </button>
            );
          })}
        </div>

        {tierPuzzles.length === 0 ? (
          <p className="puzzle-tier-empty">
            {tier} tier is coming soon — basic is fully stocked, start there.
          </p>
        ) : (
          tierPuzzles.map((p, i) => (
            <button
              key={p.id}
              className={`puzzle-pick ${i === index ? 'active' : ''}`}
              onClick={() => selectPuzzle(i)}
            >
              {i + 1}. {p.title}
            </button>
          ))
        )}
      </div>

      {puzzle ? (
        <div className="puzzle-body">
          <p className="puzzle-prompt">{puzzle.prompt}</p>

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
                <button className="secondary" onClick={handleReset}>
                  Reset this puzzle
                </button>
                <button onClick={handleCheck}>Check my work</button>
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
