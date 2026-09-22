import { RouteTrack } from './RouteTrack';
import { GhostTip } from './GhostTip';
import { ChapterIntro } from './ChapterIntro';
import { AssistanceControl } from './AssistanceControl';
import type { AssistLevel } from '../lib/useHintLadder';
import type { Step } from '../data/steps';
import type { Chapter } from '../data/chapters';

type Props = {
  steps: Step[];
  chapters: Chapter[];
  completeMessage: string;
  current: number;
  code: string;
  assist: AssistLevel;
  onSelect: (index: number) => void;
  onAdvance: () => void;
  onReset: () => void;
  onSuccess: () => void;
  onAssistChange: (level: AssistLevel) => void;
};

function LifeRingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m4.8 4.8 3 3m4.4 4.4 3 3m0-10.4-3 3m-4.4 4.4-3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstructionsRail({
  steps,
  chapters,
  completeMessage,
  current,
  code,
  assist,
  onSelect,
  onAdvance,
  onReset,
  onSuccess,
  onAssistChange,
}: Props) {
  return (
    <div className="rail-column">
      <div className="instructions-rail">
        <RouteTrack steps={steps} current={current} onSelect={onSelect} />

        <div className="rail-window">
          <span className="rail-window-label">chapter info</span>
          <ChapterIntro chapters={chapters} steps={steps} current={current} />
        </div>

        <div className="rail-window">
          <span className="rail-window-label">step</span>
          <GhostTip
            steps={steps}
            current={current}
            code={code}
            assist={assist}
            onAdvance={onAdvance}
            onReset={onReset}
            onSuccess={onSuccess}
            completeMessage={completeMessage}
          />
        </div>
      </div>

      {/* Pulled out of the dark rail on purpose — this is the thing you
          need to notice the moment you're stuck, not a setting buried
          inside another box. */}
      <div className="assist-panel">
        <div className="assist-panel-head">
          <span className="assist-panel-icon">
            <LifeRingIcon />
          </span>
          <span className="assist-panel-title">how much help do you want?</span>
        </div>
        <AssistanceControl value={assist} onChange={onAssistChange} light large />
      </div>
    </div>
  );
}
