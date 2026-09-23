import { useEffect, useState } from 'react';

export type AssistLevel = 1 | 2 | 3;

export const ASSIST_LEVELS: { level: AssistLevel; label: string; desc: string }[] = [
  { level: 1, label: 'hands-off', desc: 'No hints. Figure it out yourself.' },
  { level: 2, label: 'guided', desc: 'Hints appear slowly as you keep missing.' },
  { level: 3, label: 'full assist', desc: 'A new hint after every attempt.' },
];

// Tracks failed attempts for whatever's "active" (a route step, a puzzle id).
// Resets whenever the active key changes.
export function useHintLadder(activeKey: string) {
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setAttempts(0);
  }, [activeKey]);

  const registerFail = () => setAttempts((a) => a + 1);
  const reset = () => setAttempts(0);

  return { attempts, registerFail, reset };
}

// How aggressively hints reveal depends on the Assistance level:
// 1 (hands-off) never auto-reveals; 2 (guided) reveals one every two
// misses; 3 (full assist) reveals one after every miss. -1 means "nothing
// auto-revealed yet" — separate from a manual, on-demand ask (see
// PuzzlePane), which always works regardless of level.
export function hintIndex(attempts: number, level: AssistLevel): number {
  if (attempts === 0 || level === 1) return -1;
  const spacing = level === 2 ? 2 : 1;
  return Math.floor((attempts - 1) / spacing);
}

export function getHint(hints: string[], attempts: number, level: AssistLevel): string | null {
  const i = hintIndex(attempts, level);
  if (i < 0) return null;
  return hints[Math.min(i, hints.length - 1)];
}
