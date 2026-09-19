import { useState } from 'react';
import { RouteTrack } from './RouteTrack';
import { GhostTip } from './GhostTip';
import { ChapterIntro } from './ChapterIntro';

type Props = {
  current: number;
  code: string;
  onSelect: (index: number) => void;
  onAdvance: () => void;
  onReset: () => void;
};

type RailTab = 'chapter' | 'step';

export function InstructionsRail({ current, code, onSelect, onAdvance, onReset }: Props) {
  const [tab, setTab] = useState<RailTab>('step');

  return (
    <div className="instructions-rail">
      <RouteTrack current={current} onSelect={onSelect} />

      <div className="rail-tabs">
        <button
          className={`rail-tab ${tab === 'chapter' ? 'active' : ''}`}
          onClick={() => setTab('chapter')}
        >
          chapter info
        </button>
        <button
          className={`rail-tab ${tab === 'step' ? 'active' : ''}`}
          onClick={() => setTab('step')}
        >
          step
        </button>
      </div>

      <div className="rail-panel">
        {tab === 'chapter' ? (
          <ChapterIntro current={current} />
        ) : (
          <GhostTip current={current} code={code} onAdvance={onAdvance} onReset={onReset} />
        )}
      </div>
    </div>
  );
}
