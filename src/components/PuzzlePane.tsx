import { useState } from 'react';
import { PUZZLES } from '../data/puzzles';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { PreviewFrame } from './PreviewFrame';
import { useHintLadder, getHint, type AssistLevel } from '../lib/useHintLadder';
import { useSuccessFlash } from '../lib/useSuccessFlash';

type Props = {
  assist: AssistLevel;
};

export function PuzzlePane({ assist }: Props) {
  const [index, setIndex] = useState(0);
  const puzzle = PUZZLES[index];
  const [code, setCode] = useState(puzzle.broken);
  const [solved, setSolved] = useState(false);
  const { attempts, registerFail, reset } = useHintLadder(puzzle.id);
  const [justFailed, setJustFailed] = useState(false);
  const [flash, triggerFlash] = useSuccessFlash();

  const selectPuzzle = (i: number) => {
    setIndex(i);
    setCode(PUZZLES[i].broken);
    setSolved(false);
    setJustFailed(false);
  };

  const handleCheck = () => {
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
    setCode(puzzle.broken);
    setSolved(false);
    setJustFailed(false);
    reset();
  };

  const hint = getHint(puzzle.hints, attempts, assist);
  const showGenericRetry = attempts > 0 && assist === 1;

  return (
    <div className="puzzle-pane">
      <div className="puzzle-list">
        {PUZZLES.map((p, i) => (
          <button
            key={p.id}
            className={`puzzle-pick ${i === index ? 'active' : ''}`}
            onClick={() => selectPuzzle(i)}
          >
            {i + 1}. {p.title}
          </button>
        ))}
      </div>

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
    </div>
  );
}
