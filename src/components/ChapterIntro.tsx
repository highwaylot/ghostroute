import type { Chapter } from '../data/chapters';
import type { Step } from '../data/steps';

type Props = {
  chapters: Chapter[];
  steps: Step[];
  current: number;
};

// Pure knowledge content for the "chapter info" tab — no step-specific
// assignment here, that lives in GhostTip under the "step" tab.
export function ChapterIntro({ chapters, steps, current }: Props) {
  const step = steps[current];
  if (!step) return null;

  const chapter = chapters.find((c) => c.id === step.chapter);
  if (!chapter) return null;

  const chapterNumber = chapters.findIndex((c) => c.id === chapter.id) + 1;

  return (
    <div className="chapter-intro">
      <span className="chapter-eyebrow">
        chapter {chapterNumber} of {chapters.length} — {chapter.title}
      </span>
      <p className="chapter-blurb">{chapter.blurb}</p>
    </div>
  );
}
