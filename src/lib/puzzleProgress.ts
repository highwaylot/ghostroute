const SOLVED_KEY = 'tagsmiths-puzzles-solved';

export function loadSolvedPuzzles(): Set<string> {
  try {
    const raw = localStorage.getItem(SOLVED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function markPuzzleSolved(id: string) {
  try {
    const solved = loadSolvedPuzzles();
    solved.add(id);
    localStorage.setItem(SOLVED_KEY, JSON.stringify([...solved]));
  } catch {
    // storage unavailable — nothing to do
  }
}
