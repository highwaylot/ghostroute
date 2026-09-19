import { useState } from 'react';
import { PUZZLES } from '../data/puzzles';
import { CodeEditor } from './CodeEditor';
import { useHintLadder } from '../lib/useHintLadder';

export function PuzzlePane() {
  const [index, setIndex] = useState(0);
  const puzzle = PUZZLES[index];
  const [code, setCode] = useState(puzzle.broken);
  const [solved, setSolved] = useState(false);
  const { attempts, registerFail, reset, hintLevel } = useHintLadder(puzzle.id);
  const [justFailed, setJustFailed] = useState(false);

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

  const hint = attempts > 0 ? puzzle.hints[hintLevel(puzzle.hints)] : null;

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

        <div className="puzzle-editor-wrap">
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div className="output-wrap puzzle-output">
          <span className="lbl">Output</span>
          <iframe title="puzzle preview" srcDoc={code} />
        </div>

        {solved ? (
          <p className="puzzle-solved">Fixed it. Nice debugging.</p>
        ) : (
          <>
            {hint && (
              <p className={`hint ${justFailed ? 'flash' : ''}`}>
                Hint {Math.min(attempts, puzzle.hints.length)}/{puzzle.hints.length}: {hint}
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
