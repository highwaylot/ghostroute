import { CHAPTERS } from '../data/chapters';
import { STEPS } from '../data/steps';

type Props = {
  current: number;
};

// Pure knowledge content for the "chapter info" tab — no step-specific
// assignment here, that lives in GhostTip under the "step" tab.
export function ChapterIntro({ current }: Props) {
  const step = STEPS[current];
  if (!step) return null;

  const chapter = CHAPTERS.find((c) => c.id === step.chapter);
  if (!chapter) return null;

  const chapterNumber = CHAPTERS.findIndex((c) => c.id === chapter.id) + 1;

  return (
    <div className="chapter-intro">
      <span className="chapter-eyebrow">
        chapter {chapterNumber} of {CHAPTERS.length} — {chapter.title}
      </span>
      <p className="chapter-blurb">{chapter.blurb}</p>
    </div>
  );
}
