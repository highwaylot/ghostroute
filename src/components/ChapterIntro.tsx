import { CHAPTERS } from '../data/chapters';
import { STEPS } from '../data/steps';

type Props = {
  current: number;
};

export function ChapterIntro({ current }: Props) {
  const step = STEPS[current];
  if (!step) return null;

  const chapter = CHAPTERS.find((c) => c.id === step.chapter);
  if (!chapter) return null;

  const stepsInChapter = STEPS.filter((s) => s.chapter === chapter.id);
  const indexInChapter = stepsInChapter.indexOf(step);
  const chapterNumber = CHAPTERS.findIndex((c) => c.id === chapter.id) + 1;

  return (
    <div className="chapter-intro">
      <span className="chapter-eyebrow">
        chapter {chapterNumber} of {CHAPTERS.length} — {chapter.title}
      </span>
      <span className="chapter-substep">
        step {indexInChapter + 1} of {stepsInChapter.length} in this chapter
      </span>
      {indexInChapter === 0 && <p className="chapter-blurb">{chapter.blurb}</p>}
    </div>
  );
}
