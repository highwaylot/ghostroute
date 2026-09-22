export type Difficulty = 'basic' | 'medium' | 'hard';

// A single source of truth for the tier color language — reused by both
// puzzles and projects so "basic/medium/hard" always means the same
// color everywhere in the app, instead of each list picking its own.
// Medium uses amber rather than red on purpose: red already means
// "destructive/error" elsewhere in the app (Clear buttons, diagnostics),
// so reusing it for a difficulty tier would read as "something's wrong."
export const DIFFICULTY_VAR: Record<Difficulty, string> = {
  basic: 'var(--diff-basic)',
  medium: 'var(--diff-medium)',
  hard: 'var(--diff-hard)',
};
