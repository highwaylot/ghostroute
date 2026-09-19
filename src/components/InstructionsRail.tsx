import { RouteTrack } from './RouteTrack';
import { GhostTip } from './GhostTip';
import { ChapterIntro } from './ChapterIntro';
import { AssistanceControl } from './AssistanceControl';
import type { AssistLevel } from '../lib/useHintLadder';

type Props = {
  current: number;
  code: string;
  assist: AssistLevel;
  onSelect: (index: number) => void;
  onAdvance: () => void;
  onReset: () => void;
  onAssistChange: (level: AssistLevel) => void;
};

export function InstructionsRail({
  current,
  code,
  assist,
  onSelect,
  onAdvance,
  onReset,
  onAssistChange,
}: Props) {
  return (
    <div className="instructions-rail">
      <RouteTrack current={current} onSelect={onSelect} />

      <AssistanceControl value={assist} onChange={onAssistChange} />

      <div className="rail-window">
        <span className="rail-window-label">chapter info</span>
        <ChapterIntro current={current} />
      </div>

      <div className="rail-window">
        <span className="rail-window-label">step</span>
        <GhostTip current={current} code={code} assist={assist} onAdvance={onAdvance} onReset={onReset} />
      </div>
    </div>
  );
}
